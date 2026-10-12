import { supabase, isSupabaseConfigured } from './supabaseClient';

/**
 * Storage Helper for RentiPair
 * Manages photo and document uploads to Supabase Storage with local fallback
 */

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const MAX_DOC_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/avif'
];

const ALLOWED_DOC_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/pdf'
];

/**
 * Validates image file type and size
 */
export function validateImageFile(file, maxSizeMB = 5) {
  if (!file) {
    return { valid: false, error: 'No file provided.' };
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type.toLowerCase())) {
    return {
      valid: false,
      error: `Invalid file format (${file.type || 'unknown'}). Allowed formats: JPG, PNG, WEBP, AVIF.`
    };
  }

  const limitBytes = maxSizeMB * 1024 * 1024;
  if (file.size > limitBytes) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File size (${sizeMB} MB) exceeds maximum allowed limit of ${maxSizeMB} MB.`
    };
  }

  return { valid: true };
}

/**
 * Validates document file type and size
 */
export function validateDocumentFile(file, maxSizeMB = 10) {
  if (!file) {
    return { valid: false, error: 'No file provided.' };
  }

  if (!ALLOWED_DOC_TYPES.includes(file.type.toLowerCase())) {
    return {
      valid: false,
      error: `Invalid document format (${file.type || 'unknown'}). Allowed formats: PDF, JPG, PNG.`
    };
  }

  const limitBytes = maxSizeMB * 1024 * 1024;
  if (file.size > limitBytes) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `Document size (${sizeMB} MB) exceeds maximum allowed limit of ${maxSizeMB} MB.`
    };
  }

  return { valid: true };
}

/**
 * Helper to convert file to data URL (for fallback / local preview)
 */
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Uploads an equipment photo to Supabase Storage
 * Bucket: 'equipment-images' (Public)
 */
export async function uploadEquipmentImage(file, userId) {
  const validation = validateImageFile(file, 5);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filePath = `${userId}/${Date.now()}_${sanitizedName}`;

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.storage
        .from('equipment-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        console.error('Supabase storage upload error:', error);
        // If bucket is missing or RLS error, fall back to data URL for smooth UX
        return await fileToDataUrl(file);
      }

      const { data: urlData } = supabase.storage
        .from('equipment-images')
        .getPublicUrl(data.path);

      return urlData?.publicUrl || filePath;
    } catch (err) {
      console.warn('Storage upload failed, falling back to data URL:', err);
      return await fileToDataUrl(file);
    }
  }

  return await fileToDataUrl(file);
}

/**
 * Uploads a profile avatar
 * Bucket: 'avatars' (Public)
 */
export async function uploadProfileAvatar(file, userId) {
  const validation = validateImageFile(file, 4);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filePath = `${userId}/${Date.now()}_${sanitizedName}`;

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        console.error('Avatar storage upload error:', error);
        return await fileToDataUrl(file);
      }

      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(data.path);

      return urlData?.publicUrl || filePath;
    } catch (err) {
      return await fileToDataUrl(file);
    }
  }

  return await fileToDataUrl(file);
}

/**
 * Uploads a technician portfolio sample
 * Bucket: 'technician-portfolios' (Public)
 */
export async function uploadTechnicianPortfolio(file, userId) {
  const validation = validateImageFile(file, 5);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filePath = `${userId}/${Date.now()}_${sanitizedName}`;

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.storage
        .from('technician-portfolios')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        return await fileToDataUrl(file);
      }

      const { data: urlData } = supabase.storage
        .from('technician-portfolios')
        .getPublicUrl(data.path);

      return urlData?.publicUrl || filePath;
    } catch (err) {
      return await fileToDataUrl(file);
    }
  }

  return await fileToDataUrl(file);
}

/**
 * Uploads a sensitive technician verification document (Aadhaar, Cert, etc.)
 * Bucket: 'technician-verifications' (Private)
 */
export async function uploadTechnicianVerificationDoc(file, userId) {
  const validation = validateDocumentFile(file, 10);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filePath = `${userId}/${Date.now()}_${sanitizedName}`;

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.storage
        .from('technician-verifications')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        console.error('Verification doc storage error:', error);
        return `private_doc://${filePath}`;
      }

      return data.path;
    } catch (err) {
      return `private_doc://${filePath}`;
    }
  }

  return `local_secure_doc://${filePath}`;
}
