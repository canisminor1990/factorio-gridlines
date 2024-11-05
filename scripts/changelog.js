const fs = require('node:fs');
const path = require('node:path');
const { rootDir, distDir } = require('./const');
const { consola } = require('consola');
const { markdownToTxt } = require('markdown-to-txt');

const input = fs.readFileSync(path.resolve(rootDir, 'CHANGELOG.md'), 'utf8');
function formatChangelog(input) {
  let versions = input.split(/Version&nbsp;|Version /).slice(1);

  let output = '';

  for (const version of versions) {
    const lines = version.trim().split('\n');
    const versionNumber = lines[0].trim();
    const date = lines[2].replace('Released on ', '').trim();

    output +=
      '---------------------------------------------------------------------------------------------------\n';
    output += `Version: ${versionNumber}\n`;
    output += `Date: ${date}\n`;

    let currentCategory = '';
    let changes = [];
    let skipSection = false;

    for (let i = 3; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line === '') continue;

      if (
        line.startsWith("What's") ||
        line.startsWith('Styles') ||
        line.startsWith('Refactor') ||
        line.startsWith('Tests') ||
        line.startsWith('Docs') ||
        line.startsWith('Perf')
      ) {
        skipSection = true;
        continue;
      }

      if (/^\p{Emoji}/u.test(line)) {
        if (currentCategory && changes.length > 0) {
          output += `  ${currentCategory.replace(/^\p{Emoji} /u, '')}:\n`;
          for (const change of changes) {
            output += `    - ${change}\n`;
          }
        }
        currentCategory = line;
        changes = [];
        skipSection = false;
      } else if (line.startsWith('misc:') && !skipSection) {
        changes.push(line);
      }
    }

    if (currentCategory && changes.length > 0) {
      output += `  ${currentCategory.replace(/^\p{Emoji} /u, '')}:\n`;
      for (const change of changes) {
        output += `    - ${change}\n`;
      }
    }
  }

  return output.trim();
}

const buildChangelog = () => {
  const changelog = markdownToTxt(input);

  const formattedChangelog = formatChangelog(changelog);

  fs.writeFileSync(path.resolve(distDir, 'changelog.txt'), formattedChangelog);
};

module.exports = { buildChangelog };
