const { copyDirectory } = require('./copyDirectory');
const { publicDir, distDir, rootDir } = require('./const');
const fs = require('fs-extra');
const path = require('node:path');
const { genLocaleCfg } = require('./i18n');
const { consola } = require('consola');
const { buildChangelog } = require('./changelog');

const packageJson = require('../package.json');
const infoJson = require('../public/info.json');

const version = process.argv[2] || packageJson.version;

const build = () => {
  infoJson.version = version;
  fs.writeJsonSync(path.resolve(publicDir, 'info.json'), infoJson, { spaces: 2 });

  copyDirectory(publicDir, distDir);

  consola.success(`Copy public to dist`);

  genLocaleCfg();

  consola.success(`Generated locale *.cfg`);

  fs.copyFileSync(path.resolve(rootDir, 'LICENSE'), path.resolve(distDir, 'LICENSE'));

  consola.success(`Copy LICENSE`);

  fs.copyFileSync(path.resolve(rootDir, 'README.md'), path.resolve(distDir, 'README.md'));

  consola.success(`Copy README.md`);

  buildChangelog();

  consola.success('Build changelog.txt from CHANGELOG.md');
};

build();
