const ImageKit = require('imagekit');
const requireAdmin = require('../server/requireAdmin');

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Use POST.' });
  }
  if (!(await requireAdmin(req, res))) return;

  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY || process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY;
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT || process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/x2eerczu0';
  if (!privateKey || !publicKey) {
    return res.status(503).json({ error: 'Image uploads are unavailable.' });
  }

  try {
    const imagekit = new ImageKit({ publicKey, privateKey, urlEndpoint });
    const expire = Math.floor(Date.now() / 1000) + 120;
    return res.status(200).json({ ...imagekit.getAuthenticationParameters(undefined, expire), publicKey });
  } catch {
    return res.status(500).json({ error: 'Could not authorize the image upload.' });
  }
};
