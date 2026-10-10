/**
 * RentiPair Real Data Definitions
 * 
 * All initial user data, equipment listings, technician profiles,
 * rentals, repairs, and reviews start completely EMPTY ([]).
 * Data is populated exclusively through user actions and stored in Supabase.
 */

// Starting Empty Platform State: Zero fake data
export const INITIAL_EQUIPMENT = [];
export const INITIAL_TECHNICIANS = [];
export const INITIAL_RENTAL_ORDERS = [];
export const INITIAL_REPAIR_REQUESTS = [];
export const INITIAL_NOTIFICATIONS = [];

// Equipment Category Definitions (for filtering and listing forms)
export const RENTAL_CATEGORIES = [
  { id: "all", name: "All Equipment", icon: "Boxes" },
  { id: "Scientific Calculators", name: "Scientific Calculators", icon: "Calculator", tag: "Exams" },
  { id: "Laptops", name: "Laptops & Workstations", icon: "Laptop", tag: "Tech" },
  { id: "Tablets", name: "Tablets & Stylus", icon: "Tablet" },
  { id: "Cameras", name: "Cameras & Lenses", icon: "Camera", tag: "Pro" },
  { id: "Projectors", name: "Projectors & Screens", icon: "Projector" },
  { id: "Electronics", name: "Electronics & Testing", icon: "Cpu" },
  { id: "Lab Equipment", name: "Lab Equipment", icon: "FlaskConical" },
  { id: "Development Boards", name: "Development Boards", icon: "CircuitBoard" },
  { id: "Tools", name: "Tools & Power Gear", icon: "Wrench" },
  { id: "Gaming Devices", name: "Gaming Consoles", icon: "Gamepad2" }
];

// Repair Service Definitions (for technician skills and customer requests)
export const REPAIR_SERVICES = [
  { id: "Laptop Repair", name: "Laptop Repair", icon: "Laptop", desc: "Display, battery, logic board, hinge & liquid damage fixes" },
  { id: "Smartphone Repair", name: "Smartphone Repair", icon: "Smartphone", desc: "OLED glass OCA lamination, battery, FaceID & charge port" },
  { id: "Tablet Repair", name: "Tablet Repair", icon: "Tablet", desc: "Digitizer glass, frame bent realignment & charging ports" },
  { id: "PC Repair", name: "PC & Desktop Repair", icon: "Monitor", desc: "GPU diagnosis, custom builds, thermal paste, BSOD & PSU" },
  { id: "Electronics Repair", name: "Electronics Repair", icon: "Cpu", desc: "PCB micro-soldering, audio gear, amplifiers & power supplies" },
  { id: "Printer Repair", name: "Printer Repair", icon: "Printer", desc: "LaserJet rollers, clogged printheads & network scanner setup" },
  { id: "Camera Repair", name: "Camera & Lens Repair", icon: "Camera", desc: "Sensor cleaning, shutter replacement & optical calibration" },
  { id: "CCTV & Networking", name: "CCTV & Networking", icon: "ShieldAlert", desc: "IP camera setup, NVR hard drives & enterprise Wi-Fi mesh" }
];

