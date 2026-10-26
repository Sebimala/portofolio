import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchRepositories, fetchProfileBio } from './services/github';
import Header from './components/Header';
import ProjectCard from './components/ProjectCard';
import ProjectDetail from './components/ProjectDetail';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [repos, setRepos] = useState([]);
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [repoData, bioData] = await Promise.all([
          fetchRepositories(),
          fetchProfileBio(),
        ]);
        setRepos(repoData);
        setBio(bioData);
      } catch (err) {
        console.error('Critical error loading portfolio:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-16 max-w-7xl mx-auto relative md:cursor-none overflow-hidden">
      <CustomCursor />
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] noise-overlay z-50" />
      
      <AnimatePresence mode="wait">
        {selectedRepo ? (
          <ProjectDetail 
            key="detail" 
            repo={selectedRepo} 
            onBack={() => setSelectedRepo(null)} 
          />
        ) : (
          <motion.div 
            key="index"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Header bio={bio} repoCount={repos.length} />

            <main className="mt-16">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  // Selected Works Index
                </h2>
              </div>

              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                }}
              >
                {repos.map((repo) => (
                  <ProjectCard
                    key={repo.id}
                    repo={repo}
                    onSelect={setSelectedRepo}
                  />
                ))}
              </motion.div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}