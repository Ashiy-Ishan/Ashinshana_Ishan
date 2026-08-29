// api/upload-image.js
// Vercel Serverless Function for Secure ImageKit Uploads
const ImageKit = require('imagekit');
const Busboy = require('busboy');

// Initialize ImageKit SDK
function getImageKit() {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY || process.env.REACT_APP_IMAGEKIT_PRIVATE_KEY;
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY || process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY || 'public_key';
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT || process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/x2eerczu0';

  if (!privateKey) {
    throw new Error('IMAGEKIT_PRIVATE_KEY is not configured in Vercel Environment Variables.');
  }

  return new ImageKit({
    publicKey,
    privateKey,
    urlEndpoint
  });
}

// Disable default Vercel body parser to allow Busboy stream or JSON parsing
const config = {
  api: {
    bodyParser: false
  }
};

async function handler(req, res) {
  // CORS
  const origin = req.headers.origin;
  res.setHeader('Access-Control-Allow-Origin', origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const imagekit = getImageKit();

    // Parse Multipart Form Data
    const busboy = Busboy({
      headers: req.headers,
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
        files: 1
      }
    });

    let fileBuffer = null;
    let fileMeta = null;
    let folderName = 'portfolio-uploads';
    let fileTooLarge = false;

    await new Promise((resolve, reject) => {
      busboy.on('field', (fieldname, val) => {
        if (fieldname === 'folder' && val) {
          folderName = val.replace(/[^a-zA-Z0-9_-]/g, '_');
        }
      });

      busboy.on('file', (fieldname, fileStream, info) => {
        const { filename, mimeType } = info;

        const allowedMimeTypes = [
          'image/jpeg',
          'image/jpg',
          'image/png',
          'image/webp',
          'image/gif',
          'image/svg+xml'
        ];

        if (mimeType && !allowedMimeTypes.includes(mimeType.toLowerCase()) && !mimeType.startsWith('image/')) {
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
      return res.status(400).json({ error: 'File size exceeds maximum limit of 10MB.' });
    }

    if (!fileBuffer || !fileMeta) {
      return res.status(400).json({ error: 'No image file found in the request payload.' });
    }

    const safeOriginalName = (fileMeta.filename || 'image.png').replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
    const cleanFileName = `ashiy_${Date.now()}_${safeOriginalName}`;

    const uploadResponse = await imagekit.upload({
      file: fileBuffer.toString('base64'),
      fileName: cleanFileName,
      folder: `/${folderName}`,
      useUniqueFileName: true
    });

    if (!uploadResponse || !uploadResponse.url) {
      throw new Error('ImageKit responded without a URL.');
    }

    return res.status(200).json({
      success: true,
      url: uploadResponse.url,
      fileId: uploadResponse.fileId,
      name: uploadResponse.name,
      size: uploadResponse.size,
      folder: folderName,
      thumbnailUrl: uploadResponse.thumbnailUrl || uploadResponse.url
    });

  } catch (error) {
    console.error('ImageKit upload handler error:', error);
    return res.status(500).json({
      error: error.message || 'Internal Server Error during ImageKit file upload.'
    });
  }
}

module.exports = handler;
module.exports.config = config;
