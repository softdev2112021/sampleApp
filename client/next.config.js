module.exports = {
  env: {
    appHost: 'http://localhost',
    appPort: 4000,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/login',
        permanent: true,
      },
    ]
  },
};
