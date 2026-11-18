import React from 'react';
import { AboutSection } from '../about/AboutSection';
import { DeveloperSection } from '../developer/DeveloperSection';
import { CreatorSection } from '../creator/CreatorSection';
import { ContactSection } from '../contact/ContactSection';
import { PersonalAchievements } from '../personal/PersonalAchievements';
import { usePortfolio } from '../../context/PortfolioContext';

export const RoleContent = ({ selectedRole }) => {
  const { siteSettings } = usePortfolio();
  return (
    <div className={`role-content-container role-mode-${selectedRole}`}>
      {selectedRole === 'developer' && (
        <DeveloperContent siteSettings={siteSettings} />
      )}

      {selectedRole === 'creator' && (
        <CreatorContent siteSettings={siteSettings} />
      )}

      {selectedRole === 'personal' && (
        <PersonalContent siteSettings={siteSettings} />
      )}
    </div>
  );
};

const DeveloperContent = ({ siteSettings }) => {
  return (
    <div className="role-view developer-role-view">
      {siteSettings?.showDeveloperSection !== false && (
        <DeveloperSection />
      )}

      {siteSettings?.showContactForm !== false && (
        <ContactSection />
      )}
    </div>
  );
};

const CreatorContent = ({ siteSettings }) => {
  return (
    <div className="role-view creator-role-view">
      {siteSettings?.showCreatorSection !== false && (
        <CreatorSection />
      )}

      {siteSettings?.showContactForm !== false && (
        <ContactSection />
      )}
    </div>
  );
};

const PersonalContent = ({ siteSettings }) => {
  return (
    <div className="role-view personal-role-view">
      <AboutSection />
      <PersonalAchievements />

      {siteSettings?.showContactForm !== false && (
        <ContactSection />
      )}
    </div>
  );
};
