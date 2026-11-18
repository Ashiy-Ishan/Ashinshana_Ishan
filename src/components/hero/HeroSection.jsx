import React from 'react';
import { ArrowRight, Code2, User, Video } from 'lucide-react';
import { RolePortrait } from '../common/RolePortrait';
import { usePortfolio } from '../../context/PortfolioContext';
import { roleSections } from '../../data/portfolioNavigation';

const roles = {
  personal: {
    label: 'Personal',
    icon: User,
    headlinePrefix: "I'm",
    highlight: 'Ashinshana',
    subtitle: 'Developer · Creator · Builder',
    statement: 'I build software, create content, and turn ideas into things people can use.',
    links: [['Explore my journey', '#about'], ['Get in touch', '#contact']],
    imageField: 'heroImagePersonal'
  },
  developer: {
    label: 'Developer',
    icon: Code2,
    headlinePrefix: 'I build',
    highlight: 'robust software',
    subtitle: 'Full-stack developer · System architect · Problem solver',
    statement: 'I design scalable web applications, responsive interfaces, and reliable backend systems.',
    links: [['View projects', '#projects'], ['Explore technical skills', '#skills']],
    imageField: 'heroImageDeveloper'
  },
  creator: {
    label: 'Creator',
    icon: Video,
    headlinePrefix: 'I create',
    highlight: 'tech content',
    subtitle: 'YouTuber · Educator · Tech storyteller',
    statement: 'I produce coding tutorials, project walkthroughs, and educational videos.',
    links: [['Watch videos', '#videos'], ['Channel info', '#creator']],
    imageField: 'heroImageCreator'
  }
};

const bundledPortrait = /^\/?static\/media\/(person|developer|youtuber)\.[\da-f]+\.png$/i;

export const HeroSection = ({ activeRole = 'personal', activeSection, setActiveRole }) => {
  const { profile, siteSettings, publishedProjects } = usePortfolio();
  const current = roles[activeRole] || roles.personal;
  const source = profile?.[current.imageField];
  const portrait = typeof source === 'string' ? source.trim() : '';
  const showRoleContent = (activeRole !== 'developer' || siteSettings?.showDeveloperSection !== false) &&
    (activeRole !== 'creator' || siteSettings?.showCreatorSection !== false);
  const showContact = siteSettings?.showContactForm !== false;
  const links = showRoleContent ? current.links.filter(([, href]) => href !== '#contact' || showContact) : [];
  const actions = links.length || !showContact ? links : [['Get in touch', '#contact']];
  const sections = showRoleContent
    ? (roleSections[activeRole] || roleSections.personal).filter(([, id]) => id !== 'published' || publishedProjects?.length)
    : [];

  return (
    <section id="home" className={`hero-section hero-${activeRole}`} aria-label="Introduction">
      <div className="hero-content-wrapper hero-network-layout">
        <div className="hero-text-col">
          {activeRole === 'personal' && profile?.motto && (
            <p className="hero-motto-sub">{profile.motto}</p>
          )}
          <h1 className="hero-headline">
            <span className="headline-prefix">{current.headlinePrefix} </span>
            <span className="headline-highlight" key={activeRole}>{current.highlight}</span>
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
          {portrait && !bundledPortrait.test(portrait) && (
            <RolePortrait
              source={portrait}
              alt=""
              className="hero-visual-col"
              imageClassName="hero-portrait"
              priority
            />
          )}
        </div>

        <nav className={`portfolio-map map-${activeRole}`} id="portfolio-map" aria-labelledby="portfolio-map-title">
          <h2 id="portfolio-map-title">Portfolio map</h2>
          <div className="portfolio-map-canvas">
            <svg
              className="portfolio-map-lines"
              viewBox="0 0 400 240"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              <g transform="translate(200 120) scale(1.58 1)">
                <g className="map-orbit-rotation">
                  <path className="map-orbit" d="M0 -104 C62 -104 108 -60 106 0 C105 61 58 101 0 103 C-60 104 -108 60 -106 0 C-105 -63 -57 -102 0 -104Z" />
                  <ellipse className="map-orbit map-orbit-inner" rx="84" ry="76" transform="rotate(-18)" />
                  <circle className="map-anchor-dot" cx="106" cy="0" r="2.5" />
                  <circle className="map-anchor-dot" cx="0" cy="-104" r="2.5" />
                </g>
              </g>
              <path className="map-connector map-personal-line" d="M200 120 C200 92 226 75 200 40" />
              <path className="map-connector map-developer-line" d="M200 120 C158 113 165 174 107 174" />
              <path className="map-connector map-creator-line" d="M200 120 C242 113 235 174 293 174" />
            </svg>
            <span className="portfolio-map-hub" aria-hidden="true">A</span>
            <div role="group" aria-label="Portfolio views">
              {Object.entries(roles).map(([id, { icon: Icon, label }]) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={activeRole === id}
                  className={`map-node map-node-${id}`}
                  onClick={() => setActiveRole(id)}
                >
                  <Icon size={17} aria-hidden="true" />
                  {label}
                </button>
              ))}
            </div>
          </div>
          {sections.length > 0 && (
            <div className="portfolio-map-branch">
              <h3 id="portfolio-map-branch-title">{current.label} sections</h3>
              <ul className="portfolio-map-branches" aria-labelledby="portfolio-map-branch-title">
                {sections.map(([label, id]) => (
                  <li key={id}>
                    <a href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined}>
                      {label} <ArrowRight size={13} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      </div>
    </section>
  );
};
