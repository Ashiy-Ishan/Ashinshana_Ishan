// src/services/authService.js
import { 
  signInWithEmailAndPassword, 
  signInWithPopup,
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured, AUTHORIZED_ADMIN_EMAIL } from '../config/firebase';

const LOCAL_AUTH_KEY = 'ashiy_portfolio_mock_auth';

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
      return `Invalid password for ${AUTHORIZED_ADMIN_EMAIL}. If you haven't set a password in Firebase Console, please click "Sign in with Google" above.`;
    }
    if (code === 'auth/too-many-requests') {
      return 'Access temporarily blocked due to many failed attempts. Please try again later or use Google Sign-In.';
    }
    if (code === 'auth/popup-closed-by-user') {
      return 'Google Sign-In popup was closed before completing. Please try again.';
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
      if (email.toLowerCase().trim() === AUTHORIZED_ADMIN_EMAIL.toLowerCase() && password.length >= 6) {
        const mockUser = {
          uid: 'admin-ashinshana-001',
          email: AUTHORIZED_ADMIN_EMAIL,
          displayName: 'Ashiy Ishan (Admin)',
          isDemo: false
        };
        localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(mockUser));
        return mockUser;
      } else {
        throw new Error(`Access Denied: Only ${AUTHORIZED_ADMIN_EMAIL} is authorized.`);
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
      // Local Mock Google Sign-In for offline dev
      const mockUser = {
        uid: 'google-admin-ashinshana-001',
        email: AUTHORIZED_ADMIN_EMAIL,
        displayName: 'Ashiy Ishan (Google Admin)',
        photoURL: 'https://lh3.googleusercontent.com/a/default-user'
      };
      localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(mockUser));
      return mockUser;
    }
  },

  // Sign Out
  async logout() {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    }
    localStorage.removeItem(LOCAL_AUTH_KEY);
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
      const localStored = localStorage.getItem(LOCAL_AUTH_KEY);
      if (localStored) {
        try {
          const parsed = JSON.parse(localStored);
          if (parsed.email?.toLowerCase().trim() === AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
            callback(parsed);
          } else {
            localStorage.removeItem(LOCAL_AUTH_KEY);
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
    const localStored = localStorage.getItem(LOCAL_AUTH_KEY);
    if (localStored) {
      const parsed = JSON.parse(localStored);
      if (parsed.email?.toLowerCase().trim() === AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
        return parsed;
      }
    }
    return null;
  }
};
