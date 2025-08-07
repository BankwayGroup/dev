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
    <section className="relative z-10 px-6 py-16 max-w-6xl mx-auto">
      {/* Optional subtle grid background */}
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="relative z-10">
        <h3 className="text-4xl font-bold text-center text-white mb-12">
          GitHub Projects
        </h3>

        <div className="grid gap-8 md:grid-cols-2">
          {repos.map((repo, index) => (
            <div
              key={repo.id}
              style={{
                animation: `fadeIn 0.6s ease ${index * 0.1}s forwards`,
                opacity: 0,
              }}
              className="bg-gradient-to-br from-[#1e1e2f] to-[#181828] border border-purple-900/40 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-purple-900/40 transition-all duration-300"
            >
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-2xl font-semibold text-purple-300 hover:text-purple-500 transition"
              >
                {repo.name}
              </a>
              <p className="text-gray-400 mt-3 min-h-[3rem]">
                {repo.description || 'No description available.'}
              </p>
              <div className="flex justify-between text-sm text-gray-500 mt-4">
                <span>{repo.language || 'Unknown'}</span>
                <span>🗓 {new Date(repo.updated_at).toLocaleDateString()}</span>
              </div>
              {repo.license && (
                <div className="mt-2 text-xs text-gray-600">
                  🪪 {repo.license.name}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Fade In Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;

