const { writeFileSync, mkdirSync, existsSync } = require('node:fs');
const config = require('../.i18nrc');
const { readJsonSync } = require('fs-extra');
const path = require('node:path');
const { publicDir, localeDir } = require('./const');
const { consola } = require('consola');

const genLocaleCfg = () => {
  for (const locale of [config.entryLocale, ...config.outputLocales]) {
    const data = readJsonSync(path.resolve(localeDir, `${locale}/index.json`));
    const cfg = [];
    for (const [key, value] of Object.entries(data)) {
      cfg.push(`[${key}]`);
      for (const [k, v] of Object.entries(value)) {
        cfg.push(`${k}=${v}`);
      }
      cfg.push('');
    }
    if (!existsSync(path.resolve(publicDir, 'locale', locale)))
      mkdirSync(path.resolve(publicDir, 'locale', locale), { recursive: true });
    writeFileSync(path.resolve(publicDir, `locale/${locale}/index.cfg`), cfg.join('\n'), 'utf8');

    consola.start(`Generated ${locale}/index.cfg`);
  }
};

module.exports = { genLocaleCfg };
