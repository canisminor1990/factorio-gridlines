const fs = require('node:fs');
const path = require('node:path');
const archiver = require('archiver');
const { consola } = require('consola');
const packageJson = require('../package.json');
const { rootDir } = require('./const.js');
const infoJson = require('../dist/info.json');

const version = process.argv[2] || packageJson.version;

const folderName = `${infoJson.name}_${version}`;
const zipName = `${folderName}.zip`;

const output = fs.createWriteStream(path.resolve(rootDir, zipName));
const archive = archiver('zip', {
  zlib: { level: 9 }, // Sets the compression level.
});

output.on('close', function () {
  consola.info(archive.pointer() + ' total bytes');
  consola.success('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function (err) {
  throw err;
});

archive.pipe(output);

// Rename the dist folder and add it to the archive
archive.directory('dist/', folderName);

archive.finalize();
