// src/services/portfolioService.js
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../config/firebase';
import { initialData } from '../data/initialData';

const CACHE_PREFIX = 'ashiy_portfolio_data_';

// Helper to get local cache
const getCachedData = (key, fallback) => {
  try {
    const item = localStorage.getItem(CACHE_PREFIX + key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
};

// Helper to set local cache
const setCachedData = (key, value) => {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.warn('LocalStorage save failed:', e);
  }
};

export const portfolioService = {
  // --- Profile ---
  async getProfile() {
    if (isFirebaseConfigured && db) {
      try {
        const docRef = doc(db, 'profiles', 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = { ...initialData.profile, ...docSnap.data() };
          setCachedData('profile', data);
          return data;
        }
      } catch (err) {
        console.warn('Failed to fetch profile from Firestore, using cache/seed:', err);
      }
    }
    return getCachedData('profile', initialData.profile);
  },

  async updateProfile(profileData) {
    const updated = { ...profileData, updatedAt: new Date().toISOString() };
    if (isFirebaseConfigured && db) {
      const docRef = doc(db, 'profiles', 'main');
      await setDoc(docRef, updated, { merge: true });
    }
    setCachedData('profile', updated);
    return updated;
  },

  // --- Skills ---
  async getSkills() {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, 'skills'), orderBy('order', 'asc'));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const skills = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setCachedData('skills', skills);
          return skills;
        }
      } catch (err) {
        console.warn('Failed to fetch skills from Firestore, using cache/seed:', err);
      }
    }
    return getCachedData('skills', initialData.skills);
  },

  async saveSkill(skill) {
    let savedSkill = { ...skill };
    if (isFirebaseConfigured && db) {
      if (skill.id && !skill.id.startsWith('temp-')) {
        const docRef = doc(db, 'skills', skill.id);
        await setDoc(docRef, savedSkill, { merge: true });
      } else {
        const docRef = await addDoc(collection(db, 'skills'), savedSkill);
        savedSkill.id = docRef.id;
      }
    } else {
      if (!savedSkill.id) {
        savedSkill.id = `skill-${Date.now()}`;
      }
    }

    const currentSkills = getCachedData('skills', initialData.skills);
    const existingIndex = currentSkills.findIndex(s => s.id === savedSkill.id);
    let updatedList;
    if (existingIndex >= 0) {
      updatedList = [...currentSkills];
      updatedList[existingIndex] = savedSkill;
    } else {
      updatedList = [...currentSkills, savedSkill];
    }
    setCachedData('skills', updatedList);
    return savedSkill;
  },

  async deleteSkill(skillId) {
    if (isFirebaseConfigured && db) {
      await deleteDoc(doc(db, 'skills', skillId));
    }
    const currentSkills = getCachedData('skills', initialData.skills);
    const updated = currentSkills.filter(s => s.id !== skillId);
    setCachedData('skills', updated);
    return true;
  },

  // --- Projects ---
  async getProjects() {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const projects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setCachedData('projects', projects);
          return projects;
        }
      } catch (err) {
        console.warn('Failed to fetch projects from Firestore, using cache/seed:', err);
      }
    }
    return getCachedData('projects', initialData.projects);
  },

  async saveProject(project) {
    let saved = { ...project };
    if (isFirebaseConfigured && db) {
      if (project.id && !project.id.startsWith('temp-')) {
        const docRef = doc(db, 'projects', project.id);
        await setDoc(docRef, saved, { merge: true });
      } else {
        const docRef = await addDoc(collection(db, 'projects'), saved);
        saved.id = docRef.id;
      }
    } else {
      if (!saved.id) {
        saved.id = `proj-${Date.now()}`;
      }
    }

    const current = getCachedData('projects', initialData.projects);
    const index = current.findIndex(p => p.id === saved.id);
    let updatedList;
    if (index >= 0) {
      updatedList = [...current];
      updatedList[index] = saved;
    } else {
      updatedList = [...current, saved];
    }
    setCachedData('projects', updatedList);
    return saved;
  },

  async deleteProject(projectId) {
    if (isFirebaseConfigured && db) {
      await deleteDoc(doc(db, 'projects', projectId));
    }
    const current = getCachedData('projects', initialData.projects);
    const updated = current.filter(p => p.id !== projectId);
    setCachedData('projects', updated);
    return true;
  },

  // --- Published Projects ---
  async getPublishedProjects() {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, 'publishedProjects'), orderBy('releaseDate', 'desc'));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const pubs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setCachedData('publishedProjects', pubs);
          return pubs;
        }
      } catch (err) {
        console.warn('Failed to fetch published projects from Firestore, using cache/seed:', err);
      }
    }
    return getCachedData('publishedProjects', initialData.publishedProjects);
  },

  async savePublishedProject(pubProject) {
    let saved = { ...pubProject };
    if (isFirebaseConfigured && db) {
      if (pubProject.id && !pubProject.id.startsWith('temp-')) {
        const docRef = doc(db, 'publishedProjects', pubProject.id);
        await setDoc(docRef, saved, { merge: true });
      } else {
        const docRef = await addDoc(collection(db, 'publishedProjects'), saved);
        saved.id = docRef.id;
      }
    } else {
      if (!saved.id) {
        saved.id = `pub-${Date.now()}`;
      }
    }

    const current = getCachedData('publishedProjects', initialData.publishedProjects);
    const index = current.findIndex(p => p.id === saved.id);
    let updatedList;
    if (index >= 0) {
      updatedList = [...current];
      updatedList[index] = saved;
    } else {
      updatedList = [...current, saved];
    }
    setCachedData('publishedProjects', updatedList);
    return saved;
  },

  async deletePublishedProject(pubId) {
    if (isFirebaseConfigured && db) {
      await deleteDoc(doc(db, 'publishedProjects', pubId));
    }
    const current = getCachedData('publishedProjects', initialData.publishedProjects);
    const updated = current.filter(p => p.id !== pubId);
    setCachedData('publishedProjects', updated);
    return true;
  },

  // --- YouTube Creator Section ---
  async getYouTubeChannel() {
    if (isFirebaseConfigured && db) {
      try {
        const docRef = doc(db, 'youtubeChannel', 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = { ...initialData.youtubeChannel, ...docSnap.data() };
          setCachedData('youtubeChannel', data);
          return data;
        }
      } catch (err) {
        console.warn('Failed to fetch youtubeChannel from Firestore:', err);
      }
    }
    return getCachedData('youtubeChannel', initialData.youtubeChannel);
  },

  async updateYouTubeChannel(channelData) {
    const updated = { ...channelData, updatedAt: new Date().toISOString() };
    if (isFirebaseConfigured && db) {
      const docRef = doc(db, 'youtubeChannel', 'main');
      await setDoc(docRef, updated, { merge: true });
    }
    setCachedData('youtubeChannel', updated);
    return updated;
  },

  async getYouTubeVideos() {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, 'youtubeVideos'), orderBy('order', 'asc'));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const videos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setCachedData('youtubeVideos', videos);
          return videos;
        }
      } catch (err) {
        console.warn('Failed to fetch youtubeVideos from Firestore:', err);
      }
    }
    return getCachedData('youtubeVideos', initialData.youtubeVideos);
  },

  async saveYouTubeVideo(video) {
    let saved = { ...video };
    if (isFirebaseConfigured && db) {
      if (video.id && !video.id.startsWith('temp-')) {
        const docRef = doc(db, 'youtubeVideos', video.id);
        await setDoc(docRef, saved, { merge: true });
      } else {
        const docRef = await addDoc(collection(db, 'youtubeVideos'), saved);
        saved.id = docRef.id;
      }
    } else {
      if (!saved.id) {
        saved.id = `video-${Date.now()}`;
      }
    }

    const current = getCachedData('youtubeVideos', initialData.youtubeVideos);
    const index = current.findIndex(v => v.id === saved.id);
    let updatedList;
    if (index >= 0) {
      updatedList = [...current];
      updatedList[index] = saved;
    } else {
      updatedList = [...current, saved];
    }
    setCachedData('youtubeVideos', updatedList);
    return saved;
  },

  async deleteYouTubeVideo(videoId) {
    if (isFirebaseConfigured && db) {
      await deleteDoc(doc(db, 'youtubeVideos', videoId));
    }
    const current = getCachedData('youtubeVideos', initialData.youtubeVideos);
    const updated = current.filter(v => v.id !== videoId);
    setCachedData('youtubeVideos', updated);
    return true;
  },

  // --- Currently Building ---
  async getCurrentlyBuilding() {
    if (isFirebaseConfigured && db) {
      try {
        const docRef = doc(db, 'currentlyBuilding', 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = { ...initialData.currentlyBuilding, ...docSnap.data() };
          setCachedData('currentlyBuilding', data);
          return data;
        }
      } catch (err) {
        console.warn('Failed to fetch currentlyBuilding from Firestore:', err);
      }
    }
    return getCachedData('currentlyBuilding', initialData.currentlyBuilding);
  },

  async updateCurrentlyBuilding(buildingData) {
    const updated = { ...buildingData, updatedAt: new Date().toISOString() };
    if (isFirebaseConfigured && db) {
      const docRef = doc(db, 'currentlyBuilding', 'main');
      await setDoc(docRef, updated, { merge: true });
    }
    setCachedData('currentlyBuilding', updated);
    return updated;
  },

  // --- Timeline ---
  async getTimeline() {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, 'timeline'), orderBy('year', 'desc'));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setCachedData('timeline', items);
          return items;
        }
      } catch (err) {
        console.warn('Failed to fetch timeline from Firestore:', err);
      }
    }
    return getCachedData('timeline', initialData.timeline);
  },

  async saveTimelineItem(item) {
    let saved = { ...item };
    if (isFirebaseConfigured && db) {
      if (item.id && !item.id.startsWith('temp-')) {
        const docRef = doc(db, 'timeline', item.id);
        await setDoc(docRef, saved, { merge: true });
      } else {
        const docRef = await addDoc(collection(db, 'timeline'), saved);
        saved.id = docRef.id;
      }
    } else {
      if (!saved.id) {
        saved.id = `time-${Date.now()}`;
      }
    }

    const current = getCachedData('timeline', initialData.timeline);
    const index = current.findIndex(t => t.id === saved.id);
    let updatedList;
    if (index >= 0) {
      updatedList = [...current];
      updatedList[index] = saved;
    } else {
      updatedList = [...current, saved];
    }
    setCachedData('timeline', updatedList);
    return saved;
  },

  async deleteTimelineItem(itemId) {
    if (isFirebaseConfigured && db) {
      await deleteDoc(doc(db, 'timeline', itemId));
    }
    const current = getCachedData('timeline', initialData.timeline);
    const updated = current.filter(t => t.id !== itemId);
    setCachedData('timeline', updated);
    return true;
  },

  // --- Gallery ---
  async getGallery() {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, 'gallery'), orderBy('date', 'desc'));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setCachedData('gallery', items);
          return items;
        }
      } catch (err) {
        console.warn('Failed to fetch gallery from Firestore:', err);
      }
    }
    return getCachedData('gallery', initialData.gallery);
  },

  async saveGalleryItem(item) {
    let saved = { ...item };
    if (isFirebaseConfigured && db) {
      if (item.id && !item.id.startsWith('temp-')) {
        const docRef = doc(db, 'gallery', item.id);
        await setDoc(docRef, saved, { merge: true });
      } else {
        const docRef = await addDoc(collection(db, 'gallery'), saved);
        saved.id = docRef.id;
      }
    } else {
      if (!saved.id) {
        saved.id = `img-${Date.now()}`;
      }
    }

    const current = getCachedData('gallery', initialData.gallery);
    const index = current.findIndex(g => g.id === saved.id);
    let updatedList;
    if (index >= 0) {
      updatedList = [...current];
      updatedList[index] = saved;
    } else {
      updatedList = [saved, ...current];
    }
    setCachedData('gallery', updatedList);
    return saved;
  },

  async deleteGalleryItem(itemId) {
    if (isFirebaseConfigured && db) {
      await deleteDoc(doc(db, 'gallery', itemId));
    }
    const current = getCachedData('gallery', initialData.gallery);
    const updated = current.filter(g => g.id !== itemId);
    setCachedData('gallery', updated);
    return true;
  },

  // --- Site Settings ---
  async getSiteSettings() {
    if (isFirebaseConfigured && db) {
      try {
        const docRef = doc(db, 'siteSettings', 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = { ...initialData.siteSettings, ...docSnap.data() };
          setCachedData('siteSettings', data);
          return data;
        }
      } catch (err) {
        console.warn('Failed to fetch siteSettings from Firestore:', err);
      }
    }
    return getCachedData('siteSettings', initialData.siteSettings);
  },

  async updateSiteSettings(settings) {
    const updated = { ...settings, updatedAt: new Date().toISOString() };
    if (isFirebaseConfigured && db) {
      const docRef = doc(db, 'siteSettings', 'main');
      await setDoc(docRef, updated, { merge: true });
    }
    setCachedData('siteSettings', updated);
    return updated;
  },

  // --- Contact Messages ---
  async submitContactMessage(message) {
    const record = {
      ...message,
      createdAt: new Date().toISOString(),
      read: false
    };

    if (isFirebaseConfigured && db) {
      try {
        const docRef = await addDoc(collection(db, 'contactMessages'), {
          ...record,
          serverTimestamp: serverTimestamp()
        });
        record.id = docRef.id;
      } catch (e) {
        console.warn('Failed writing message to Firestore, storing locally:', e);
      }
    } else {
      record.id = `msg-${Date.now()}`;
    }

    const current = getCachedData('contactMessages', []);
    setCachedData('contactMessages', [record, ...current]);
    return record;
  },

  async getContactMessages() {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const msgs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setCachedData('contactMessages', msgs);
          return msgs;
        }
      } catch (err) {
        console.warn('Failed fetching contact messages:', err);
      }
    }
    return getCachedData('contactMessages', []);
  },

  async deleteContactMessage(msgId) {
    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'contactMessages', msgId));
      } catch (e) {
        console.warn('Error deleting message from Firestore:', e);
      }
    }
    const current = getCachedData('contactMessages', []);
    const updated = current.filter(m => m.id !== msgId);
    setCachedData('contactMessages', updated);
    return true;
  }
};
