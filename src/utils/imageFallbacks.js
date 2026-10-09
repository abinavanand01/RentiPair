/**
 * RentiPair Image Fallback System
 * 
 * Priority:
 * 1. Product-specific uploaded image (item.image / item.image_url / item.images[0])
 * 2. Product/model-specific image (matched by brand, model, or title keywords)
 * 3. Category-specific fallback image (matched by category name)
 * 4. Clean RentiPair equipment placeholder SVG (ensures zero broken image icons ever)
 */

// Category to verified high-resolution product image mapping
export const CATEGORY_FALLBACK_IMAGES = {
  'Scientific Calculators': 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=800&auto=format&fit=crop&q=80',
  'Laptops': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
  'Laptops & Workstations': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
  'Tablets': 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
  'Tablets & Stylus': 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
  'Cameras': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
  'Cameras & Lenses': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
  'Projectors': 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&auto=format&fit=crop&q=80',
  'Projectors & Screens': 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&auto=format&fit=crop&q=80',
  'Electronics': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
  'Electronics & Testing': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
  'Lab Equipment': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
  'Development Boards': 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=800&auto=format&fit=crop&q=80',
  'Tools': 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=80',
  'Tools & Power Gear': 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=80',
  'Gaming Devices': 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80',
  'Gaming Consoles': 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80'
};

// Model / Keyword specific high-resolution images
export const MODEL_KEYWORD_IMAGES = [
  {
    keywords: ['calculator', 'casio', 'classwiz', 'ti-84', 'graphing'],
    url: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['lens', 'telephoto', 'zoom', '70-200mm', 'fe 24-70'],
    url: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['sony alpha', 'a7', 'mirrorless', 'dslr', 'cinema camera'],
    url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['macbook', 'macbook pro', 'apple m2', 'apple m3', 'macbook air'],
    url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['dell', 'xps', 'thinkpad', 'laptop', 'workstation'],
    url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['ipad', 'tablet', 'stylus', 'pencil', 'surface pro'],
    url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['oscilloscope', 'rigol', 'waveform', 'siglent'],
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['multimeter', 'fluke', 'digital meter', 'voltmeter', 'clamp meter'],
    url: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['soldering', 'hakko', 'soldering station', 'iron', 'desoldering'],
    url: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['arduino', 'uno', 'starter kit', 'microcontroller', 'breadboard'],
    url: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['raspberry pi', 'jetson', 'orin nano', 'single board', 'dev kit'],
    url: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['playstation', 'ps5', 'dualsense'],
    url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['nintendo', 'switch', 'joy-con', 'handheld console'],
    url: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['projector', 'epson', 'benq', 'lumens', 'home theater'],
    url: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['drill', 'bosch', 'makita', 'impact driver', 'cordless drill'],
    url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['microscope', 'olympus', 'biological', 'lab optics'],
    url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['3d printer', 'creality', 'ender', 'filament', 'extruder'],
    url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['keyboard', 'keychron', 'mechanical keyboard', 'custom keyboard'],
    url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['monitor', 'ultrasharp', 'display', 'screen', '4k monitor'],
    url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['headphones', 'headset', 'wh-1000xm5', 'noise cancelling', 'earphones'],
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
  }
];

// Clean RentiPair equipment placeholder SVG (Level 4 fallback)
export const CLEAN_EQUIPMENT_PLACEHOLDER_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 375" width="600" height="375"><rect width="600" height="375" fill="%230B1533"/><rect x="20" y="20" width="560" height="335" rx="16" fill="%2311204C" stroke="%231E3A8A" stroke-width="2"/><circle cx="300" cy="155" r="54" fill="%231677FF" fill-opacity="0.15"/><path d="M280 145 C280 135, 290 125, 300 135 C310 145, 320 155, 320 145 C320 135, 310 125, 305 125" fill="none" stroke="%2338BDF8" stroke-width="4" stroke-linecap="round"/><path d="M320 165 C320 175, 310 185, 300 175 C290 165, 280 155, 280 165 C280 175, 290 185, 295 185" fill="none" stroke="%23FF7A00" stroke-width="4" stroke-linecap="round"/><circle cx="300" cy="155" r="4" fill="%23FFFFFF"/><text x="300" y="245" fill="%23F8FAFC" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="17" font-weight="700" text-anchor="middle" letter-spacing="-0.01em">RentiPair Verified Equipment</text><text x="300" y="272" fill="%2394A3B8" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="12.5" font-weight="500" text-anchor="middle">Quality Inspected • Guaranteed Condition</text></svg>`;

/**
 * Resolves the best available image URL for an equipment item
 */
export function getEquipmentImageUrl(item) {
  if (!item) return CLEAN_EQUIPMENT_PLACEHOLDER_SVG;

  // Level 1: Product-specific uploaded image
  if (item.image && typeof item.image === 'string' && item.image.trim().length > 0 && !item.image.includes('undefined')) {
    return item.image;
  }
  if (item.image_url && typeof item.image_url === 'string' && item.image_url.trim().length > 0) {
    return item.image_url;
  }
  if (Array.isArray(item.images) && item.images.length > 0 && typeof item.images[0] === 'string' && item.images[0].trim().length > 0) {
    return item.images[0];
  }

  // Level 2: Model / Keyword match
  const searchCorpus = `${item.title || item.name || ''} ${item.brand || ''} ${item.model || ''} ${item.category || ''}`.toLowerCase();
  for (const entry of MODEL_KEYWORD_IMAGES) {
    if (entry.keywords.some(kw => searchCorpus.includes(kw))) {
      return entry.url;
    }
  }

  // Level 3: Category match
  if (item.category && CATEGORY_FALLBACK_IMAGES[item.category]) {
    return CATEGORY_FALLBACK_IMAGES[item.category];
  }

  // Level 4: Final clean placeholder
  return CLEAN_EQUIPMENT_PLACEHOLDER_SVG;
}

/**
 * Returns fallback image given an initial URL and category/title
 */
export function getFallbackForError(failedSrc, category, title = '') {
  const corpus = `${title} ${category}`.toLowerCase();

  // Try model match first
  for (const entry of MODEL_KEYWORD_IMAGES) {
    if (entry.url !== failedSrc && entry.keywords.some(kw => corpus.includes(kw))) {
      return entry.url;
    }
  }

  // Try category
  if (category && CATEGORY_FALLBACK_IMAGES[category] && CATEGORY_FALLBACK_IMAGES[category] !== failedSrc) {
    return CATEGORY_FALLBACK_IMAGES[category];
  }

  return CLEAN_EQUIPMENT_PLACEHOLDER_SVG;
}
