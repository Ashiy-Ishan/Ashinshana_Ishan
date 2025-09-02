// App.jsx
import React, { useState, useEffect, useRef, useImperativeHandle } from 'react';
import './styles.css';
import image from './Iamage/profile.jpg';
import pro_portfolio from './Iamage/portfolio.png';
import java_img from './Iamage/java.png';
import fun_web_img from './Iamage/fun_web.png';
import bank_ing from './Iamage/bank.png';

// --- SVG Icons ---
const GhIcon = () => <svg height="24" width="24" viewBox="0 0 16 16" fill="currentColor"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.s54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>;
const GmIcon = () => <svg height="24" width="24" viewBox="0 0 512 512" fill="currentColor"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1-7.9 2.9-11.3l140.6-225.1-205.8 100c-12.1 6-26.9 3.5-36.8-5.5-12.8-11.5-12.8-30.6 .1-42.2L472.3 2.1C482 .7 492.2 .6 498.1 5.6z"/></svg>;
const WaIcon = () => <svg height="24" width="24" viewBox="0 0 448 512" fill="currentColor"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 221.9-99.6 221.9-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-67.6-9.5-97.2-27.2l-6.7-4-71.6 18.7L57.9 351l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg>;
const LiIcon = () => <svg height="24" width="24" viewBox="0 0 448 512" fill="currentColor"><path d="M100.28 448H7.4V148.9h92.88zM53.84 108.1C24.08 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 53.84-54.3c29.75 0 53.84 24.2 53.84 54.3a53.79 53.79 0 0 1-53.84 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg>;
const IgIcon = () => <svg height="24" width="24" viewBox="0 0 448 512" fill="currentColor"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9 26.3 26.2 58 34.4 93.9 36.2 37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>;
const FbIcon = () => <svg height="24" width="24" viewBox="0 0 512 512" fill="currentColor"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>;

// --- Configuration Object ---
const portfolioConfig = {
  name: "Ashingshana Ishan",
  profilePhotoUrl: image,
  about: "I'm a passionate undergraduate at Sabaragamuwa University, deeply interested in web development, design, and gaming. I love building clean, user-friendly interfaces and solving problems with code.",
  dynamicRoles: ["a Coder", "a Gamer", "a Designer", "an Enthusiast"],
  contact: {
    gmail: "ashinshanaishan.uni@gmail.com",
    whatsapp: "94759428249",
    github: "https://github.com/Ashiy-Ishan",
    linkedin: "https://www.linkedin.com/in/ashinshana-ishan-73b228318",
    instagram: "https://www.instagram.com/a_s_h_i_y_ishan/",
    facebook: "https://web.facebook.com/profile.php?id=61553251979579",
  },
  skills: [
    { name: "React", icon: "devicon-react-original", level: 10 },
    { name: "Java", icon: "devicon-java-plain", level: 20 },
    { name: "Python", icon: "devicon-python-plain", level: 10 },
    { name: "HTML5 & CSS3", icon: "devicon-html5-plain", level: 35 },
    { name: "JavaScript", icon: "devicon-javascript-plain", level: 5 },
    { name: "Figma", icon: "devicon-figma-plain", level: 20 },
    { name: "Photoshop", icon: "devicon-photoshop-plain", level: 30 },
    { name: "Premiere Pro", icon: "devicon-premierepro-plain", level: 40 },
    { name: "Ballerina", icon: "devicon-ballerina-plain", level: 5 },
  ],
  projects: [
    {
      title: "Personal Portfolio",
      description: "A dynamic, animated portfolio showcasing my skills and projects.",
      tags: ["React", "CSS", "UI/UX","HTML"],
      imageUrl: pro_portfolio,
      githubLink: "https://github.com/Ashiy-Ishan/Portfolio.git",
    },
    {
      title: "E-Commerce Backend",
      description: "A robust backend system for an e-commerce platform.Like banks. ",
      tags: ["JavaScript", "Ballerina", "MySQL"],
      imageUrl: bank_ing,
      githubLink: "https://github.com/Ashiy-Ishan/iwb096-slithering.git",
    },
    {
      title: "Mini Java Maths Problem for Kids",
      description: "Kids can give answer for random maths addition,substraction and multiplication problems. ",
      tags: ["Java"],
      imageUrl: java_img,
      githubLink: "https://github.com/Ashiy-Ishan/Java_mini-Project.git",
    },
    {
      title: "Another Great Project",
      description: "Showcasing another skill or technology stack.",
      tags: ["HTML", "JavaScript", "CSS"],
      imageUrl: fun_web_img,
      githubLink: "https://github.com/Ashiy-Ishan/funweb-vercel-release.git",
    },
  ]
};

