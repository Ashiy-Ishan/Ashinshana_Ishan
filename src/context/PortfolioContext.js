// src/context/PortfolioContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { portfolioService } from '../services/portfolioService';
import { initialData } from '../data/initialData';

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  const [profile, setProfile] = useState(initialData.profile);
  const [skills, setSkills] = useState(initialData.skills);
  const [skillCategories] = useState(initialData.skillCategories);
  const [projects, setProjects] = useState(initialData.projects);
  const [publishedProjects, setPublishedProjects] = useState(initialData.publishedProjects);
  const [youtubeChannel, setYouTubeChannel] = useState(initialData.youtubeChannel);
  const [youtubeVideos, setYouTubeVideos] = useState(initialData.youtubeVideos);
  const [currentlyBuilding, setCurrentlyBuilding] = useState(initialData.currentlyBuilding);
  const [timeline, setTimeline] = useState(initialData.timeline);
  const [gallery, setGallery] = useState(initialData.gallery);
  const [siteSettings, setSiteSettings] = useState(initialData.siteSettings);
  const [contactMessages, setContactMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAllData = useCallback(async () => {
    try {
      setLoading(true);
      const [
        prof,
        skl,
        proj,
        pub,
        ytChan,
        ytVids,
        currBuild,
        tl,
        gal,
        settings,
        msgs
      ] = await Promise.all([
        portfolioService.getProfile(),
        portfolioService.getSkills(),
        portfolioService.getProjects(),
        portfolioService.getPublishedProjects(),
        portfolioService.getYouTubeChannel(),
        portfolioService.getYouTubeVideos(),
        portfolioService.getCurrentlyBuilding(),
        portfolioService.getTimeline(),
        portfolioService.getGallery(),
        portfolioService.getSiteSettings(),
        portfolioService.getContactMessages()
      ]);

      setProfile(prof);
      setSkills(skl);
      setProjects(proj);
      setPublishedProjects(pub);
      setYouTubeChannel(ytChan);
      setYouTubeVideos(ytVids);
      setCurrentlyBuilding(currBuild);
      setTimeline(tl);
      setGallery(gal);
      setSiteSettings(settings);
      setContactMessages(msgs);
      setError(null);
    } catch (err) {
      console.warn('Error loading portfolio data, using baseline seed data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // Mutations
  const updateProfile = async (data) => {
    const updated = await portfolioService.updateProfile(data);
    setProfile(updated);
    return updated;
  };

  const saveSkill = async (skill) => {
    const saved = await portfolioService.saveSkill(skill);
    const updatedSkills = await portfolioService.getSkills();
    setSkills(updatedSkills);
    return saved;
  };

  const deleteSkill = async (skillId) => {
    await portfolioService.deleteSkill(skillId);
    setSkills((prev) => prev.filter((s) => s.id !== skillId));
  };

  const saveProject = async (project) => {
    const saved = await portfolioService.saveProject(project);
    const updatedProjects = await portfolioService.getProjects();
    setProjects(updatedProjects);
    return saved;
  };

  const deleteProject = async (projectId) => {
    await portfolioService.deleteProject(projectId);
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  };

  const savePublishedProject = async (pubProject) => {
    const saved = await portfolioService.savePublishedProject(pubProject);
    const updated = await portfolioService.getPublishedProjects();
    setPublishedProjects(updated);
    return saved;
  };

  const deletePublishedProject = async (pubId) => {
    await portfolioService.deletePublishedProject(pubId);
    setPublishedProjects((prev) => prev.filter((p) => p.id !== pubId));
  };

  const updateYouTubeChannel = async (channelData) => {
    const updated = await portfolioService.updateYouTubeChannel(channelData);
    setYouTubeChannel(updated);
    return updated;
  };

  const saveYouTubeVideo = async (video) => {
    const saved = await portfolioService.saveYouTubeVideo(video);
    const updated = await portfolioService.getYouTubeVideos();
    setYouTubeVideos(updated);
    return saved;
  };

  const deleteYouTubeVideo = async (videoId) => {
    await portfolioService.deleteYouTubeVideo(videoId);
    setYouTubeVideos((prev) => prev.filter((v) => v.id !== videoId));
  };

  const updateCurrentlyBuilding = async (data) => {
    const updated = await portfolioService.updateCurrentlyBuilding(data);
    setCurrentlyBuilding(updated);
    return updated;
  };

  const saveTimelineItem = async (item) => {
    const saved = await portfolioService.saveTimelineItem(item);
    const updated = await portfolioService.getTimeline();
    setTimeline(updated);
    return saved;
  };

  const deleteTimelineItem = async (itemId) => {
    await portfolioService.deleteTimelineItem(itemId);
    setTimeline((prev) => prev.filter((t) => t.id !== itemId));
  };

  const saveGalleryItem = async (item) => {
    const saved = await portfolioService.saveGalleryItem(item);
    const updated = await portfolioService.getGallery();
    setGallery(updated);
    return saved;
  };

  const deleteGalleryItem = async (itemId) => {
    await portfolioService.deleteGalleryItem(itemId);
    setGallery((prev) => prev.filter((g) => g.id !== itemId));
  };

  const updateSiteSettings = async (settings) => {
    const updated = await portfolioService.updateSiteSettings(settings);
    setSiteSettings(updated);
    return updated;
  };

  const submitContactMessage = async (message) => {
    const res = await portfolioService.submitContactMessage(message);
    const msgs = await portfolioService.getContactMessages();
    setContactMessages(msgs);
    return res;
  };

  const deleteContactMessage = async (msgId) => {
    await portfolioService.deleteContactMessage(msgId);
    setContactMessages((prev) => prev.filter((m) => m.id !== msgId));
  };

  const value = {
    profile,
    skills,
    skillCategories,
    projects,
    publishedProjects,
    youtubeChannel,
    youtubeVideos,
    currentlyBuilding,
    timeline,
    gallery,
    siteSettings,
    contactMessages,
    loading,
    error,
    refreshData: loadAllData,
    updateProfile,
    saveSkill,
    deleteSkill,
    saveProject,
    deleteProject,
    savePublishedProject,
    deletePublishedProject,
    updateYouTubeChannel,
    saveYouTubeVideo,
    deleteYouTubeVideo,
    updateCurrentlyBuilding,
    saveTimelineItem,
    deleteTimelineItem,
    saveGalleryItem,
    deleteGalleryItem,
    updateSiteSettings,
    submitContactMessage,
    deleteContactMessage
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
