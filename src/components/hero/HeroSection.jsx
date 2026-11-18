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

export const HeroSection = ({ activeRole = 'personal', activeSection, setActiveRole, showPortrait = false }) => {
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
      <svg className="hero-orbit-background" viewBox="0 0 1000 780" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <g transform="translate(560 390) scale(1.58 1)">
          <g className="map-orbit-rotation">
            <path className="map-orbit" d="M0 -344 C222 -344 352 -205 348 0 C344 204 210 339 0 342 C-210 345 -352 204 -348 0 C-344 -207 -210 -340 0 -344Z" />
            <ellipse className="map-orbit map-orbit-inner" rx="275" ry="238" transform="rotate(-18)" />
            <circle className="map-anchor-dot" cx="348" cy="0" r="3" />
            <circle className="map-anchor-dot" cx="0" cy="-344" r="3" />
          </g>
        </g>
      </svg>

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
        </div>

        <nav className={`portfolio-map map-${activeRole}`} id="portfolio-map" aria-label="Portfolio map">
          <div className="portfolio-map-canvas">
            <div className="portfolio-map-hub" aria-hidden="true">
              <span className="map-hub-monogram">A</span>
              {showPortrait && portrait && !bundledPortrait.test(portrait) && (
                <RolePortrait
                  key={activeRole}
                  source={portrait}
                  alt=""
                  className="map-portrait"
                  priority
                />
              )}
            </div>
            <div className="map-role-controls" role="group" aria-label="Portfolio views">
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
              <ul className="portfolio-map-branches" aria-label={`${current.label} sections`}>
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
