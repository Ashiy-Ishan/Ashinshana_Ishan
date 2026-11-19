import React, { useEffect, useRef, useState } from 'react';
import { Compass } from 'lucide-react';
import { roleSections } from '../../data/portfolioNavigation';

export function FloatingRoleSwitch({ activeRole }) {
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);

  useEffect(() => {
    const hero = document.getElementById('home');
    if (!hero || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(([entry]) => {
      const past = entry.boundingClientRect.bottom <= 0;
      setPastHero(past);
      if (!past) setOpen(false);
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!pastHero) return null;

  return (
    <aside
      className="floating-role-switch"
      aria-label="Portfolio role switcher"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          event.preventDefault();
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <button
        ref={toggle}
        type="button"
        className="floating-role-toggle"
        aria-label="Switch portfolio role"
        aria-expanded={open}
        aria-controls="floating-role-links"
        onClick={() => setOpen(!open)}
      >
        <Compass size={22} aria-hidden="true" />
      </button>
      <nav id="floating-role-links" aria-label="Switch portfolio role" hidden={!open}>
        {Object.entries(roleSections).map(([role, [[, id]]]) => (
          <a
            key={role}
            href={`#${id}`}
            aria-current={role === activeRole ? 'page' : undefined}
            onClick={() => {
              setOpen(false);
              toggle.current?.focus({ preventScroll: true });
            }}
          >
            {role}
          </a>
        ))}
      </nav>
    </aside>
  );
}
