import React, { useEffect, useState } from 'react';

const Projects = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users/devzahirx3/repos')
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setRepos(sorted);
      });
  }, []);

  return (
    <div className="p-6 bg-[#121217] rounded-xl shadow-lg max-w-5xl mx-auto">
      <h2 className="text-3xl font-extrabold text-white mb-6">🚀 My GitHub Projects</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {repos.map(repo => (
          <div
            key={repo.id}
            className="p-5 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl border border-gray-700 shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-xl font-semibold text-indigo-400 hover:text-indigo-600 transition-colors"
            >
              {repo.name}
            </a>
            <p className="text-gray-300 mt-2 min-h-[3rem]">
              {repo.description || 'No description available.'}
            </p>
            <div className="flex justify-between text-sm text-gray-400 mt-4">
              <span>🌐 {repo.language || 'Unknown'}</span>
              <span>📅 Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
            </div>
            {repo.license && (
              <div className="mt-2 text-xs text-gray-500">
                🪪 {repo.license.name}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
