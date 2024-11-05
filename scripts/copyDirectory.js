const fs = require('fs-extra');
const path = require('node:path');

function copyDirectory(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const files = fs.readdirSync(source);

  for (const file of files) {
    const sourcePath = path.resolve(source, file);
    const destPath = path.resolve(destination, file);

    if (fs.lstatSync(sourcePath).isDirectory()) {
      copyDirectory(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
  }
}

module.exports = { copyDirectory };
