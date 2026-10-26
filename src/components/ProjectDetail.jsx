import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Star, GitFork, Calendar } from 'lucide-react';

export default function ProjectDetail({ repo, onBack }) {
  const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 min-h-screen bg-white text-black p-8 md:p-20 z-40 overflow-y-auto md:cursor-none"
    >
      <button
        onClick={onBack}
        className="group flex items-center gap-2 border-2 border-black px-6 py-3 font-black uppercase text-sm hover:bg-black hover:text-white transition-colors mb-16"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Return
      </button>

      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-6xl md:text-[8vw] font-black tracking-tighter uppercase leading-none mb-12 break-words"
        >
          {repo.name}
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-12 border-t-8 border-black"
        >
          <div className="lg:col-span-2 space-y-8">
            <p className="text-3xl md:text-4xl font-medium leading-tight tracking-tight">
              {repo.description}
            </p>

            <div className="flex flex-wrap gap-12 py-8 border-y-2 border-black/10">
              <div>
                <span className="text-xs font-mono uppercase block mb-1">Stars</span>
                <span className="text-3xl font-black">{repo.stargazers_count}</span>
              </div>
              <div>
                <span className="text-xs font-mono uppercase block mb-1">Language</span>
                <span className="text-3xl font-black">{repo.language}</span>
              </div>
            </div>

            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-black text-white text-xl font-black uppercase px-10 py-5 hover:bg-neutral-800 transition-colors"
            >
              Source Code <ExternalLink className="w-6 h-6" />
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}