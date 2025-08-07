'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

function Projects() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.github.com/users/devzahirx3/repos')
      .then((res) => {
        const sorted = res.data.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );
        setRepos(sorted);
      })
      .catch((err) => console.error('GitHub API error:', err));
  }, []);

  return (
    <div className="relative z-10 px-4 py-12 max-w-7xl mx-auto">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-2xl font-bold text-[#16f2b3] uppercase mb-12 flex items-center"
      >
        <i className="fab fa-github mr-3"></i> GitHub Projects
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {repos.map((repo, index) => (
          <motion.div
            key={repo.id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="fade-in-card flex flex-col justify-between rounded-2xl border border-[#2c2b55] bg-gradient-to-br from-[#18153a] to-[#1f1c46] p-6 text-white shadow-lg transition-all duration-300 hover:shadow-purple-500/20"
          >
            <div className="mb-4">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-semibold text-white hover:text-[#7a5cff] transition"
              >
                {repo.name}
              </a>
              <p className="text-sm text-gray-300 mt-2 min-h-[3rem]">
                {repo.description || 'No description available.'}
              </p>
            </div>

            <div className="text-sm text-gray-400 mt-auto pt-4 border-t border-[#2c2b55]">
              <div className="flex justify-between items-center mt-2">
                <span>{repo.language || 'Unknown'}</span>
                <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
              </div>
              {repo.license && (
                <div className="mt-2 text-xs text-gray-500">
                  {repo.license.name}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Projects;

