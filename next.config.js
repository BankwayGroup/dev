const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    sourceMap: true,  // <-- Enable sass source maps here
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

  webpack(config, options) {
    config.module.rules.forEach((rule) => {
      if (rule.test && rule.test.toString().includes('scss')) {
        rule.use.forEach((loader) => {
          if (loader.loader && loader.loader.includes('resolve-url-loader')) {
            loader.options = {
              ...loader.options,
              sourceMap: true,  // <-- Enable source maps for resolve-url-loader
            };
          }
          if (loader.loader && loader.loader.includes('sass-loader')) {
            loader.options = {
              ...loader.options,
              sourceMap: true,  // <-- Enable source maps for sass-loader (required)
            };
          }
        });
      }
    });
    return config;
  },
};
