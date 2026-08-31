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
  onSnapshot,
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
  // --- Sync All Baseline Data to Cloud Firestore ---
  async syncAllToFirestore() {
    // 1. Always update local storage cache first so local state is synchronized
    setCachedData('profile', initialData.profile);
    setCachedData('skills', initialData.skills);
    setCachedData('projects', initialData.projects);
    setCachedData('publishedProjects', initialData.publishedProjects);
    setCachedData('youtubeChannel', initialData.youtubeChannel);
    setCachedData('youtubeVideos', initialData.youtubeVideos);
    setCachedData('currentlyBuilding', initialData.currentlyBuilding);
    setCachedData('timeline', initialData.timeline);
    setCachedData('gallery', initialData.gallery);
    setCachedData('siteSettings', initialData.siteSettings);

    if (!isFirebaseConfigured || !db) {
      return { 
        localOnly: true, 
        message: 'Saved all baseline data to your local browser cache. To upload directly to Cloud Firestore, configure your Firebase API keys in your .env.local file.' 
      };
    }

    // 2. Upload to Cloud Firestore when credentials are present
    // 1. Profile
    await setDoc(doc(db, 'profiles', 'main'), initialData.profile, { merge: true });

    // 2. Skills
    for (const skill of initialData.skills) {
      await setDoc(doc(db, 'skills', skill.id), skill, { merge: true });
    }

    // 3. Projects
    for (const project of initialData.projects) {
      await setDoc(doc(db, 'projects', project.id), project, { merge: true });
    }

    // 4. Published Projects
    for (const pub of initialData.publishedProjects) {
      await setDoc(doc(db, 'publishedProjects', pub.id), pub, { merge: true });
    }

    // 5. YouTube Channel & Videos
    await setDoc(doc(db, 'youtubeChannel', 'main'), initialData.youtubeChannel, { merge: true });
    for (const video of initialData.youtubeVideos) {
      await setDoc(doc(db, 'youtubeVideos', video.id), video, { merge: true });
    }

    // 6. Currently Building Radar
    await setDoc(doc(db, 'currentlyBuilding', 'main'), initialData.currentlyBuilding, { merge: true });

    // 7. Timeline
    for (const item of initialData.timeline) {
      await setDoc(doc(db, 'timeline', item.id), item, { merge: true });
    }

    // 8. Gallery
    for (const item of initialData.gallery) {
      await setDoc(doc(db, 'gallery', item.id), item, { merge: true });
    }

    // 9. Site Settings
    await setDoc(doc(db, 'siteSettings', 'main'), initialData.siteSettings, { merge: true });

    return { 
      localOnly: false, 
      message: 'All baseline portfolio collections successfully synced to Cloud Firestore!' 
    };
  },

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
        } else {
          // Auto-seed profile if doc doesn't exist yet
          await setDoc(docRef, initialData.profile);
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

  async syncAllSkillsToFirestore() {
    if (isFirebaseConfigured && db) {
      for (let i = 0; i < initialData.skills.length; i++) {
        const item = initialData.skills[i];
        const skillId = item.id || `skill-${i + 1}`;
        await setDoc(doc(db, 'skills', skillId), { ...item, id: skillId, order: i + 1 }, { merge: true });
      }
    }
    setCachedData('skills', initialData.skills);
    return initialData.skills;
  },

  async saveSkill(skill) {
    let savedSkill = { ...skill };
    if (isFirebaseConfigured && db) {
      // If saving a skill and Firestore skills collection is currently empty, seed all default skills first so no other skills disappear
      try {
        const currentSnap = await getDocs(collection(db, 'skills'));
        if (currentSnap.empty) {
          for (let i = 0; i < initialData.skills.length; i++) {
            const item = initialData.skills[i];
            const sId = item.id || `skill-${i + 1}`;
            await setDoc(doc(db, 'skills', sId), { ...item, id: sId, order: i + 1 }, { merge: true });
          }
        }
      } catch (checkErr) {
        console.warn('Auto-seed default skills check warning:', checkErr);
      }

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

  async syncAllProjectsToFirestore() {
    if (isFirebaseConfigured && db) {
      for (let i = 0; i < initialData.projects.length; i++) {
        const item = initialData.projects[i];
        const projId = item.id || `proj-${i + 1}`;
        await setDoc(doc(db, 'projects', projId), { ...item, id: projId, order: i + 1 }, { merge: true });
      }
    }
    setCachedData('projects', initialData.projects);
    return initialData.projects;
  },

  async saveProject(project) {
    let saved = { ...project };
    if (isFirebaseConfigured && db) {
      // If saving a project and Firestore projects collection is currently empty, seed all default projects first so no other projects disappear
      try {
        const currentSnap = await getDocs(collection(db, 'projects'));
        if (currentSnap.empty) {
          for (let i = 0; i < initialData.projects.length; i++) {
            const item = initialData.projects[i];
            const pId = item.id || `proj-${i + 1}`;
            await setDoc(doc(db, 'projects', pId), { ...item, id: pId, order: i + 1 }, { merge: true });
          }
        }
      } catch (checkErr) {
        console.warn('Auto-seed default projects check warning:', checkErr);
      }

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
      try {
        const currentSnap = await getDocs(collection(db, 'publishedProjects'));
        if (currentSnap.empty && initialData.publishedProjects) {
          for (let i = 0; i < initialData.publishedProjects.length; i++) {
            const item = initialData.publishedProjects[i];
            const pId = item.id || `pub-${i + 1}`;
            await setDoc(doc(db, 'publishedProjects', pId), { ...item, id: pId }, { merge: true });
          }
        }
      } catch (checkErr) {
        console.warn('Auto-seed default publishedProjects check warning:', checkErr);
      }

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

  async syncAllYouTubeVideosToFirestore() {
    if (isFirebaseConfigured && db) {
      for (let i = 0; i < initialData.youtubeVideos.length; i++) {
        const item = initialData.youtubeVideos[i];
        const vId = item.id || `video-${i + 1}`;
        await setDoc(doc(db, 'youtubeVideos', vId), { ...item, id: vId, order: item.order || i + 1 }, { merge: true });
      }
    }
    setCachedData('youtubeVideos', initialData.youtubeVideos);
    return initialData.youtubeVideos;
  },

  async saveYouTubeVideo(video) {
    let saved = { ...video };
    if (isFirebaseConfigured && db) {
      // If saving a YouTube video and Firestore collection is empty, auto-seed default videos so existing videos are not lost
      try {
        const currentSnap = await getDocs(collection(db, 'youtubeVideos'));
        if (currentSnap.empty && initialData.youtubeVideos) {
          for (let i = 0; i < initialData.youtubeVideos.length; i++) {
            const item = initialData.youtubeVideos[i];
            const vId = item.id || `video-${i + 1}`;
            await setDoc(doc(db, 'youtubeVideos', vId), { ...item, id: vId, order: item.order || i + 1 }, { merge: true });
          }
        }
      } catch (checkErr) {
        console.warn('Auto-seed default youtubeVideos check warning:', checkErr);
      }

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
    const sortTimeline = (list) => {
      if (!list || !Array.isArray(list)) return [];
      return [...list].sort((a, b) => {
        if (typeof a.order === 'number' && typeof b.order === 'number') {
          return a.order - b.order;
        }
        const parseKey = (it) => {
          const str = String(it.year || it.date || '');
          const years = str.match(/\b(19\d\d|20\d\d)\b/g);
          if (years && years.length > 0) {
            const start = parseInt(years[0], 10);
            const end = years.length > 1 ? parseInt(years[1], 10) : (str.toLowerCase().includes('present') ? 2099 : start);
            return start * 1000 + end;
          }
          return 999999;
        };
        return parseKey(a) - parseKey(b);
      });
    };

    if (isFirebaseConfigured && db) {
      try {
        const querySnapshot = await getDocs(collection(db, 'timeline'));
        if (!querySnapshot.empty) {
          const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          const sorted = sortTimeline(items);
          setCachedData('timeline', sorted);
          return sorted;
        }
      } catch (err) {
        console.warn('Failed to fetch timeline from Firestore:', err);
      }
    }
    return sortTimeline(getCachedData('timeline', initialData.timeline));
  },

  async syncAllTimelineToFirestore() {
    if (isFirebaseConfigured && db) {
      for (let i = 0; i < initialData.timeline.length; i++) {
        const item = initialData.timeline[i];
        const timeId = item.id || `time-${i + 1}`;
        await setDoc(doc(db, 'timeline', timeId), { ...item, id: timeId }, { merge: true });
      }
    }
    setCachedData('timeline', initialData.timeline);
    return initialData.timeline;
  },

  async saveTimelineItem(item) {
    let saved = { ...item };
    if (isFirebaseConfigured && db) {
      try {
        const currentSnap = await getDocs(collection(db, 'timeline'));
        if (currentSnap.empty && initialData.timeline) {
          for (let i = 0; i < initialData.timeline.length; i++) {
            const it = initialData.timeline[i];
            const tId = it.id || `time-${i + 1}`;
            await setDoc(doc(db, 'timeline', tId), { ...it, id: tId }, { merge: true });
          }
        }
      } catch (checkErr) {
        console.warn('Auto-seed default timeline check warning:', checkErr);
      }

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

  async syncAllGalleryToFirestore() {
    if (isFirebaseConfigured && db) {
      for (let i = 0; i < initialData.gallery.length; i++) {
        const item = initialData.gallery[i];
        const gId = item.id || `img-${i + 1}`;
        await setDoc(doc(db, 'gallery', gId), { ...item, id: gId }, { merge: true });
      }
    }
    setCachedData('gallery', initialData.gallery);
    return initialData.gallery;
  },

  async saveGalleryItem(item) {
    let saved = { ...item };
    if (isFirebaseConfigured && db) {
      try {
        const currentSnap = await getDocs(collection(db, 'gallery'));
        if (currentSnap.empty && initialData.gallery) {
          for (let i = 0; i < initialData.gallery.length; i++) {
            const g = initialData.gallery[i];
            const gId = g.id || `img-${i + 1}`;
            await setDoc(doc(db, 'gallery', gId), { ...g, id: gId }, { merge: true });
          }
        }
      } catch (checkErr) {
        console.warn('Auto-seed default gallery check warning:', checkErr);
      }

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

  // --- Achievements & Certificates ---
  async getAchievements() {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, 'achievements'), orderBy('order', 'asc'));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const certs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setCachedData('achievements', certs);
          return certs;
        }
      } catch (err) {
        console.warn('Failed to fetch achievements from Firestore, using cache/seed:', err);
      }
    }
    return getCachedData('achievements', initialData.achievements);
  },

  async syncAllAchievementsToFirestore() {
    if (isFirebaseConfigured && db) {
      for (let i = 0; i < initialData.achievements.length; i++) {
        const item = initialData.achievements[i];
        const certId = item.id || `cert-${i + 1}`;
        await setDoc(doc(db, 'achievements', certId), { ...item, id: certId, order: item.order || i + 1 }, { merge: true });
      }
    }
    setCachedData('achievements', initialData.achievements);
    return initialData.achievements;
  },

  async saveAchievement(achievement) {
    let saved = { ...achievement };
    if (isFirebaseConfigured && db) {
      // Auto-seed if empty
      try {
        const currentSnap = await getDocs(collection(db, 'achievements'));
        if (currentSnap.empty && initialData.achievements) {
          for (let i = 0; i < initialData.achievements.length; i++) {
            const item = initialData.achievements[i];
            const cId = item.id || `cert-${i + 1}`;
            await setDoc(doc(db, 'achievements', cId), { ...item, id: cId, order: item.order || i + 1 }, { merge: true });
          }
        }
      } catch (checkErr) {
        console.warn('Auto-seed default achievements check warning:', checkErr);
      }

      if (achievement.id && !achievement.id.startsWith('temp-')) {
        const docRef = doc(db, 'achievements', achievement.id);
        await setDoc(docRef, saved, { merge: true });
      } else {
        const docRef = await addDoc(collection(db, 'achievements'), saved);
        saved.id = docRef.id;
      }
    } else {
      if (!saved.id) {
        saved.id = `cert-${Date.now()}`;
      }
    }

    const current = getCachedData('achievements', initialData.achievements);
    const index = current.findIndex(c => c.id === saved.id);
    let updatedList;
    if (index >= 0) {
      updatedList = [...current];
      updatedList[index] = saved;
    } else {
      updatedList = [...current, saved];
    }
    setCachedData('achievements', updatedList);
    return saved;
  },

  async deleteAchievement(achievementId) {
    if (isFirebaseConfigured && db) {
      await deleteDoc(doc(db, 'achievements', achievementId));
    }
    const current = getCachedData('achievements', initialData.achievements);
    const updated = current.filter(c => c.id !== achievementId);
    setCachedData('achievements', updated);
    return true;
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
  },

  // =========================================================================
  // REAL-TIME FIRESTORE SUBSCRIPTIONS (onSnapshot)
  // =========================================================================

  // 1. Profile Real-time Listener
  subscribeToProfile(onUpdate, onError) {
    if (!isFirebaseConfigured || !db) {
      onUpdate && onUpdate(getCachedData('profile', initialData.profile));
      return () => {};
    }
    const docRef = doc(db, 'profiles', 'main');
    return onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = { ...initialData.profile, ...docSnap.data() };
          setCachedData('profile', data);
          onUpdate && onUpdate(data);
        } else {
          onUpdate && onUpdate(initialData.profile);
        }
      },
      (err) => {
        console.warn('Firestore real-time profile listener error:', err);
        if (onError) onError(err);
        onUpdate && onUpdate(getCachedData('profile', initialData.profile));
      }
    );
  },

  // 2. Skills Real-time Listener
  subscribeToSkills(onUpdate, onError) {
    if (!isFirebaseConfigured || !db) {
      onUpdate && onUpdate(getCachedData('skills', initialData.skills));
      return () => {};
    }
    const q = query(collection(db, 'skills'), orderBy('order', 'asc'));
    return onSnapshot(
      q,
      (querySnapshot) => {
        if (!querySnapshot.empty) {
          const skills = querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
          setCachedData('skills', skills);
          onUpdate && onUpdate(skills);
        } else {
          onUpdate && onUpdate(initialData.skills);
        }
      },
      (err) => {
        console.warn('Firestore real-time skills listener error:', err);
        if (onError) onError(err);
        onUpdate && onUpdate(getCachedData('skills', initialData.skills));
      }
    );
  },

  // 3. Projects Real-time Listener
  subscribeToProjects(onUpdate, onError) {
    if (!isFirebaseConfigured || !db) {
      onUpdate && onUpdate(getCachedData('projects', initialData.projects));
      return () => {};
    }
    const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
    return onSnapshot(
      q,
      (querySnapshot) => {
        if (!querySnapshot.empty) {
          const projs = querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
          setCachedData('projects', projs);
          onUpdate && onUpdate(projs);
        } else {
          onUpdate && onUpdate(initialData.projects);
        }
      },
      (err) => {
        console.warn('Firestore real-time projects listener error:', err);
        if (onError) onError(err);
        onUpdate && onUpdate(getCachedData('projects', initialData.projects));
      }
    );
  },

  // 4. Published Projects Real-time Listener
  subscribeToPublishedProjects(onUpdate, onError) {
    if (!isFirebaseConfigured || !db) {
      onUpdate && onUpdate(getCachedData('publishedProjects', initialData.publishedProjects));
      return () => {};
    }
    const q = query(collection(db, 'publishedProjects'), orderBy('releaseDate', 'desc'));
    return onSnapshot(
      q,
      (querySnapshot) => {
        if (!querySnapshot.empty) {
          const pubs = querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
          setCachedData('publishedProjects', pubs);
          onUpdate && onUpdate(pubs);
        } else {
          onUpdate && onUpdate(initialData.publishedProjects);
        }
      },
      (err) => {
        console.warn('Firestore real-time published projects listener error:', err);
        if (onError) onError(err);
        onUpdate && onUpdate(getCachedData('publishedProjects', initialData.publishedProjects));
      }
    );
  },

  // 5. YouTube Channel Real-time Listener
  subscribeToYouTubeChannel(onUpdate, onError) {
    if (!isFirebaseConfigured || !db) {
      onUpdate && onUpdate(getCachedData('youtubeChannel', initialData.youtubeChannel));
      return () => {};
    }
    const docRef = doc(db, 'youtubeChannel', 'main');
    return onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = { ...initialData.youtubeChannel, ...docSnap.data() };
          setCachedData('youtubeChannel', data);
          onUpdate && onUpdate(data);
        } else {
          onUpdate && onUpdate(initialData.youtubeChannel);
        }
      },
      (err) => {
        console.warn('Firestore real-time youtubeChannel listener error:', err);
        if (onError) onError(err);
        onUpdate && onUpdate(getCachedData('youtubeChannel', initialData.youtubeChannel));
      }
    );
  },

  // 6. YouTube Videos Real-time Listener
  subscribeToYouTubeVideos(onUpdate, onError) {
    if (!isFirebaseConfigured || !db) {
      onUpdate && onUpdate(getCachedData('youtubeVideos', initialData.youtubeVideos));
      return () => {};
    }
    const q = query(collection(db, 'youtubeVideos'), orderBy('order', 'asc'));
    return onSnapshot(
      q,
      (querySnapshot) => {
        if (!querySnapshot.empty) {
          const vids = querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
          setCachedData('youtubeVideos', vids);
          onUpdate && onUpdate(vids);
        } else {
          onUpdate && onUpdate(initialData.youtubeVideos);
        }
      },
      (err) => {
        console.warn('Firestore real-time youtubeVideos listener error:', err);
        if (onError) onError(err);
        onUpdate && onUpdate(getCachedData('youtubeVideos', initialData.youtubeVideos));
      }
    );
  },

  // 7. Currently Building Radar Real-time Listener
  subscribeToCurrentlyBuilding(onUpdate, onError) {
    if (!isFirebaseConfigured || !db) {
      onUpdate && onUpdate(getCachedData('currentlyBuilding', initialData.currentlyBuilding));
      return () => {};
    }
    const docRef = doc(db, 'currentlyBuilding', 'main');
    return onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = { ...initialData.currentlyBuilding, ...docSnap.data() };
          setCachedData('currentlyBuilding', data);
          onUpdate && onUpdate(data);
        } else {
          onUpdate && onUpdate(initialData.currentlyBuilding);
        }
      },
      (err) => {
        console.warn('Firestore real-time currentlyBuilding listener error:', err);
        if (onError) onError(err);
        onUpdate && onUpdate(getCachedData('currentlyBuilding', initialData.currentlyBuilding));
      }
    );
  },

  // 8. Timeline Real-time Listener
  subscribeToTimeline(onUpdate, onError) {
    if (!isFirebaseConfigured || !db) {
      onUpdate && onUpdate(getCachedData('timeline', initialData.timeline));
      return () => {};
    }
    const q = query(collection(db, 'timeline'), orderBy('year', 'desc'));
    return onSnapshot(
      q,
      (querySnapshot) => {
        if (!querySnapshot.empty) {
          const items = querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
          setCachedData('timeline', items);
          onUpdate && onUpdate(items);
        } else {
          onUpdate && onUpdate(initialData.timeline);
        }
      },
      (err) => {
        console.warn('Firestore real-time timeline listener error:', err);
        if (onError) onError(err);
        onUpdate && onUpdate(getCachedData('timeline', initialData.timeline));
      }
    );
  },

  // 9. Gallery Real-time Listener
  subscribeToGallery(onUpdate, onError) {
    if (!isFirebaseConfigured || !db) {
      onUpdate && onUpdate(getCachedData('gallery', initialData.gallery));
      return () => {};
    }
    const q = query(collection(db, 'gallery'), orderBy('date', 'desc'));
    return onSnapshot(
      q,
      (querySnapshot) => {
        if (!querySnapshot.empty) {
          const items = querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
          setCachedData('gallery', items);
          onUpdate && onUpdate(items);
        } else {
          onUpdate && onUpdate(initialData.gallery);
        }
      },
      (err) => {
        console.warn('Firestore real-time gallery listener error:', err);
        if (onError) onError(err);
        onUpdate && onUpdate(getCachedData('gallery', initialData.gallery));
      }
    );
  },

  // 10. Site Settings Real-time Listener
  subscribeToSiteSettings(onUpdate, onError) {
    if (!isFirebaseConfigured || !db) {
      onUpdate && onUpdate(getCachedData('siteSettings', initialData.siteSettings));
      return () => {};
    }
    const docRef = doc(db, 'siteSettings', 'main');
    return onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = { ...initialData.siteSettings, ...docSnap.data() };
          setCachedData('siteSettings', data);
          onUpdate && onUpdate(data);
        } else {
          onUpdate && onUpdate(initialData.siteSettings);
        }
      },
      (err) => {
        console.warn('Firestore real-time siteSettings listener error:', err);
        if (onError) onError(err);
        onUpdate && onUpdate(getCachedData('siteSettings', initialData.siteSettings));
      }
    );
  },

  // 11. Achievements & Certificates Real-time Listener
  subscribeToAchievements(onUpdate, onError) {
    if (!isFirebaseConfigured || !db) {
      onUpdate && onUpdate(getCachedData('achievements', initialData.achievements));
      return () => {};
    }
    const q = query(collection(db, 'achievements'), orderBy('order', 'asc'));
    return onSnapshot(
      q,
      (querySnapshot) => {
        if (!querySnapshot.empty) {
          const items = querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
          setCachedData('achievements', items);
          onUpdate && onUpdate(items);
        } else {
          onUpdate && onUpdate(initialData.achievements);
        }
      },
      (err) => {
        console.warn('Firestore real-time achievements listener error:', err);
        if (onError) onError(err);
        onUpdate && onUpdate(getCachedData('achievements', initialData.achievements));
      }
    );
  },

  // 12. Contact Messages Real-time Listener (for CMS Admin)
  subscribeToContactMessages(onUpdate, onError) {
    if (!isFirebaseConfigured || !db) {
      onUpdate && onUpdate(getCachedData('contactMessages', []));
      return () => {};
    }
    const q = query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc'));
    return onSnapshot(
      q,
      (querySnapshot) => {
        if (!querySnapshot.empty) {
          const msgs = querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
          setCachedData('contactMessages', msgs);
          onUpdate && onUpdate(msgs);
        } else {
          onUpdate && onUpdate([]);
        }
      },
      (err) => {
        console.warn('Firestore real-time contact messages listener error:', err);
        if (onError) onError(err);
        onUpdate && onUpdate(getCachedData('contactMessages', []));
      }
    );
  }
};
