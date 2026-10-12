-- =====================================================================
-- RentiPair Supabase Database Schema
-- Production-Ready Schema with Multi-Capability Model & Row-Level Security
-- =====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS & DOMAINS
DO $$ BEGIN
    CREATE TYPE capability_type AS ENUM ('RENTER', 'EQUIPMENT_OWNER', 'REPAIR_CUSTOMER', 'TECHNICIAN');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE verification_status_type AS ENUM ('DRAFT', 'PENDING', 'UNDER_REVIEW', 'VERIFIED', 'REJECTED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE rental_status_type AS ENUM ('PENDING', 'CONFIRMED', 'ACTIVE', 'RETURN_PENDING', 'COMPLETED', 'CANCELLED', 'DISPUTED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE repair_status_type AS ENUM ('REQUESTED', 'FINDING_TECHNICIAN', 'TECHNICIAN_ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'DISPUTED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- =====================================================================
-- 3. PROFILES TABLE
-- Linked directly to Supabase auth.users
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    phone TEXT,
    city TEXT DEFAULT 'Chennai',
    onboarding_completed BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================================
-- 4. USER CAPABILITIES TABLE
-- Multi-capability structure: a user can be RENTER, EQUIPMENT_OWNER, REPAIR_CUSTOMER, TECHNICIAN
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.user_capabilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    capability capability_type NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT user_capability_unique UNIQUE (user_id, capability)
);

-- =====================================================================
-- 5. EQUIPMENT TABLE
-- Listed equipment for rental
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.equipment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    brand TEXT,
    model TEXT,
    condition TEXT DEFAULT 'Good',
    price_per_day NUMERIC(10, 2) NOT NULL CHECK (price_per_day > 0),
    security_deposit NUMERIC(10, 2) NOT NULL DEFAULT 0,
    location TEXT NOT NULL,
    city TEXT NOT NULL,
    images TEXT[] DEFAULT ARRAY[]::TEXT[],
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED', 'UNLISTED')),
    is_available BOOLEAN DEFAULT TRUE,
    rent_to_buy_enabled BOOLEAN DEFAULT FALSE,
    purchase_price NUMERIC(10, 2),
    rent_to_buy_terms TEXT,
    student_discount_enabled BOOLEAN DEFAULT FALSE,
    student_discount_percent INTEGER DEFAULT 10,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================================
-- 6. RENTALS TABLE
-- Equipment rental orders & escrow holds
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.rentals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    renter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    equipment_id UUID NOT NULL REFERENCES public.equipment(id) ON DELETE RESTRICT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    rental_price NUMERIC(10, 2) NOT NULL,
    deposit NUMERIC(10, 2) NOT NULL,
    damage_protection_selected BOOLEAN DEFAULT FALSE,
    damage_protection_fee NUMERIC(10, 2) DEFAULT 0,
    is_rent_to_buy BOOLEAN DEFAULT FALSE,
    student_discount_applied NUMERIC(10, 2) DEFAULT 0,
    status rental_status_type DEFAULT 'PENDING',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_dates CHECK (end_date >= start_date)
);

-- =====================================================================
-- 6B. WISHLISTS TABLE
-- User saved equipment favorites
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.wishlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    equipment_id UUID NOT NULL REFERENCES public.equipment(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_wishlist UNIQUE (user_id, equipment_id)
);

-- =====================================================================
-- 6C. AVAILABILITY ALERTS TABLE
-- Notify when currently rented equipment becomes available
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.availability_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    equipment_id UUID NOT NULL REFERENCES public.equipment(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'NOTIFIED', 'CANCELLED')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    notified_at TIMESTAMPTZ,
    CONSTRAINT unique_user_alert UNIQUE (user_id, equipment_id)
);

