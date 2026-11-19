import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import { AuthProvider } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { FloatingRoleSwitch } from './components/common/FloatingRoleSwitch';
import { HeroSection } from './components/hero/HeroSection';
import { RoleContent } from './components/role/RoleContent';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { roleSections } from './data/portfolioNavigation';

const portfolioRoles = Object.keys(roleSections);
const sectionRoles = new Map(
  Object.entries(roleSections).flatMap(([role, sections]) =>
    sections.map(([, id]) => [id, role])
  )
);
const sharedAnchors = new Set(['', '#home', '#portfolio-map', '#contact']);

function roleFromLocation(hash) {
  const id = hash.slice(1);
  const historyRole = window.history.state?.portfolioRole;
  return portfolioRoles.find((role) => id === `view-${role}`) ||
    sectionRoles.get(id) ||
    (portfolioRoles.includes(historyRole) ? historyRole : null);
}

function PortfolioApp() {
  const [hash, setHash] = useState(() => window.location.hash);
  const [activeRole, setActiveRole] = useState(() => roleFromLocation(hash) || 'personal');
  const currentRole = useRef(activeRole);
  const activeSection = hash.slice(1);
  const isAdminView = hash === '#admin' || hash.startsWith('#/admin');

  useEffect(() => {
    const syncLocation = () => {
      const nextHash = window.location.hash;
      currentRole.current = roleFromLocation(nextHash) || currentRole.current;
      if (sharedAnchors.has(nextHash) && window.history.state?.portfolioRole !== currentRole.current) {
        window.history.replaceState({ ...window.history.state, portfolioRole: currentRole.current }, '');
      }
      setActiveRole(currentRole.current);
      setHash(nextHash);
    };

    syncLocation();
    window.addEventListener('hashchange', syncLocation);
    return () => window.removeEventListener('hashchange', syncLocation);
  }, []);

  useEffect(() => {
    if (isAdminView || !hash || hash.startsWith('#view-')) return;
    const id = hash.slice(1);
    const target = document.getElementById(id) ||
      (sectionRoles.has(id) && document.getElementById('role-content'));
    if (!target) return;
    const frame = window.requestAnimationFrame(() => target.scrollIntoView?.());
    return () => window.cancelAnimationFrame(frame);
  }, [hash, isAdminView]);

  const selectRole = (role) => {
    if (role === activeRole) return;
    const nextHash = `#view-${role}`;
    window.history.pushState(null, '', nextHash);
    currentRole.current = role;
    setHash(nextHash);
    setActiveRole(role);
  };

  if (isAdminView) {
    return (
      <AdminDashboard onExitAdmin={() => { window.location.hash = '#home'; }} />
    );
  }

  return (
    <div className="site-wrapper">
      <Navbar />

      <main>
        <HeroSection
          activeRole={activeRole}
          activeSection={activeSection}
          setActiveRole={selectRole}
        />
        <RoleContent selectedRole={activeRole} />
      </main>

      <FloatingRoleSwitch activeRole={activeRole} />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PortfolioProvider>
          <PortfolioApp />
        </PortfolioProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
