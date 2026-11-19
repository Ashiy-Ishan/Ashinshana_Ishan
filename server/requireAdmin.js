const { getApps, initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

const MAX_AUTH_AGE_SECONDS = 12 * 60 * 60;

module.exports = async function requireAdmin(req, res) {
  const token = /^Bearer (\S+)$/i.exec(req.headers.authorization || '')?.[1];
  if (!token) {
    res.status(401).json({ error: 'Admin sign-in required.' });
    return false;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.REACT_APP_FIREBASE_PROJECT_ID;
  if (!projectId) {
    res.status(503).json({ error: 'Admin verification is unavailable.' });
    return false;
  }

  let claims;
  try {
    const app = getApps()[0] || initializeApp({ projectId });
    claims = await getAuth(app).verifyIdToken(token, process.env.FIREBASE_CHECK_REVOKED === 'true');
  } catch {
    res.status(401).json({ error: 'Admin sign-in required.' });
    return false;
  }

  const adminEmail = process.env.REACT_APP_ADMIN_EMAIL || 'ashinshanaishan@gmail.com';
  if (claims.email_verified !== true || claims.email?.toLowerCase() !== adminEmail.toLowerCase()) {
    res.status(403).json({ error: 'Verified admin account required.' });
    return false;
  }

  const now = Math.floor(Date.now() / 1000);
  if (!Number.isInteger(claims.auth_time) || now - claims.auth_time >= MAX_AUTH_AGE_SECONDS) {
    res.status(401).json({ error: 'Sign in again to continue.' });
    return false;
  }

  return true;
};
