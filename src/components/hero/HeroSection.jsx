import React, { useState } from 'react';
import { ArrowRight, Code2, User, Video } from 'lucide-react';
import { getImageKitUrl } from '../../config/imagekit';
import { usePortfolio } from '../../context/PortfolioContext';

const roles = {
  personal: {
    label: 'Personal',
    icon: User,
    headlinePrefix: "I'm",
    highlight: 'Ashinshana',
    subtitle: 'Developer · Creator · Builder',
    statement: 'I build software, create content, and turn ideas into things people can use.',
    links: [['Explore my journey', '#about'], ['Get in touch', '#contact']],
    imageField: 'heroImagePersonal',
    buttonClass: 'tab-personal'
  },
  developer: {
    label: 'Developer',
    icon: Code2,
    headlinePrefix: 'I build',
    highlight: 'robust software',
    subtitle: 'Full-stack developer · System architect · Problem solver',
    statement: 'I design scalable web applications, responsive interfaces, and reliable backend systems.',
    links: [['View projects', '#projects'], ['Explore technical skills', '#skills']],
    imageField: 'heroImageDeveloper',
    buttonClass: 'tab-dev'
  },
  creator: {
    label: 'Creator',
    icon: Video,
    headlinePrefix: 'I create',
    highlight: 'tech content',
    subtitle: 'YouTuber · Educator · Tech storyteller',
    statement: 'I produce coding tutorials, project walkthroughs, and educational videos.',
    links: [['Watch videos', '#videos'], ['Channel info', '#creator']],
    imageField: 'heroImageCreator',
    buttonClass: 'tab-creator'
  }
};

const getPortraitUrl = (value) => {
  if (typeof value !== 'string' || !value.trim()) return '';

  const image = value.trim();
  if (/^\/?static\/media\/(person|developer|youtuber)\.[\da-f]+\.png$/i.test(image)) return '';
  if (image.startsWith('/static/')) return image;
  if (/^(https?:\/\/|\/\/|data:image\/|blob:)/i.test(image)) return image;
  return getImageKitUrl(image);
};

export const HeroSection = ({ activeRole, setActiveRole }) => {
  const { profile, siteSettings } = usePortfolio();
  const [failedPortraits, setFailedPortraits] = useState(() => new Set());
  const current = roles[activeRole] || roles.personal;
  const portrait = getPortraitUrl(profile?.[current.imageField]);
  const showPortrait = portrait && !failedPortraits.has(portrait);
  const showRoleContent = (activeRole !== 'developer' || siteSettings?.showDeveloperSection !== false) &&
    (activeRole !== 'creator' || siteSettings?.showCreatorSection !== false);
  const showContact = siteSettings?.showContactForm !== false;
  const links = showRoleContent ? current.links.filter(([, href]) => href !== '#contact' || showContact) : [];
  const actions = links.length || !showContact ? links : [['Get in touch', '#contact']];

  return (
    <section id="home" className={`hero-section hero-${activeRole}`} aria-label="Introduction">
      <div className={`hero-content-wrapper${showPortrait ? '' : ' hero-text-only'}`}>
        <div className="hero-text-col">
          <div className="role-selector-container">
            <div className="role-tabs" role="group" aria-label="Portfolio view">
              {Object.entries(roles).map(([id, role]) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={activeRole === id}
                  className={`role-tab-btn ${role.buttonClass}${activeRole === id ? ' active' : ''}`}
                  onClick={() => setActiveRole(id)}
                >
                  <role.icon size={16} aria-hidden="true" />
                  <span>{role.label}</span>
                </button>
              ))}
            </div>
          </div>

          {activeRole === 'personal' && profile?.motto && (
            <p className="hero-motto-sub">{profile.motto}</p>
          )}
          <h1 className="hero-headline">
            <span className="headline-prefix">{current.headlinePrefix} </span>
            <span className="headline-highlight">{current.highlight}</span>
          </h1>
          <p className="hero-subhead">{current.subtitle}</p>
          <p className="hero-statement">
            {(activeRole === 'personal' && profile?.statement) || current.statement}
          </p>

          {actions.length > 0 && (
            <div className="hero-actions">
              {actions.map(([label, href], index) => (
                <a key={href} href={href} className={`btn ${index === 0 ? 'btn-primary' : 'btn-secondary'}`}>
                  {label}
                  {index === 0 && <ArrowRight size={17} aria-hidden="true" />}
                </a>
              ))}
            </div>
          )}
        </div>

        {showPortrait && (
          <div className="hero-visual-col">
            <img
              key={portrait}
              src={portrait}
              alt=""
              className="hero-portrait"
              fetchPriority="high"
              onError={() => setFailedPortraits((previous) => new Set(previous).add(portrait))}
            />
          </div>
        )}
      </div>
    </section>
  );
};
