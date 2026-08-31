import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const LoadingScreen = ({ onFinished }) => {
  const { profile, youtubeChannel } = usePortfolio();
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

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

  useEffect(() => {
    const startTime = Date.now();
    const duration = 4000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(interval);
        setIsFadingOut(true);
        setTimeout(() => {
          if (onFinished) onFinished();
        }, 500);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <div 
      className={`app-loading-screen ${isFadingOut ? 'fade-out' : ''}`} 
      aria-label="Loading Application"
      role="status"
    >
      <div className="simple-loader-container">
        <div className="simple-loader-text">
          <h2 className="simple-loader-name">ASHINSHANA ISHAN</h2>
        </div>

        <div className="simple-loader-bar-wrap">
          <div className="simple-loader-bar-track">
            <div 
              className="simple-loader-bar-fill" 
              style={{ width: `${progress}%` }} 
            />
          </div>
          <div className="simple-loader-pct">
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

