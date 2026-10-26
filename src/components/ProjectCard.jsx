import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Star, GitFork } from 'lucide-react';

export default function ProjectCard({ repo, onSelect }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
      }}
      whileHover={{ scale: 0.98, backgroundColor: "#fff", color: "#000" }}
      onClick={() => onSelect(repo)}
      className="group border border-white/20 p-8 cursor-pointer transition-colors duration-300 flex flex-col justify-between min-h-[240px] relative overflow-hidden"
    >
      <div className="flex justify-between items-start gap-4 z-10">
        <div>
          <span className="text-xs font-mono text-neutral-500 group-hover:text-black uppercase tracking-wider transition-colors">
            {repo.language}
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter group-hover:italic group-hover:-skew-x-6 transition-all duration-300 mt-2">
            {repo.name}
          </h2>
        </div>
        <div className="overflow-hidden">
          <ArrowUpRight className="w-10 h-10 translate-y-10 -translate-x-10 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-300 ease-out" />
        </div>
      </div>

      <p className="text-sm line-clamp-2 text-neutral-400 group-hover:text-neutral-800 my-6 z-10 transition-colors">
        {repo.description}
      </p>

      <div className="flex items-center gap-6 pt-4 border-t border-white/10 group-hover:border-black/20 text-xs font-mono text-neutral-400 group-hover:text-black transition-colors z-10">
        <span className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5" /> {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="w-3.5 h-3.5" /> {repo.forks_count}
        </span>
      </div>
    </motion.div>
  );
}