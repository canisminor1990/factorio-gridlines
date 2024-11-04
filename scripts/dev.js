const chokidar = require('chokidar');
const { copyDirectory } = require('./copyDirectory');
const { publicDir, distDir, modDir } = require('./const');
const { genLocaleCfg } = require('./i18n');

function copyMod(source, target) {
  try {
    copyDirectory(source, target);
  } catch (error) {
    console.error(error);
  }
}

const watcher = chokidar.watch([distDir, publicDir], {
  ignored: /(^|[/\\])\../,
  persistent: true,
});

console.log(`Start Watching: ${distDir}`);

watcher.on('change', (path) => {
  console.log(`Hot reload: ${path}`);
  copyDirectory(publicDir, distDir);
  copyMod(distDir, modDir);
  genLocaleCfg();
});

// 处理错误
watcher.on('error', (error) => console.error(error));
