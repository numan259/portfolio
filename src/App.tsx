import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  X, 
  ExternalLink, 
  Github, 
  Mail, 
  MapPin, 
  Linkedin,
  ChevronRight,
  ChevronLeft,
  Smartphone,
  Server,
  Sparkles,
  Wrench
} from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Project Data
const projects = [
  {
    id: 1,
    title: "AfghanBazaar",
    category: "Mobile Development",
    images: [
      "/Afghan-logo.png",
      "/AfghanBazaar-1.jpg",
      "/AfghanBazaar-2.jpg",
      "/AfghanBazaar-3.jpg",
      "/AfghanBazaar-4.jpg",
      "/AfghanBazaar-5.jpg"
    ],
    description: "A full-stack native Android marketplace connecting buyers and sellers, with real-time chat, location-aware listing ranking, and a server-enforced monetization system. Built to handle Dari/Pashto search and Afghanistan-specific commerce patterns.",
    technologies: ["Java", "Android SDK", "Firebase", "Cloud Functions", "FCM", "Node.js"],
    liveUrl: null,
    githubUrl: null,
    features: [
      "Custom relevance-ranking algorithm blending proximity (Haversine), recency, and paid-boost weighting into a single score",
      "Typo-tolerant search via Levenshtein fuzzy matching — Dari/Pashto-friendly, removing a paid third-party search dependency",
      "Real-time 1-to-1 chat with Firestore listeners + Cloud Functions delivering FCM push notifications with deep-linking",
      "Credit-based listing \"boost\" monetization, enforced server-side"
    ]
  },
  {
    id: 2,
    title: "Focus Study Timer",
    category: "Mobile Development / AI",
    images: ["/Focus-logo.png", "/focus-1.jpg", "/focus-2.jpg", "/focus-3.jpg"],
    description: "A cross-platform study-productivity app with an AI study assistant powered by four interchangeable LLM providers. Features a provider-agnostic architecture and atomic usage limits backed by Firestore.",
    technologies: ["Flutter", "Dart", "Riverpod", "Firebase", "OpenAI", "Anthropic Claude", "Gemini", "Kimi"],
    liveUrl: null,
    githubUrl: null,
    features: [
      "Provider-agnostic BaseAiService abstraction — swap between four LLMs behind one interface",
      "Atomic Firestore daily-usage limits using transactions",
      "Tiered subscription model with paywall",
      "Focus timer with session tracking"
    ]
  },
  {
    id: 3,
    title: "Location Reminder",
    category: "Mobile Development",
    images: ["/location-logo.png", "/location-1.jpg", "/location-2.jpg", "/location-3.jpg"],
    description: "An Android app that triggers reminders based on your physical location — get notified when you arrive at or leave a place, rather than at a set time. Useful for location-bound tasks like \"buy milk when near the store.\"",
    technologies: ["Java", "Android SDK", "Google Places API", "Geofencing API", "Firebase"],
    liveUrl: null,
    githubUrl: "https://github.com/numan259/LocationReminder",
    features: [
      "Location-based geofence triggers that fire reminders on enter/exit of a chosen area",
      "Google Places integration for searching and pinning reminder locations",
      "Background location monitoring that survives app closure",
      "Solved real-world reliability issues: Android battery-optimization killing background services, and release-key API restrictions"
    ]
  },
  {
    id: 4,
    title: "ShortsForge",
    category: "Backend / AI Automation",
    images: ["https://img.youtube.com/vi/r7zuJVb0Xeo/maxresdefault.jpg"],
    description: "A Python MCP server that drives an automated short-form video pipeline, generating horror Shorts end-to-end via AI video generation, audio, and editing tools. Built as a deployable server exposing tools over the Model Context Protocol.",
    technologies: ["Python", "FastMCP", "fal.ai", "ffmpeg", "TTS", "Render"],
    liveUrl: "https://youtube.com/shorts/r7zuJVb0Xeo",
    githubUrl: null,
    features: [
      "MCP server exposing a full video-generation pipeline as callable tools",
      "Automated scene generation, narration, and stitching via fal.ai + ffmpeg",
      "Deployed on Render as a live service",
      "Drives an actual published YouTube Shorts channel (\"Shiverline\")"
    ]
  },
  {
    id: 5,
    title: "Connect 4 AI",
    category: "Algorithms / AI",
    images: ["/project-4.jpg"],
    description: "A Connect 4 game AI comparing Minimax against Alpha-Beta pruning, with a formal performance analysis. Built as an academic project demonstrating adversarial search optimization.",
    technologies: ["Python", "LaTeX"],
    liveUrl: null,
    githubUrl: "https://github.com/numan259/connect4-AI",
    features: [
      "Minimax vs Alpha-Beta pruning comparison — ~85% fewer nodes explored, ~6× faster at depth 5",
      "IEEE-format performance report",
      "Cited in a professor's recommendation letter"
    ]
  }
];

