// src/components/admin/AdminDashboard.jsx
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  User, 
  Camera,
  Layers, 
  Workflow, 
  Package, 
  Video, 
  Hammer, 
  Image as ImageIcon, 
  Settings, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AdminLogin } from './AdminLogin';
import { AdminOverview } from './AdminOverview';
import { AdminProfile } from './AdminProfile';
import { AdminHeroImages } from './AdminHeroImages';
import { AdminSkills } from './AdminSkills';
import { AdminProjects } from './AdminProjects';
import { AdminPublished } from './AdminPublished';
import { AdminCreator } from './AdminCreator';
import { AdminBuilding } from './AdminBuilding';
import { AdminGallery } from './AdminGallery';
import { AdminSettings } from './AdminSettings';

export const AdminDashboard = ({ onExitAdmin }) => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <AdminLogin onCancel={onExitAdmin} />;
  }

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'hero-images', label: 'Role Portrait Images', icon: <Camera size={18} /> },
    { id: 'profile', label: 'Profile & Identity', icon: <User size={18} /> },
    { id: 'skills', label: 'Developer Skills', icon: <Layers size={18} /> },
    { id: 'projects', label: 'Projects Showcase', icon: <Workflow size={18} /> },
    { id: 'published', label: 'Published Releases', icon: <Package size={18} /> },
    { id: 'creator', label: 'YouTube Studio', icon: <Video size={18} /> },
    { id: 'building', label: 'Currently Building', icon: <Hammer size={18} /> },
    { id: 'gallery', label: 'Media Gallery', icon: <ImageIcon size={18} /> },
    { id: 'settings', label: 'Site & SEO Settings', icon: <Settings size={18} /> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverview onNavigateTab={(tab) => setActiveTab(tab)} />;
      case 'hero-images':
        return <AdminHeroImages />;
      case 'profile':
        return <AdminProfile />;
      case 'skills':
        return <AdminSkills />;
      case 'projects':
        return <AdminProjects />;
      case 'published':
        return <AdminPublished />;
      case 'creator':
        return <AdminCreator />;
      case 'building':
        return <AdminBuilding />;
      case 'gallery':
        return <AdminGallery />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminOverview onNavigateTab={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="admin-root-container">
      {/* Admin Sidebar Navigation */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <div className="admin-brand">
            <ShieldCheck size={24} className="shield-icon" />
            <div>
              <h1 className="admin-brand-title">ASHIY CMS</h1>
              <p className="admin-brand-sub">Portfolio Management</p>
            </div>
          </div>
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="admin-sidebar-nav">
          <ul>
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={`admin-nav-btn ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <span className="user-email">{currentUser?.email || 'admin@ashiyishan.dev'}</span>
            {currentUser?.isDemo && (
              <span className="demo-tag">Demo Mode</span>
            )}
          </div>

          <div className="sidebar-footer-actions">
            <a href="#home" className="btn-sidebar-view" onClick={onExitAdmin}>
              <ExternalLink size={15} />
              <span>Public Site</span>
            </a>
            <button type="button" className="btn-sidebar-logout" onClick={logout} title="Log out">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="admin-sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Admin Main Content Area */}
      <main className="admin-main-viewport">
        {/* Top Header Bar */}
        <header className="admin-top-bar">
          <div className="top-bar-left">
            <button
              type="button"
              className="mobile-sidebar-toggle"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
            <span className="current-tab-crumb">
              {menuItems.find((m) => m.id === activeTab)?.label || 'Dashboard'}
            </span>
          </div>

          <div className="top-bar-right">
            <a href="#home" className="btn-public-preview" onClick={onExitAdmin}>
              <ExternalLink size={14} />
              <span>View Live Portfolio</span>
            </a>
            <button type="button" className="btn-top-logout" onClick={logout}>
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Dynamic Tab Pane */}
        <div className="admin-content-pane-wrapper">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};
