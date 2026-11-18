import React, { useState } from 'react';
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
import { RolePortrait } from '../common/RolePortrait';
import { usePortfolio } from '../../context/PortfolioContext';

const ChannelStat = ({ value, label, icon: Icon, colorClass }) => (
  <div className="creator-stat-card">
    <div className={`stat-icon-wrapper ${colorClass}`}><Icon size={22} aria-hidden="true" /></div>
    <div className="stat-info">
      <span className="stat-count-number">{value}</span>
      <span className="stat-label-text">{label}</span>
    </div>
  </div>
);

export const CreatorSection = () => {
  const { youtubeChannel, youtubeVideos, profile } = usePortfolio();
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
          Competitions &amp; <span className="title-gradient creator-gradient">project demos</span>
        </h2>
        <p className="section-subtext">
          Showcasing competition submissions, hackathon presentations, and focused technical flow explanations of IoT and software architectures.
        </p>
      </div>

      {/* Enhanced Channel Profile Header (Clean, Unboxed, Spacious) */}
      <div className="creator-profile-header">
        <div className="creator-profile-left">
          <RolePortrait
            source={channel.channelImage || profile?.creatorImage || profile?.heroImageCreator}
            alt={channel.channelName || 'CURLYmax YouTube Channel'}
            className="creator-avatar-wrapper"
            imageClassName="creator-avatar-img"
          />

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
        <ChannelStat
          value={channel.subscribers || '60'}
          label="Subscribers"
          icon={Users}
          colorClass="subscribers"
        />
        <ChannelStat
          value={channel.views || '800+'}
          label="Total Views"
          icon={Eye}
          colorClass="views"
        />
        <ChannelStat
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
            <h3 className="filter-title">Video library</h3>
          </div>

          <div className="video-tab-buttons" role="group" aria-label="Filter videos">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                aria-pressed={activeTab === tab}
                className={`video-tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'FEATURED' && <Sparkles size={13} />}
                <span>{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {filteredVideos.length === 0 && (
          <p className="empty-projects-notice">No videos match this filter.</p>
        )}

        <div className="videos-cards-grid">
          {filteredVideos.map((video) => {
            const videoUrl = video.url || `https://www.youtube.com/watch?v=${video.youtubeId}`;
            return (
              <article key={video.id || video.title} className="video-card">
                {video.thumbnailUrl && (
                  <div className="video-thumbnail-container">
                    <img
                      key={video.thumbnailUrl}
                      src={video.thumbnailUrl}
                      alt=""
                      className="video-thumb-img"
                      loading="lazy"
                      decoding="async"
                      onError={(event) => { event.currentTarget.hidden = true; }}
                    />
                  </div>
                )}

                <div className="video-info-box">
                  {(video.featured || video.duration) && (
                    <div className="public-card-tags video-card-tags">
                      {video.featured && <span className="video-featured-pill"><Sparkles size={13} /> Featured</span>}
                      {video.duration && <span className="video-duration-pill"><Clock size={13} /> {video.duration}</span>}
                    </div>
                  )}
                  <h4 className="video-headline">{video.title}</h4>

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
