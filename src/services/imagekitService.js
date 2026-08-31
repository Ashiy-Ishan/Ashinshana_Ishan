import { auth } from '../config/firebase';
import { IMAGEKIT_URL_ENDPOINT, getImageKitUrl } from '../config/imagekit';

const UPLOAD_API_URL = process.env.REACT_APP_UPLOAD_API_URL || '/api/upload-image';

export const uploadImageToImageKit = async (file, folderName = 'uploads') => {
  if (!file) {
    throw new Error('No file selected.');
  }

  if (!file.type || !file.type.startsWith('image/')) {
    throw new Error('Invalid file type. Only image files (PNG, JPG, WEBP, GIF, SVG) are allowed.');
  }

  const MAX_SIZE_MB = 10;
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    throw new Error(`File size (${(file.size / (1024 * 1024)).toFixed(2)}MB) exceeds maximum limit of ${MAX_SIZE_MB}MB.`);
  }

  const cleanFileName = `ashiy_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase()}`;
  const targetFolder = folderName.startsWith('/') ? folderName : `/${folderName}`;

  try {
    const authResponse = await fetch('/api/imagekit-auth');
    if (authResponse.ok) {
      const authData = await authResponse.json();
      const { signature, expire, token, publicKey } = authData;

      if (signature && token && expire && publicKey) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', cleanFileName);
        formData.append('publicKey', publicKey);
        formData.append('signature', signature);
        formData.append('expire', String(expire));
        formData.append('token', token);
        formData.append('folder', targetFolder);
        formData.append('useUniqueFileName', 'true');

        const uploadRes = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
          method: 'POST',
          body: formData
        });

        if (uploadRes.ok) {
          const result = await uploadRes.json();
          if (result && result.url) {
            return result.url;
          }
        } else {
          const errRes = await uploadRes.json().catch(() => ({}));
          throw new Error(errRes.message || `ImageKit upload failed with status ${uploadRes.status}`);
        }
      }
    }
  } catch (directUploadErr) {
    if (directUploadErr.message && directUploadErr.message.includes('ImageKit upload failed')) {
      throw directUploadErr;
    }
    console.warn('Direct ImageKit upload via auth params skipped/failed:', directUploadErr.message);
  }

  try {
    let idToken = null;
    if (auth && auth.currentUser) {
      try {
        idToken = await auth.currentUser.getIdToken();
      } catch (tErr) {
        console.warn('Could not fetch idToken:', tErr);
      }
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folderName);

    const headers = {};
    if (idToken) {
      headers['Authorization'] = `Bearer ${idToken}`;
    }

    const response = await fetch(UPLOAD_API_URL, {
      method: 'POST',
      headers,
      body: formData
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.url) {
        return data.url;
      }
    } else if (response.status !== 404) {
      const errorJson = await response.json().catch(() => ({}));
      if (errorJson.error) {
        if (errorJson.error.includes("reading 'length'") || errorJson.error.includes("Cannot read properties")) {
          throw new Error("Serverless API requires redeployment: please push the latest commit to Vercel and ensure IMAGEKIT_PRIVATE_KEY is set in Vercel Settings.");
        }
        throw new Error(errorJson.error);
      }
    }
  } catch (serverErr) {
    if (serverErr.message && !serverErr.message.includes('Failed to fetch')) {
      throw serverErr;
    }
    console.warn('Backend serverless upload skipped:', serverErr.message);
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(file);
  });
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
