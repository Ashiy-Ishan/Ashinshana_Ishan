const { readFileSync, writeFileSync } = require('node:fs');
const { createRequire } = require('node:module');
const { dirname, join } = require('node:path');

const fromFirebase = createRequire(require.resolve('firebase-admin/auth'));
const root = dirname(fromFirebase.resolve('jwks-rsa'));
const syncImport = "const jose = require('jose');\n";

// Preserve jose v6 while Vercel cannot synchronously require it.
function patch(relativePath, start, replacement) {
  const path = join(root, relativePath);
  const source = readFileSync(path, 'utf8');
  if (!source.includes(syncImport)) return;

  if (!source.includes(start)) {
    throw new Error(`Could not apply the jwks-rsa ESM patch to ${relativePath}.`);
  }

  writeFileSync(path, source.replace(syncImport, '').replace(start, replacement));
}

const signingKeys = 'async function retrieveSigningKeys(jwks) {';
patch('utils.js', signingKeys, `${signingKeys}\n  const jose = await import('jose');`);

const passportProvider = 'return function secretProvider(req, rawJwtToken, cb) {\n    let decoded;\n    try {';
const asyncPassportProvider = passportProvider.replace('return function', 'return async function');
patch('integrations/passport.js', passportProvider, `${asyncPassportProvider}\n      const jose = await import('jose');`);
