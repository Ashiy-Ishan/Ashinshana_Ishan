import React from 'react';
import { Mail, ShieldCheck, Heart } from 'lucide-react';
import { Github, Linkedin, Youtube, Instagram, Facebook } from './Icons';
import { usePortfolio } from '../../context/PortfolioContext';

export const Footer = () => {
  const { profile } = usePortfolio();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="footer-name">{profile?.fullName || profile?.name || 'ASHINSHANA ISHAN'}</h3>
            <p className="footer-tagline">{profile?.title || 'Developer • Creator • Builder'}</p>
            <p className="footer-statement">
              "{profile?.statement || 'I build software, create content, and turn ideas into things people can use.'}"
            </p>
          </div>

          <div className="footer-social-section">
            <h4 className="footer-section-title">Connect & Follow</h4>
            <div className="footer-social-links">
              {profile?.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="footer-social-icon"
                >
                  <Github size={20} />
                </a>
              )}
              {profile?.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="footer-social-icon"
                >
                  <Linkedin size={20} />
                </a>
              )}
              {profile?.youtube && (
                <a
                  href={profile.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube Channel"
                  className="footer-social-icon"
                >
                  <Youtube size={20} />
                </a>
              )}
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  aria-label="Email Ashinshana"
                  className="footer-social-icon"
                >
                  <Mail size={20} />
                </a>
              )}
              {profile?.instagram && (
                <a
                  href={profile.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="footer-social-icon"
                >
                  <Instagram size={20} />
                </a>
              )}
              {profile?.facebook && (
                <a
                  href={profile.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Profile"
                  className="footer-social-icon"
                >
                  <Facebook size={20} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} <strong>{profile?.fullName || profile?.name || 'Ashinshana Ishan'}</strong>. All rights reserved.
          </p>
          <p className="footer-motto">
            Built with curiosity <Heart size={14} className="heart-icon" /> & precision.
          </p>
          <a href="#/admin" className="footer-admin-link" title="CMS Admin Portal">
            <ShieldCheck size={14} /> Admin Portal
          </a>
        </div>
      </div>
    </footer>
  );
};
