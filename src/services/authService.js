// src/services/authService.js
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../config/firebase';

const LOCAL_AUTH_KEY = 'ashiy_portfolio_mock_auth';

export const authService = {
  // Sign In
  async login(email, password) {
    if (isFirebaseConfigured && auth) {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } else {
      // Mock / Offline Auth Mode for local testing and demonstration
      if (email && password && password.length >= 6) {
        const mockUser = {
          uid: 'mock-admin-user-001',
          email: email,
          displayName: 'Ashiy Ishan (Demo Admin)',
          isDemo: true
        };
        localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(mockUser));
        return mockUser;
      } else {
        throw new Error('Please enter a valid email and a password of at least 6 characters.');
      }
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
    if (isFirebaseConfigured && auth) {
      await sendPasswordResetEmail(auth, email);
      return true;
    } else {
      return true;
    }
  },

  // Subscribe to Auth State Changes
  subscribe(callback) {
    if (isFirebaseConfigured && auth) {
      return onAuthStateChanged(auth, (user) => {
        callback(user);
      });
    } else {
      const localStored = localStorage.getItem(LOCAL_AUTH_KEY);
      if (localStored) {
        try {
          callback(JSON.parse(localStored));
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
      return auth.currentUser;
    }
    const localStored = localStorage.getItem(LOCAL_AUTH_KEY);
    return localStored ? JSON.parse(localStored) : null;
  }
};
