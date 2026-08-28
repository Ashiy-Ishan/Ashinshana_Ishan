// src/components/role/RoleContent.jsx
import React, { useState, useEffect } from 'react';
import { AboutSection } from '../about/AboutSection';
import { DeveloperSection } from '../developer/DeveloperSection';
import { CreatorSection } from '../creator/CreatorSection';
import { ContactSection } from '../contact/ContactSection';
import { PersonalAchievements } from '../personal/PersonalAchievements';
import { usePortfolio } from '../../context/PortfolioContext';

export const RoleContent = ({ selectedRole }) => {
  const { siteSettings } = usePortfolio();
  const [displayRole, setDisplayRole] = useState(selectedRole);
  const [transitionState, setTransitionState] = useState('active'); // Start active immediately to prevent lag

  useEffect(() => {
    if (selectedRole !== displayRole) {
      setTransitionState('exiting');
      const timer = setTimeout(() => {
        setDisplayRole(selectedRole);
        setTransitionState('entering');
        const enterTimer = setTimeout(() => {
          setTransitionState('active');
        }, 50);
        return () => clearTimeout(enterTimer);
      }, 300); // 300ms fade-out transition duration

      return () => clearTimeout(timer);
    }
  }, [selectedRole, displayRole]);

  return (
    <div className={`role-content-container role-mode-${displayRole} transition-${transitionState}`}>
      {displayRole === 'developer' && (
        <DeveloperContent siteSettings={siteSettings} />
      )}

      {displayRole === 'creator' && (
        <CreatorContent siteSettings={siteSettings} />
      )}

      {displayRole === 'personal' && (
        <PersonalContent siteSettings={siteSettings} />
      )}
    </div>
  );
};

// 1. Developer-Only View
const DeveloperContent = ({ siteSettings }) => {
  return (
    <div className="role-view developer-role-view">
      {siteSettings?.showDeveloperSection !== false && (
        <DeveloperSection />
      )}

      {/* Developer-Specific Contact */}
      {siteSettings?.showContactForm !== false && (
        <ContactSection />
      )}
    </div>
  );
};

// 2. Creator / YouTuber-Only View
const CreatorContent = ({ siteSettings }) => {
  return (
    <div className="role-view creator-role-view">
      {siteSettings?.showCreatorSection !== false && (
        <CreatorSection />
      )}

      {/* Creator-Specific Contact */}
      {siteSettings?.showContactForm !== false && (
        <ContactSection />
      )}
    </div>
  );
};

// 3. Personal / About-Only View
const PersonalContent = ({ siteSettings }) => {
  return (
    <div className="role-view personal-role-view">
      <AboutSection />

      {/* Batch Certificates & Achievements Section */}
      <PersonalAchievements />

      {/* Personal Contact & Connections */}
      {siteSettings?.showContactForm !== false && (
        <ContactSection />
      )}
    </div>
  );
};
