import React from 'react';
import { ArrowUpRight, Star, GitFork } from 'lucide-react';

export default function ProjectCard({ repo, onSelect }) {
  return (
    <div
      onClick={() => onSelect(repo)}
      className="group border border-white/15 p-8 cursor-pointer hover:bg-white hover:text-black transition-all duration-300 flex flex-col justify-between min-h-[220px]"
    >
      <div className="flex justify-between items-start gap-4">
        <div>
          <span className="text-xs font-mono text-neutral-500 group-hover:text-neutral-700 uppercase tracking-wider">
            {repo.language}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight group-hover:italic transition-all mt-1">
            {repo.name}
          </h2>
        </div>
        <ArrowUpRight className="w-8 h-8 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
      </div>

      <p className="text-sm line-clamp-2 text-neutral-400 group-hover:text-neutral-800 my-4">
        {repo.description}
      </p>

      <div className="flex items-center gap-6 pt-4 border-t border-white/10 group-hover:border-black/20 text-xs font-mono text-neutral-400 group-hover:text-black">
        <span className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5" /> {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="w-3.5 h-3.5" /> {repo.forks_count}
        </span>
        <span className="ml-auto uppercase tracking-widest text-[10px]">
          View Specs →
        </span>
      </div>
    </div>
  );
}