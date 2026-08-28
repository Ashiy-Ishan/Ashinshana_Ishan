// src/components/contact/ContactSection.jsx
import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Loader2 
} from 'lucide-react';
import { Github, Linkedin, Youtube, Instagram, Facebook, Whatsapp } from '../common/Icons';
import { usePortfolio } from '../../context/PortfolioContext';

export const ContactSection = () => {
  const { profile, submitContactMessage } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ submitting: false, success: false, error: 'Please fill in all required fields.' });
      return;
    }

    try {
      setStatus({ submitting: true, success: false, error: null });
      await submitContactMessage(formData);
      setStatus({ submitting: false, success: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.warn('Submission fallback error:', err);
      setStatus({
        submitting: false,
        success: false,
        error: 'Could not send directly. You can also connect via direct email or social channels below.'
      });
    }
  };

  const handleDirectEmail = () => {
    const subject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name || 'Portfolio Visitor'}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${profile?.email || 'ashinshanaishan@gmail.com'}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section-container contact-section" aria-label="Contact Ashiy Ishan">
      <div className="section-heading-wrap">
        <span className="section-tag">GET IN TOUCH</span>
        <h2 className="section-title">
          LET'S <span className="title-gradient">CONNECT & COLLABORATE</span>
        </h2>
        <p className="section-subtext">
          Have an exciting project, software engineering opportunity, content sponsorship, or tech inquiry? Send a message.
        </p>
      </div>

      <div className="contact-grid-wrapper">
        {/* Left Column: Social Media & Direct Channels */}
        <div className="contact-info-panel">
          <div className="contact-panel-card">
            <h3 className="panel-title">Social & Professional Hub</h3>
            <p className="panel-desc">
              Connect with me across official networks or send an encrypted message directly through the contact terminal.
            </p>

            <div className="social-hub-wrapper">
              <div className="social-hub-grid">
                {profile?.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-hub-btn github"
                    title="GitHub Repository & Code"
                  >
                    <Github size={18} />
                    <span>GitHub</span>
                  </a>
                )}

                {profile?.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-hub-btn linkedin"
                    title="LinkedIn Professional Profile"
                  >
                    <Linkedin size={18} />
                    <span>LinkedIn</span>
                  </a>
                )}

                {profile?.youtube && (
                  <a
                    href={profile.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-hub-btn youtube"
                    title="YouTube Channel"
                  >
                    <Youtube size={18} />
                    <span>YouTube</span>
                  </a>
                )}

                {profile?.whatsapp && (
                  <a
                    href={`https://wa.me/${profile.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-hub-btn whatsapp"
                    title="WhatsApp Direct Message"
                  >
                    <Whatsapp size={18} />
                    <span>WhatsApp</span>
                  </a>
                )}

                {profile?.instagram && (
                  <a
                    href={profile.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-hub-btn instagram"
                    title="Instagram Profile"
                  >
                    <Instagram size={18} />
                    <span>Instagram</span>
                  </a>
                )}

                {profile?.facebook && (
                  <a
                    href={profile.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-hub-btn facebook"
                    title="Facebook Profile"
                  >
                    <Facebook size={18} />
                    <span>Facebook</span>
                  </a>
                )}

                {profile?.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="social-hub-btn email"
                    title="Send Email"
                  >
                    <Mail size={18} />
                    <span>Email Direct</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Contact Form */}
        <div className="contact-form-panel">
          <form className="contact-form-modern" onSubmit={handleSubmit}>
            <h3 className="form-header-title">Send a Direct Message</h3>

            {status.success && (
              <div className="form-alert success">
                <CheckCircle size={20} />
                <div>
                  <strong>Message Transmitted Successfully!</strong>
                  <p>Thank you for reaching out. I will get back to you shortly.</p>
                </div>
              </div>
            )}

            {status.error && (
              <div className="form-alert error">
                <AlertCircle size={20} />
                <div>
                  <strong>Notice:</strong>
                  <p>{status.error}</p>
                  <button
                    type="button"
                    onClick={handleDirectEmail}
                    className="btn-link-fallback"
                  >
                    Launch Email Client
                  </button>
                </div>
              </div>
            )}

            <div className="form-fields-grid">
              <div className="form-field">
                <label htmlFor="contact-name">Your Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Smith"
                  required
                  disabled={status.submitting}
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-email">Your Email *</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. alex@example.com"
                  required
                  disabled={status.submitting}
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Full-Stack Project Collaboration"
                disabled={status.submitting}
              />
            </div>

            <div className="form-field">
              <label htmlFor="contact-message">Message *</label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your inquiry, project scope, or idea..."
                rows={5}
                required
                disabled={status.submitting}
              />
            </div>

            <div className="form-action-row">
              <button
                type="submit"
                className="btn btn-primary submit-btn"
                disabled={status.submitting}
              >
                {status.submitting ? (
                  <>
                    <Loader2 size={18} className="spinner-icon animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
