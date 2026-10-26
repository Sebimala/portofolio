const GITHUB_USER = 'sebimala';

const FALLBACK_REPOS = [
  {
    id: 1,
    name: 'portofolio',
    description: 'Interactive brutalist portfolio built with React, Vite, and Tailwind CSS.',
    stargazers_count: 0,
    forks_count: 0,
    html_url: 'https://github.com/sebimala/portofolio',
    updated_at: new Date().toISOString(),
    language: 'JavaScript'
  },
  {
    id: 2,
    name: 'filament spool holder',
    description: 'Custom 3D printing project and utility design.',
    stargazers_count: 0,
    forks_count: 0,
    html_url: 'https://github.com/sebimala',
    updated_at: new Date().toISOString(),
    language: '3D/CAD'
  }
];

export async function fetchProfileBio() {
  try {
    const res = await fetch(`https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_USER}/main/README.md`); if (res.ok) { const text = await res.text(); return text.replace(/#+/g, '').replace(/\[(.*?)\]\(.*?\)/g, '$1').trim().slice(0, 320) + '...'; } } catch (e) { console.warn('Bio fetch failed, using fallback.'); } return 'Creative developer focused on building lightweight, performant web applications and experimental user interfaces.'; }  export async function fetchRepositories() { try { const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`);
    const data = await res.json();

    // If GitHub sends an error object (like rate limit exceeded) instead of an array
    if (!Array.isArray(data)) {
      console.warn('GitHub API rate limit exceeded. Using fallback projects.');
      return FALLBACK_REPOS;
    }

    // Filter out forks and the profile repository
    return data
      .filter((repo) => !repo.fork && repo.name.toLowerCase() !== GITHUB_USER.toLowerCase())
      .map((repo) => ({
        ...repo,
        language: repo.language || 'Mixed / Code',
        description: repo.description || `An open-source repository