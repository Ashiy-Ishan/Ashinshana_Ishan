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

  const MAX_SIZE_MB = 5;
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    throw new Error(`File size (${(file.size / (1024 * 1024)).toFixed(2)}MB) exceeds maximum limit of ${MAX_SIZE_MB}MB.`);
  }

  // 2. Retrieve Firebase User ID Token for backend authentication
  let idToken = null;
  if (auth && auth.currentUser) {
    idToken = await auth.currentUser.getIdToken();
  }

  // Fallback for offline local testing when Firebase Auth isn't active
  if (!idToken && process.env.NODE_ENV !== 'production') {
    console.warn('Offline mode: Simulating upload URL for local development.');
    const filename = `${folderName}_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase()}`;
    const base = IMAGEKIT_URL_ENDPOINT.endsWith('/') ? IMAGEKIT_URL_ENDPOINT : `${IMAGEKIT_URL_ENDPOINT}/`;
    return `${base}${filename}`;
  }

  if (!idToken) {
    throw new Error('Authentication required: Please log in with the authorized admin account before uploading images.');
  }

  // 3. Prepare FormData payload
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folderName);

  // 4. Send upload request to Vercel Serverless API
  try {
    const response = await fetch(UPLOAD_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken}`
      },
      body: formData
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || `Upload failed with HTTP ${response.status}`);
    }

    return data.url;
  } catch (error) {
    console.error('ImageKit API upload error:', error);
    throw new Error(error.message || 'Failed to upload image to ImageKit.');
  }
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
