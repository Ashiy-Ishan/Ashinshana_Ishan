// src/components/creator/CreatorSection.jsx
import React, { useState } from 'react';
import { 
  Play, 
  Users, 
  Eye, 
  Video, 
  ExternalLink, 
  Clock, 
  Calendar, 
  Sparkles, 
  Flame, 
  Film,
  X
} from 'lucide-react';
import { Youtube } from '../common/Icons';
import { usePortfolio } from '../../context/PortfolioContext';

export const CreatorSection = () => {
  const { youtubeChannel, youtubeVideos } = usePortfolio();
  const [activeTab, setActiveTab] = useState('ALL');
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  const channel = youtubeChannel || {};
  const videos = youtubeVideos || [];

  const filterTabs = ['ALL', 'FEATURED', 'POPULAR', 'LATEST'];

  const filteredVideos = videos.filter((video) => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'FEATURED') return video.featured;
    if (activeTab === 'POPULAR') return video.category === 'Popular' || video.featured;
    if (activeTab === 'LATEST') return video.category === 'Latest' || !video.featured;
    return true;
  });

  return (
    <section id="creator" className="section-container creator-section" aria-label="Creator and YouTube Showcase">
      {/* Section Header */}
      <div className="section-heading-wrap">
        <div className="section-pill-tag tag-creator">
          <Youtube size={14} />
          <span>CONTENT CREATION & MEDIA</span>
        </div>
        <h2 className="section-title">
          YOUTUBE <span className="title-gradient creator-gradient">& TECH CREATOR</span>
        </h2>
        <p className="section-subtext">
          Demystifying technology, sharing developer workflows, and producing high-definition tutorials for builders worldwide.
        </p>
      </div>

      {/* YouTube Channel Banner / Hub Card */}
      <div className="channel-hub-card">
        <div className="channel-hub-left">
          <div className="channel-avatar-wrapper">
            <img
              src={channel.channelImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80'}
              alt={channel.channelName || 'Ashiy Ishan YouTube Channel'}
              className="channel-avatar"
            />
            <div className="channel-verified-badge" title="Official Tech Channel">
              <Youtube size={14} />
            </div>
          </div>

          <div className="channel-meta-info">
            <div className="channel-title-row">
              <h3 className="channel-name">{channel.channelName || 'Ashiy Ishan'}</h3>
              <span className="channel-handle">{channel.handle || '@AshiyIshan'}</span>
            </div>
            <p className="channel-bio">
              {channel.description || 'Coding tutorials, full-stack architecture, and tech exploration.'}
            </p>
          </div>
        </div>

        {/* Channel Metrics Dashboard */}
        <div className="channel-metrics-grid">
          <div className="metric-box">
            <div className="metric-icon-wrap subscribers">
              <Users size={18} />
            </div>
            <div className="metric-data">
              <span className="metric-num">{channel.subscribers || '1.5K+'}</span>
              <span className="metric-lbl">Subscribers</span>
            </div>
          </div>

          <div className="metric-box">
            <div className="metric-icon-wrap views">
              <Eye size={18} />
            </div>
            <div className="metric-data">
              <span className="metric-num">{channel.views || '48K+'}</span>
              <span className="metric-lbl">Total Views</span>
            </div>
          </div>

          <div className="metric-box">
            <div className="metric-icon-wrap videos">
              <Film size={18} />
            </div>
            <div className="metric-data">
              <span className="metric-num">{channel.videos || '25+'}</span>
              <span className="metric-lbl">Uploaded Videos</span>
            </div>
          </div>
        </div>

        {/* Subscribe CTA Button */}
        <div className="channel-action-box">
          <a
            href={channel.channelUrl || 'https://www.youtube.com/@AshiyIshan'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-youtube"
          >
            <Youtube size={20} />
            <span>Visit YouTube Channel</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* Videos Section */}
      <div className="creator-videos-area" id="videos">
        <div className="videos-filter-bar">
          <div className="filter-title-wrap">
            <Video size={20} className="filter-icon creator-icon" />
            <h3 className="filter-title">CURATED VIDEO PLAYLISTS</h3>
          </div>

          <div className="video-tab-buttons" role="tablist">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                className={`video-tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'FEATURED' && <Sparkles size={13} />}
                {tab === 'POPULAR' && <Flame size={13} />}
                <span>{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="videos-cards-grid">
          {filteredVideos.map((video) => (
            <article key={video.id || video.title} className="video-card">
              {/* Thumbnail Container */}
              <div 
                className="video-thumbnail-container"
                onClick={() => setActiveVideoModal(video)}
              >
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="video-thumb-img"
                  loading="lazy"
                />
                <div className="video-play-overlay">
                  <div className="play-button-circle">
                    <Play size={22} className="play-triangle" fill="white" />
                  </div>
                </div>

                {/* Duration Badge */}
                {video.duration && (
                  <span className="video-duration-pill">
                    <Clock size={11} /> {video.duration}
                  </span>
                )}

                {/* Featured Badge */}
                {video.featured && (
                  <span className="video-featured-pill">
                    <Sparkles size={11} /> Featured
                  </span>
                )}
              </div>

              {/* Video Info */}
              <div className="video-info-box">
                <h4 
                  className="video-headline" 
                  onClick={() => setActiveVideoModal(video)}
                  title={video.title}
                >
                  {video.title}
                </h4>

                <p className="video-description">{video.description}</p>

                <div className="video-meta-footer">
                  <div className="meta-left">
                    {video.views && (
                      <span className="meta-stat">
                        <Eye size={13} /> {video.views} views
                      </span>
                    )}
                    {video.publishedAt && (
                      <span className="meta-stat">
                        <Calendar size={13} /> {video.publishedAt}
                      </span>
                    )}
                  </div>

                  <a
                    href={video.url || channel.channelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="video-yt-link"
                    title="Open directly on YouTube"
                  >
                    <Youtube size={16} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="empty-videos-notice">
            <p>No videos found under this filter.</p>
          </div>
        )}
      </div>

      {/* Video Modal Player / Detail */}
      {activeVideoModal && (
        <div className="video-modal-backdrop" onClick={() => setActiveVideoModal(null)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setActiveVideoModal(null)}
              aria-label="Close Video Player"
            >
              <X size={20} />
            </button>

            <div className="modal-video-frame">
              {activeVideoModal.youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideoModal.youtubeId}?autoplay=1`}
                  title={activeVideoModal.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="modal-fallback-preview">
                  <img src={activeVideoModal.thumbnailUrl} alt={activeVideoModal.title} />
                  <a
                    href={activeVideoModal.url || channel.channelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-youtube"
                  >
                    <Youtube size={20} /> Watch on YouTube
                  </a>
                </div>
              )}
            </div>

            <div className="modal-video-details">
              <h3 className="modal-title">{activeVideoModal.title}</h3>
              <p className="modal-desc">{activeVideoModal.description}</p>
              <div className="modal-meta-row">
                {activeVideoModal.publishedAt && <span>📅 Published: {activeVideoModal.publishedAt}</span>}
                {activeVideoModal.views && <span>👁️ Views: {activeVideoModal.views}</span>}
                {activeVideoModal.duration && <span>⏱️ Duration: {activeVideoModal.duration}</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
