const { createConfig } = require('semantic-release-config-gitmoji/lib/createConfig');
const { options } = require('@lobehub/lint/dist/semantic-release/index');

const config = createConfig({
  options,
  githubAssets: [{ path: '*.zip', label: 'Distribution' }],
});

config.plugins.push([
  '@semantic-release/exec',
  {
    prepareCmd: 'npm run build ${nextRelease.version} && npm run archive ${nextRelease.version}',
  },
]);

module.exports = config;
