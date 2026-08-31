import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService, cookieUtils } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inactivityNotice, setInactivityNotice] = useState(false);

  const updateActivityCookie = useCallback(() => {
    cookieUtils.recordActivity();
  }, []);

  useEffect(() => {
    const unsubscribe = authService.subscribe((user) => {
      if (user) {
        if (cookieUtils.isInactive()) {
          authService.logout();
          setCurrentUser(null);
          setInactivityNotice(true);
          setLoading(false);
          return;
        }
        updateActivityCookie();
      } else {
        cookieUtils.clearSessionCookies();
      }
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [updateActivityCookie]);

  useEffect(() => {
    if (!currentUser) return;

    updateActivityCookie();
    let lastThrottledTime = Date.now();

    const onUserAction = () => {
      const now = Date.now();
      if (now - lastThrottledTime > 2000) {
        lastThrottledTime = now;
        updateActivityCookie();
      }
    };

    const trackedEvents = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'click', 'wheel'];
    trackedEvents.forEach((evt) => {
      window.addEventListener(evt, onUserAction, { passive: true });
    });

    const inactivityInterval = setInterval(() => {
      if (cookieUtils.isInactive()) {
        authService.logout();
        setCurrentUser(null);
        setInactivityNotice(true);
      }
    }, 2000);

    return () => {
      trackedEvents.forEach((evt) => {
        window.removeEventListener(evt, onUserAction);
      });
      clearInterval(inactivityInterval);
    };
  }, [currentUser, updateActivityCookie]);

  const login = async (email, password) => {
    setInactivityNotice(false);
    const user = await authService.login(email, password);
    setCurrentUser(user);
    updateActivityCookie();
    return user;
  };

  const loginWithGoogle = async () => {
    setInactivityNotice(false);
    const user = await authService.loginWithGoogle();
    setCurrentUser(user);
    updateActivityCookie();
    return user;
  };

  const logout = async () => {
    await authService.logout();
    setCurrentUser(null);
    setInactivityNotice(false);
  };

  const clearInactivityNotice = () => {
    setInactivityNotice(false);
  };

  const value = {
    currentUser,
    isAuthenticated: Boolean(currentUser),
    login,
    loginWithGoogle,
    logout,
    loading,
    inactivityNotice,
    clearInactivityNotice
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
