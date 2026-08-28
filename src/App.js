// src/App.js
import React, { useState, useEffect } from 'react';
import './styles.css';
import { AuthProvider } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/hero/HeroSection';
import { RoleContent } from './components/role/RoleContent';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Inner component with portfolio state & active section tracking
function PortfolioApp() {
  const [activeRole, setActiveRole] = useState('personal'); // Initial default role: 'personal'
  const [activeSection, setActiveSection] = useState('home');
  const [isAdminView, setIsAdminView] = useState(false);

  // Monitor URL Hash for #/admin or section jumps
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/admin') || hash === '#admin') {
        setIsAdminView(true);
      } else {
        setIsAdminView(false);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Active scroll spy observer
  useEffect(() => {
    if (isAdminView || typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const sectionIds = ['home', 'about', 'developer', 'skills', 'projects', 'published', 'creator', 'videos', 'contact'];
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(id);
              }
            });
          },
          { threshold: 0.2, rootMargin: '-10% 0px -40% 0px' }
        );
        observer.observe(el);
        observers.push({ observer, el });
      }
    });

    return () => {
      observers.forEach(({ observer, el }) => observer.unobserve(el));
    };
  }, [isAdminView, activeRole]);

  if (isAdminView) {
    return (
      <AdminDashboard 
        onExitAdmin={() => {
          window.location.hash = '#home';
          setIsAdminView(false);
        }} 
      />
    );
  }

  return (
    <div className="site-wrapper">
      <Navbar 
        activeSection={activeSection} 
        activeRole={activeRole} 
        onSelectRole={setActiveRole} 
      />
      
      <main>
        {/* 1. Cinematic 3-Role Interactive Hero */}
        <HeroSection 
          activeRole={activeRole} 
          setActiveRole={setActiveRole} 
        />

        {/* 2. Dynamic Content Swapper based on selected role */}
        <RoleContent selectedRole={activeRole} />
      </main>

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
