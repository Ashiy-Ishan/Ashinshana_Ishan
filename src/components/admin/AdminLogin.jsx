// src/components/admin/AdminLogin.jsx
import React, { useState } from 'react';
import { Lock, Mail, Shield, AlertCircle, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { isFirebaseConfigured } from '../../config/firebase';

export const AdminLogin = ({ onCancel }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
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

  return (
    <div className="admin-login-screen">
      <div className="admin-login-card">
        <div className="login-card-header">
          <div className="admin-shield-icon">
            <Shield size={32} />
          </div>
          <h2 className="login-title">Ashiy Ishan Portfolio CMS</h2>
          <p className="login-subtitle">Authenticate to manage content, media, and settings.</p>
        </div>

        {!isFirebaseConfigured && (
          <div className="demo-auth-alert">
            <Sparkles size={16} />
            <div>
              <strong>Resilient Offline / Demo Mode Active</strong>
              <p>
                Enter any administrator email and password (minimum 6 chars) to access the interactive CMS dashboard.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="form-alert error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-field">
            <label htmlFor="admin-email">Admin Email</label>
            <div className="input-icon-wrap">
              <Mail size={18} className="input-icon" />
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ashiyishan.dev"
                required
                disabled={loading}
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
                disabled={loading}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
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
