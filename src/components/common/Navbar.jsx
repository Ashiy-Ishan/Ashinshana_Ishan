// src/components/common/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Menu, X, Code2, Video, User, Sparkles, Palette, ChevronDown } from 'lucide-react';
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

  // Role-adapted navigation links with exact requested Personal navigation order
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

  const getRoleBadge = () => {
    switch (activeRole) {
      case 'developer':
        return { label: 'DEV MODE', icon: <Code2 size={13} />, color: 'badge-dev' };
      case 'creator':
        return { label: 'CREATOR MODE', icon: <Video size={13} />, color: 'badge-creator' };
      default:
        return { label: 'PERSONAL MODE', icon: <Sparkles size={13} />, color: 'badge-split' };
    }
  };

  const currentBadge = getRoleBadge();
  const activeThemeObj = themes.find(t => t.id === theme) || themes[0];

  return (
    <header className={`site-header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        {/* Brand identity */}
        <div className="brand-header-left">
          <a 
            href="#home" 
            className="brand-logo" 
            onClick={(e) => handleNavClick(e, '#home')}
            aria-label="Ashiy Ishan Home"
          >
            <span className="brand-primary">{profile?.name || 'ASHIY ISHAN'}</span>
            <span className={`brand-role-pill ${currentBadge.color}`}>
              {currentBadge.icon}
              <span>{currentBadge.label}</span>
            </span>
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
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Theme Dropdown */}
          <div className="theme-switcher-wrapper">
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              title="Select Theme Mode"
            >
              <Palette size={15} className="palette-icon" />
              <span className="theme-icon-symbol">{activeThemeObj.icon}</span>
              <span className="theme-btn-label">{activeThemeObj.name}</span>
              <ChevronDown size={14} className={`chevron-icon ${themeDropdownOpen ? 'open' : ''}`} />
            </button>

            {themeDropdownOpen && (
              <div className="theme-dropdown-menu">
                <div className="theme-menu-header">Select Theme Palette</div>
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
                    <span className="theme-opt-icon">{t.icon}</span>
                    <span className="theme-opt-name">{t.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <span className="brand-primary">{profile?.name || 'ASHIY ISHAN'}</span>
          <span className="drawer-subtitle">{profile?.title || 'Developer • Creator • Builder'}</span>
        </div>

        {/* Role Quick Switcher in Mobile Nav */}
        <div className="mobile-role-selector">
          <p className="mobile-role-title">Select Role Mode:</p>
          <div className="mobile-role-buttons">
            <button
              type="button"
              className={`mobile-role-btn ${activeRole === 'personal' ? 'active' : ''}`}
              onClick={() => {
                if (onSelectRole) onSelectRole('personal');
                setMobileMenuOpen(false);
              }}
            >
              <User size={16} /> Personal
            </button>
            <button
              type="button"
              className={`mobile-role-btn ${activeRole === 'developer' ? 'active' : ''}`}
              onClick={() => {
                if (onSelectRole) onSelectRole('developer');
                setMobileMenuOpen(false);
              }}
            >
              <Code2 size={16} /> Dev
            </button>
            <button
              type="button"
              className={`mobile-role-btn ${activeRole === 'creator' ? 'active' : ''}`}
              onClick={() => {
                if (onSelectRole) onSelectRole('creator');
                setMobileMenuOpen(false);
              }}
            >
              <Video size={16} /> Creator
            </button>
          </div>
        </div>

        {/* Mobile Theme Selector */}
        <div className="mobile-theme-selector">
          <p className="mobile-role-title">Theme Palette:</p>
          <div className="mobile-theme-buttons">
            {themes.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`mobile-theme-btn ${theme === t.id ? 'active' : ''}`}
                onClick={() => {
                  changeTheme(t.id);
                  setMobileMenuOpen(false);
                }}
              >
                <span>{t.icon}</span> {t.name}
              </button>
            ))}
          </div>
        </div>

        <ul className="mobile-nav-list">
          {navItems.map((item) => (
            <li key={item.id} className="mobile-nav-item">
              <a
                href={item.href}
                className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {mobileMenuOpen && (
        <div className="mobile-nav-backdrop" onClick={() => setMobileMenuOpen(false)} />
      )}
    </header>
  );
};
