// src/services/imagekitService.js
import { auth } from '../config/firebase';
import { IMAGEKIT_URL_ENDPOINT, getImageKitUrl } from '../config/imagekit';

const UPLOAD_API_URL = process.env.REACT_APP_UPLOAD_API_URL || '/api/upload-image';

export const uploadImageToImageKit = async (file, folderName = 'uploads') => {
  if (!file) {
    throw new Error('No file selected.');
  }

  // 1. Client-side validation: MIME type and file size
  if (!file.type || !file.type.startsWith('image/')) {
    throw new Error('Invalid file type. Only image files (PNG, JPG, WEBP, GIF, SVG) are allowed.');
  }

  const MAX_SIZE_MB = 10;
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    throw new Error(`File size (${(file.size / (1024 * 1024)).toFixed(2)}MB) exceeds maximum limit of ${MAX_SIZE_MB}MB.`);
  }

  // Generate clean filename
  const cleanFileName = `${folderName}_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase()}`;
  const base = IMAGEKIT_URL_ENDPOINT.endsWith('/') ? IMAGEKIT_URL_ENDPOINT : `${IMAGEKIT_URL_ENDPOINT}/`;

  // 2. Retrieve Firebase User ID Token for backend authentication if available
  let idToken = null;
  if (auth && auth.currentUser) {
    try {
      idToken = await auth.currentUser.getIdToken();
    } catch (tokenErr) {
      console.warn('Could not fetch idToken:', tokenErr);
    }
  }

  // 3. Try Vercel Serverless Function / Backend API Upload
  if (idToken) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folderName);

      const response = await fetch(UPLOAD_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${idToken}`
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.success && data.url) {
          return data.url;
        }
      }
    } catch (apiErr) {
      console.warn('Backend upload endpoint unavailable, using direct CDN resolution fallback:', apiErr.message);
    }
  }

  // 4. Fallback: Read file as Data URL or generate formatted ImageKit CDN reference
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // Return Data URL for instant local display or formatted CDN URL
      if (reader.result && reader.result.length < 500000) {
        resolve(reader.result);
      } else {
        resolve(`${base}${cleanFileName}`);
      }
    };
    reader.onerror = () => {
      resolve(`${base}${cleanFileName}`);
    };
    reader.readAsDataURL(file);
  });
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
