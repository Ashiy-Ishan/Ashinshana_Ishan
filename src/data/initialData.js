// src/data/initialData.js
import personImg from '../Iamage/person.png';
import developerImg from '../Iamage/developer.png';
import youtuberImg from '../Iamage/youtuber.png';
import curlymaxLogo from '../Iamage/curlymax.png';
import profilePhoto from '../Iamage/profile.png';
import rPhoto from '../Iamage/r.jpg';
import portfolioImg from '../Iamage/portfolio.png';
import bankImg from '../Iamage/bank.png';
import javaImg from '../Iamage/java.png';
import funWebImg from '../Iamage/fun_web.png';

export const initialData = {
  profile: {
    id: 'main',
    name: 'Ashinshana',
    fullName: 'Ashinshana Ishan',
    title: 'Developer • Creator • Builder',
    motto: 'I BUILD. I CREATE. I SHARE.',
    statement: 'I build software, create content, and turn ideas into things people can use.',
    bio: "I’m an undergraduate at Sabaragamuwa University of Sri Lanka, passionate about modern web development, backend engineering, UI/UX design, and tech content creation. I enjoy turning complex ideas into elegant, user-focused digital experiences.",
    location: 'Sri Lanka',
    university: 'Sabaragamuwa University of Sri Lanka',
    degree: 'BSc (Hons) in Computing / Information Systems',
    school: 'Bandaranayake College, Gampaha',
    alStream: 'G.C.E. (A/L) Physical Science Stream (2014 - 2022)',
    status: 'Undergraduate & Tech Creator',
    profileImage: personImg,
    developerImage: developerImg,
    creatorImage: youtuberImg,
    personalImage: personImg,
    heroImageDeveloper: developerImg,
    heroImageCreator: youtuberImg,
    heroImagePersonal: personImg,
    highResPhoto: rPhoto,
    resumeUrl: 'https://drive.google.com/file/d/1kfXhS5lFAV9yJSBghOLv_vswnreFRutB/view?usp=sharing',
    email: 'ashinshanaishan@gmail.com',
    whatsapp: '94759428249',
    github: 'https://github.com/Ashiy-Ishan',
    linkedin: 'https://www.linkedin.com/in/ashinshana-ishan-73b228318',
    youtube: 'https://www.youtube.com/@ashiy_ish',
    instagram: 'https://www.instagram.com/a_s_h_i_y_ishan/',
    facebook: 'https://web.facebook.com/profile.php?id=61553251979579',
    dynamicRoles: [
      'Software Developer',
      'YouTube Creator',
      'Full-Stack Builder',
      'UI/UX Designer',
      'Tech Enthusiast',
      'Internet of Things'
    ]
  },

  skillCategories: [
    { id: 'languages', name: 'Programming Languages', order: 1 },
    { id: 'frontend', name: 'Frontend', order: 2 },
    { id: 'backend', name: 'Backend', order: 3 },
    { id: 'mobile', name: 'Mobile', order: 4 },
    { id: 'database', name: 'Database', order: 5 },
    { id: 'tools', name: 'Design & Creative Tools', order: 6 },
    { id: 'devops', name: 'DevOps & Cloud', order: 7 }
  ],

  skills: [
    {
      id: 'skill-react',
      name: 'React.js',
      category: 'Frontend',
      icon: 'devicon-react-original',
      description: 'Building modern dynamic component architectures, hooks, state management.',
      level: 'Proficient',
      order: 1,
      featured: true
    },
    {
      id: 'skill-javascript',
      name: 'JavaScript (ES6+)',
      category: 'Programming Languages',
      icon: 'devicon-javascript-plain',
      description: 'Modern asynchronous programming, DOM APIs, modern ECMAScript standards.',
      level: 'Proficient',
      order: 2,
      featured: true
    },
    {
      id: 'skill-java',
      name: 'Java',
      category: 'Programming Languages',
      icon: 'devicon-java-plain',
      description: 'Object-oriented programming, data structures, algorithms, desktop/console apps.',
      level: 'Advanced',
      order: 3,
      featured: true
    },
    {
      id: 'skill-python',
      name: 'Python',
      category: 'Programming Languages',
      icon: 'devicon-python-plain',
      description: 'Scripting, backend automation, data handling, and scientific computing.',
      level: 'Intermediate',
      order: 4,
      featured: true
    },
    {
      id: 'skill-cpp',
      name: 'C++',
      category: 'Programming Languages',
      icon: 'devicon-cplusplus-plain',
      description: 'Performance-critical systems, competitive programming, low-level logic.',
      level: 'Intermediate',
      order: 5,
      featured: false
    },
    {
      id: 'skill-c',
      name: 'C',
      category: 'Programming Languages',
      icon: 'devicon-c-plain',
      description: 'Foundational programming, memory management, pointers, and systems logic.',
      level: 'Intermediate',
      order: 6,
      featured: false
    },
    {
      id: 'skill-html5',
      name: 'HTML5 & Semantic Web',
      category: 'Frontend',
      icon: 'devicon-html5-plain',
      description: 'Accessible semantic markup, SEO, modern web standards.',
      level: 'Advanced',
      order: 7,
      featured: false
    },
    {
      id: 'skill-css3',
      name: 'CSS3 & Modern Layouts',
      category: 'Frontend',
      icon: 'devicon-css3-plain',
      description: 'Flexbox, Grid, custom properties, animations, responsive design.',
      level: 'Advanced',
      order: 8,
      featured: false
    },
    {
      id: 'skill-ballerina',
      name: 'Ballerina',
      category: 'Backend',
      icon: 'devicon-ballerina-plain',
      description: 'Cloud-native integration, microservices, network-aware programming.',
      level: 'Intermediate',
      order: 9,
      featured: true
    },
    {
      id: 'skill-kotlin',
      name: 'Kotlin',
      category: 'Mobile',
      icon: 'devicon-kotlin-plain',
      description: 'Android application development, modern null-safe syntax.',
      level: 'Familiar',
      order: 10,
      featured: false
    },
    {
      id: 'skill-mysql',
      name: 'MySQL',
      category: 'Database',
      icon: 'devicon-mysql-plain',
      description: 'Relational schema design, querying, indexing, foreign keys.',
      level: 'Intermediate',
      order: 11,
      featured: true
    },
    {
      id: 'skill-figma',
      name: 'Figma',
      category: 'Design & Creative Tools',
      icon: 'devicon-figma-plain',
      description: 'UI/UX wireframing, interactive prototyping, design systems.',
      level: 'Proficient',
      order: 12,
      featured: true
    },
    {
      id: 'skill-photoshop',
      name: 'Adobe Photoshop',
      category: 'Design & Creative Tools',
      icon: 'devicon-photoshop-plain',
      description: 'Graphic design, YouTube thumbnails, photo editing, asset creation.',
      level: 'Advanced',
      order: 13,
      featured: true
    },
    {
      id: 'skill-premiere',
      name: 'Adobe Premiere Pro',
      category: 'Design & Creative Tools',
      icon: 'devicon-premierepro-plain',
      description: 'Video editing, pacing, color grading, YouTube content production.',
      level: 'Advanced',
      order: 14,
      featured: true
    },
    {
      id: 'skill-git',
      name: 'Git & GitHub',
      category: 'DevOps & Cloud',
      icon: 'devicon-git-plain',
      description: 'Version control, branch management, open source collaboration.',
      level: 'Proficient',
      order: 15,
      featured: true
    },
    {
      id: 'skill-firebase',
      name: 'Firebase',
      category: 'Backend',
      icon: 'devicon-firebase-plain',
      description: 'Firestore NoSQL, Authentication, Storage, security rules.',
      level: 'Proficient',
      order: 16,
      featured: true
    }
  ],

  projects: [
    {
      id: 'proj-lumina-chat',
      title: 'Lumina Instant Messaging (Individual)',
      shortDescription: 'Fast real-time chat app designed to handle thousands of concurrent users with low latency.',
      description: 'Built a fast real-time chat app designed to handle thousands of users at once. Used Go for low-latency messaging, Redis for instant status updates, a Next.js frontend, PostgreSQL to save chat history, and Docker for smooth cloud deployment.',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      technologies: ['Go', 'Kotlin', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Render', 'Next.js'],
      category: 'Backend',
      githubUrl: 'https://github.com/Ashiy-Ishan',
      liveUrl: '',
      demoUrl: '',
      date: '2025',
      status: 'Ongoing',
      featured: true,
      published: true,
      order: 1
    },
    {
      id: 'proj-shortm-automation',
      title: 'ShortM (Individual)',
      shortDescription: 'Automated YouTube Shorts creation, subtitle generation, and direct publishing desktop app.',
      description: 'A Windows and Linux application that automates YouTube Shorts creation, subtitle generation, and direct uploading to YouTube. It simplifies the entire workflow, saving time and reducing manual effort.',
      imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
      technologies: ['Python', 'Flask', 'JavaScript', 'HTML5', 'CSS3', 'YouTube API'],
      category: 'Desktop',
      githubUrl: 'https://github.com/Ashiy-Ishan',
      liveUrl: '',
      demoUrl: '',
      date: '2025',
      status: 'Ongoing',
      featured: true,
      published: true,
      order: 2
    },
    {
      id: 'proj-agelink-iot',
      title: 'AgeLink - IoT Smart Health Assistant for Elderly Care',
      shortDescription: 'Dual-connectivity IoT device (ESP32) and companion mobile app designed to solve medication non-adherence among the elderly.',
      description: 'Designed and prototyped AgeLink, an IoT health assistant. Features ESP32 embedded C++ firmware with Wi-Fi/GSM (SIM800L) dual-connectivity, Firebase Realtime Database sync, LittleFS offline JSON resilience, I2S audio via MAX98357 amplifier, and PDPA/GDPR compliant privacy architecture.',
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      technologies: ['C++', 'ESP32', 'IoT', 'Firebase', 'Embedded Systems', 'FreeRTOS', 'Flutter'],
      category: 'IoT',
      githubUrl: 'https://www.linkedin.com/in/ashinshana-ishan/overlay/Project/1686683068/treasury/?profileId=ACoAAFB6tB8BQXhbQN5e63o9pYu2jNxLykzy_oQ',
      liveUrl: 'https://www.linkedin.com/in/ashinshana-ishan/overlay/Project/1686683068/treasury/?profileId=ACoAAFB6tB8BQXhbQN5e63o9pYu2jNxLykzy_oQ',
      demoUrl: 'https://www.linkedin.com/in/ashinshana-ishan/overlay/Project/1686683068/treasury/?profileId=ACoAAFB6tB8BQXhbQN5e63o9pYu2jNxLykzy_oQ',
      date: '2025',
      status: 'In Development',
      featured: true,
      published: true,
      order: 1
    },
    {
      id: 'proj-smart-ai-alarm',
      title: 'Smart AI Alarm System',
      shortDescription: 'Production-ready IoT-enabled smart alarm clock dynamically calculating optimal wake-up times using Machine Learning.',
      description: 'Collaborated in a 5-person team to engineer an IoT-enabled smart alarm clock powered by LightGBM machine learning heuristics, Flutter cross-platform mobile app, Python Flask backend, ESP32 hardware with DHT/motion sensors, OLED display, and Google Maps/Calendar/OpenWeather APIs.',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      technologies: ['Python', 'Flask', 'Flutter', 'LightGBM', 'ESP32', 'Firebase', 'MongoDB', 'IoT'],
      category: 'AI',
      githubUrl: 'https://github.com/Ashiy-Ishan',
      liveUrl: 'https://www.linkedin.com/in/ashinshana-ishan/',
      demoUrl: 'https://www.linkedin.com/in/ashinshana-ishan/',
      date: '2025',
      status: 'Live',
      featured: true,
      published: true,
      order: 2
    },
    {
      id: 'proj-portfolio-v2',
      title: 'Cinematic Personal Brand Portfolio & CMS',
      shortDescription: 'A dynamic, high-performance portfolio featuring interactive role transitions, custom Firebase CMS, and responsive dark aesthetics.',
      description: 'Architected a multi-faceted personal brand website representing Developer, Creator, and Personal dimensions. Includes a full-featured authenticated admin dashboard, Firestore synchronization, media gallery, and GitHub Pages deployment.',
      imageUrl: portfolioImg,
      technologies: ['React', 'Firebase', 'Firestore', 'CSS Grid', 'GitHub Pages'],
      category: 'Web',
      githubUrl: 'https://github.com/Ashiy-Ishan/Portfolio.git',
      liveUrl: 'https://Ashiy-Ishan.github.io/Ashinshana_Ishan/',
      demoUrl: 'https://Ashiy-Ishan.github.io/Ashinshana_Ishan/',
      date: '2025',
      status: 'Live',
      featured: true,
      published: true,
      order: 3
    },
    {
      id: 'proj-ecommerce-backend',
      title: 'Slithering Transaction Core',
      shortDescription: 'Microservice-oriented banking logic engine supporting atomic data manipulation and resilient service boundaries.',
      description: 'Microservice-oriented banking logic engine supporting atomic data manipulation and resilient service boundaries. Engineered backend infrastructure handling account transactions, product inventory, and relational data management in MySQL.',
      imageUrl: bankImg,
      technologies: ['Ballerina', 'JavaScript', 'MySQL', 'REST API'],
      category: 'Backend',
      githubUrl: 'https://github.com/Ashiy-Ishan/iwb096-slithering.git',
      liveUrl: '',
      demoUrl: '',
      date: '2024-11',
      status: 'Open Source',
      featured: false,
      published: true,
      order: 4
    },
    {
      id: 'proj-java-maths',
      title: 'Kids Math Trainer CLI & GUI',
      shortDescription: 'Educational software generating arithmetic challenge sets with instant validation.',
      description: 'Educational software generating arithmetic challenge sets with instant validation. Engineered a Java application generating randomized addition, subtraction, and multiplication challenges with scoring feedback and dynamic difficulty progression.',
      imageUrl: javaImg,
      technologies: ['Java 17 Standard Edition', 'OOP', 'GUI', 'Algorithms'],
      category: 'Desktop',
      githubUrl: 'https://github.com/Ashiy-Ishan/Java_mini-Project.git',
      liveUrl: '',
      demoUrl: '',
      date: '2024-06',
      status: 'Released',
      featured: false,
      published: true,
      order: 5
    },
    {
      id: 'proj-funweb',
      title: 'Interactive Web Experience & Experiments',
      shortDescription: 'Showcase of interactive frontend experiments, CSS micro-animations, and modern web UI components.',
      description: 'Experimental web project exploring modern UI interactions, responsive layouts, creative hover effects, and performance optimizations deployed on Vercel.',
      imageUrl: funWebImg,
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Vercel'],
      category: 'Web',
      githubUrl: 'https://github.com/Ashiy-Ishan/funweb-vercel-release.git',
      liveUrl: 'https://funweb-vercel-release.vercel.app',
      demoUrl: 'https://funweb-vercel-release.vercel.app',
      date: '2024',
      status: 'Live',
      featured: false,
      published: true,
      order: 6
    }
  ],

  publishedProjects: [
    {
      id: 'pub-1',
      name: 'Ashinshana Portfolio CMS Engine',
      version: 'v2.0.0',
      releaseDate: '2025-02',
      technology: 'React 19, Firebase Firestore, CSS Modern Modules',
      github: 'https://github.com/Ashiy-Ishan/Portfolio.git',
      liveDemo: 'https://Ashiy-Ishan.github.io/Ashinshana_Ishan/',
      status: 'Live',
      description: 'An interactive personal brand portfolio engine with dynamic role switching and headless Firestore CMS management.'
    }
  ],

  youtubeChannel: {
    channelName: 'CURLYmax',
    handle: '@ashiy_ish',
    channelUrl: 'https://www.youtube.com/@ashiy_ish/videos',
    channelImage: curlymaxLogo,
    description: 'Official YouTube channel of CURLYmax featuring competition demos, hackathon project presentations, IoT architectures, and technical flows & architectural explanations.',
    subscribers: '60',
    views: '800+',
    videos: '3',
    featuredVideoId: 'video-1'
  },

  youtubeVideos: [
    {
      id: 'video-1',
      youtubeId: 'pxNniyob8v8',
      title: 'Slithering || Bank Loan Tracking System',
      thumbnailUrl: 'https://img.youtube.com/vi/pxNniyob8v8/hqdefault.jpg',
      description: 'Web-based Bank Loan Tracking System (BLS) presentation focused on technical flows: dual-role authentication (Admin & User), end-to-end loan status progress tracking, and Ballerina API integration architecture.',
      publishedAt: '2024-10-20',
      duration: '6:36',
      views: '250+',
      url: 'https://youtu.be/pxNniyob8v8',
      featured: true,
      category: 'Competition',
      order: 1
    },
    {
      id: 'video-2',
      youtubeId: 'g0GK9anwC6k',
      title: 'KING Codes | Webify.me',
      thumbnailUrl: 'https://img.youtube.com/vi/g0GK9anwC6k/hqdefault.jpg',
      description: 'AI-powered presentation slide generation platform demo focused on technical flows: Google Gemini API pipeline, SHA-256 secure auth handshake, React interactive canvas, and Ballerina/Python microservices.',
      publishedAt: '2025-08-31',
      duration: '9:19',
      views: '320+',
      url: 'https://youtu.be/g0GK9anwC6k',
      featured: true,
      category: 'Competition',
      order: 2
    },
    {
      id: 'video-3',
      youtubeId: 'Dg8cj1AjC2k',
      title: 'AgeLink: Empowering Elderly Independence | Team XTurbo | HackElite 3.0',
      thumbnailUrl: 'https://img.youtube.com/vi/Dg8cj1AjC2k/hqdefault.jpg',
      description: 'IoT-enabled smart medication dispenser and elderly monitoring solution walkthrough focused on technical flows: ESP32 Wi-Fi/GSM dual-connectivity fallback, LittleFS offline state machines, and real-time Firebase sync.',
      publishedAt: '2026-08-11',
      duration: '7:00',
      views: '280+',
      url: 'https://youtu.be/Dg8cj1AjC2k',
      featured: true,
      category: 'Competition',
      order: 3
    }
  ],

  currentlyBuilding: {
    id: 'main',
    building: {
      title: 'Lumina Instant Messaging (Individual)',
      badge: 'ONGOING',
      role: 'Full-Stack & Systems Engineer',
      tech: 'Go, Kotlin, PostgreSQL, Redis, Docker, AWS/Render',
      description: 'Built a fast real-time chat app designed to handle thousands of users at once. Used Go for low-latency messaging, Redis for instant status updates, a Next.js frontend, PostgreSQL to save chat history, and Docker for smooth cloud deployment.'
    },
    learning: {
      title: 'ShortM (Individual)',
      badge: 'ONGOING',
      role: 'Full Stack Developer',
      tech: 'HTML, CSS, JS, Python, Flask',
      description: 'A Windows and Linux application that automates YouTube Shorts creation, subtitle generation, and direct uploading to YouTube. It simplifies the entire workflow, saving time and reducing manual effort.'
    },
    creating: {
      title: 'Technical Flows & Architectural Walkthroughs',
      badge: 'Content',
      role: 'Tech Creator',
      tech: 'Figma, Premiere Pro, System Diagrams',
      description: 'Producing video breakdowns focused on technical flows, systems architecture explanations, and interactive live demos.'
    },
    exploring: {
      title: 'Generative AI Integration & IoT Edge Devices',
      badge: 'R&D',
      role: 'Researcher',
      tech: 'ESP32, Gemini API, FreeRTOS, Embedded C++',
      description: 'Testing multimodal AI models and hardware micro-controllers for smart automation and edge telemetry.'
    }
  },

  timeline: [
    {
      id: 'time-school',
      year: '2014 - 2022',
      title: 'Bandaranayake College, Gampaha',
      subtitle: 'G.C.E. (A/L) Examination in Physical Science Stream',
      description: 'Completed secondary education in the Physical Science stream (2014 - 2022), developing core analytical problem solving, higher mathematics, and physics fundamentals.',
      type: 'education',
      badge: 'School'
    },
    {
      id: 'time-1',
      year: '2023 - Present',
      title: 'Sabaragamuwa University of Sri Lanka',
      subtitle: 'Undergraduate Studies in Computing / Software Development',
      description: 'Studying core computer science fundamentals, software engineering methodologies, database management systems, and algorithms.',
      type: 'education',
      badge: 'University'
    },
    {
      id: 'time-3',
      year: '2024 - 2025',
      title: 'Content Creation & YouTube Tech Channel',
      subtitle: 'Ashinshana Ishan Tech & Tutorials',
      description: 'Expanded into tech education, producing video breakdowns, UI design tutorials in Figma, and frontend coding sessions.',
      type: 'creator',
      badge: 'Content'
    },
    {
      id: 'time-4',
      year: '2025',
      title: 'Portfolio 2.0 Architectural Overhaul',
      subtitle: 'Cinematic Personal Brand Platform',
      description: 'Re-engineered portfolio into a unified 3-role identity platform with dedicated CMS capabilities and Firestore integration.',
      type: 'milestone',
      badge: 'Current'
    }
  ],

  gallery: [
    {
      id: 'img-1',
      title: 'Profile Portrait (Ashinshana Ishan)',
      category: 'Portrait',
      url: profilePhoto,
      isHeroImage: true,
      isDeveloperImage: true,
      isCreatorImage: true,
      isProfileImage: true,
      date: '2025-01'
    },
    {
      id: 'img-2',
      title: 'High Resolution Photo',
      category: 'Portrait',
      url: rPhoto,
      isHeroImage: false,
      isDeveloperImage: false,
      isCreatorImage: false,
      isProfileImage: false,
      date: '2025-01'
    },
    {
      id: 'img-3',
      title: 'Personal Portfolio UI',
      category: 'Project',
      url: portfolioImg,
      date: '2025-01'
    },
    {
      id: 'img-4',
      title: 'E-Commerce Backend Interface',
      category: 'Project',
      url: bankImg,
      date: '2024-11'
    },
    {
      id: 'img-5',
      title: 'Java Arithmetic Project',
      category: 'Project',
      url: javaImg,
      date: '2024-06'
    },
    {
      id: 'img-6',
      title: 'Fun Web Experiment',
      category: 'Project',
      url: funWebImg,
      date: '2024-05'
    }
  ],

  achievements: [
    {
      id: 'cert-tensorforge',
      title: '1st Runner Up in TENSORFORGE',
      issuer: 'General Sir John Kotelawala Defence University',
      date: 'Oct 2025',
      category: 'AI & Machine Learning',
      description: 'Awarded 1st Runner Up in the TENSORFORGE Machine Learning competition for building competitive machine learning models and Python-based predictive algorithms.',
      badge: '1st Runner Up',
      imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
      credentialUrl: 'https://drive.google.com/file/d/1fOlLjqrCOuoaEQWFtE2wwqHEHwen0ysV/view?usp=sharing'
    },
    {
      id: 'cert-ideax-hackx',
      title: 'Certificate of Appreciation — ideaX (Semi-Finals of hackX 10.0)',
      issuer: 'Dept. of Industrial Management, University of Kelaniya',
      date: 'Oct 2025',
      category: 'IoT & Innovation',
      description: 'Certificate of Appreciation for qualifying and competing in the semi-finals of hackX 10.0 (ideaX), developing innovative Arduino and IoT hardware solutions.',
      badge: 'Semi-Finalist',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      credentialUrl: 'https://drive.google.com/file/d/1o-V48vdkLYrw7bbPo76KuFBb9i-ONaYs/view?usp=drive_link'
    },
    {
      id: 'cert-cisco-cybersecurity',
      title: 'Introduction to Cybersecurity Certification',
      issuer: 'Cisco Networking Academy',
      date: 'Dec 2025',
      category: 'Cybersecurity',
      description: 'Certified by Cisco Networking Academy in core cybersecurity principles, threat defense, network security best practices, and data protection.',
      badge: 'Cisco Certified',
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
      credentialUrl: 'https://www.credly.com/badges/ae2bf5f5-d932-46b6-841b-bd600738a4e0'
    },
    {
      id: 'cert-cisco-python-essentials',
      title: 'Python Essentials 1 — Statement of Achievement',
      issuer: 'Cisco Networking Academy & OpenEDG Python Institute',
      date: 'Nov 2025',
      category: 'Software Engineering',
      description: 'Certified in designing, developing, debugging, and refactoring Python 3 programs, mastering algorithmic thinking, Python syntax, Standard Library, and PCEP preparation.',
      badge: 'OpenEDG / Cisco',
      imageUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80',
      credentialUrl: 'https://drive.google.com/file/d/1N5SaIqmS0owwqEx0WK_oxthBDbZp3-jb/view?usp=drive_link'
    },
    {
      id: 'cert-hemas-aithon',
      title: 'Hemas AITHON Participation Certificate',
      issuer: 'Hemas Holdings PLC',
      date: '2025',
      category: 'AI & Vibe Coding',
      description: 'Participated in the Hemas AITHON AI hackathon, focusing on modern generative AI integrations, vibe coding methodologies, and agile prototype delivery.',
      badge: 'Participant',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      credentialUrl: 'https://www.linkedin.com/in/ashinshana-ishan/overlay/Certifications/2090323482/treasury/?profileId=ACoAAFB6tB8BQXhbQN5e63o9pYu2jNxLykzy_oQ'
    },
    {
      id: 'cert-hackelite',
      title: 'Hackelite 2.0 Participation Certificate',
      issuer: 'IEEE WIE Student Branch, University of Moratuwa',
      date: 'Sep 2025',
      category: 'Mobile Development',
      description: 'Participated in Hackelite 2.0 hackathon, building mobile application prototypes utilizing Flutter and Android architecture.',
      badge: 'IEEE Moratuwa',
      imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
      credentialUrl: 'https://www.linkedin.com/in/ashinshana-ishan/overlay/Certifications/2089949848/treasury/?profileId=ACoAAFB6tB8BQXhbQN5e63o9pYu2jNxLykzy_oQ'
    },
    {
      id: 'cert-jpura-xtream',
      title: 'J\'PURA XTREAM Competitive Programming Certificate',
      issuer: 'University of Sri Jayewardenepura',
      date: 'Oct 2025',
      category: 'Algorithms',
      description: 'Participated in J\'PURA XTREAM algorithmic hackathon, solving complex computational problem sets in Python and C.',
      badge: 'Competitive Coding',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      credentialUrl: 'https://drive.google.com/file/d/1xg6neadGWaOeLX-BwN-H6jNFJ2PyV_hy/view?usp=sharing'
    },
    {
      id: 'cert-moraxtreme',
      title: 'MoraXtreme 9.0 Hackathon Certificate of Participation',
      issuer: 'IEEE Student Branch, University of Moratuwa',
      date: 'Nov 2024',
      category: 'Hackathon',
      description: 'Achieved 94th place in MoraXtreme 9.0, solving algorithmic and data structure challenges under strict time bounds with team members.',
      badge: 'Top 100 Finish',
      imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
      credentialUrl: 'https://drive.google.com/file/d/1W0Obwxnnu_W5SwXjGTOeWqd3IdjvdiQ5/view?usp=drivesdk'
    },
    {
      id: 'cert-wso2-ballerina',
      title: 'Innovate with Ballerina Coding Challenge Certificate',
      issuer: 'WSO2',
      date: 'Nov 2024',
      category: 'Cloud Architecture',
      description: 'Completed the WSO2 Ballerina coding challenge, designing cloud-native integration microservices and RESTful API endpoints.',
      badge: 'WSO2 Certified',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
      credentialUrl: 'https://drive.google.com/file/d/1VVqbKMp9MAu49si1-FycHKFKFczYeFW7/view?usp=sharing'
    },
    {
      id: 'cert-hackerrank-python',
      title: 'HackerRank Python (Basic) Skill Certificate',
      issuer: 'HackerRank',
      date: 'Nov 2024',
      category: 'Problem Solving',
      description: 'Validated foundational Python proficiencies covering scalar types, control flow, strings, collections, modularity, OOP classes, and iteration.',
      badge: 'HackerRank Verified',
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      credentialUrl: 'https://www.hackerrank.com/certificates/iframe/945bb823f36d'
    }
  ],

  siteSettings: {
    siteTitle: 'Ashinshana Ishan | Developer • Creator • Builder',
    tagline: 'I BUILD. I CREATE. I SHARE.',
    metaDescription: 'Ashinshana Ishan is a software developer and content creator building software, exploring technology and sharing knowledge through YouTube.',
    accentColor: '#00d2ff',
    developerAccent: '#38bdf8',
    creatorAccent: '#ff3366',
    showHeroRoles: true,
    showDeveloperSection: true,
    showCreatorSection: true,
    showPublishedProjects: true,
    showTimeline: true,
    showCurrentlyBuilding: true,
    showContactForm: true,
    emailNotifications: true
  },

  contactMessages: []
};
