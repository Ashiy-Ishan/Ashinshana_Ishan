// src/services/authService.js
import { 
  signInWithEmailAndPassword, 
  signInWithPopup,
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured, AUTHORIZED_ADMIN_EMAIL } from '../config/firebase';

const SESSION_AUTH_KEY = 'ashiy_portfolio_session_auth';

export const authService = {
  // Validate authorized admin email
  validateAdminEmail(email) {
    if (!email || email.toLowerCase().trim() !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      throw new Error(`Access Denied: Only ${AUTHORIZED_ADMIN_EMAIL} is authorized to access the CMS.`);
    }
    return true;
  },

  // Helper to format Firebase error codes cleanly
  formatAuthError(error) {
    const code = error?.code || '';
    if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
      return `Invalid credentials for ${AUTHORIZED_ADMIN_EMAIL}. Please check your password and try again.`;
    }
    if (code === 'auth/too-many-requests') {
      return 'Access temporarily blocked due to many failed attempts. Please try again later.';
    }
    return error.message || 'Authentication failed. Please check your credentials.';
  },

  // Sign In with Email & Password
  async login(email, password) {
    this.validateAdminEmail(email);

    if (isFirebaseConfigured && auth) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (userCredential.user && userCredential.user.email?.toLowerCase().trim() !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
          await signOut(auth);
          throw new Error(`Access Denied: Only ${AUTHORIZED_ADMIN_EMAIL} is authorized to access the CMS.`);
        }
        return userCredential.user;
      } catch (err) {
        throw new Error(this.formatAuthError(err));
      }
    } else {
      // Mock Auth Mode for local offline testing
      if (email.toLowerCase().trim() === AUTHORIZED_ADMIN_EMAIL.toLowerCase() && password && password.length >= 6) {
        const mockUser = {
          uid: 'admin-ashinshana-001',
          email: AUTHORIZED_ADMIN_EMAIL,
          displayName: 'Ashiy Ishan (Admin)',
          isDemo: false
        };
        sessionStorage.setItem(SESSION_AUTH_KEY, JSON.stringify(mockUser));
        return mockUser;
      } else {
        throw new Error(`Access Denied: Invalid credentials for ${AUTHORIZED_ADMIN_EMAIL}.`);
      }
    }
  },

  // Sign In with Google
  async loginWithGoogle() {
    if (isFirebaseConfigured && auth && googleProvider) {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        if (!user.email || user.email.toLowerCase().trim() !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
          await signOut(auth);
          throw new Error(`Access Denied (${user.email}): Only ${AUTHORIZED_ADMIN_EMAIL} is authorized to access the CMS.`);
        }
        return user;
      } catch (err) {
        throw new Error(this.formatAuthError(err));
      }
    } else {
      const mockUser = {
        uid: 'google-admin-ashinshana-001',
        email: AUTHORIZED_ADMIN_EMAIL,
        displayName: 'Ashiy Ishan (Google Admin)'
      };
      sessionStorage.setItem(SESSION_AUTH_KEY, JSON.stringify(mockUser));
      return mockUser;
    }
  },

  // Sign Out
  async logout() {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    }
    sessionStorage.removeItem(SESSION_AUTH_KEY);
    localStorage.removeItem('ashiy_portfolio_mock_auth');
    return true;
  },

  // Send Password Reset
  async resetPassword(email) {
    this.validateAdminEmail(email);
    if (isFirebaseConfigured && auth) {
      await sendPasswordResetEmail(auth, email);
      return true;
    } else {
      return true;
    }
  },

  // Subscribe to Auth State Changes with Admin Email Check
  subscribe(callback) {
    if (isFirebaseConfigured && auth) {
      callback(this.getCurrentUser());
      return onAuthStateChanged(auth, async (user) => {
        if (user) {
          if (user.email?.toLowerCase().trim() === AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
            callback(user);
          } else {
            console.warn(`Unauthorized login attempt by ${user.email}. Signing out.`);
            await signOut(auth);
            callback(null);
          }
        } else {
          callback(null);
        }
      });
    } else {
      const stored = sessionStorage.getItem(SESSION_AUTH_KEY) || localStorage.getItem('ashiy_portfolio_mock_auth');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.email?.toLowerCase().trim() === AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
            callback(parsed);
          } else {
            sessionStorage.removeItem(SESSION_AUTH_KEY);
            localStorage.removeItem('ashiy_portfolio_mock_auth');
            callback(null);
          }
        } catch (e) {
          callback(null);
        }
      } else {
        callback(null);
      }
      return () => {};
    }
  },

  // Check current user
  getCurrentUser() {
    if (isFirebaseConfigured && auth) {
      const user = auth.currentUser;
      if (user && user.email?.toLowerCase().trim() === AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
        return user;
      }
      return null;
    }
    const stored = sessionStorage.getItem(SESSION_AUTH_KEY) || localStorage.getItem('ashiy_portfolio_mock_auth');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.email?.toLowerCase().trim() === AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
          return parsed;
        }
      } catch (e) {
        return null;
      }
    }
    return null;
  }
};
