import React, { useLayoutEffect, useRef, useState } from 'react';
import { 
  LayoutDashboard, 
  User, 
  Layers, 
  Workflow, 
  Package, 
  Video, 
  Hammer, 
  Image as ImageIcon, 
  Award,
  Milestone,
  Settings, 
  LogOut, 
  ExternalLink, 
  Menu, 
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AdminLogin } from './AdminLogin';
import { AdminInbox, AdminOverview } from './AdminOverview';
import { AdminProfile } from './AdminProfile';
import { AdminSkills } from './AdminSkills';
import { AdminProjects } from './AdminProjects';
import { AdminPublished } from './AdminPublished';
import { AdminAchievements } from './AdminAchievements';
import { AdminTimeline } from './AdminTimeline';
import { AdminCreator } from './AdminCreator';
import { AdminBuilding } from './AdminBuilding';
import { AdminGallery } from './AdminGallery';
import { AdminSettings } from './AdminSettings';
import { AdminHeroImages } from './AdminHeroImages';

const navigation = [
  { label: 'Workspace', pages: [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, Page: AdminOverview },
    { id: 'messages', label: 'Inbox', icon: Mail, Page: AdminInbox }
  ] },
  { label: 'Personal', pages: [
    { id: 'profile', label: 'Profile', icon: User, Page: AdminProfile },
    { id: 'timeline', label: 'Timeline', icon: Milestone, Page: AdminTimeline },
    { id: 'achievements', label: 'Achievements', icon: Award, Page: AdminAchievements }
  ] },
  { label: 'Work', pages: [
    { id: 'skills', label: 'Skills', icon: Layers, Page: AdminSkills },
    { id: 'projects', label: 'Projects', icon: Workflow, Page: AdminProjects },
    { id: 'published', label: 'Published releases', icon: Package, Page: AdminPublished },
    { id: 'building', label: 'Currently building', icon: Hammer, Page: AdminBuilding }
  ] },
  { label: 'Media', pages: [
    { id: 'hero-images', label: 'Hero images & avatars', icon: ImageIcon, Page: AdminHeroImages },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon, Page: AdminGallery },
    { id: 'creator', label: 'YouTube', icon: Video, Page: AdminCreator }
  ] },
  { label: 'Site', pages: [
    { id: 'settings', label: 'Settings & SEO', icon: Settings, Page: AdminSettings }
  ] }
];

export const AdminDashboard = ({ onExitAdmin }) => {
  const { isAuthenticated, currentUser, loading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [menuOpen, setMenuOpen] = useState(false);
  const workspaceRef = useRef(null);
  const focusWorkspace = useRef(false);

  useLayoutEffect(() => {
    if (!focusWorkspace.current) return;
    focusWorkspace.current = false;
    workspaceRef.current?.focus({ preventScroll: true });
    document.documentElement.scrollTo?.({ top: 0, behavior: 'instant' });
  }, [activeTab, menuOpen]);

  const navigate = (tab) => {
    if (tab === activeTab && !menuOpen) return;
    focusWorkspace.current = true;
    setActiveTab(tab);
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    onExitAdmin?.();
  };

  if (loading) {
    return (
      <div className="admin-login-screen">
        <p role="status">Verifying admin permissions…</p>
      </div>
    );
  }

  if (!isAuthenticated || !currentUser) {
    return <AdminLogin onCancel={onExitAdmin} />;
  }

  const activeGroup = navigation.find(({ pages }) => pages.some(({ id }) => id === activeTab));
  const { Page, label } = activeGroup.pages.find(({ id }) => id === activeTab);

  return (
    <div className="admin-root-container">
      <header className="admin-top-bar">
        <div className="admin-brand">
          <ShieldCheck size={22} className="shield-icon" aria-hidden="true" />
          <div>
            <h1 className="admin-brand-title">Portfolio CMS</h1>
            <p className="user-email" title={currentUser.email}>{currentUser.email}</p>
          </div>
        </div>
        <div className="top-bar-right">
          <a href="#home" className="btn-public-preview" onClick={onExitAdmin}>
            <ExternalLink size={15} aria-hidden="true" />
            <span>Public site</span>
          </a>
          <button type="button" className="btn-top-logout" onClick={handleLogout}>
            <LogOut size={15} aria-hidden="true" />
            <span>Log out</span>
          </button>
        </div>
      </header>

      <aside className="admin-sidebar">
        <button
          type="button"
          className="mobile-sidebar-toggle"
          aria-expanded={menuOpen}
          aria-controls="admin-sections"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={18} aria-hidden="true" />
          <span>Sections</span>
          <span className="admin-mobile-current">{label}</span>
        </button>
        <nav
          id="admin-sections"
          className={`admin-sidebar-nav ${menuOpen ? 'is-open' : ''}`}
          aria-label="Portfolio management"
        >
          {navigation.map(({ label: groupLabel, pages }) => (
            <div className="admin-nav-group" key={groupLabel}>
              <h2>{groupLabel}</h2>
              <ul>
                {pages.map(({ id, label: pageLabel, icon: Icon }) => (
                  <li key={id}>
                    <button
                      type="button"
                      className={`admin-nav-btn ${activeTab === id ? 'active' : ''}`}
                      aria-current={activeTab === id ? 'page' : undefined}
                      onClick={() => navigate(id)}
                    >
                      <Icon size={17} aria-hidden="true" />
                      {pageLabel}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <main className="admin-main-viewport" tabIndex={-1} ref={workspaceRef} aria-label={label}>
        <div className="admin-content-pane-wrapper">
          <Page onNavigateTab={navigate} />
        </div>
      </main>
    </div>
  );
};
