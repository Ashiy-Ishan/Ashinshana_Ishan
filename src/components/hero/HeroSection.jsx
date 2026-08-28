// src/components/hero/HeroSection.jsx
import React from 'react';
import { 
  Code2, 
  Video, 
  User, 
  Sparkles, 
  Camera, 
  Terminal, 
  ArrowRight, 
  ChevronDown,
  GraduationCap,
  Cpu,
  Film,
  Compass,
  Layers,
  Flame
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
      {/* Background ambient lighting & exactly 3 floating background role pills */}
      <div className="hero-ambient-lights">
        <div className={`ambient-orb orb-primary ${activeRole}`} />
        <div className={`ambient-orb orb-secondary ${activeRole}`} />
        <div className="grid-overlay" />

        {/* 3 Floating Ambient Props for Personal Mode */}
        {activeRole === 'personal' && (
          <div className="ambient-floating-props-layer">
            <div className="role-ambient-pill prop-personal-1 float-slow">
              <GraduationCap size={16} className="pill-icon-blue" />
              <span>SUSL '26 • Computing & IS</span>
              <span className="live-dot pulse-blue" />
            </div>

            <div className="role-ambient-pill prop-personal-2 float-reverse">
              <Sparkles size={15} className="pill-icon-cyan" />
              <span>I BUILD. I CREATE. I SHARE.</span>
            </div>

            <div className="role-ambient-pill prop-personal-3 float-pulse">
              <Compass size={15} className="pill-icon-indigo" />
              <span>Sri Lanka • Digital Builder</span>
            </div>
          </div>
        )}

        {/* 3 Floating Ambient Props for Developer Mode */}
        {activeRole === 'developer' && (
          <div className="ambient-floating-props-layer">
            <div className="role-ambient-pill prop-dev-1 float-slow">
              <Terminal size={15} className="pill-icon-green" />
              <span>const role = 'Builder';</span>
              <span className="live-dot pulse-green" />
            </div>

            <div className="role-ambient-pill prop-dev-2 float-reverse">
              <Cpu size={15} className="pill-icon-cyan" />
              <span>99.9% Active Engine</span>
            </div>

            <div className="role-ambient-pill prop-dev-3 float-pulse">
              <Layers size={15} className="pill-icon-blue" />
              <span>React 19 • Java • Cloud</span>
            </div>
          </div>
        )}

        {/* 3 Floating Ambient Props for Creator Mode */}
        {activeRole === 'creator' && (
          <div className="ambient-floating-props-layer">
            <div className="role-ambient-pill prop-creator-1 float-slow">
              <Camera size={16} className="pill-icon-red" />
              <span className="rec-dot-pulse" />
              <span>▶ 4K 60FPS REC</span>
            </div>

            <div className="role-ambient-pill prop-creator-2 float-reverse">
              <Film size={15} className="pill-icon-pink" />
              <span>YouTube Studio • {youtubeChannel?.subscribers || '1.5K+'} Subs</span>
            </div>

            <div className="role-ambient-pill prop-creator-3 float-pulse">
              <Flame size={15} className="pill-icon-amber" />
              <span>Tutorials & Workflow</span>
            </div>
          </div>
        )}
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

        {/* Right Column: Clean Role Image Stage (No Overlay Props On Top of Image) */}
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
            </div>

            {/* 2. Developer Clean Image Layer */}
            <div className={`clean-role-image-wrapper layer-developer ${activeRole === 'developer' ? 'dominant' : 'background'}`}>
              <img
                src={developerImg}
                alt="Ashiy Ishan Software Developer"
                className="clean-role-portrait"
              />
              <div className="portrait-badge badge-dev">
                <Code2 size={14} />
                <span>Software Developer</span>
              </div>
            </div>

            {/* 3. YouTuber / Creator Clean Image Layer */}
            <div className={`clean-role-image-wrapper layer-creator ${activeRole === 'creator' ? 'dominant' : 'background'}`}>
              <img
                src={creatorImg}
                alt="Ashiy Ishan Tech Creator"
                className="clean-role-portrait"
              />
              <div className="portrait-badge badge-creator">
                <Video size={14} />
                <span>YouTube Creator</span>
              </div>
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