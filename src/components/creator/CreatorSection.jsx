// src/components/creator/CreatorSection.jsx
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Eye, 
  Video, 
  ExternalLink, 
  Clock, 
  Calendar, 
  Sparkles, 
  Film 
} from 'lucide-react';
import { Youtube } from '../common/Icons';
import { usePortfolio } from '../../context/PortfolioContext';

// Animated Count-Up Hook / Component for Channel Insights
const AnimatedCounter = ({ value = '0', label = '', icon: Icon, colorClass = 'subscribers' }) => {
  const [count, setCount] = useState(0);

  // Extract raw number and suffix (e.g., '800+' -> 800 and '+')
  const strVal = String(value);
  const numericVal = parseInt(strVal.replace(/[^0-9]/g, ''), 10) || 0;
  const suffix = strVal.replace(/[0-9]/g, '').trim();

  useEffect(() => {
    let startTimestamp = null;
    let animationFrameId;
    const duration = 1600;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Smooth ease-out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * numericVal));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(numericVal);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [numericVal]);

  return (
    <div className="creator-stat-card">
      <div className={`stat-icon-wrapper ${colorClass}`}>
        <Icon size={22} />
      </div>
      <div className="stat-info">
        <div className="stat-number-row">
          <span className="stat-count-number">{count}</span>
          {suffix && <span className="stat-count-suffix">{suffix}</span>}
        </div>
        <span className="stat-label-text">{label}</span>
      </div>
    </div>
  );
};

export const CreatorSection = () => {
  const { youtubeChannel, youtubeVideos } = usePortfolio();
  const [activeTab, setActiveTab] = useState('ALL');

  const channel = youtubeChannel || {};
  const videos = youtubeVideos || [];

  const filterTabs = ['ALL', 'COMPETITIONS', 'FEATURED', 'LATEST'];

  const filteredVideos = videos.filter((video) => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'COMPETITIONS') return video.category === 'Competition' || video.featured;
    if (activeTab === 'FEATURED') return video.featured;
    if (activeTab === 'LATEST') return video.category === 'Latest' || !video.featured;
    return true;
  });

  return (
    <section id="creator" className="section-container creator-section" aria-label="Creator and YouTube Showcase">
      {/* Section Header */}
      <div className="section-heading-wrap">
        <div className="section-pill-tag tag-creator">
          <Youtube size={14} />
          <span>TECHNICAL FLOWS & DEMOS</span>
        </div>
        <h2 className="section-title">
          COMPETITIONS & <span className="title-gradient creator-gradient">PROJECT DEMOS</span>
        </h2>
        <p className="section-subtext">
          Showcasing competition submissions, hackathon presentations, and focused technical flow explanations of IoT and software architectures.
        </p>
      </div>

      {/* Enhanced Channel Profile Header (Clean, Unboxed, Spacious) */}
      <div className="creator-profile-header">
        <div className="creator-profile-left">
          <div className="creator-avatar-wrapper">
            <img
              src={channel.channelImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80'}
              alt={channel.channelName || 'CURLYmax YouTube Channel'}
              className="creator-avatar-img"
            />
            <div className="creator-verified-badge" title="Official YouTube Channel">
              <Youtube size={15} />
            </div>
          </div>

          <div className="creator-profile-text">
            <div className="creator-title-row">
              <h3 className="creator-channel-name">{channel.channelName || 'CURLYmax'}</h3>
              <span className="creator-handle-badge">{channel.handle || '@ashiy_ish'}</span>
            </div>
            <p className="creator-bio-text">
              {channel.description || 'Official YouTube channel of CURLYmax featuring competition demos, hackathon project presentations, IoT architectures, and full-stack software walkthroughs.'}
            </p>
          </div>
        </div>

        {/* High-Impact YouTube Action Button */}
        <div className="creator-cta-wrap">
          <a
            href={channel.channelUrl || 'https://www.youtube.com/@ashiy_ish/videos'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-youtube btn-youtube-glow"
          >
            <div className="yt-icon-box">
              <Youtube size={22} className="yt-icon-svg" />
            </div>
            <div className="yt-btn-text">
              <span className="yt-btn-primary">VISIT YOUTUBE CHANNEL</span>
              <span className="yt-btn-sub">{channel.subscribers || '60'} SUBSCRIBERS</span>
            </div>
            <ExternalLink size={16} className="yt-btn-arrow" />
          </a>
        </div>
      </div>

      {/* Channel Insights & Performance Row (with Animated Counters) */}
      <div className="creator-insights-grid">
        <AnimatedCounter
          value={channel.subscribers || '60'}
          label="Subscribers"
          icon={Users}
          colorClass="subscribers"
        />
        <AnimatedCounter
          value={channel.views || '800+'}
          label="Total Views"
          icon={Eye}
          colorClass="views"
        />
        <AnimatedCounter
          value={channel.videos || '3'}
          label="Uploaded Videos"
          icon={Film}
          colorClass="videos"
        />
      </div>

      {/* Videos Section */}
      <div className="creator-videos-area" id="videos">
        <div className="videos-filter-bar">
          <div className="filter-title-wrap">
            <Video size={20} className="filter-icon creator-icon" />
            <h3 className="filter-title">COMPETITION & PROJECT PLAYLISTS</h3>
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
                <span>{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="videos-cards-grid">
          {filteredVideos.map((video) => {
            const videoUrl = video.url || `https://www.youtube.com/watch?v=${video.youtubeId}`;
            return (
              <article key={video.id || video.title} className="video-card">
                {/* Thumbnail Container */}
                <a 
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-thumbnail-container"
                  title={`Watch ${video.title} on YouTube`}
                >
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="video-thumb-img"
                    loading="lazy"
                  />
                  <div className="video-play-overlay">
                    <div className="play-button-circle">
                      <Youtube size={26} className="play-yt-icon" fill="white" />
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
                </a>

                {/* Video Info */}
                <div className="video-info-box">
                  <h4 className="video-headline">
                    <a
                      href={videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="video-title-link"
                    >
                      {video.title}
                    </a>
                  </h4>

                  <p className="video-description">{video.description}</p>

                  {/* Video Meta Stats & Clean Watch on YouTube Action */}
                  <div className="video-meta-footer">
                    <div className="meta-stats-group">
                      <span className="meta-stat views">
                        <Eye size={13} /> {video.views} views
                      </span>
                      <span className="meta-stat date">
                        <Calendar size={13} /> {video.publishedAt}
                      </span>
                    </div>

                    <a
                      href={videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-watch-youtube"
                      title="Watch on YouTube"
                    >
                      <Youtube size={15} className="btn-yt-icon" />
                      <span>Watch on YouTube</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
