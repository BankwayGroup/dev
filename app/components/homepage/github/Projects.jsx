import React, { useEffect, useState } from 'react';

const Projects = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users/devzahirx3/repos')
      .then(res => res.json())
      .then(data => {
        // Optional: sort by recent update
        const sorted = data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setRepos(sorted);
      });
  }, []);

  return (
    <div className="p-6 bg-gray-100 rounded-xl">
      <h2 className="text-2xl font-bold mb-4">🚀 My GitHub Projects</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {repos.map(repo => (
          <div key={repo.id} className="p-4 bg-white rounded shadow hover:shadow-lg transition">
            <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-xl font-semibold text-blue-600">
              {repo.name}
            </a>
            <p className="text-gray-700">{repo.description}</p>
            <div className="text-sm text-gray-500 mt-2 flex justify-between">
              <span>🌐 {repo.language || 'Unknown'}</span>
              <span>📅 Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
            </div>
            <div className="mt-1 text-sm">
              {repo.license && <span>🪪 {repo.license.name}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
