import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { 
  ArrowUpRight, 
  ArrowLeft, 
  Github, 
  Star, 
  Calendar, 
  Code2, 
  Terminal, 
  Sparkles,
  Layers,
  Clock,
  ExternalLink
} from 'lucide-react';

// --- CONFIGURATION ---
const USERNAME = 'sebimala';
const API_BASE = 'https://api.github.com';

// Language Color Mapping for Visual Hierarchy
const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Rust: '#dea584',
  Go: '#00ADD8',
  Java: '#b07219',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Shell: '#89e051',
  Vue: '#41b883',
  React: '#61dafb',
  Dart: '#00B4AB',
  Swift: '#F05138',
  Kotlin: '#A97BFF'
};

// Safe UTF-8 Base64 Decoder
const safeDecodeBase64 = (str) => {
  try {
    return decodeURIComponent(
      atob(str)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch (e) {
    try {
      return atob(str);
    } catch (err) {
      return '';
    }
  }
};

// Fallback data when GitHub API is rate-limited or unreachable
const FALLBACK_PROFILE = {
  login: 'sebimala',
  name: 'Sebimala',
  bio: 'Crafting robust open-source software, scalable backends, and brutalist digital interfaces.',
  followers: 12,
  following: 5,
  location: 'Cyber / Remote'
};

const FALLBACK_REPOS = [
  {
    id: 1,
    name: 'portofolio',
    description: 'Personal brutalist interactive developer portfolio built with React & Tailwind CSS.',
    html_url: 'https://github.com/sebimala/portofolio',
    stargazers_count: 5,
    forks_count: 1,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: new Date().toISOString(),
    fork: false,
    languages: [{ name: 'JavaScript', percentage: 70 }, { name: 'HTML', percentage: 20 }, { name: 'CSS', percentage: 10 }]
  },
  {
    id: 2,
    name: 'astetic-tic-tac-toe',
    description: 'Aesthetically designed interactive Tic Tac Toe game with smooth animations and minimalist layout.',
    html_url: 'https://github.com/sebimala/astetic-tic-tac-toe',
    stargazers_count: 3,
    forks_count: 0,
    created_at: '2024-02-10T00:00:00Z',
    updated_at: new Date().toISOString(),
    fork: false,
    languages: [{ name: 'HTML', percentage: 60 }, { name: 'CSS', percentage: 30 }, { name: 'JavaScript', percentage: 10 }]
  },
  {
    id: 3,
    name: 'filament-spool-holder',
    description: 'Custom 3D printable filament spool holder models and technical automation scripts.',
    html_url: 'https://github.com/sebimala/filament-spool-holder',
    stargazers_count: 2,
    forks_count: 0,
    created_at: '2024-03-01T00:00:00Z',
    updated_at: new Date().toISOString(),
    fork: false,
    languages: [{ name: 'Python', percentage: 80 }, { name: 'Shell', percentage: 20 }]
  }
];

// Clean Markdown into raw readable text
const cleanMarkdown = (md) => {
  if (!md) return '';
  return md
    .replace(/#+\s+/g, '') // remove headers
    .replace(/!\[.*?\]\(.*?\)/g, '') // remove images
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // remove links
    .replace(/```[\s\S]*?```/g, '') // remove code blocks
    .replace(/`([^`]+)`/g, '$1') // remove inline code
    .replace(/[*_~>]/g, '') // remove emphasis/quotes
    .replace(/\n+/g, ' ') // collapse newlines
    .trim();
};

// Noise Overlay Component
const NoiseOverlay = () => (
  <div 
    className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.035] mix-blend-difference"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

// Custom Smooth Motion Cursor
const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 28, stiffness: 380, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        ['A', 'BUTTON', 'LI', 'H2', 'INPUT'].includes(target.tagName) || 
        target.closest('button') || 
        target.closest('a') ||
        target.closest('.interactive-hover')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-8 w-8 rounded-full bg-white mix-blend-difference hidden md:block"
      style={{ x: cursorXSpring, y: cursorYSpring }}
      animate={{ 
        scale: isHovering ? 2.8 : 1,
        opacity: isHovering ? 0.9 : 0.8
      }}
      transition={{ type: 'spring', damping: 20 }}
    />
  );
};

// Initial Loader Component
const Loader = () => (
  <motion.div 
    className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-black text-white"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0, y: "-100%" }}
    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
  >
    <div className="flex flex-col items-center gap-6">
      <motion.div
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        className="text-5xl md:text-9xl font-black uppercase tracking-tighter font-mono"
      >
        SEBIMALA
      </motion.div>
      
      <div className="flex items-center gap-4 text-zinc-500 font-mono text-xs uppercase tracking-widest">
        <Terminal size={14} className="animate-spin" />
        <span>Parsing GitHub Repositories</span>
      </div>

      <div className="h-[2px] w-64 bg-zinc-900 relative overflow-hidden mt-4">
        <motion.div 
          className="absolute inset-y-0 left-0 bg-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
      </div>
    </div>
  </motion.div>
);

// Main Home View
const HomeView = ({ profile, repos, heroDescription, onSelectRepo }) => {
  return (
    <motion.div 
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className="min-h-screen pt-20 pb-32 px-6 md:px-16 max-w-[1800px] mx-auto text-white selection:bg-white selection:text-black"
    >
      {/* Top Navigation / Brand */}
      <nav className="flex justify-between items-center pb-12 border-b border-zinc-900 text-xs font-mono tracking-widest text-zinc-500 uppercase">
        <div className="flex items-center gap-3 text-white font-bold">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
          <span>@{USERNAME}</span>
        </div>
        <div className="flex items-center gap-8">
          <span>{repos.length} Selected Works</span>
          <a 
            href={`https://github.com/${USERNAME}`} 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            GitHub <ArrowUpRight size={14} />
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="my-24 md:my-32">
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex flex-col gap-8"
        >
          <div className="text-zinc-500 font-mono text-xs uppercase tracking-[0.3em] flex items-center gap-3">
            <span className="w-10 h-[1px] bg-zinc-600 inline-block"></span>
            Software Architecture & Open Source
          </div>

          <h1 className="text-[13vw] md:text-[10vw] font-black uppercase leading-[0.78] tracking-tighter text-white break-words">
            {profile?.name || USERNAME}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-zinc-900 items-start">
            <div className="md:col-span-7">
              <p className="text-lg md:text-2xl text-zinc-300 font-light leading-relaxed max-w-3xl">
                {heroDescription}
              </p>
            </div>

            <div className="md:col-span-5 flex flex-wrap md:justify-end gap-12 font-mono text-xs uppercase text-zinc-500 tracking-wider pt-2">
              <div className="flex flex-col gap-1">
                <span className="text-zinc-600">Public Repos</span>
                <span className="text-white text-2xl font-bold font-sans">{repos.length}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-zinc-600">Followers</span>
                <span className="text-white text-2xl font-bold font-sans">{profile?.followers || 0}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-zinc-600">Location</span>
                <span className="text-white text-lg font-bold font-sans">{profile?.location || 'Remote / Cyber'}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Projects List Section */}
      <section className="mt-32">
        <div className="flex justify-between items-end pb-6 border-b border-zinc-800 text-xs font-mono text-zinc-500 uppercase tracking-widest">
          <span>Project Name</span>
          <div className="hidden md:flex gap-16">
            <span>Primary Language</span>
            <span>Created</span>
            <span>Metrics</span>
          </div>
        </div>
        
        <div className="flex flex-col">
          {repos.map((repo, i) => {
            const primaryLang = repo.languages[0];
            return (
              <motion.button
                key={repo.id}
                onClick={() => onSelectRepo(repo)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + (i * 0.04), duration: 0.5 }}
                className="interactive-hover group relative flex w-full items-center justify-between border-b border-zinc-900 py-8 md:py-14 px-2 hover:border-zinc-400 transition-colors text-left"
              >
                {/* Index + Name */}
                <div className="flex items-center gap-6 md:gap-10 relative z-10">
                  <span className="text-zinc-600 font-mono text-xs md:text-sm">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  <div>
                    <h2 className="text-2xl md:text-5xl font-bold uppercase tracking-tighter text-white group-hover:translate-x-3 group-hover:italic transition-all duration-300 ease-out">
                      {repo.name.replace(/[-_]/g, ' ')}
                    </h2>
                    <p className="text-xs md:text-sm text-zinc-500 line-clamp-1 mt-2 max-w-xl group-hover:text-zinc-300 transition-colors font-sans font-light">
                      {repo.description}
                    </p>
                  </div>
                </div>
                
                {/* Meta info & Arrow */}
                <div className="flex items-center gap-8 md:gap-16 relative z-10 font-mono text-xs">
                  <div className="hidden md:flex items-center gap-2 text-zinc-400 w-28">
                    {primaryLang ? (
                      <>
                        <span 
                          className="w-2 h-2 rounded-full inline-block" 
                          style={{ backgroundColor: LANGUAGE_COLORS[primaryLang.name] || '#888' }} 
                        />
                        <span>{primaryLang.name}</span>
                      </>
                    ) : (
                      <span className="text-zinc-600">N/A</span>
                    )}
                  </div>

                  <span className="hidden md:block text-zinc-500 w-16">
                    {new Date(repo.created_at).getFullYear()}
                  </span>

                  <div className="hidden md:flex items-center gap-1.5 text-zinc-400 w-12">
                    <Star size={12} className="fill-zinc-500 text-zinc-500" />
                    <span>{repo.stargazers_count}</span>
                  </div>

                  <div className="text-zinc-600 group-hover:text-white group-hover:scale-125 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowUpRight size={28} />
                  </div>
                </div>

                {/* Subtle Hover Highlight */}
                <div className="absolute inset-0 bg-white/[0.02] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300 ease-out z-0 pointer-events-none" />
              </motion.button>
            );
          })}

          {repos.length === 0 && (
            <div className="py-24 text-center text-zinc-600 font-mono uppercase tracking-widest text-sm">
              No public repositories found for this criteria.
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-36 pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-xs text-zinc-600 uppercase tracking-widest">
        <div>© {new Date().getFullYear()} @{USERNAME} • All Rights Reserved</div>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover:text-white transition-colors"
        >
          Back To Top ↑
        </button>
      </footer>
    </motion.div>
  );
};

// Full Page Project Detail View
const ProjectDetailView = ({ repo, onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <motion.div 
      key="project-detail"
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      className="min-h-screen bg-white text-black fixed inset-0 z-50 overflow-y-auto selection:bg-black selection:text-white"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 py-12 md:py-20">
        
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="group inline-flex items-center gap-3 text-xs md:text-sm font-mono font-bold uppercase tracking-widest hover:text-zinc-600 transition-colors mb-16 md:mb-24"
        >
          <div className="p-3 md:p-4 rounded-full border border-black group-hover:bg-black group-hover:text-white transition-colors">
            <ArrowLeft size={18} />
          </div>
          Return to Index
        </button>

        {/* Project Header */}
        <div className="mb-20">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-zinc-500 mb-6">
            <Layers size={14} />
            <span>Project Specification</span>
            {repo.isGeneratedSummary && (
              <span className="bg-black text-white px-2.5 py-0.5 rounded-full text-[10px] flex items-center gap-1 ml-2">
                <Sparkles size={10} /> Dynamic Summary
              </span>
            )}
          </div>

          <h1 className="text-[11vw] md:text-[8vw] font-black uppercase leading-[0.82] tracking-tighter break-words mb-12">
            {repo.name.replace(/[-_]/g, ' ')}
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t-2 border-black pt-12">
            
            {/* Description Block */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-4">Overview</h3>
                <p className="text-xl md:text-3xl font-normal leading-relaxed text-zinc-900 font-sans">
                  {repo.description}
                </p>
              </div>

              {/* Action Link */}
              <div className="mt-12 pt-8 border-t border-zinc-200">
                <a 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center justify-between w-full md:w-auto gap-12 bg-black text-white text-base font-mono font-bold uppercase tracking-wider px-8 py-5 hover:bg-zinc-800 transition-colors group"
                >
                  <span>View Source Code</span>
                  <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>
            
            {/* Metadata Sidebar */}
            <div className="lg:col-span-5 flex flex-col gap-8 font-mono text-xs uppercase tracking-wider border-t lg:border-t-0 lg:border-l border-zinc-200 pt-8 lg:pt-0 lg:pl-12">
              
              {/* Language Breakdown */}
              <div>
                <span className="text-zinc-400 block mb-4 flex items-center gap-2">
                  <Code2 size={14} /> Stack Breakdown
                </span>
                
                {repo.languages && repo.languages.length > 0 ? (
                  <div className="space-y-4">
                    {/* Visual Bar */}
                    <div className="h-3 w-full bg-zinc-100 flex overflow-hidden rounded-sm border border-zinc-200">
                      {repo.languages.map(l => (
                        <div 
                          key={l.name}
                          style={{ 
                            width: `${l.percentage}%`,
                            backgroundColor: LANGUAGE_COLORS[l.name] || '#333'
                          }}
                          title={`${l.name}: ${l.percentage}%`}
                        />
                      ))}
                    </div>

                    {/* Numeric List */}
                    <div className="space-y-2">
                      {repo.languages.map(l => (
                        <div key={l.name} className="flex justify-between items-center border-b border-zinc-100 pb-1.5">
                          <span className="flex items-center gap-2 text-zinc-900 font-bold">
                            <span 
                              className="w-2 h-2 rounded-full inline-block" 
                              style={{ backgroundColor: LANGUAGE_COLORS[l.name] || '#333' }}
                            />
                            {l.name}
                          </span>
                          <span className="text-zinc-500">{l.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <span className="text-zinc-500 italic">Languages Not Categorized</span>
                )}
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-zinc-100">
                <div>
                  <span className="text-zinc-400 block mb-2 flex items-center gap-1.5">
                    <Calendar size={12} /> Initialized
                  </span>
                  <span className="text-sm font-bold text-black font-sans">
                    {new Date(repo.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                </div>

                <div>
                  <span className="text-zinc-400 block mb-2 flex items-center gap-1.5">
                    <Clock size={12} /> Last Commit
                  </span>
                  <span className="text-sm font-bold text-black font-sans">
                    {new Date(repo.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                </div>

                <div>
                  <span className="text-zinc-400 block mb-2 flex items-center gap-1.5">
                    <Star size={12} /> Stargazers
                  </span>
                  <span className="text-sm font-bold text-black font-sans">
                    {repo.stargazers_count}
                  </span>
                </div>

                <div>
                  <span className="text-zinc-400 block mb-2 flex items-center gap-1.5">
                    <Github size={12} /> License
                  </span>
                  <span className="text-sm font-bold text-black font-sans">
                    {repo.license?.spdx_id || 'MIT / Custom'}
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </motion.div>
  );
};

// Main Controller Component
export default function App() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [heroDescription, setHeroDescription] = useState('');
  const [error, setError] = useState(false);
  
  const [view, setView] = useState('home'); // 'home' | 'project'
  const [selectedRepo, setSelectedRepo] = useState(null);

  useEffect(() => {
    // Set global styles for brutalist presentation
    document.body.style.backgroundColor = "#000000";
    document.body.style.color = "#ffffff";
    document.body.style.cursor = "none";
    document.body.style.fontFamily = "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    
    const style = document.createElement('style');
    style.innerHTML = `
      ::-webkit-scrollbar { display: none; }
      * { scrollbar-width: none; -ms-overflow-style: none; }
      a, button { cursor: none !important; }
    `;
    document.head.appendChild(style);

    const initializePortfolio = async () => {
      try {
        const safeFetch = async (url) => {
          try {
            const res = await fetch(url);
            if (!res.ok) return null;
            return await res.json();
          } catch (e) {
            return null;
          }
        };

        // 1. Safe concurrent fetching of Profile, Repos, and Special profile README
        const profileData = await safeFetch(`${API_BASE}/users/${USERNAME}`);
        const reposData = await safeFetch(`${API_BASE}/users/${USERNAME}/repos?per_page=100&sort=updated`);
        const specialRepoReadmeData = await safeFetch(`${API_BASE}/repos/${USERNAME}/${USERNAME}/readme`);

        const activeProfile = profileData || FALLBACK_PROFILE;
        setProfile(activeProfile);

        // 2. Process Hero Bio using profile README or fallback
        let dynamicBio = activeProfile.bio || "Crafting robust open-source software, scalable backends, and brutalist digital interfaces.";
        if (specialRepoReadmeData && specialRepoReadmeData.content) {
          const decodedContent = safeDecodeBase64(specialRepoReadmeData.content);
          const cleanedText = cleanMarkdown(decodedContent);
          if (cleanedText.length > 20) {
            dynamicBio = cleanedText.slice(0, 280).trim() + (cleanedText.length > 280 ? '...' : '');
          }
        }
        setHeroDescription(dynamicBio);

        // 3. Filter Repositories (EXCLUDE FORKS && EXCLUDE 'sebimala' profile repo)
        let rawRepos = Array.isArray(reposData) ? reposData : FALLBACK_REPOS;
        const filteredRepos = rawRepos.filter(repo => {
          const isFork = repo.fork === true;
          const isSpecialProfileRepo = repo.name.toLowerCase() === USERNAME.toLowerCase();
          return !isFork && !isSpecialProfileRepo;
        });

        // 4. Fetch Language Statistics & Generate Descriptions safely
        const processedRepos = await Promise.all(
          filteredRepos.map(async (repo) => {
            let languages = repo.languages || [];
            let description = repo.description;
            let isGeneratedSummary = false;

            if (languages.length === 0 && repo.languages_url) {
              try {
                const langData = await safeFetch(repo.languages_url);
                if (langData) {
                  const totalBytes = Object.values(langData).reduce((a, b) => a + b, 0);
                  languages = Object.entries(langData)
                    .map(([name, bytes]) => ({
                      name,
                      bytes,
                      percentage: totalBytes > 0 ? parseFloat(((bytes / totalBytes) * 100).toFixed(1)) : 0
                    }))
                    .sort((a, b) => b.bytes - a.bytes);
                }
              } catch (e) {
                /* ignore gracefully */
              }
            }

            if (!description || description.trim().length === 0) {
              const primaryLangs = languages.slice(0, 2).map(l => l.name).join(' & ');
              description = `A specialized ${primaryLangs || 'software'} repository focused on robust code structure, modular architecture, and automated execution workflows.`;
              isGeneratedSummary = true;
            }

            return {
              ...repo,
              languages,
              description,
              isGeneratedSummary
            };
          })
        );

        // Sort by stars primarily, then recent updates
        processedRepos.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0) || new Date(b.updated_at) - new Date(a.updated_at));

        setRepos(processedRepos.length > 0 ? processedRepos : FALLBACK_REPOS);
      } catch (err) {
        console.error("Portfolio Loading Error:", err);
        setProfile(FALLBACK_PROFILE);
        setRepos(FALLBACK_REPOS);
      } finally {
        setTimeout(() => setLoading(false), 1200);
      }
    };

    initializePortfolio();

    return () => {
      if (document.head.contains(style)) document.head.removeChild(style);
      document.body.style.cursor = "auto";
    };
  }, []);

  const handleSelectRepo = (repo) => {
    setSelectedRepo(repo);
    setView('project');
  };

  const handleBackToHome = () => {
    setView('home');
    setTimeout(() => setSelectedRepo(null), 700);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white p-6 text-center flex-col font-mono">
        <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-red-500">SYSTEM FAILURE</h1>
        <p className="text-zinc-500 max-w-md text-sm">
          Unable to query GitHub API for user "@{USERNAME}". GitHub rate limits may have been exceeded or network connectivity failed.
        </p>
      </div>
    );
  }

  return (
    <div className="relative bg-black min-h-screen">
      <CustomCursor />
      <NoiseOverlay />

      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      {!loading && (
        <AnimatePresence mode="wait">
          {view === 'home' ? (
            <HomeView 
              profile={profile} 
              repos={repos} 
              heroDescription={heroDescription}
              onSelectRepo={handleSelectRepo} 
            />
          ) : (
            <ProjectDetailView 
              repo={selectedRepo} 
              onBack={handleBackToHome} 
            />
          )}
        </AnimatePresence>
      )}
    </div>
  );
}