#!/usr/bin/env node

const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const version = process.argv[2];
if (!version) {
  console.error('Usage: node scripts/create-release.js v1.3.1');
  process.exit(1);
}

const changelogPath = path.resolve(__dirname, '../CHANGELOG.md');
const changelog = fs.readFileSync(changelogPath, 'utf8');

// Extract section for the given version
defaultNotes = `Release ${version}\n\nSee the [CHANGELOG.md](./CHANGELOG.md) for details.`;
let notes = defaultNotes;
const regex = new RegExp(`## \\[${version.replace(/^v/, '')}\\][^#]+`, 'm');
const match = changelog.match(regex);
if (match) {
  notes = `## ${version}\n\n${match[0].replace(/^## \[.*?\].*?\n/, '')}`;
}

// Remove trailing whitespace and ensure nice markdown
notes = `${notes.trim()}\n\nSee the [CHANGELOG.md](./CHANGELOG.md) for details.`;

console.log('Creating release with notes:\n', notes);

try {
  execSync(`gh release create ${version} --title "Release ${version}" --notes-file -`, {
    input: notes,
    stdio: ['pipe', 'inherit', 'inherit'],
  });
  console.log('Release created successfully!');
} catch (e) {
  console.error('Failed to create release:', e.message);
  process.exit(1);
}
