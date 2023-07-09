/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/v1/token',
        destination: 'http://35.161.112.145/api/v1/token/',
      },
      {
        source: '/api/v1/token-category',
        destination: 'http://35.161.112.145/api/v1/token-category/',
      },
      {
        source: '/api/v1/collection',
        destination: 'http://35.161.112.145/api/v1/collection/',
      },
      {
        source: '/api/v1/ownership',
        destination: 'http://35.161.112.145/api/v1/ownership/',
      },
      {
        source: '/api/v1/transaction',
        destination: 'http://35.161.112.145/api/v1/transaction/',
      },
      {
        source: '/api/v1/fraction',
        destination: 'http://35.161.112.145/api/v1/fraction/',
      },
      {
        source: '/api/v1/rental',
        destination: 'http://35.161.112.145/api/v1/rental/',
      },
      {
        source: '/api/v1/user',
        destination: 'http://35.161.112.145/api/v1/user/',
      },
      {
        source: '/api/:path*',
        destination: 'http://35.161.112.145/api/:path*',
      },
    ];
  },

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
