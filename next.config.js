/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },
  distDir: 'build',
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/v1/token',
        destination: 'http://18.236.86.21:8000/api/v1/token/',
      },
      {
        source: '/api/v1/token-category',
        destination: 'http://18.236.86.21:8000/api/v1/token-category/',
      },
      {
        source: '/api/v1/collection',
        destination: 'http://18.236.86.21:8000/api/v1/collection/',
      },
      {
        source: '/api/v1/ownership',
        destination: 'http://18.236.86.21:8000/api/v1/ownership/',
      },
      {
        source: '/api/v1/transaction',
        destination: 'http://18.236.86.21:8000/api/v1/transaction/',
      },
      {
        source: '/api/v1/fraction',
        destination: 'http://18.236.86.21:8000/api/v1/fraction/',
      },
      {
        source: '/api/v1/rental',
        destination: 'http://18.236.86.21:8000/api/v1/rental/',
      },
      {
        source: '/api/v1/user',
        destination: 'http://18.236.86.21:8000/api/v1/user/',
      },
      {
        source: '/api/:path*',
        destination: 'http://18.236.86.21:8000/api/:path*',
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
