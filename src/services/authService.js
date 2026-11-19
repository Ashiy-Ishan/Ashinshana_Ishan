import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  browserSessionPersistence
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured, AUTHORIZED_ADMIN_EMAIL } from '../config/firebase';

const isVerifiedAdmin = (user) =>
  user?.emailVerified === true &&
  user.email?.toLowerCase() === AUTHORIZED_ADMIN_EMAIL.toLowerCase();
export const COOKIE_LAST_ACTIVITY = 'admin_last_activity';
export const COOKIE_SESSION_ACTIVE = 'admin_session_active';
export const INACTIVITY_TIMEOUT_MS = 2 * 60 * 1000;

export const cookieUtils = {
  getCookie(name) {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
    return match?.[3] || null;
  },

  setCookie(name, value, maxAgeSeconds = 86400) {
    if (typeof document === 'undefined') return;
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax${secure}`;
  },

  deleteCookie(name) {
    if (typeof document === 'undefined') return;
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax${secure}`;
  },

  recordActivity() {
    this.setCookie(COOKIE_LAST_ACTIVITY, Date.now().toString(), 7200);
    this.setCookie(COOKIE_SESSION_ACTIVE, 'true', 7200);
  },

  isInactive() {
    const lastActive = this.getCookie(COOKIE_LAST_ACTIVITY);
    if (!lastActive) return true;
    const elapsed = Date.now() - Number(lastActive);
    return !Number.isFinite(elapsed) || elapsed < 0 || elapsed > INACTIVITY_TIMEOUT_MS;
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
    const normalizedEmail = email.trim();
    this.validateAdminEmail(normalizedEmail);
    if (!isFirebaseConfigured || !auth) {
      throw new Error('Admin authentication is unavailable.');
    }

    try {
      await setPersistence(auth, browserSessionPersistence);
      cookieUtils.recordActivity();
      const { user } = await signInWithEmailAndPassword(auth, normalizedEmail, password);
      return await this.finishLogin(user);
    } catch (error) {
      cookieUtils.clearSessionCookies();
      throw new Error(this.formatAuthError(error));
    }
  },

  async loginWithGoogle() {
    if (!isFirebaseConfigured || !auth || !googleProvider) {
      throw new Error('Admin authentication is unavailable.');
    }

    try {
      await setPersistence(auth, browserSessionPersistence);
      cookieUtils.recordActivity();
      const { user } = await signInWithPopup(auth, googleProvider);
      return await this.finishLogin(user);
    } catch (error) {
      cookieUtils.clearSessionCookies();
      throw new Error(this.formatAuthError(error));
    }
  },

  async finishLogin(user) {
    if (!isVerifiedAdmin(user)) {
      await this.logout();
      throw new Error('Sign in with the verified admin account.');
    }
    cookieUtils.recordActivity();
    return user;
  },

  async logout() {
    cookieUtils.clearSessionCookies();
    if (auth) await signOut(auth);
    return true;
  },

  async resetPassword(email) {
    const normalizedEmail = email.trim();
    this.validateAdminEmail(normalizedEmail);
    if (!isFirebaseConfigured || !auth) {
      throw new Error('Password reset is unavailable.');
    }
    await sendPasswordResetEmail(auth, normalizedEmail);
    return true;
  },

  subscribe(callback) {
    if (auth) {
      return onAuthStateChanged(auth, (user) => callback(isVerifiedAdmin(user) ? user : null));
    }
    callback(null);
    return () => {};
  }
};
