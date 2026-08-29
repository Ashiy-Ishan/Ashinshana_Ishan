// src/components/admin/AdminLogin.jsx
import React, { useState } from 'react';
import { Lock, Mail, Shield, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLogin = ({ onCancel }) => {
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || 'Failed to authenticate.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setGoogleLoading(true);

    try {
      await loginWithGoogle();
    } catch (err) {
      setError(err.message || 'Google authentication failed.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="admin-login-screen">
      <div className="admin-login-card">
        <div className="login-card-header">
          <div className="admin-shield-icon">
            <Shield size={32} />
          </div>
          <h2 className="login-title">Ashinshana Ishan CMS</h2>
          <p className="login-subtitle">Portfolio Management & Database Portal</p>
        </div>

        {error && (
          <div className="form-alert error" style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* 1-Click Google Admin Sign In */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="btn btn-google-login"
          disabled={googleLoading || loading}
        >
          {googleLoading ? (
            <>
              <Loader2 size={18} className="spinner-spin" />
              <span>Connecting to Google...</span>
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" className="google-icon-svg">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>Sign In with Google</span>
            </>
          )}
        </button>

        <div className="login-divider">
          <span>or sign in with email</span>
        </div>

        {/* Standard Email & Password Login */}
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-field">
            <label htmlFor="admin-email">Authorized Email Address</label>
            <div className="input-icon-wrap">
              <Mail size={18} className="input-icon" />
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ashinshanaishan@gmail.com"
                required
                disabled={loading || googleLoading}
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="admin-password">Password</label>
            <div className="input-icon-wrap">
              <Lock size={18} className="input-icon" />
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading || googleLoading}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading || googleLoading}>
            {loading ? (
              <>
                <Loader2 size={18} className="spinner-spin" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <span>Enter Admin Dashboard</span>
            )}
          </button>
        </form>

        <div className="login-footer-actions">
          <a href="#home" className="btn-back-portfolio" onClick={onCancel}>
            <ArrowLeft size={16} />
            <span>Return to Public Portfolio</span>
          </a>
        </div>
      </div>
    </div>
  );
};