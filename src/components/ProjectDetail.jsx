import React from 'react';
import { ArrowLeft, ExternalLink, Star, GitFork, Calendar } from 'lucide-react';

export default function ProjectDetail({ repo, onBack }) {
  const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-white text-black p-8 md:p-20">
      <button
        onClick={onBack}
        className="flex items-center gap-2 border-2 border-black px-6 py-3 font-bold uppercase text-sm hover:bg-black hover:text-white transition-colors mb-16"
      >
        <ArrowLeft className="w-4 h-4" /> Return to Index
      </button>

      <div className="max-w-6xl">
        <span className="font-mono text-sm uppercase tracking-widest text-neutral-500">
          Project Specification
        </span>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none my-6 break-words">
          {repo.name}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-12 border-t-4 border-black mt-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
                // About
              </h3>
              <p className="text-2xl md:text-3xl font-medium leading-relaxed">
                {repo.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-8 py-6 border-y border-neutral-200">
              <div>
                <span className="text-xs font-mono text-neutral-500 uppercase block">Stars</span>
                <span className="text-2xl font-bold flex items-center gap-1">
                  <Star className="w-5 h-5 fill-black" /> {repo.stargazers_count}
                </span>
              </div>
              <div>
                <span className="text-xs font-mono text-neutral-500 uppercase block">Forks</span>
                <span className="text-2xl font-bold flex items-center gap-1">
                  <GitFork className="w-5 h-5" /> {repo.forks_count}
                </span>
              </div>
              <div>
                <span className="text-xs font-mono text-neutral-500 uppercase block">Last Updated</span>
                <span className="text-2xl font-bold flex items-center gap-1">
                  <Calendar className="w-5 h-5" /> {updatedDate}
                </span>
              </div>
            </div>

            <div>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-black text-white text-lg font-bold uppercase px-8 py-4 hover:bg-neutral-800 transition-colors"
              >
                Source Repository <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-6 bg-neutral-100 p-8 border border-neutral-300">
            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500 border-b border-neutral-300 pb-3">
              // Tech Stack & Languages
            </h3>
            <div className="space-y-4">
              {repo.languages.map((lang) => (
                <div key={lang.name}>
                  <div className="flex justify-between text-sm font-bold uppercase mb-1">
                    <span>{lang.name}</span>
                    <span className="font-mono">{lang.percentage}%</span>
                  </div>
                  <div className="w-full bg-neutral-300 h-2">
                    <div
                      className="bg-black h-2"
                      style={{ width: `${lang.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}