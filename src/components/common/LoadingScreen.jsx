// src/components/common/LoadingScreen.jsx
import React, { useState, useEffect } from 'react';
import { Sparkles, Video, Terminal } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const LoadingScreen = ({ onFinished }) => {
  const { profile, youtubeChannel } = usePortfolio();
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('CONNECTING TO DATABASE...');
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Preload critical Firebase images into browser cache
  useEffect(() => {
    const imagesToPreload = [
      profile?.heroImagePersonal,
      profile?.heroImageDeveloper,
      profile?.heroImageCreator,
      profile?.profileImage,
      profile?.personalImage,
      profile?.developerImage,
      profile?.creatorImage,
      youtubeChannel?.channelImage
    ].filter((src) => typeof src === 'string' && src.trim().length > 0);

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [profile, youtubeChannel]);

  // Guaranteed 4-second loading timer with smooth visual feedback
  useEffect(() => {
    const startTime = Date.now();
    const duration = 4000; // Exact 4 seconds requirement

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct < 25) {
        setStatusText('INITIALIZING SECURE CLOUD CONNECTION...');
      } else if (pct < 55) {
        setStatusText('SYNCING FIREBASE IDENTITY & HERO DATA...');
      } else if (pct < 85) {
        setStatusText('PRELOADING HIGH-RES ROLE IMAGES...');
      } else if (pct < 100) {
        setStatusText('FINALIZING INTERACTIVE STAGE...');
      } else {
        setStatusText('READY • WELCOME');
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        setIsFadingOut(true);
        setTimeout(() => {
          if (onFinished) onFinished();
        }, 600); // 600ms fade transition
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <div 
      className={`app-loading-screen ${isFadingOut ? 'fade-out' : ''}`} 
      aria-label="Loading Application"
      role="status"
    >
      {/* Background ambient lighting */}
      <div className="loader-ambient-halo" />
      <div className="loader-grid-lines" />

      <div className="loader-core-card">
        {/* Animated Brand Monogram Logo */}
        <div className="loader-logo-wrap">
          <div className="loader-logo-ring ring-outer" />
          <div className="loader-logo-ring ring-middle" />
          <div className="loader-logo-box">
            <span className="loader-letter-a">A</span>
          </div>
        </div>

        {/* Brand Typography */}
        <div className="loader-brand-text">
          <h1 className="loader-brand-title">ASHINSHANA ISHAN</h1>
          <p className="loader-brand-subtitle">
            <span className="sub-tag">PERSONAL</span>
            <span className="sub-sep">•</span>
            <span className="sub-tag">DEVELOPER</span>
            <span className="sub-sep">•</span>
            <span className="sub-tag">CREATOR</span>
          </p>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="loader-progress-section">
          <div className="loader-progress-track">
            <div 
              className="loader-progress-fill" 
              style={{ width: `${progress}%` }} 
            />
          </div>
          <div className="loader-status-row">
            <span className="loader-status-msg">{statusText}</span>
            <span className="loader-pct-badge">{progress}%</span>
          </div>
        </div>

        {/* Role Mode Quick Indicators */}
        <div className="loader-roles-pill-row">
          <div className={`loader-role-pill ${progress >= 30 ? 'active' : ''}`}>
            <Sparkles size={13} className="icon-cyan" />
            <span>Personal</span>
          </div>
          <div className={`loader-role-pill ${progress >= 60 ? 'active' : ''}`}>
            <Terminal size={13} className="icon-blue" />
            <span>Developer</span>
          </div>
          <div className={`loader-role-pill ${progress >= 85 ? 'active' : ''}`}>
            <Video size={13} className="icon-pink" />
            <span>Creator</span>
          </div>
        </div>
      </div>
    </div>
  );
};