// Skills Data
const skills = [
  { name: "Android (Java)", category: "Mobile", level: 90 },
  { name: "Flutter / Dart", category: "Mobile", level: 85 },
  { name: "Firebase", category: "Mobile", level: 88 },
  { name: "Python", category: "Backend", level: 85 },
  { name: "Node.js", category: "Backend", level: 80 },
  { name: "Cloud Functions / Firestore", category: "Backend", level: 82 },
  { name: "LLM Integration", category: "AI", level: 85 },
  { name: "MCP / FastMCP", category: "AI", level: 80 },
  { name: "Automation Pipelines", category: "AI", level: 78 },
  { name: "Git", category: "Tools", level: 88 },
  { name: "Render / Deployment", category: "Tools", level: 75 },
  { name: "ffmpeg / fal.ai", category: "Tools", level: 72 }
];

// Project Detail Modal Component
function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const images = project.images;
  const goPrev = () => setCurrent((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setCurrent((i) => (i + 1) % images.length);

  useEffect(() => {
    // Animate in
    gsap.fromTo(modalRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.3 }
    );
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: 0.1, ease: "power3.out" }
    );

    // Lock body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 50,
      scale: 0.95,
      duration: 0.3,
      ease: "power3.in"
    });
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.3,
      delay: 0.1,
      onComplete: onClose
    });
  };

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
      onClick={handleClose}
    >
      <div 
        ref={contentRef}
        className="bg-neutral-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Gallery */}
        <div className="relative h-72 md:h-96 overflow-hidden bg-neutral-950">
          <img
            key={current}
            src={images[current]}
            alt={`${project.title} screenshot ${current + 1}`}
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-neutral-900 to-transparent pointer-events-none" />
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Carousel controls (only when multiple shots) */}
          {images.length > 1 && (
            <>
              <button
                onClick={goPrev}
                aria-label="Previous screenshot"
                className="absolute top-1/2 left-3 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-colors z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                aria-label="Next screenshot"
                className="absolute top-1/2 right-3 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-colors z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to screenshot ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      i === current ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-10">
          {/* Title & Category */}
          <div className="mb-6">
            <span className="text-sm text-neutral-400 uppercase tracking-wider">{project.category}</span>
            <h2 className="font-display text-4xl md:text-5xl text-white mt-2">{project.title}</h2>
          </div>

          {/* Description */}
          <p className="text-neutral-300 text-lg leading-relaxed mb-8">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="mb-8">
            <h3 className="font-display text-xl text-white mb-4">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-neutral-800 rounded-full text-sm text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h3 className="font-display text-xl text-white mb-4">Key Features</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-neutral-300">
                  <ChevronRight className="w-4 h-4 text-white flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-neutral-200 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                {project.liveUrl.includes('youtu') ? 'Watch Video' : 'View Live'}
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-600 rounded-full font-medium hover:bg-neutral-800 transition-colors"
              >
                <Github className="w-4 h-4" />
                View Code
              </a>
            )}
            {!project.liveUrl && !project.githubUrl && (
              <span className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-700 rounded-full font-medium text-neutral-400">
                Links coming soon
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Hero Section
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image entrance
      gsap.fromTo(imageRef.current,
        { scale: 0.8, rotation: -5, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1.2, delay: 0.2, ease: "power3.out" }
      );

      // Name animation
      if (nameRef.current) {
        const chars = nameRef.current.querySelectorAll('.char');
        gsap.fromTo(chars,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, delay: 0.4, ease: "power3.out" }
        );
      }

      // Role typewriter effect
      gsap.fromTo(roleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 0.8 }
      );

      // CTA button
      gsap.fromTo(ctaRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, delay: 1, ease: "back.out(1.7)" }
      );

      // Parallax on scroll
      gsap.to(imageRef.current, {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to(nameRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const name = "Mohammed Numan Raza";

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-900" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <p className="text-neutral-400 text-lg mb-4 font-light">Hello, I'm</p>
            <h1 
              ref={nameRef}
              className="font-display text-6xl md:text-8xl lg:text-9xl text-white leading-none mb-6 overflow-hidden"
            >
              {name.split(' ').map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  className="inline-block whitespace-nowrap mr-[0.25em] last:mr-0"
                >
                  {word.split('').map((char, charIndex) => (
                    <span key={charIndex} className="char inline-block">
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
            <p 
              ref={roleRef}
              className="text-xl md:text-2xl text-neutral-300 font-medium mb-10"
            >
              Mobile & AI Application Developer
            </p>
            <button
              ref={ctaRef}
              onClick={scrollToProjects}
              className="magnetic-button inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium text-lg hover:scale-105 transition-transform"
            >
              Explore My Work
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Profile Image */}
          <div 
            ref={imageRef}
            className="relative order-1 lg:order-2"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 to-neutral-900 rounded-full" />
              <img 
                src="/Profile.jpg"
                alt="Mohammed Numan Raza"
                className="relative z-10 w-full h-full object-cover object-[center_25%] rounded-full breathing"
              />
              {/* Glow ring */}
              <div className="absolute -inset-4 bg-white/10 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500">
        <span className="text-sm uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-neutral-500 to-transparent" />
      </div>
    </section>
  );
}

// Projects Section
function ProjectsSection({ onProjectClick }: { onProjectClick: (project: typeof projects[0]) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.project-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="projects"
      className="relative py-32 bg-black"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <h2 
            ref={headingRef}
            className="font-display text-6xl md:text-7xl lg:text-8xl text-white"
          >
            Selected Works
          </h2>
          <p className="text-neutral-400 text-lg mt-4 max-w-xl">
            A collection of projects that showcase my expertise in design, development, and creative problem-solving.
          </p>
        </div>

        {/* Projects Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={() => onProjectClick(project)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Project Card Component
function ProjectCard({ 
  project, 
  onClick 
}: { 
  project: typeof projects[0]; 
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div
      ref={cardRef}
      className="project-card group relative bg-neutral-900 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-white/10"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ 
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease-out'
      }}
    >
      {/* Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          ref={imageRef}
          src={project.images[0]}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {project.images.length > 1 && (
          <span className="absolute top-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs text-white">
            {project.images.length} shots
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* View Indicator */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
            <span className="text-black font-medium text-sm">VIEW</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <span className="text-sm text-neutral-500 uppercase tracking-wider">{project.category}</span>
        <h3 className="font-display text-3xl text-white mt-2 group-hover:text-neutral-300 transition-colors">
          {project.title}
        </h3>
        
        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span 
              key={i}
              className="px-3 py-1 bg-neutral-800 rounded-full text-xs text-neutral-400"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-3 py-1 bg-neutral-800 rounded-full text-xs text-neutral-400">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// Skills Section
function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Skill nodes animation
      const nodes = nodesRef.current?.querySelectorAll('.skill-node');
      if (nodes) {
        gsap.fromTo(nodes,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: nodesRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Mobile': return <Smartphone className="w-5 h-5" />;
      case 'Backend': return <Server className="w-5 h-5" />;
      case 'AI': return <Sparkles className="w-5 h-5" />;
      case 'Tools': return <Wrench className="w-5 h-5" />;
      default: return <Smartphone className="w-5 h-5" />;
    }
  };

  const categories = ['Mobile', 'Backend', 'AI', 'Tools'];

  return (
    <section 
      ref={sectionRef}
      id="skills"
      className="relative py-32 bg-black"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 
            ref={headingRef}
            className="font-display text-6xl md:text-7xl lg:text-8xl text-white"
          >
            My Expertise
          </h2>
          <p className="text-neutral-400 text-lg mt-4 max-w-xl mx-auto">
            Technologies and tools I use to bring ideas to life.
          </p>
        </div>

        {/* Skills by Category */}
        <div ref={nodesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div key={category} className="skill-node">
              <div className="bg-neutral-900 rounded-2xl p-6 hover:bg-neutral-800 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    {getCategoryIcon(category)}
                  </div>
                  <h3 className="font-display text-2xl text-white">{category}</h3>
                </div>
                
                <div className="space-y-4">
                  {skills
                    .filter(skill => skill.category === category)
                    .map((skill, index) => (
                      <div key={index} className="group">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-neutral-300 text-sm">{skill.name}</span>
                          <span className="text-neutral-500 text-xs">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-white rounded-full transition-all duration-500 group-hover:bg-neutral-300"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-content',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 bg-black"
    >
      <div className="container mx-auto px-6">
        <div className="contact-content grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Side - Info */}
          <div>
            <h2 className="font-display text-6xl md:text-7xl lg:text-8xl text-white mb-6">
              Let's Create
            </h2>
            <p className="text-neutral-400 text-lg mb-10 max-w-md">
              Have a project in mind? Let's collaborate and bring your vision to life.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-neutral-400" />
                </div>
                <div>
                  <p className="text-neutral-500 text-sm">Email</p>
                  <a href="mailto:numanraza259@gmail.com" className="text-white hover:text-neutral-300 transition-colors">
                    numanraza259@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-neutral-400" />
                </div>
                <div>
                  <p className="text-neutral-500 text-sm">Location</p>
                  <p className="text-white">Ankara, Turkey</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/in/numan-raza-906820259"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center hover:bg-neutral-800 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/numan259"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center hover:bg-neutral-800 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Side - Email CTA */}
          <div className="bg-neutral-900/50 backdrop-blur-sm rounded-2xl p-8 flex flex-col justify-center text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-display text-4xl text-white mb-3">Get in touch</h3>
            <p className="text-neutral-400 mb-8 max-w-sm mx-auto">
              The fastest way to reach me. Click below and your email opens with my address already filled in.
            </p>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=numanraza259@gmail.com&su=Let%27s%20work%20together"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-fill inline-flex items-center justify-center gap-3 w-full py-4 rounded-full font-medium text-lg border-2 border-white text-white hover:text-black transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
              Email Me
            </a>
            <p className="text-neutral-600 text-sm mt-4">numanraza259@gmail.com</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Privacy Policy Modal
function PrivacyModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
      onClick={onClose}
    >
      <div
        className="bg-neutral-900 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between px-6 md:px-10 pt-8 pb-4 bg-neutral-900">
          <h2 className="font-display text-4xl text-white">Privacy Policy</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 md:px-10 pb-10 space-y-6 text-neutral-300 leading-relaxed">
          <p className="text-neutral-500 text-sm">Last updated: June 2026</p>

          <p>
            This website is the personal portfolio of Mohammed Numan Raza, created to showcase my
            work. It is a static site and is intentionally kept simple where your privacy is concerned.
          </p>

          <div>
            <h3 className="font-display text-xl text-white mb-2">Information I collect</h3>
            <p>
              I do not collect, store, or process any personal information through this site. There is
              no contact form, no account system, no database, and no advertising or tracking cookies.
            </p>
          </div>

          <div>
            <h3 className="font-display text-xl text-white mb-2">Contacting me</h3>
            <p>
              The “Email Me” button simply opens your own email service with my address pre-filled. Any
              message you send goes directly from your account to mine — it does not pass through, and
              is not stored by, this website.
            </p>
          </div>

          <div>
            <h3 className="font-display text-xl text-white mb-2">Third-party services</h3>
            <p>
              To display correctly, this site loads a few resources from third parties. When your
              browser requests them, your IP address is shared with the provider as a normal part of
              how the web works:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Google Fonts — for typography</li>
              <li>YouTube (img.youtube.com) — for a project thumbnail</li>
            </ul>
            <p className="mt-2">These providers handle that data under their own privacy policies.</p>
          </div>

          <div>
            <h3 className="font-display text-xl text-white mb-2">External links</h3>
            <p>
              This site links to external platforms such as GitHub, LinkedIn, and YouTube. I am not
              responsible for the privacy practices or content of those sites.
            </p>
          </div>

          <div>
            <h3 className="font-display text-xl text-white mb-2">Changes</h3>
            <p>I may update this policy from time to time. Any changes will be posted on this page.</p>
          </div>

          <div>
            <h3 className="font-display text-xl text-white mb-2">Contact</h3>
            <p>
              Questions about this policy? Email{' '}
              <a
                href="mailto:numanraza259@gmail.com"
                className="text-white underline hover:text-neutral-300 transition-colors"
              >
                numanraza259@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Footer
function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <footer className="py-8 bg-black border-t border-neutral-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-sm">
            © 2026 Mohammed Numan Raza. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowPrivacy(true)}
              className="text-neutral-500 text-sm hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-neutral-700">•</span>
            <p className="text-neutral-600 text-sm">
              Mobile & AI Software Developer
            </p>
          </div>
        </div>
      </div>

      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
    </footer>
  );
}

// Main App Component
function App() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <div className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Main Content */}
      <main>
        <HeroSection />
        <ProjectsSection onProjectClick={setSelectedProject} />
        <SkillsSection />
        <ContactSection />
        <Footer />
      </main>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
}

export default App;
