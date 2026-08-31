import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured, AUTHORIZED_ADMIN_EMAIL } from '../config/firebase';

const SESSION_AUTH_KEY = 'ashiy_portfolio_session_auth';
export const COOKIE_LAST_ACTIVITY = 'admin_last_activity';
export const COOKIE_SESSION_ACTIVE = 'admin_session_active';
export const INACTIVITY_TIMEOUT_MS = 2 * 60 * 1000;

export const cookieUtils = {
  getCookie(name) {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
    return match ? decodeURIComponent(match[3]) : null;
  },

  setCookie(name, value, maxAgeSeconds = 86400) {
    if (typeof document === 'undefined') return;
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
  },

  deleteCookie(name) {
    if (typeof document === 'undefined') return;
    document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
  },

  recordActivity() {
    this.setCookie(COOKIE_LAST_ACTIVITY, Date.now().toString(), 7200);
    this.setCookie(COOKIE_SESSION_ACTIVE, 'true', 7200);
  },

  isInactive() {
    const lastActive = this.getCookie(COOKIE_LAST_ACTIVITY);
    if (!lastActive) return false;
    const elapsed = Date.now() - parseInt(lastActive, 10);
    return elapsed > INACTIVITY_TIMEOUT_MS;
  },

  clearSessionCookies() {
    this.deleteCookie(COOKIE_LAST_ACTIVITY);
    this.deleteCookie(COOKIE_SESSION_ACTIVE);
  }
};

export const authService = {
  validateAdminEmail(email) {
    if (!email || email.toLowerCase().trim() !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      throw new Error(`Access Denied: Only ${AUTHORIZED_ADMIN_EMAIL} is authorized to access the CMS.`);
    }
    return true;
  },

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

  async login(email, password) {
    this.validateAdminEmail(email);

    if (isFirebaseConfigured && auth) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (userCredential.user && userCredential.user.email?.toLowerCase().trim() !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
          await signOut(auth);
          cookieUtils.clearSessionCookies();
          throw new Error(`Access Denied: Only ${AUTHORIZED_ADMIN_EMAIL} is authorized to access the CMS.`);
        }
        cookieUtils.recordActivity();
        return userCredential.user;
      } catch (err) {
        throw new Error(this.formatAuthError(err));
      }
    } else {
      if (email.toLowerCase().trim() === AUTHORIZED_ADMIN_EMAIL.toLowerCase() && password && password.length >= 6) {
        const mockUser = {
          uid: 'admin-ashinshana-001',
          email: AUTHORIZED_ADMIN_EMAIL,
          displayName: 'Ashiy Ishan (Admin)',
          isDemo: false
        };
        sessionStorage.setItem(SESSION_AUTH_KEY, JSON.stringify(mockUser));
        cookieUtils.recordActivity();
        return mockUser;
      } else {
        throw new Error(`Access Denied: Invalid credentials for ${AUTHORIZED_ADMIN_EMAIL}.`);
      }
    }
  },

  async loginWithGoogle() {
    if (isFirebaseConfigured && auth && googleProvider) {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        if (!user.email || user.email.toLowerCase().trim() !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
          await signOut(auth);
          cookieUtils.clearSessionCookies();
          throw new Error(`Access Denied (${user.email}): Only ${AUTHORIZED_ADMIN_EMAIL} is authorized to access the CMS.`);
        }
        cookieUtils.recordActivity();
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
      cookieUtils.recordActivity();
      return mockUser;
    }
  },

  async logout() {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    }
    sessionStorage.removeItem(SESSION_AUTH_KEY);
    localStorage.removeItem('ashiy_portfolio_mock_auth');
    cookieUtils.clearSessionCookies();
    return true;
  },

  async resetPassword(email) {
    this.validateAdminEmail(email);
    if (isFirebaseConfigured && auth) {
      await sendPasswordResetEmail(auth, email);
      return true;
    } else {
      return true;
    }
  },

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
