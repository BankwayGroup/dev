const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    sourceMap: true, // Add source map here for sass-loader
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
    // Add sourceMap:true for resolve-url-loader in the webpack config
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
