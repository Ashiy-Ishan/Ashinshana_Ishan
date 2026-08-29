// api/imagekit-auth.js
// Vercel Serverless Function for ImageKit Client-Side Auth Parameters
const ImageKit = require('imagekit');

module.exports = async function handler(req, res) {
  // CORS
  const origin = req.headers.origin;
  res.setHeader('Access-Control-Allow-Origin', origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY || process.env.REACT_APP_IMAGEKIT_PRIVATE_KEY;
    const publicKey = process.env.IMAGEKIT_PUBLIC_KEY || process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY;
    const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT || process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/x2eerczu0';

    if (!privateKey) {
      return res.status(500).json({ error: 'IMAGEKIT_PRIVATE_KEY is missing in Vercel environment variables.' });
    }

    const imagekit = new ImageKit({
      publicKey: publicKey || 'public_key',
      privateKey,
      urlEndpoint
    });

    const authParams = imagekit.getAuthenticationParameters();
    return res.status(200).json({
      ...authParams,
      publicKey: publicKey || imagekit.options.publicKey
    });
  } catch (error) {
    console.error('ImageKit auth error:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate ImageKit authentication parameters.' });
  }
};

