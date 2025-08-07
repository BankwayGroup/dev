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
    <div className="p-6 backdrop-blur-xl bg-white/5 rounded-2xl shadow-2xl max-w-5xl mx-auto border border-white/10">
      <h3 className="text-3xl font-extrabold text-white mb-6 text-center">
        My GitHub Projects
      </h3>
      <div className="grid gap-6 md:grid-cols-2">
        {repos.map((repo, index) => (
          <div
            key={repo.id}
            style={{
              animation: `fadeIn 0.5s ease ${index * 0.1}s forwards`,
              opacity: 0,
            }}
            className="p-5 rounded-xl bg-white/10 backdrop-blur-lg border border-white/10 shadow transition duration-500 hover:shadow-xl"
          >
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-xl font-semibold text-indigo-300 hover:text-indigo-500 transition-colors"
            >
              {repo.name}
            </a>
            <p className="text-gray-300 mt-2 min-h-[3rem]">
              {repo.description || 'No description available.'}
            </p>
            <div className="flex justify-between text-sm text-gray-400 mt-4">
              <span>{repo.language || 'Unknown'}</span>
              <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
            </div>
            {repo.license && (
              <div className="mt-2 text-xs text-gray-500">
                {repo.license.name}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Inline Keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
          from {
            opacity: 0;
            transform: translateY(20px);
          }
        }
      `}</style>
    </div>
  );
};

export default Projects;