-- =====================================================================
-- 6D. IN-APP CONVERSATIONS & MESSAGES
-- Equipment Owner <-> Renter, Customer <-> Technician
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    equipment_id UUID REFERENCES public.equipment(id) ON DELETE SET NULL,
    repair_id UUID REFERENCES public.repair_requests(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    last_message TEXT,
    last_message_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.conversation_participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_participant UNIQUE (conversation_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================================
-- 6E. REFERRALS & REFERRAL REWARDS
-- Tracking referrals and earned credits
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.referrals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    referrer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    referred_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    referral_code TEXT NOT NULL,
    status TEXT DEFAULT 'REGISTERED' CHECK (status IN ('REGISTERED', 'QUALIFIED', 'REWARDED')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    qualified_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.referral_rewards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    referral_id UUID REFERENCES public.referrals(id) ON DELETE SET NULL,
    amount NUMERIC(10, 2) NOT NULL DEFAULT 100,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================================
-- 6F. STUDENT VERIFICATIONS TABLE
-- Verification documents and student status
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.student_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    institution_name TEXT NOT NULL,
    student_email TEXT,
    document_url TEXT,
    status verification_status_type DEFAULT 'PENDING',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ
);

-- =====================================================================
-- 7. REPAIR REQUESTS TABLE
-- Customer device repair booking orders
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.repair_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    technician_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    device_type TEXT NOT NULL,
    device_model TEXT NOT NULL,
    problem_description TEXT NOT NULL,
    images TEXT[] DEFAULT ARRAY[]::TEXT[],
    location TEXT NOT NULL,
    preferred_date DATE,
    status repair_status_type DEFAULT 'REQUESTED',
    estimated_quote NUMERIC(10, 2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================================
-- 8. TECHNICIANS TABLE
-- Extended verified technician profiles
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.technicians (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    bio TEXT,
    experience_years INTEGER DEFAULT 0,
    service_area TEXT,
    city TEXT,
    verification_status verification_status_type DEFAULT 'DRAFT',
    rating NUMERIC(3, 2) DEFAULT 5.0,
    completed_jobs INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================================
-- 9. TECHNICIAN SERVICES TABLE
-- Specific services & standard diagnostic/labour pricing offered by tech
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.technician_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    technician_id UUID NOT NULL REFERENCES public.technicians(id) ON DELETE CASCADE,
    service_name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================================
-- 10. TECHNICIAN VERIFICATIONS TABLE (SECURE)
-- Sensitive documents: masked and only accessible by owner & admin
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.technician_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    technician_id UUID NOT NULL REFERENCES public.technicians(id) ON DELETE CASCADE,
    verification_type TEXT NOT NULL, -- 'GOVT_ID', 'SKILL_CERTIFICATE', 'EXPERIENCE_LETTER', 'PORTFOLIO'
    status verification_status_type DEFAULT 'PENDING',
    document_path TEXT NOT NULL, -- Stored securely in private bucket
    document_masked_preview TEXT, -- e.g. "Govt ID: ****-****-9204"
    review_notes TEXT,
    reviewed_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================================
-- 11. REVIEWS TABLE
-- Verified ratings and reviews
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reviewer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    target_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================================
-- 12. NOTIFICATIONS TABLE
-- Realtime alerts & transaction updates
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'general',
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================================
-- 13. AUTOMATIC PROFILE CREATION TRIGGER ON AUTH SIGNUP
-- =====================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, user_id, full_name, avatar_url, phone, city, onboarding_completed)
    VALUES (
        NEW.id,
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
        COALESCE(NEW.raw_user_meta_data->>'phone', ''),
        COALESCE(NEW.raw_user_meta_data->>'city', 'Chennai'),
        FALSE
    );

    -- Insert default capability as RENTER
    INSERT INTO public.user_capabilities (user_id, capability)
    VALUES (NEW.id, 'RENTER');

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================================
-- 14. ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_capabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.repair_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technician_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technician_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- PROFILES Policies
CREATE POLICY "Public profiles are viewable by everyone"
    ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- USER CAPABILITIES Policies
CREATE POLICY "Public user capabilities viewable"
    ON public.user_capabilities FOR SELECT USING (true);

CREATE POLICY "Users can insert own capabilities"
    ON public.user_capabilities FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own capabilities"
    ON public.user_capabilities FOR DELETE USING (auth.uid() = user_id);

-- EQUIPMENT Policies
CREATE POLICY "Approved equipment viewable by all"
    ON public.equipment FOR SELECT USING (status = 'APPROVED' OR auth.uid() = owner_id);

CREATE POLICY "Authenticated users can insert equipment"
    ON public.equipment FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update own equipment"
    ON public.equipment FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Owners can delete own equipment"
    ON public.equipment FOR DELETE USING (auth.uid() = owner_id);

-- RENTALS Policies
CREATE POLICY "Users view own rentals (renter or equipment owner)"
    ON public.rentals FOR SELECT USING (
        auth.uid() = renter_id OR
        auth.uid() IN (SELECT owner_id FROM public.equipment WHERE id = rentals.equipment_id)
    );

CREATE POLICY "Renters can create rental orders"
    ON public.rentals FOR INSERT WITH CHECK (auth.uid() = renter_id);

CREATE POLICY "Renters and owners can update rental status"
    ON public.rentals FOR UPDATE USING (
        auth.uid() = renter_id OR
        auth.uid() IN (SELECT owner_id FROM public.equipment WHERE id = rentals.equipment_id)
    );

-- REPAIR REQUESTS Policies
CREATE POLICY "Users view own repair requests"
    ON public.repair_requests FOR SELECT USING (
        auth.uid() = customer_id OR auth.uid() = technician_id
    );

CREATE POLICY "Customers can create repair requests"
    ON public.repair_requests FOR INSERT WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Parties can update repair request"
    ON public.repair_requests FOR UPDATE USING (
        auth.uid() = customer_id OR auth.uid() = technician_id
    );

-- TECHNICIANS Policies
CREATE POLICY "Technicians viewable by all if approved or self"
    ON public.technicians FOR SELECT USING (
        verification_status = 'VERIFIED' OR auth.uid() = user_id
    );

CREATE POLICY "Users can create own technician profile"
    ON public.technicians FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Technicians can update own profile"
    ON public.technicians FOR UPDATE USING (auth.uid() = user_id);

-- TECHNICIAN VERIFICATIONS (HIGH SECURITY)
-- Never expose raw documents or ID numbers to the public
CREATE POLICY "Only technician owner and admin can view verification docs"
    ON public.technician_verifications FOR SELECT USING (
        auth.uid() IN (SELECT user_id FROM public.technicians WHERE id = technician_verifications.technician_id)
        OR (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true
    );

CREATE POLICY "Technician can submit verification docs"
    ON public.technician_verifications FOR INSERT WITH CHECK (
        auth.uid() IN (SELECT user_id FROM public.technicians WHERE id = technician_verifications.technician_id)
    );

-- REVIEWS Policies
CREATE POLICY "Reviews viewable by everyone"
    ON public.reviews FOR SELECT USING (true);

CREATE POLICY "Authenticated users can submit review"
    ON public.reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

-- NOTIFICATIONS Policies
CREATE POLICY "Users view only own notifications"
    ON public.notifications FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users update only own notifications"
    ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- =====================================================================
-- 13. STORAGE BUCKETS SETUP & SECURITY (SUPABASE STORAGE)
-- Creates the required storage buckets with public/private settings
-- =====================================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
    ('equipment-images', 'equipment-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
    ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
    ('technician-portfolios', 'technician-portfolios', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
    ('technician-verifications', 'technician-verifications', false, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']),
    ('student-verifications', 'student-verifications', false, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf'])
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Public Storage Read Access (equipment images, avatars, technician portfolios)
CREATE POLICY "Public media viewable by everyone"
    ON storage.objects FOR SELECT USING (
        bucket_id IN ('equipment-images', 'avatars', 'technician-portfolios')
    );

-- Authenticated Users can upload to their own user-scoped directory in public buckets
CREATE POLICY "Users can upload own public media"
    ON storage.objects FOR INSERT WITH CHECK (
        bucket_id IN ('equipment-images', 'avatars', 'technician-portfolios')
        AND auth.role() = 'authenticated'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Users can update and delete own public media"
    ON storage.objects FOR DELETE USING (
        bucket_id IN ('equipment-images', 'avatars', 'technician-portfolios')
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

-- Private Verification Documents Storage (technician-verifications, student-verifications)
-- Strictly accessible only to the document owner or an authenticated admin
CREATE POLICY "Private verification docs viewable only by owner or admin"
    ON storage.objects FOR SELECT USING (
        bucket_id IN ('technician-verifications', 'student-verifications')
        AND (
            (storage.foldername(name))[1] = auth.uid()::text
            OR (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true
        )
    );

CREATE POLICY "Authenticated users can upload own verification documents"
    ON storage.objects FOR INSERT WITH CHECK (
        bucket_id IN ('technician-verifications', 'student-verifications')
        AND auth.role() = 'authenticated'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Users or admin can manage private verification documents"
    ON storage.objects FOR DELETE USING (
        bucket_id IN ('technician-verifications', 'student-verifications')
        AND (
            (storage.foldername(name))[1] = auth.uid()::text
            OR (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true
        )
    );

