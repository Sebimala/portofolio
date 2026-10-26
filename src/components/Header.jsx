import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Header({ bio, repoCount }) {
  return (
    <header className="border-b border-white/20 pb-16 pt-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
            Developer Portfolio
          </span>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none">
            Sebimala.
          </h1>
        </div>
        <a
          href="https://github.com/sebimala"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 border border-white px-5 py-2 font-mono text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
        >
          GitHub Profile <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
        <div className="md:col-span-2">
          <span className="text-xs font-mono uppercase text-neutral-500 mb-2 block">// Overview</span>
          <p className="text-lg md:text-xl leading-relaxed text-neutral-300 font-light">
            {bio}
          </p>
        </div>
        <div className="flex flex-col justify-end">
          <span className="text-xs font-mono uppercase text-neutral-500 mb-1 block">// Repository Count</span>
          <p className="text-4xl font-mono font-bold text-white">
            {repoCount} <span className="text-sm font-normal text-neutral-400">original builds</span>
          </p>
        </div>
      </div>
    </header>
  );
}