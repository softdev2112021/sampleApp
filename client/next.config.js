const { parsed: myEnv } = require('dotenv-safe').config();
const webpack = require('webpack');

module.exports = {
  webpack(config, { isServer }) {
    config.plugins.push(new webpack.EnvironmentPlugin(myEnv));

    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/login',
        permanent: true,
      },
    ];
  },
};
