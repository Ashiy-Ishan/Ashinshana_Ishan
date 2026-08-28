// src/services/imagekitService.js
import { IMAGEKIT_URL_ENDPOINT, getImageKitUrl } from '../config/imagekit';

export const uploadImageToImageKit = async (file, folderName = 'uploads') => {
  if (!file) return '';
  // Format as ImageKit URL
  const filename = `${folderName}_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  const base = IMAGEKIT_URL_ENDPOINT.endsWith('/') ? IMAGEKIT_URL_ENDPOINT : `${IMAGEKIT_URL_ENDPOINT}/`;
  return `${base}${filename}`;
};

export const imagekitService = {
  // Get ImageKit Endpoint
  getEndpoint() {
    return IMAGEKIT_URL_ENDPOINT;
  },

  // Resolve ImageKit URL for any path or external image
  resolveUrl(imagePath, options = {}) {
    if (!imagePath) return '';
    return getImageKitUrl(imagePath, options);
  },

  // Helper to format uploaded image filename to ImageKit URL
  formatImageKitUrl(filenameOrPath) {
    if (!filenameOrPath) return '';
    if (filenameOrPath.startsWith('http://') || filenameOrPath.startsWith('https://')) {
      return filenameOrPath;
    }
    const cleanPath = filenameOrPath.startsWith('/') ? filenameOrPath.substring(1) : filenameOrPath;
    const base = IMAGEKIT_URL_ENDPOINT.endsWith('/') ? IMAGEKIT_URL_ENDPOINT : `${IMAGEKIT_URL_ENDPOINT}/`;
    return `${base}${cleanPath}`;
  }
};
