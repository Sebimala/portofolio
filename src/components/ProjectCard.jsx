import React, { useState, useEffect } from 'react';
import { fetchRepositories, fetchProfileBio } from './services/github';
import Header from './components/Header';
import ProjectCard from './components/ProjectCard';
import ProjectDetail from './components/ProjectDetail';
import Loader from './components/Loader';

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
        console.error('Error loading portfolio data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <Loader />;

  if (selectedRepo) {
    return (
      <ProjectDetail
        repo={selectedRepo}
        onBack={() => setSelectedRepo(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-16 max-w-7xl mx-auto relative">
      <div className="fixed inset-0 pointer-events-none opacity-5 noise-overlay z-50" />
      <Header bio={bio} repoCount={repos.length} />

      <main className="mt-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            // Selected Works Index
          </h2>
          <span className="text-xs font-mono text-neutral-500">
            Click project to inspect
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {repos.map((repo) => (
            <ProjectCard
              key={repo.id}
              repo={repo}
              onSelect={setSelectedRepo}
            />
          ))}
        </div>
      </main>

      <footer className="mt-24 pt-8 border-t border-white/10 text-xs font-mono text-neutral-500 flex justify-between">
        <span>© {new Date().getFullYear()} Sebimala</span>
        <span>Built with React + Vite</span>
      </footer>
    </div>
  );
}