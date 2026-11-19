import { auth } from '../config/firebase';
import { IMAGEKIT_URL_ENDPOINT, getImageKitUrl } from '../config/imagekit';

export const uploadImageToImageKit = async (file, folderName = 'uploads') => {
  if (!file) {
    throw new Error('No file selected.');
  }

  if (!['image/png', 'image/jpeg', 'image/webp', 'image/gif'].includes(file.type)) {
    throw new Error('Invalid file type. Only image files (PNG, JPG, WebP, GIF) are allowed.');
  }

  const MAX_SIZE_MB = 10;
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    throw new Error(`File size (${(file.size / (1024 * 1024)).toFixed(2)}MB) exceeds maximum limit of ${MAX_SIZE_MB}MB.`);
  }

  if (!auth?.currentUser?.emailVerified) {
    throw new Error('Sign in with the verified admin account to upload images.');
  }

  const idToken = await auth.currentUser.getIdToken();
  const headers = { Authorization: `Bearer ${idToken}` };
  const authResponse = await fetch('/api/imagekit-auth', { method: 'POST', headers });

  if (authResponse.status === 404 || authResponse.status === 503) {
    if (file.size > 4 * 1024 * 1024) {
      throw new Error('Direct uploads are unavailable. The fallback uploader accepts files up to 4 MB.');
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folderName);
    const response = await fetch('/api/upload-image', { method: 'POST', headers, body: formData });
    const result = await response.json().catch(() => ({}));
    if (response.ok && result.url) return result.url;
    throw new Error(result.error || 'Image uploads are unavailable.');
  }

  const { signature, expire, token, publicKey, error } = await authResponse.json().catch(() => ({}));
  if (!authResponse.ok || !signature || !token || !expire || !publicKey) {
    throw new Error(error || 'Could not authorize the image upload.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('fileName', `ashiy_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase()}`);
  formData.append('publicKey', publicKey);
  formData.append('signature', signature);
  formData.append('expire', String(expire));
  formData.append('token', token);
  formData.append('folder', folderName.startsWith('/') ? folderName : `/${folderName}`);
  formData.append('useUniqueFileName', 'true');

  const response = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
    method: 'POST',
    body: formData
  });
  const result = await response.json().catch(() => ({}));
  if (response.ok && result.url) return result.url;
  throw new Error(result.message || 'Could not upload the image.');
};

export const imagekitService = {
  getEndpoint() {
    return IMAGEKIT_URL_ENDPOINT;
  },

  resolveUrl(imagePath, options = {}) {
    if (!imagePath) return '';
    return getImageKitUrl(imagePath, options);
  },

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
