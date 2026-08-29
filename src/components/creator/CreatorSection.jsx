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
              alt={channel.channelName || 'Curly Max YouTube Channel'}
              className="channel-avatar"
            />
            <div className="channel-verified-badge" title="Official Tech Channel">
              <Youtube size={16} />
            </div>
          </div>

          <div className="channel-meta-info">
            <div className="channel-title-row">
              <h3 className="channel-name">{channel.channelName || 'Curly Max'}</h3>
              <span className="channel-handle">{channel.handle || '@CurlyMax'}</span>
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

        {/* Redesigned High-Impact YouTube CTA Button */}
        <div className="channel-action-box">
          <a
            href={channel.channelUrl || 'https://www.youtube.com/@AshiyIshan'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-youtube btn-youtube-glow"
          >
            <div className="yt-icon-box">
              <Youtube size={22} className="yt-icon-svg" />
            </div>
            <div className="yt-btn-text">
              <span className="yt-btn-primary">VISIT YOUTUBE CHANNEL</span>
              <span className="yt-btn-sub">{channel.subscribers || '1.5K+'} SUBSCRIBERS</span>
            </div>
            <ExternalLink size={16} className="yt-btn-arrow" />
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
                  <span className="meta-stat views">
                    <Eye size={12} /> {video.views} views
                  </span>
                  <span className="meta-stat date">
                    <Calendar size={12} /> {video.publishedAt}
                  </span>
                </div>

                <div className="video-action-row">
                  <button
                    type="button"
                    className="btn-watch-modal"
                    onClick={() => setActiveVideoModal(video)}
                  >
                    <Play size={14} fill="currentColor" />
                    <span>Watch Preview</span>
                  </button>
                  <a
                    href={video.url || `https://www.youtube.com/watch?v=${video.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-yt-direct"
                    title="Open on YouTube"
                  >
                    <Youtube size={14} />
                    <span>YouTube</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Embedded Video Modal */}
      {activeVideoModal && (
        <div className="video-modal-backdrop" onClick={() => setActiveVideoModal(null)}>
          <div className="video-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top-bar">
              <div className="modal-title-wrap">
                <Youtube size={18} className="modal-yt-icon" />
                <h4 className="modal-video-title">{activeVideoModal.title}</h4>
              </div>
              <button
                type="button"
                className="modal-close-button"
                onClick={() => setActiveVideoModal(null)}
                aria-label="Close video player"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-player-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoModal.youtubeId}?autoplay=1`}
                title={activeVideoModal.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="modal-iframe"
              />
            </div>

            <div className="modal-details-footer">
              <p className="modal-description">{activeVideoModal.description}</p>
              <div className="modal-footer-cta">
                <a
                  href={`https://www.youtube.com/watch?v=${activeVideoModal.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-youtube btn-sm"
                >
                  <Youtube size={16} />
                  <span>Open on YouTube App</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
