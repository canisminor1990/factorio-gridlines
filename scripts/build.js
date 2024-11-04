const { copyDirectory } = require('./copyDirectory');
const { publicDir, distDir, rootDir } = require('./const');
const fs = require('fs-extra');
const path = require('node:path');
const { genLocaleCfg } = require('./i18n');
const { consola } = require('consola');

const build = () => {
  const info = fs.readJsonSync(path.resolve(publicDir, 'info.json'));
  const pkg = fs.readJsonSync(path.resolve(rootDir, 'package.json'));
  info.version = pkg.version;
  fs.writeJsonSync(path.resolve(publicDir, 'info.json'), info, { spaces: 2 });

  copyDirectory(publicDir, distDir);

  consola.success(`Copy public to dist`);

  genLocaleCfg();

  consola.success(`Generated locale *.cfg`);

  fs.copyFileSync(path.resolve(rootDir, 'LICENSE'), path.resolve(distDir, 'LICENSE'));

  consola.success(`Copy LICENSE`);

  fs.copyFileSync(path.resolve(rootDir, 'README.md'), path.resolve(distDir, 'README.md'));

  consola.success(`Copy README.md`);
};

build();
