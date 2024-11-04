const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const distDir = path.resolve(rootDir, 'dist');
const localeDir = path.resolve(rootDir, 'locale');
const modDir = 'C:\\Users\\i\\AppData\\Roaming\\Factorio\\mods\\gridlines';

module.exports = { distDir, localeDir, modDir, publicDir, rootDir };