// Production Supabase Schema Documentation (Viewer)
export const DATABASE_SCHEMA_DOCUMENTATION = [
  {
    table: "users / auth.users",
    description: "Core Supabase authenticated users entity.",
    columns: [
      { name: "id", type: "UUID (Primary Key)", note: "Unique user identifier" },
      { name: "email", type: "VARCHAR(255) UNIQUE NOT NULL", note: "Authenticated email" },
      { name: "created_at", type: "TIMESTAMPTZ", note: "Account creation timestamp" }
    ]
  },
  {
    table: "profiles",
    description: "Real public user profiles linked to auth.users.",
    columns: [
      { name: "id", type: "UUID PRIMARY KEY (FK -> auth.users.id)", note: "Profile identifier" },
      { name: "full_name", type: "TEXT NOT NULL", note: "User full name" },
      { name: "avatar_url", type: "TEXT", note: "Uploaded profile photo" },
      { name: "phone", type: "TEXT", note: "User phone number" },
      { name: "city", type: "TEXT", note: "Operational city" },
      { name: "onboarding_completed", type: "BOOLEAN DEFAULT FALSE", note: "Setup status" },
      { name: "is_admin", type: "BOOLEAN DEFAULT FALSE", note: "Administrator role" }
    ]
  },
  {
    table: "equipment",
    description: "Real equipment listings created by verified owners.",
    columns: [
      { name: "id", type: "UUID PRIMARY KEY", note: "Equipment listing ID" },
      { name: "owner_id", type: "UUID (FK -> profiles.id)", note: "Owner profile" },
      { name: "name / title", type: "TEXT NOT NULL", note: "Equipment title" },
      { name: "category", type: "TEXT NOT NULL", note: "Selected category" },
      { name: "brand", type: "TEXT", note: "Equipment brand" },
      { name: "model", type: "TEXT", note: "Model identifier" },
      { name: "description", type: "TEXT", note: "Item description" },
      { name: "condition", type: "TEXT", note: "Like New / Excellent / Good" },
      { name: "price_per_day", type: "NUMERIC(10,2) NOT NULL", note: "Daily rental rate" },
      { name: "security_deposit", type: "NUMERIC(10,2) NOT NULL", note: "Refundable escrow deposit" },
      { name: "location", type: "TEXT NOT NULL", note: "Pickup locality" },
      { name: "city", type: "TEXT NOT NULL", note: "Operational city" },
      { name: "images", type: "TEXT[] NOT NULL", note: "Uploaded actual equipment photos" },
      { name: "status", type: "TEXT DEFAULT 'PENDING'", note: "PENDING / APPROVED / REJECTED" },
      { name: "is_available", type: "BOOLEAN DEFAULT TRUE", note: "Rental availability" }
    ]
  },
  {
    table: "technicians",
    description: "Real verified technician profiles created by applied technicians.",
    columns: [
      { name: "id", type: "UUID PRIMARY KEY", note: "Technician ID" },
      { name: "user_id", type: "UUID UNIQUE (FK -> profiles.id)", note: "Technician profile" },
      { name: "bio", type: "TEXT", note: "Technical bio and background" },
      { name: "experience_years", type: "INTEGER DEFAULT 0", note: "Years in field" },
      { name: "service_area", type: "TEXT", note: "Localities served" },
      { name: "city", type: "TEXT", note: "City" },
      { name: "verification_status", type: "TEXT DEFAULT 'PENDING'", note: "PENDING / VERIFIED / REJECTED" },
      { name: "rating", type: "NUMERIC(3,2)", note: "Real average rating from reviews" },
      { name: "completed_jobs", type: "INTEGER DEFAULT 0", note: "Verified completed jobs" }
    ]
  },
  {
    table: "rentals",
    description: "Real equipment rental orders with escrow tracking.",
    columns: [
      { name: "id", type: "UUID PRIMARY KEY", note: "Rental order ID" },
      { name: "renter_id", type: "UUID (FK -> profiles.id)", note: "Renter profile" },
      { name: "equipment_id", type: "UUID (FK -> equipment.id)", note: "Leased equipment" },
      { name: "start_date", type: "DATE NOT NULL", note: "Lease start" },
      { name: "end_date", type: "DATE NOT NULL", note: "Return deadline" },
      { name: "rental_price", type: "NUMERIC(10,2) NOT NULL", note: "Calculated rental total" },
      { name: "deposit", type: "NUMERIC(10,2) NOT NULL", note: "Held escrow deposit" },
      { name: "status", type: "TEXT DEFAULT 'PENDING'", note: "PENDING / ACTIVE / COMPLETED" }
    ]
  },
  {
    table: "repair_requests",
    description: "Real customer device repair service requests.",
    columns: [
      { name: "id", type: "UUID PRIMARY KEY", note: "Repair request ID" },
      { name: "customer_id", type: "UUID (FK -> profiles.id)", note: "Customer profile" },
      { name: "technician_id", type: "UUID (FK -> technicians.id)", note: "Assigned technician" },
      { name: "device_type", type: "TEXT NOT NULL", note: "Device category" },
      { name: "device_model", type: "TEXT NOT NULL", note: "Model" },
      { name: "problem_description", type: "TEXT NOT NULL", note: "Issue report" },
      { name: "status", type: "TEXT DEFAULT 'REQUESTED'", note: "REQUESTED / IN_PROGRESS / COMPLETED" }
    ]
  }
];
