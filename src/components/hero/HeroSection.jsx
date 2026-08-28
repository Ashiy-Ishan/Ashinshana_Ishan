// src/components/hero/HeroSection.jsx
import React from 'react';
import { 
  Code2, 
  Video, 
  User, 
  Sparkles, 
  Camera, 
  Terminal, 
  Play, 
  ArrowRight, 
  ChevronDown,
  GraduationCap,
  Cpu,
  Film
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const HeroSection = ({ activeRole, setActiveRole }) => {
  const { profile, youtubeChannel } = usePortfolio();

  const roleDetails = {
    personal: {
      tag: 'PERSONAL & UNDERGRADUATE IDENTITY',
      badgeClass: 'badge-split',
      headlinePrefix: "I'M",
      highlight: 'ASHIY ISHAN',
      subtitle: 'Developer • Creator • Builder',
      statement: profile?.statement || 'I build software, create content, and turn ideas into things people can use.',
      primaryBtnText: 'Explore My Journey',
      primaryBtnHref: '#about',
      secondaryBtnText: 'Get In Touch',
      secondaryBtnHref: '#contact',
      accentGlow: 'glow-split',
      techBadge: '⚡ Full-Stack & Multimedia'
    },
    developer: {
      tag: 'SOFTWARE ENGINEERING SIDE',
      badgeClass: 'badge-dev',
      headlinePrefix: "I BUILD",
      highlight: 'ROBUST SOFTWARE',
      subtitle: 'Full-Stack Developer • System Architect • Problem Solver',
      statement: 'Architecting scalable web applications, responsive user interfaces, and reliable backend systems.',
      primaryBtnText: 'View Dev Projects',
      primaryBtnHref: '#projects',
      secondaryBtnText: 'Technical Skills',
      secondaryBtnHref: '#skills',
      accentGlow: 'glow-developer',
      techBadge: '<code /> React • Java • Python • Cloud'
    },
    creator: {
      tag: 'CONTENT & YOUTUBE SIDE',
      badgeClass: 'badge-creator',
      headlinePrefix: "I CREATE",
      highlight: 'TECH CONTENT',
      subtitle: 'YouTuber • Educator • Tech Storyteller',
      statement: 'Producing coding tutorials, developer workflows, tech breakdowns, and creative educational media.',
      primaryBtnText: 'Watch Videos',
      primaryBtnHref: '#videos',
      secondaryBtnText: 'Channel Info',
      secondaryBtnHref: '#creator',
      accentGlow: 'glow-creator',
      techBadge: '🎥 4K Tutorials • Design • Reviews'
    }
  };

  const current = roleDetails[activeRole] || roleDetails.personal;

  // Resolve images dynamically with safe fallbacks
  const personalImg = profile?.heroImagePersonal || profile?.personalImage || profile?.profileImage;
  const developerImg = profile?.heroImageDeveloper || profile?.developerImage || personalImg;
  const creatorImg = profile?.heroImageCreator || profile?.creatorImage || personalImg;

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className={`hero-section ${current.accentGlow}`} aria-label="Hero Introduction">
      {/* Background ambient lighting effects */}
      <div className="hero-ambient-lights">
        <div className={`ambient-orb orb-primary ${activeRole}`} />
        <div className={`ambient-orb orb-secondary ${activeRole}`} />
        <div className="grid-overlay" />
      </div>

      <div className="hero-content-wrapper">
        {/* Left Column: Editorial Typography & Role Selector */}
        <div className="hero-text-col">
          {/* Identity Tag */}
          <div className="hero-identity-tag animate-fade-in">
            <span className={`role-pill ${current.badgeClass}`}>
              <Sparkles size={14} className="sparkle-icon" />
              <span>{current.tag}</span>
            </span>
            <span className="hero-motto-sub">{profile?.motto || 'I BUILD. I CREATE. I SHARE.'}</span>
          </div>

          {/* Main Headline with smooth role text morphing */}
          <div className="hero-headline-wrap">
            <h1 className={`hero-headline role-text-${activeRole}`}>
              <span className="headline-prefix">{current.headlinePrefix} </span>
              <span className="headline-highlight gradient-text">{current.highlight}</span>
            </h1>
          </div>

          {/* Subtitle / Title */}
          <h2 className={`hero-subhead role-text-${activeRole}`}>{current.subtitle}</h2>

          {/* Core Philosophy Statement */}
          <p className={`hero-statement role-text-${activeRole}`}>{current.statement}</p>

          {/* Role Selectors: PERSONAL, DEVELOPER, CREATOR */}
          <div className="role-selector-container">
            <p className="selector-label">EXPLORE IDENTITY SIDES:</p>
            <div className="role-tabs" role="tablist" aria-label="Identity Switcher">
              <button
                type="button"
                role="tab"
                aria-selected={activeRole === 'personal'}
                className={`role-tab-btn tab-personal ${activeRole === 'personal' ? 'active' : ''}`}
                onClick={() => setActiveRole('personal')}
              >
                <User size={18} />
                <span>PERSONAL</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeRole === 'developer'}
                className={`role-tab-btn tab-dev ${activeRole === 'developer' ? 'active' : ''}`}
                onClick={() => setActiveRole('developer')}
              >
                <Code2 size={18} />
                <span>DEVELOPER</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeRole === 'creator'}
                className={`role-tab-btn tab-creator ${activeRole === 'creator' ? 'active' : ''}`}
                onClick={() => setActiveRole('creator')}
              >
                <Video size={18} />
                <span>CREATOR</span>
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="hero-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => scrollTo(current.primaryBtnHref)}
            >
              <span>{current.primaryBtnText}</span>
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => scrollTo(current.secondaryBtnHref)}
            >
              <span>{current.secondaryBtnText}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Clean Floating Role Image (No Outer Enclosing Card) */}
        <div className="hero-visual-col" aria-hidden="true">
          <div className={`portrait-stage role-${activeRole}`}>
            {/* Ambient Backlight Halo */}
            <div className="portrait-halo" />

            {/* 1. Personal / Split Clean Image Layer */}
            <div className={`clean-role-image-wrapper layer-personal ${activeRole === 'personal' ? 'dominant' : 'background'}`}>
              <img
                src={personalImg}
                alt="Ashiy Ishan Personal Identity"
                className="clean-role-portrait"
              />
              <div className="portrait-badge badge-personal">
                <Sparkles size={14} />
                <span>Undergraduate & Creator</span>
              </div>

              {/* Live Role Widget: Personal Academic Radar */}
              {activeRole === 'personal' && (
                <div className="role-live-widget widget-personal animate-pop">
                  <div className="widget-header">
                    <GraduationCap size={16} className="widget-icon" />
                    <span className="widget-title">SUSL Computing</span>
                    <span className="live-dot pulse-blue" />
                  </div>
                  <div className="widget-body">
                    <p className="widget-main-stat">BSc Hons (IS)</p>
                    <p className="widget-sub-stat">Sabaragamuwa University '26</p>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Developer Clean Image Layer */}
            <div className={`clean-role-image-wrapper layer-developer ${activeRole === 'developer' ? 'dominant' : 'background'}`}>
              <img
                src={developerImg}
                alt="Ashiy Ishan Software Developer"
                className="clean-role-portrait"
              />
              <div className="developer-overlay-hud">
                <div className="hud-code-snippet">
                  <Terminal size={14} />
                  <span>const role = 'Builder';</span>
                </div>
              </div>
              <div className="portrait-badge badge-dev">
                <Code2 size={14} />
                <span>Software Developer</span>
              </div>

              {/* Live Role Widget: Developer Telemetry HUD */}
              {activeRole === 'developer' && (
                <div className="role-live-widget widget-dev animate-pop">
                  <div className="widget-header">
                    <Cpu size={16} className="widget-icon" />
                    <span className="widget-title">Engine Telemetry</span>
                    <span className="live-dot pulse-green" />
                  </div>
                  <div className="widget-body">
                    <div className="telemetry-row">
                      <span className="lbl">Status:</span>
                      <span className="val green">99.9% Active</span>
                    </div>
                    <div className="telemetry-row">
                      <span className="lbl">Stack:</span>
                      <span className="val">React • Java • MySQL</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. YouTuber / Creator Clean Image Layer */}
            <div className={`clean-role-image-wrapper layer-creator ${activeRole === 'creator' ? 'dominant' : 'background'}`}>
              <img
                src={creatorImg}
                alt="Ashiy Ishan Tech Creator"
                className="clean-role-portrait"
              />
              <div className="floating-camera-prop" title="Content Creator Camera">
                <div className="camera-housing">
                  <Camera size={26} className="camera-icon" />
                  <div className="camera-rec-light" />
                </div>
                <div className="camera-label">
                  <Play size={10} /> 4K 60FPS
                </div>
              </div>

              <div className="portrait-badge badge-creator">
                <Video size={14} />
                <span>YouTube Creator</span>
              </div>

              {/* Live Role Widget: Creator Channel Stats */}
              {activeRole === 'creator' && (
                <div className="role-live-widget widget-creator animate-pop">
                  <div className="widget-header">
                    <Film size={16} className="widget-icon" />
                    <span className="widget-title">YouTube Studio</span>
                    <span className="live-dot pulse-red" />
                  </div>
                  <div className="widget-body">
                    <div className="telemetry-row">
                      <span className="lbl">Subscribers:</span>
                      <span className="val red">{youtubeChannel?.subscribers || '1.5K+'}</span>
                    </div>
                    <div className="telemetry-row">
                      <span className="lbl">Total Views:</span>
                      <span className="val">{youtubeChannel?.views || '48K+'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick click-to-switch miniature triggers */}
            <div className="stage-switch-triggers">
              <button 
                type="button"
                className={`stage-trigger ${activeRole === 'personal' ? 'active' : ''}`}
                onClick={() => setActiveRole('personal')}
                title="Switch to Personal Mode"
              >
                <User size={14} /> PERSONAL
              </button>
              <button 
                type="button"
                className={`stage-trigger ${activeRole === 'developer' ? 'active' : ''}`}
                onClick={() => setActiveRole('developer')}
                title="Switch to Developer Mode"
              >
                <Code2 size={14} /> DEV
              </button>
              <button 
                type="button"
                className={`stage-trigger ${activeRole === 'creator' ? 'active' : ''}`}
                onClick={() => setActiveRole('creator')}
                title="Switch to Creator Mode"
              >
                <Video size={14} /> CREATOR
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <button 
        type="button" 
        className="scroll-down-cue" 
        onClick={() => scrollTo(current.primaryBtnHref)}
        aria-label="Scroll down to content"
      >
        <span className="scroll-cue-text">DISCOVER MORE</span>
        <ChevronDown size={20} className="scroll-cue-icon" />
      </button>
    </section>
  );
};