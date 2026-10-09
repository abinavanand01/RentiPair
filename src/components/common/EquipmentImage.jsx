import React, { useState, useEffect } from 'react';
import { getEquipmentImageUrl, getFallbackForError, CLEAN_EQUIPMENT_PLACEHOLDER_SVG } from '../../utils/imageFallbacks';

/**
 * Reusable EquipmentImage component with multi-stage fallback & zero broken images guarantee
 */
export default function EquipmentImage({
  item,
  src,
  alt = 'Equipment',
  category,
  title,
  style = {},
  className = '',
  loading = 'lazy',
  objectFit = 'cover'
}) {
  const effectiveCategory = category || item?.category || '';
  const effectiveTitle = title || item?.title || item?.name || '';
  const initialSrc = src || (item ? getEquipmentImageUrl(item) : CLEAN_EQUIPMENT_PLACEHOLDER_SVG);

  const [currentSrc, setCurrentSrc] = useState(initialSrc);
  const [hasErrorOnce, setHasErrorOnce] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sync if prop changes
  useEffect(() => {
    const newSrc = src || (item ? getEquipmentImageUrl(item) : CLEAN_EQUIPMENT_PLACEHOLDER_SVG);
    setCurrentSrc(newSrc);
    setHasErrorOnce(false);
    setIsLoaded(false);
  }, [src, item]);

  const handleError = () => {
    if (!hasErrorOnce) {
      // First fallback: model or category image
      setHasErrorOnce(true);
      const fallback = getFallbackForError(currentSrc, effectiveCategory, effectiveTitle);
      setCurrentSrc(fallback);
    } else {
      // Final fallback: verified clean SVG placeholder
      setCurrentSrc(CLEAN_EQUIPMENT_PLACEHOLDER_SVG);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt || effectiveTitle}
      onError={handleError}
      onLoad={() => setIsLoaded(true)}
      loading={loading}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        objectFit: objectFit,
        display: 'block',
        transition: 'opacity 0.2s ease',
        opacity: isLoaded ? 1 : 0.85,
        ...style
      }}
    />
  );
}
