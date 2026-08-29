import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X, Video, Star, Save } from 'lucide-react';
import { Youtube } from '../common/Icons';
import { usePortfolio } from '../../context/PortfolioContext';
import { ImageUploadField } from './ImageUploadField';

export const AdminCreator = () => {
  const { 
    youtubeChannel, 
    youtubeVideos, 
    updateYouTubeChannel, 
    saveYouTubeVideo, 
    deleteYouTubeVideo 
  } = usePortfolio();

  const [channelForm, setChannelForm] = useState({ ...youtubeChannel });
  const [channelSaved, setChannelSaved] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [isNewVideo, setIsNewVideo] = useState(false);

  const categories = ['Featured', 'Popular', 'Latest', 'Tutorials'];

  const emptyVideo = {
    title: '',
    youtubeId: '',
    thumbnailUrl: '',
    description: '',
    publishedAt: new Date().toISOString().slice(0, 10),
    duration: '10:00',
    views: '1.2K',
    url: '',
    featured: false,
    category: 'Latest',
    order: youtubeVideos.length + 1
  };

  const handleChannelSave = async (e) => {
    e.preventDefault();
    await updateYouTubeChannel(channelForm);
    setChannelSaved(true);
    setTimeout(() => setChannelSaved(false), 3000);
  };

  const handleStartNewVideo = () => {
    setEditingVideo({ ...emptyVideo });
    setIsNewVideo(true);
  };

  const handleStartEditVideo = (video) => {
    setEditingVideo({ ...video });
    setIsNewVideo(false);
  };

  const handleSaveVideo = async (e) => {
    e.preventDefault();
    if (!editingVideo.title) return;
    await saveYouTubeVideo(editingVideo);
    setEditingVideo(null);
  };

  const handleDeleteVideo = async (id) => {
    if (window.confirm('Delete this YouTube video item?')) {
      await deleteYouTubeVideo(id);
    }
  };

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2 className="admin-pane-title">YouTube & Creator Studio Management</h2>
          <p className="admin-pane-desc">
            Update your YouTube channel stats, descriptions, and curate videos in Featured, Popular, or Latest playlists.
          </p>
        </div>
      </div>

      {/* Channel Stats Form */}
      <form onSubmit={handleChannelSave} className="admin-form-card mb-6">
        <h3 className="card-section-title">
          <Youtube size={18} /> YouTube Channel Settings & Statistics
        </h3>

        {channelSaved && (
          <div className="form-alert success">
            <Check size={16} />
            <span>Channel statistics successfully updated!</span>
          </div>
        )}

        <div className="form-grid-2">
          <div className="form-field">
            <label>Channel Name</label>
            <input
              type="text"
              value={channelForm.channelName || ''}
              onChange={(e) =>
                setChannelForm({ ...channelForm, channelName: e.target.value })
              }
            />
          </div>

          <div className="form-field">
            <label>Handle (@name)</label>
            <input
              type="text"
              value={channelForm.handle || ''}
              onChange={(e) =>
                setChannelForm({ ...channelForm, handle: e.target.value })
              }
            />
          </div>
        </div>

        <div className="form-grid-3">
          <div className="form-field">
            <label>Subscribers Display</label>
            <input
              type="text"
              value={channelForm.subscribers || ''}
              onChange={(e) =>
                setChannelForm({ ...channelForm, subscribers: e.target.value })
              }
              placeholder="e.g. 1.5K+"
            />
          </div>

          <div className="form-field">
            <label>Total Views Display</label>
            <input
              type="text"
              value={channelForm.views || ''}
              onChange={(e) =>
                setChannelForm({ ...channelForm, views: e.target.value })
              }
              placeholder="e.g. 48K+"
            />
          </div>

          <div className="form-field">
            <label>Total Videos Count</label>
            <input
              type="text"
              value={channelForm.videos || ''}
              onChange={(e) =>
                setChannelForm({ ...channelForm, videos: e.target.value })
              }
              placeholder="e.g. 25+"
            />
          </div>
        </div>

        <div className="form-field">
          <label>Channel URL</label>
          <input
            type="url"
            value={channelForm.channelUrl || ''}
            onChange={(e) =>
              setChannelForm({ ...channelForm, channelUrl: e.target.value })
            }
          />
        </div>

        <ImageUploadField
          label="Channel Avatar / Logo Image"
          value={channelForm.avatarUrl || channelForm.logoUrl || ''}
          onChange={(url) =>
            setChannelForm({ ...channelForm, avatarUrl: url, logoUrl: url })
          }
          folder="creator"
          placeholder="https://ik.imagekit.io/... or upload channel logo"
          hint="Upload YouTube channel avatar or branded badge"
        />

        <button type="submit" className="btn btn-primary mt-2">
          <Save size={16} />
          <span>Save Channel Metadata</span>
        </button>
      </form>

      {/* Videos List & Actions */}
      <div className="admin-card-section">
        <div className="admin-card-header-row">
          <h3 className="section-title-text">
            <Video size={18} /> Curated Video Catalog ({youtubeVideos.length})
          </h3>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleStartNewVideo}
          >
            <Plus size={14} /> Add Video
          </button>
        </div>

        {/* Video Edit Modal */}
        {editingVideo && (
          <div className="admin-modal-overlay">
            <div className="admin-modal-box">
              <div className="admin-modal-header">
                <h3 className="modal-heading">
                  {isNewVideo ? 'Add YouTube Video' : `Edit Video: ${editingVideo.title}`}
                </h3>
                <button
                  type="button"
                  className="modal-close"
                  onClick={() => setEditingVideo(null)}
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveVideo} className="admin-modal-form">
                <div className="form-field">
                  <label>Video Title *</label>
                  <input
                    type="text"
                    value={editingVideo.title}
                    onChange={(e) =>
                      setEditingVideo({ ...editingVideo, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-grid-2">
                  <div className="form-field">
                    <label>YouTube Video ID (11 chars)</label>
                    <input
                      type="text"
                      value={editingVideo.youtubeId || ''}
                      onChange={(e) =>
                        setEditingVideo({
                          ...editingVideo,
                          youtubeId: e.target.value
                        })
                      }
                      placeholder="e.g. dQw4w9WgXcQ"
                    />
                  </div>

                  <div className="form-field">
                    <label>Category / Playlist</label>
                    <select
                      value={editingVideo.category}
                      onChange={(e) =>
                        setEditingVideo({
                          ...editingVideo,
                          category: e.target.value
                        })
                      }
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <ImageUploadField
                  label="Thumbnail Image (ImageKit CDN or URL)"
                  value={editingVideo.thumbnailUrl || ''}
                  onChange={(url) =>
                    setEditingVideo({
                      ...editingVideo,
                      thumbnailUrl: url
                    })
                  }
                  folder="creator"
                  placeholder="https://ik.imagekit.io/... or upload custom thumbnail"
                  hint="Upload custom 16:9 thumbnail or auto-generated YouTube thumb"
                />

                <div className="form-grid-3">
                  <div className="form-field">
                    <label>Duration</label>
                    <input
                      type="text"
                      value={editingVideo.duration || ''}
                      onChange={(e) =>
                        setEditingVideo({
                          ...editingVideo,
                          duration: e.target.value
                        })
                      }
                      placeholder="e.g. 14:20"
                    />
                  </div>

                  <div className="form-field">
                    <label>View Count</label>
                    <input
                      type="text"
                      value={editingVideo.views || ''}
                      onChange={(e) =>
                        setEditingVideo({ ...editingVideo, views: e.target.value })
                      }
                      placeholder="e.g. 3.5K"
                    />
                  </div>

                  <div className="form-field">
                    <label>Published Date</label>
                    <input
                      type="text"
                      value={editingVideo.publishedAt || ''}
                      onChange={(e) =>
                        setEditingVideo({
                          ...editingVideo,
                          publishedAt: e.target.value
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Direct Video / YouTube Link</label>
                  <input
                    type="url"
                    value={editingVideo.url || ''}
                    onChange={(e) =>
                      setEditingVideo({ ...editingVideo, url: e.target.value })
                    }
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>

                <div className="form-field">
                  <label>Description</label>
                  <textarea
                    value={editingVideo.description || ''}
                    onChange={(e) =>
                      setEditingVideo({
                        ...editingVideo,
                        description: e.target.value
                      })
                    }
                    rows={2}
                  />
                </div>

                <div className="form-checkbox-row">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={editingVideo.featured || false}
                      onChange={(e) =>
                        setEditingVideo({
                          ...editingVideo,
                          featured: e.target.checked
                        })
                      }
                    />
                    <span>Mark as Featured Video (Shown in Featured tab)</span>
                  </label>
                </div>

                <div className="admin-modal-actions">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setEditingVideo(null)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <Check size={16} />
                    <span>{isNewVideo ? 'Add Video' : 'Save Changes'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="admin-table-responsive">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Title</th>
                <th>Category</th>
                <th>Views</th>
                <th>Duration</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {youtubeVideos.map((video) => (
                <tr key={video.id || video.title}>
                  <td>
                    <div className="table-video-thumb">
                      <img src={video.thumbnailUrl} alt={video.title} />
                    </div>
                  </td>
                  <td>
                    <strong>{video.title}</strong>
                    <p className="table-subtext">{video.description}</p>
                  </td>
                  <td>
                    <span className="table-cat-pill">{video.category}</span>
                  </td>
                  <td>{video.views}</td>
                  <td>{video.duration}</td>
                  <td>
                    {video.featured ? (
                      <span className="featured-badge">
                        <Star size={12} className="fill-star" /> Yes
                      </span>
                    ) : (
                      'No'
                    )}
                  </td>
                  <td className="cell-actions">
                    <button
                      type="button"
                      className="btn-action edit"
                      onClick={() => handleStartEditVideo(video)}
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      type="button"
                      className="btn-action delete"
                      onClick={() => handleDeleteVideo(video.id)}
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
