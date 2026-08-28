// src/config/imagekit.js
export const IMAGEKIT_URL_ENDPOINT = process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/x2eerczu0';

/**
 * Helper to build an optimized ImageKit CDN URL with automatic format and quality compression.
 * @param {string} imagePath - Relative path or full URL
 * @param {Object} options - Transformation options e.g. { width: 800, quality: 80, format: 'auto' }
 * @returns {string} Optimized CDN URL
 */
export const getImageKitUrl = (imagePath, options = {}) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('data:') || imagePath.startsWith('blob:')) return imagePath;

  // If external non-imagekit URL, return as-is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    if (!imagePath.includes('ik.imagekit.io')) {
      return imagePath;
    }
  }

  const cleanPath = imagePath.replace(IMAGEKIT_URL_ENDPOINT, '').replace(/^\/+/, '');
  const transforms = [];

  if (options.width) transforms.push(`w-${options.width}`);
  if (options.height) transforms.push(`h-${options.height}`);
  if (options.quality) transforms.push(`q-${options.quality}`);
  if (options.crop) transforms.push(`c-${options.crop}`);

  const transformString = transforms.length > 0 ? `?tr=${transforms.join(',')}` : '';
  const base = IMAGEKIT_URL_ENDPOINT.endsWith('/') ? IMAGEKIT_URL_ENDPOINT : `${IMAGEKIT_URL_ENDPOINT}/`;

  return `${base}${cleanPath}${transformString}`;
};

