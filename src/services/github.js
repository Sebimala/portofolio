const GITHUB_USER = 'sebimala';

export async function fetchProfileBio() {
  try {
    const res = await fetch(`https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_USER}/main/README.md`);
    if (res.ok) {
      const text = await res.text();
      // Clean up markdown headers/formatting for summary bio
      return text.replace(/#+/g, '').replace(/\[(.*?)\]\(.*?\)/g, '$1').trim().slice(0, 320) + '...';
    }
  } catch (e) {
    console.error('Failed to load profile README', e);
  }
  return 'Creative developer focused on building lightweight, performant web applications and experimental user interfaces.';
}

export async function fetchRepositories() {
  const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`);
  if (!res.ok) throw new Error('Failed to fetch repositories from GitHub');

  const data = await res.json();

  // Exclude forks AND the special user profile repository
  const filtered = data.filter(
    (repo) => !repo.fork && repo.name.toLowerCase() !== GITHUB_USER.toLowerCase()
  );

  return Promise.all(
    filtered.map(async (repo) => {
      // Fetch language composition bytes
      let languages = [];
      try {
        const langRes = await fetch(repo.languages_url);
        const langData = await langRes.json();
        const totalBytes = Object.values(langData).reduce((a, b) => a + b, 0);

        languages = Object.entries(langData).map(([name, bytes]) => ({
          name,
          percentage: totalBytes > 0 ? ((bytes / totalBytes) * 100).toFixed(1) : '0',
        }));
      } catch (e) {
        languages = [{ name: repo.language || 'Code', percentage: '100.0' }];
      }

      // Generate fallback description if missing
      const description =
        repo.description ||
        `An open-source repository written primarily in ${repo.language || 'code'}, focusing on modular architecture and clean code implementation.`;

      return {
        ...repo,
        languages,
        description,
      };
    })
  );
}