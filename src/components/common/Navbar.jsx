// src/components/common/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Menu, X, Code2, Video, Sparkles, Palette, ChevronDown } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useTheme } from '../../context/ThemeContext';

export const Navbar = ({ activeSection = 'home', activeRole = 'personal', onSelectRole }) => {
  const { profile } = usePortfolio();
  const { theme, changeTheme, themes } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Role-adapted navigation links
  const getNavItems = () => {
    switch (activeRole) {
      case 'developer':
        return [
          { label: 'HOME', href: '#home', id: 'home' },
          { label: 'DEV INTRO', href: '#developer', id: 'developer' },
          { label: 'SKILLS', href: '#skills', id: 'skills' },
          { label: 'PROJECTS', href: '#projects', id: 'projects' },
          { label: 'PUBLISHED', href: '#published', id: 'published' },
          { label: 'CONTACT', href: '#contact', id: 'contact' }
        ];
      case 'creator':
        return [
          { label: 'HOME', href: '#home', id: 'home' },
          { label: 'CREATOR INTRO', href: '#creator', id: 'creator' },
          { label: 'CHANNEL', href: '#creator', id: 'channel' },
          { label: 'VIDEOS', href: '#videos', id: 'videos' },
          { label: 'CONTACT', href: '#contact', id: 'contact' }
        ];
      case 'personal':
      default:
        return [
          { label: 'HOME', href: '#home', id: 'home' },
          { label: 'ABOUT ME', href: '#about', id: 'about' },
          { label: 'CURRENTLY', href: '#currently', id: 'currently' },
          { label: 'ACHIEVEMENTS', href: '#achievements', id: 'achievements' },
          { label: 'CONTACT', href: '#contact', id: 'contact' }
        ];
    }
  };

  const navItems = getNavItems();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeThemeObj = themes.find(t => t.id === theme) || themes[0];

  return (
    <header className={`site-header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        {/* Brand Identity: Single letter 'A' Logo */}
        <div className="brand-header-left">
          <a 
            href="#home" 
            className="brand-logo-a" 
            onClick={(e) => handleNavClick(e, '#home')}
            aria-label="Ashinshana Ishan Home"
          >
            <span className="brand-letter-a">A</span>
          </a>
        </div>

        {/* Desktop Navigation & Theme Selector */}
        <div className="header-right-group">
          <nav className="desktop-nav" aria-label="Main Navigation">
            <ul className="nav-list">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id} className="nav-item">
                    <a
                      href={item.href}
                      className={`nav-link ${isActive ? 'active' : ''}`}
                      onClick={(e) => handleNavClick(e, item.href)}
                    >
                      <span className="nav-text">{item.label}</span>
                      {isActive && <span className="active-indicator" />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Theme Dropdown (Dark Mode / Neo Mode) */}
          <div className="theme-switcher-wrapper">
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              title="Select Theme Mode"
              aria-label="Select Theme Mode"
              aria-expanded={themeDropdownOpen}
            >
              <Palette size={15} className="palette-icon" />
              <span className="theme-btn-label">{activeThemeObj.name}</span>
              <ChevronDown size={14} className={`chevron-icon ${themeDropdownOpen ? 'open' : ''}`} />
            </button>

            {themeDropdownOpen && (
              <div className="theme-dropdown-menu">
                <div className="theme-menu-header">Theme Mode</div>
                {themes.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`theme-option-btn ${theme === t.id ? 'active' : ''}`}
                    onClick={() => {
                      changeTheme(t.id);
                      setThemeDropdownOpen(false);
                    }}
                  >
                    <span className="theme-opt-dot" style={{ background: t.accent }} />
                    <span className="theme-opt-name">{t.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          className="mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close Navigation' : 'Open Navigation'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`} aria-hidden={!mobileMenuOpen}>
        <div className="mobile-drawer-header">
          <div className="mobile-drawer-brand">
            <a 
              href="#home" 
              className="brand-logo-a" 
              onClick={(e) => {
                handleNavClick(e, '#home');
                setMobileMenuOpen(false);
              }}
              aria-label="Ashinshana Ishan Home"
            >
              <span className="brand-letter-a">A</span>
            </a>
            <div className="mobile-drawer-title-wrap">
              <span className="brand-primary">{profile?.name || 'ASHINSHANA'}</span>
              <span className="drawer-subtitle">{profile?.title || 'Developer • Creator • Builder'}</span>
            </div>
          </div>
          <button
            type="button"
            className="mobile-drawer-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Role Quick Switcher in Mobile Nav */}
        <div className="mobile-role-selector">
          <p className="mobile-role-title">IDENTITY MODE:</p>
          <div className="mobile-role-buttons">
            <button
              type="button"
              className={`mobile-role-btn role-btn-personal ${activeRole === 'personal' ? 'active' : ''}`}
              onClick={() => {
                if (onSelectRole) onSelectRole('personal');
                setMobileMenuOpen(false);
              }}
            >
              <Sparkles size={15} />
              <span>Personal</span>
            </button>
            <button
              type="button"
              className={`mobile-role-btn role-btn-dev ${activeRole === 'developer' ? 'active' : ''}`}
              onClick={() => {
                if (onSelectRole) onSelectRole('developer');
                setMobileMenuOpen(false);
              }}
            >
              <Code2 size={15} />
              <span>Developer</span>
            </button>
            <button
              type="button"
              className={`mobile-role-btn role-btn-creator ${activeRole === 'creator' ? 'active' : ''}`}
              onClick={() => {
                if (onSelectRole) onSelectRole('creator');
                setMobileMenuOpen(false);
              }}
            >
              <Video size={15} />
              <span>Creator</span>
            </button>
          </div>
        </div>

        {/* Navigation Section Links */}
        <div className="mobile-nav-section-wrapper">
          <p className="mobile-role-title">NAVIGATION:</p>
          <nav className="mobile-nav-links" aria-label="Mobile Navigation Links">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`mobile-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                <span className="mobile-link-dot" />
                <span className="mobile-link-text">{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Mobile Theme Toggle */}
        <div className="mobile-theme-selector">
          <p className="mobile-role-title">THEME MODE:</p>
          <div className="mobile-theme-row">
            {themes.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`mobile-theme-btn ${theme === t.id ? 'active' : ''}`}
                onClick={() => changeTheme(t.id)}
              >
                <span className="theme-opt-dot" style={{ background: t.accent }} />
                <span>{t.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="mobile-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
};
