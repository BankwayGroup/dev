const path = require('path');

const repoName = 'your-repo-name'; // 🔁 change this

module.exports = {
  output: 'export',
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}`,

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    sourceMap: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media.dev.to',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media2.dev.to',
        pathname: '**',
      },
    ],
  },

  webpack(config, { dev, isServer }) {
    config.module.rules.forEach((rule) => {
      if (rule.test && rule.test.toString().includes('scss')) {
        rule.use.forEach((loader) => {
          if (loader.loader && loader.loader.includes('resolve-url-loader')) {
            loader.options = {
              ...loader.options,
              sourceMap: true,
            };
          }
        });
      }
    });
    return config;
  },
};
