// src/data/initialData.js
import profilePhoto from '../Iamage/profile.jpg';
import rPhoto from '../Iamage/r.jpg';
import portfolioImg from '../Iamage/portfolio.png';
import bankImg from '../Iamage/bank.png';
import javaImg from '../Iamage/java.png';
import funWebImg from '../Iamage/fun_web.png';

export const initialData = {
  profile: {
    id: 'main',
    name: 'Ashiy Ishan',
    fullName: 'Ashinshana Ishan',
    title: 'Developer • Creator • Builder',
    motto: 'I BUILD. I CREATE. I SHARE.',
    statement: 'I build software, create content, and turn ideas into things people can use.',
    bio: "I'm a passionate undergraduate at Sabaragamuwa University of Sri Lanka, deeply focused on modern web development, backend engineering, UI/UX design, and technology content creation. I love turning complex logic into elegant, human-centric software.",
    location: 'Sri Lanka',
    university: 'Sabaragamuwa University of Sri Lanka',
    degree: 'BSc (Hons) in Computing / Information Systems',
    status: 'Undergraduate & Tech Creator',
    profileImage: profilePhoto,
    developerImage: profilePhoto,
    creatorImage: profilePhoto,
    personalImage: profilePhoto,
    heroImageDeveloper: profilePhoto,
    heroImageCreator: profilePhoto,
    heroImagePersonal: profilePhoto,
    highResPhoto: rPhoto,
    resumeUrl: 'https://github.com/Ashiy-Ishan',
    email: 'ashinshanaishan@gmail.com',
    whatsapp: '94759428249',
    github: 'https://github.com/Ashiy-Ishan',
    linkedin: 'https://www.linkedin.com/in/ashinshana-ishan-73b228318',
    youtube: 'https://www.youtube.com/@AshiyIshan',
    instagram: 'https://www.instagram.com/a_s_h_i_y_ishan/',
    facebook: 'https://web.facebook.com/profile.php?id=61553251979579',
    dynamicRoles: [
      'Software Developer',
      'YouTube Creator',
      'Full-Stack Builder',
      'UI/UX Designer',
      'Tech Enthusiast'
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
      order: 1
    },
    {
      id: 'proj-ecommerce-backend',
      title: 'E-Commerce & Banking Backend System',
      shortDescription: 'Robust backend architecture for transaction processing and e-commerce banking workflows with secure database operations.',
      description: 'Developed an enterprise-grade backend infrastructure handling account transactions, product inventory, order routing, and relational data management in MySQL.',
      imageUrl: bankImg,
      technologies: ['JavaScript', 'Ballerina', 'MySQL', 'REST API'],
      category: 'Backend',
      githubUrl: 'https://github.com/Ashiy-Ishan/iwb096-slithering.git',
      liveUrl: '',
      demoUrl: '',
      date: '2024',
      status: 'Open Source',
      featured: true,
      published: true,
      order: 2
    },
    {
      id: 'proj-java-maths',
      title: 'Mini Java Maths Problem Generator for Kids',
      shortDescription: 'An interactive mathematical training application designed to foster arithmetic agility in young learners.',
      description: 'Engineered a Java application generating randomized addition, subtraction, and multiplication challenges with scoring feedback and dynamic difficulty progression.',
      imageUrl: javaImg,
      technologies: ['Java', 'OOP', 'GUI', 'Algorithms'],
      category: 'Desktop',
      githubUrl: 'https://github.com/Ashiy-Ishan/Java_mini-Project.git',
      liveUrl: '',
      demoUrl: '',
      date: '2024',
      status: 'Released',
      featured: false,
      published: true,
      order: 3
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
      order: 4
    }
  ],

  publishedProjects: [
    {
      id: 'pub-1',
      name: 'Ashiy Portfolio CMS Engine',
      version: 'v2.0.0',
      releaseDate: '2025-02',
      technology: 'React 19, Firebase Firestore, CSS Modern Modules',
      github: 'https://github.com/Ashiy-Ishan/Portfolio.git',
      liveDemo: 'https://Ashiy-Ishan.github.io/Ashinshana_Ishan/',
      status: 'Live',
      description: 'An interactive personal brand portfolio engine with dynamic role switching and headless Firestore CMS management.'
    },
    {
      id: 'pub-2',
      name: 'Slithering Transaction Core',
      version: 'v1.1.0',
      releaseDate: '2024-11',
      technology: 'Ballerina, JavaScript, MySQL',
      github: 'https://github.com/Ashiy-Ishan/iwb096-slithering.git',
      liveDemo: '',
      status: 'Open Source',
      description: 'Microservice-oriented banking logic engine supporting atomic data manipulation and resilient service boundaries.'
    },
    {
      id: 'pub-3',
      name: 'Kids Math Trainer CLI & GUI',
      version: 'v1.0.0',
      releaseDate: '2024-06',
      technology: 'Java 17 Standard Edition',
      github: 'https://github.com/Ashiy-Ishan/Java_mini-Project.git',
      liveDemo: '',
      status: 'Released',
      description: 'Educational software generating arithmetic challenge sets with instant validation.'
    }
  ],

  youtubeChannel: {
    channelName: 'Ashiy Ishan',
    handle: '@AshiyIshan',
    channelUrl: 'https://www.youtube.com/@AshiyIshan',
    channelImage: profilePhoto,
    description: 'Welcome to my creative space where I share coding tutorials, software engineering insights, developer setups, UI/UX breakdowns, and tech experiments.',
    subscribers: '1.5K+',
    views: '48K+',
    videos: '25+',
    featuredVideoId: 'video-1'
  },

  youtubeVideos: [
    {
      id: 'video-1',
      youtubeId: 'dQw4w9WgXcQ',
      title: 'Building a Full-Stack React & Firebase Application From Scratch',
      thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      description: 'A complete step-by-step walkthrough on building scalable React applications backed by Firestore and Firebase Auth.',
      publishedAt: '2025-01-15',
      duration: '18:42',
      views: '4.2K',
      url: 'https://www.youtube.com/@AshiyIshan',
      featured: true,
      category: 'Featured',
      order: 1
    },
    {
      id: 'video-2',
      youtubeId: 'dQw4w9WgXcQ',
      title: 'Modern UI/UX Design in Figma: From Concept to Clean Code',
      thumbnailUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      description: 'How I design modern developer interfaces, choose harmonious color schemes, and translate Figma frames into responsive CSS.',
      publishedAt: '2024-12-20',
      duration: '14:15',
      views: '3.8K',
      url: 'https://www.youtube.com/@AshiyIshan',
      featured: true,
      category: 'Popular',
      order: 2
    },
    {
      id: 'video-3',
      youtubeId: 'dQw4w9WgXcQ',
      title: 'Top 5 Java Best Practices Every Student Should Know',
      thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      description: 'Clear explanations on object-oriented architecture, clean code structure, and debugging strategies in Java.',
      publishedAt: '2024-11-10',
      duration: '12:08',
      views: '5.1K',
      url: 'https://www.youtube.com/@AshiyIshan',
      featured: false,
      category: 'Latest',
      order: 3
    }
  ],

  currentlyBuilding: {
    id: 'main',
    building: {
      title: 'High-Performance Portfolio & Headless CMS',
      description: 'Cinematic personal brand platform with real-time Firestore synchronization and GitHub Pages hosting.',
      badge: 'Active Development'
    },
    learning: {
      title: 'Cloud Distributed Systems & Cloud Functions',
      description: 'Diving deep into serverless compute architectures and advanced caching layers.',
      badge: 'Continuous Learning'
    },
    creating: {
      title: 'YouTube Coding Series: Modern Web Architecture',
      description: 'Producing visual guides for undergraduates and aspiring developers.',
      badge: 'Content Creation'
    },
    exploring: {
      title: 'Generative AI Integration & IoT Edge Devices',
      description: 'Testing multimodal AI models and hardware micro-controllers for smart automation.',
      badge: 'Research'
    }
  },

  timeline: [
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
      id: 'time-2',
      year: '2024',
      title: 'Launched Open Source & Backend Projects',
      subtitle: 'Slithering Banking Engine & Java Mini Projects',
      description: 'Released open source repositories on GitHub, refining practical experience in Java OOP and Ballerina cloud integrations.',
      type: 'project',
      badge: 'Milestone'
    },
    {
      id: 'time-3',
      year: '2024 - 2025',
      title: 'Content Creation & YouTube Tech Channel',
      subtitle: 'Ashiy Ishan Tech & Tutorials',
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
      title: 'Profile Portrait (Ashiy Ishan)',
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

  siteSettings: {
    siteTitle: 'Ashiy Ishan | Developer • Creator • Builder',
    tagline: 'I BUILD. I CREATE. I SHARE.',
    metaDescription: 'Ashiy Ishan is a software developer and content creator building software, exploring technology and sharing knowledge through YouTube.',
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