// --- Components ---
const FloatingLogos = () => (
  <div className="floating-logos-bg">
    <i className="devicon-react-original"></i> <i className="devicon-java-plain"></i>
    <i className="devicon-python-plain"></i> <i className="devicon-html5-plain"></i>
    <i className="devicon-css3-plain"></i> <i className="devicon-javascript-plain"></i>
    <i className="devicon-figma-plain"></i> <i className="devicon-arduino-plain"></i>
  </div>
);

const Typewriter = ({ text, speed = 100 }) => {
    const [displayedText, setDisplayedText] = useState('');
    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(text.substring(0, i + 1));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, speed);
        return () => clearInterval(typingInterval);
    }, [text, speed]);
    return <span className="typewriter">{displayedText}</span>;
};

const DynamicRole = ({ roles }) => {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex(prevIndex => (prevIndex + 1) % roles.length);
        }, 2000);
        return () => clearInterval(intervalId);
    }, [roles.length]);

    return (
        <p className="dynamic-role">
            I am {' '}
            <span className="role-text-container">
                <span className="role-text" key={index}>
                    {roles[index]}
                </span>
            </span>
        </p>
    );
};

// --- Main App Component ---
function App() {
  const [activeSection, setActiveSection] = useState('skills');
  const [theme, setTheme] = useState('light');
  const sections = ['skills', 'projects', 'contact'];
  const contentRef = useRef(null);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, { threshold: 0.1 }
    );
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach((el) => observer.observe(el));
    return () => elementsToAnimate.forEach((el) => observer.unobserve(el));
  }, []);

  useEffect(() => {
    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      }, { root: contentRef.current, rootMargin: "-40% 0px -60% 0px" }
    );
    const sectionElements = contentRef.current.querySelectorAll('.content-section');
    sectionElements.forEach((el) => spyObserver.observe(el));
    return () => sectionElements.forEach((el) => spyObserver.unobserve(el));
  }, []);

  const handleContactFormSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const message = event.target.message.value;
    const subject = `Message from ${name} via Portfolio`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    window.location.href = `mailto:${portfolioConfig.contact.gmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <FloatingLogos />
      <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      <div className="portfolio-container">
        <header className="left-pane">
          <div>
            <div className="profile-group">
                <img src={portfolioConfig.profilePhotoUrl} alt={portfolioConfig.name} className="profile-photo" />
                <h1 className="name"><Typewriter text={portfolioConfig.name} /></h1>
                <DynamicRole roles={portfolioConfig.dynamicRoles} />
            </div>
            
            <p className="about-text">{portfolioConfig.about}</p>
            
            <nav className="navigation">
              <ul>
                {sections.map(section => (
                  <li key={section}>
                    <a href={`#${section}`} className={activeSection === section ? 'active' : ''}>
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="social-links">
            <a href={portfolioConfig.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GhIcon /></a>
            <a href={`mailto:${portfolioConfig.contact.gmail}`} aria-label="Gmail"><GmIcon /></a>
            <a href={`https://wa.me/${portfolioConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><WaIcon /></a>
            <a href={portfolioConfig.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkeDin"><LiIcon /></a>
            <a href={portfolioConfig.contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instergram"><IgIcon /></a>
            <a href={portfolioConfig.contact.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FbIcon /></a>
          </div>
        </header>
        
        <main className="right-pane" ref={contentRef}>
          <section id="skills" className="content-section">
            <h3>Skills</h3>
            <div className="skills-grid">
              {portfolioConfig.skills.map((skill, index) => (
                <div className={`skill-card animate-on-scroll delay-${index}`} key={skill.name}>
                  <div className="skill-info">
                      <i className={skill.icon}></i>
                      <span>{skill.name}</span>
                  </div>
                  <div className="progress-bar">
                      <div className="progress-level" style={{'--level': `${skill.level}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="projects" className="content-section">
            <h3>Projects</h3>
            <div className="projects-grid">
              {portfolioConfig.projects.map((project, index) => (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className={`project-card animate-on-scroll delay-${index}`} key={project.title}>
                  <div className="project-image-container">
                    <img src={project.imageUrl} alt={project.title} className="project-image" />
                  </div>
                  <div className="project-info">
                    <h4>{project.title}</h4>
                    <div className="project-tags">
                      {project.tags.map(tag => <span key={tag}>{tag}</span>)}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section id="contact" className="content-section">
             <h3>Contact Me</h3>
             <form className="contact-form" onSubmit={handleContactFormSubmit}>
                <p>Have a question or want to work together? Leave a message.</p>
                <div className="form-group">
                    <input type="text" name="name" placeholder="Your Name" required />
                    <input type="email" name="email" placeholder="Your Email" required />
                </div>
                <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
                <button type="submit" className="btn-submit">Send Message</button>
            </form>
          </section>

          <footer className="content-footer">
            <p> <b>Ashingshana </b>Ishan © 2025 </p>
          </footer>
        </main>
      </div>
    </>
  );
}

export default App;
