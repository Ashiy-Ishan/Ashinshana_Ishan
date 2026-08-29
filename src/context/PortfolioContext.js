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
  const [achievements, setAchievements] = useState(initialData.achievements);
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
        certs,
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
        portfolioService.getAchievements(),
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
      setAchievements(certs);
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

  // Real-time Firestore Subscriptions (Active Listener Lifecycle)
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const unsubProfile = portfolioService.subscribeToProfile(
      (data) => isMounted && setProfile(data),
      (err) => isMounted && setError(err.message)
    );

    const unsubSkills = portfolioService.subscribeToSkills(
      (data) => isMounted && setSkills(data),
      (err) => isMounted && setError(err.message)
    );

    const unsubProjects = portfolioService.subscribeToProjects(
      (data) => isMounted && setProjects(data),
      (err) => isMounted && setError(err.message)
    );

    const unsubPublished = portfolioService.subscribeToPublishedProjects(
      (data) => isMounted && setPublishedProjects(data),
      (err) => isMounted && setError(err.message)
    );

    const unsubChannel = portfolioService.subscribeToYouTubeChannel(
      (data) => isMounted && setYouTubeChannel(data),
      (err) => isMounted && setError(err.message)
    );

    const unsubVideos = portfolioService.subscribeToYouTubeVideos(
      (data) => isMounted && setYouTubeVideos(data),
      (err) => isMounted && setError(err.message)
    );

    const unsubBuilding = portfolioService.subscribeToCurrentlyBuilding(
      (data) => isMounted && setCurrentlyBuilding(data),
      (err) => isMounted && setError(err.message)
    );

    const unsubTimeline = portfolioService.subscribeToTimeline(
      (data) => isMounted && setTimeline(data),
      (err) => isMounted && setError(err.message)
    );

    const unsubGallery = portfolioService.subscribeToGallery(
      (data) => isMounted && setGallery(data),
      (err) => isMounted && setError(err.message)
    );

    const unsubAchievements = portfolioService.subscribeToAchievements(
      (data) => isMounted && setAchievements(data),
      (err) => isMounted && setError(err.message)
    );

    const unsubSettings = portfolioService.subscribeToSiteSettings(
      (data) => isMounted && setSiteSettings(data),
      (err) => isMounted && setError(err.message)
    );

    const unsubMessages = portfolioService.subscribeToContactMessages(
      (data) => isMounted && setContactMessages(data),
      (err) => isMounted && setError(err.message)
    );

    setLoading(false);

    // Clean up all active listeners on component unmount
    return () => {
      isMounted = false;
      if (typeof unsubProfile === 'function') unsubProfile();
      if (typeof unsubSkills === 'function') unsubSkills();
      if (typeof unsubProjects === 'function') unsubProjects();
      if (typeof unsubPublished === 'function') unsubPublished();
      if (typeof unsubChannel === 'function') unsubChannel();
      if (typeof unsubVideos === 'function') unsubVideos();
      if (typeof unsubBuilding === 'function') unsubBuilding();
      if (typeof unsubTimeline === 'function') unsubTimeline();
      if (typeof unsubGallery === 'function') unsubGallery();
      if (typeof unsubAchievements === 'function') unsubAchievements();
      if (typeof unsubSettings === 'function') unsubSettings();
      if (typeof unsubMessages === 'function') unsubMessages();
    };
  }, []);

  // Mutations
  const updateProfile = async (data) => {
    const updated = await portfolioService.updateProfile(data);
    setProfile(updated);
    return updated;
  };

  const syncAllSkills = async () => {
    const synced = await portfolioService.syncAllSkillsToFirestore();
    setSkills(synced);
    return synced;
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

  const syncAllProjects = async () => {
    const synced = await portfolioService.syncAllProjectsToFirestore();
    setProjects(synced);
    return synced;
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

  const syncAllAchievements = async () => {
    const synced = await portfolioService.syncAllAchievementsToFirestore();
    setAchievements(synced);
    return synced;
  };

  const saveAchievement = async (item) => {
    const saved = await portfolioService.saveAchievement(item);
    const updated = await portfolioService.getAchievements();
    setAchievements(updated);
    return saved;
  };

  const deleteAchievement = async (itemId) => {
    await portfolioService.deleteAchievement(itemId);
    setAchievements((prev) => prev.filter((c) => c.id !== itemId));
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
    achievements,
    siteSettings,
    contactMessages,
    loading,
    error,
    refreshData: loadAllData,
    updateProfile,
    syncAllSkills,
    saveSkill,
    deleteSkill,
    syncAllProjects,
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
    syncAllAchievements,
    saveAchievement,
    deleteAchievement,
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
