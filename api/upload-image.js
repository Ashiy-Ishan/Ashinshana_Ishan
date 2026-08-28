// api/upload-image.js
// Vercel Serverless Function for Secure ImageKit Uploads
const ImageKit = require('imagekit');
const admin = require('firebase-admin');
const Busboy = require('busboy');

const AUTHORIZED_ADMIN_EMAIL = 'ashinshanaishan@gmail.com';
const ALLOWED_ORIGINS = [
  'https://ashiy-ishan.github.io',
  'https://Ashiy-Ishan.github.io',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

// Initialize Firebase Admin SDK (Singleton)
function getFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Firebase Admin credentials are not configured in environment variables.');
  }

  // Handle escaped newlines in private key
  if (privateKey.includes('\\n')) {
    privateKey = privateKey.replace(/\\n/g, '\n');
  }

  return admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey
    })
  });
}

// Initialize ImageKit SDK (Singleton)
function getImageKit() {
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

  if (!publicKey || !privateKey || !urlEndpoint) {
    throw new Error('ImageKit credentials are not configured in environment variables.');
  }

  return new ImageKit({
    publicKey,
    privateKey,
    urlEndpoint
  });
}

// Disable default Vercel body parser to allow Busboy multipart stream parsing
export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  // 1. Handle CORS
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.some(o => o.toLowerCase() === origin.toLowerCase())) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://Ashiy-Ishan.github.io');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    // 2. Extract and Validate Firebase Authorization Token
    const authHeader = req.headers.authorization || '';
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Missing or invalid Authorization header.' });
    }

    const idToken = authHeader.split('Bearer ')[1].trim();
    getFirebaseAdmin();
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    if (!decodedToken.email || decodedToken.email.toLowerCase().trim() !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      return res.status(403).json({ error: `Forbidden: Access restricted strictly to ${AUTHORIZED_ADMIN_EMAIL}.` });
    }

    // 3. Parse Multipart Form Data using Busboy
    const busboy = Busboy({
      headers: req.headers,
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
        files: 1
      }
    });

    let fileBuffer = null;
    let fileMeta = null;
    let folderName = 'portfolio-uploads';
    let fileTooLarge = false;

    await new Promise((resolve, reject) => {
      busboy.on('field', (fieldname, val) => {
        if (fieldname === 'folder') {
          // Sanitize folder name
          folderName = val.replace(/[^a-zA-Z0-9_-]/g, '_');
        }
      });

      busboy.on('file', (fieldname, fileStream, info) => {
        const { filename, mimeType } = info;

        // Validate MIME type
        const allowedMimeTypes = [
          'image/jpeg',
          'image/png',
          'image/webp',
          'image/gif',
          'image/svg+xml'
        ];

        if (!allowedMimeTypes.includes(mimeType.toLowerCase())) {
          fileStream.resume();
          return reject(new Error('Invalid file type. Only JPEG, PNG, WEBP, GIF, and SVG images are allowed.'));
        }

        const chunks = [];
        fileStream.on('data', (chunk) => chunks.push(chunk));
        fileStream.on('limit', () => {
          fileTooLarge = true;
        });
        fileStream.on('end', () => {
          fileBuffer = Buffer.concat(chunks);
          fileMeta = { filename, mimeType };
        });
      });

      busboy.on('finish', resolve);
      busboy.on('error', reject);

      req.pipe(busboy);
    });

    if (fileTooLarge) {
      return res.status(400).json({ error: 'File size exceeds maximum limit of 5MB.' });
    }

    if (!fileBuffer || !fileMeta) {
      return res.status(400).json({ error: 'No image file found in the request.' });
    }

    // 4. Upload to ImageKit
    const imagekit = getImageKit();
    const cleanFileName = `ashiy_${Date.now()}_${fileMeta.filename.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase()}`;

    const uploadResponse = await imagekit.upload({
      file: fileBuffer,
      fileName: cleanFileName,
      folder: `/${folderName}`,
      useUniqueFileName: true
    });

    // 5. Return upload details
    return res.status(200).json({
      success: true,
      url: uploadResponse.url,
      fileId: uploadResponse.fileId,
      name: uploadResponse.name,
      size: uploadResponse.size,
      folder: folderName
    });

  } catch (error) {
    console.error('Image upload error:', error);
    const statusCode = error.message.includes('Invalid file type') ? 400 : 500;
    return res.status(statusCode).json({
      error: error.message || 'Internal Server Error during file upload.'
    });
  }
}

