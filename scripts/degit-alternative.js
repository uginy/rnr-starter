#!/usr/bin/env node

/**
 * Alternative to degit for downloading GitHub repositories
 * Usage: node degit-alternative.js <github-url> <target-directory>
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class GitHubDownloader {
  constructor() {
    this.apiUrl = 'https://api.github.com';
  }

  async downloadRepository(repoUrl, targetDir, options = {}) {
    const { branch = 'main', subdirectory = null } = options;

    console.log(`📥 Downloading repository: ${repoUrl}`);
    console.log(`📂 Target directory: ${targetDir}`);

    try {
      // Parse GitHub URL
      const { owner, repo } = this.parseGitHubUrl(repoUrl);

      // Create target directory
      if (fs.existsSync(targetDir)) {
        throw new Error(`Directory ${targetDir} already exists!`);
      }
      fs.mkdirSync(targetDir, { recursive: true });

      // Download as ZIP
      const zipUrl = `https://github.com/${owner}/${repo}/archive/refs/heads/${branch}.zip`;
      const zipPath = path.join(targetDir, 'temp.zip');

      console.log('⬇️ Downloading ZIP archive...');
      await this.downloadFile(zipUrl, zipPath);

      console.log('📦 Extracting files...');
      await this.extractZip(zipPath, targetDir, `${repo}-${branch}`, subdirectory);

      // Clean up
      fs.unlinkSync(zipPath);

      console.log('✅ Repository downloaded successfully!');
    } catch (error) {
      console.error(`❌ Error: ${error.message}`);
      // Clean up on error
      if (fs.existsSync(targetDir)) {
        fs.rmSync(targetDir, { recursive: true, force: true });
      }
      throw error;
    }
  }

  parseGitHubUrl(url) {
    // Support different GitHub URL formats
    const patterns = [/github\.com\/([^\/]+)\/([^\/]+?)(?:\.git)?(?:\/|$)/, /^([^\/]+)\/([^\/]+)$/];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return { owner: match[1], repo: match[2] };
      }
    }

    throw new Error('Invalid GitHub URL format');
  }

  downloadFile(url, outputPath) {
    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(outputPath);

      https
        .get(url, (response) => {
          if (response.statusCode === 302 || response.statusCode === 301) {
            // Follow redirect
            return this.downloadFile(response.headers.location, outputPath)
              .then(resolve)
              .catch(reject);
          }

          if (response.statusCode !== 200) {
            reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
            return;
          }

          response.pipe(file);

          file.on('finish', () => {
            file.close();
            resolve();
          });

          file.on('error', (err) => {
            fs.unlink(outputPath, () => {}); // Clean up
            reject(err);
          });
        })
        .on('error', reject);
    });
  }

  async extractZip(zipPath, targetDir, rootFolder, subdirectory) {
    try {
      // Try to use native unzip command
      const extractDir = path.join(targetDir, 'temp_extract');
      fs.mkdirSync(extractDir, { recursive: true });

      if (process.platform === 'win32') {
        // Windows PowerShell
        execSync(
          `powershell -command "Expand-Archive -Path '${zipPath}' -DestinationPath '${extractDir}'"`,
          { stdio: 'pipe' }
        );
      } else {
        // Unix-like systems
        execSync(`unzip -q "${zipPath}" -d "${extractDir}"`, { stdio: 'pipe' });
      }

      // Move files from extracted folder
      const extractedRoot = path.join(extractDir, rootFolder);
      const sourceDir = subdirectory ? path.join(extractedRoot, subdirectory) : extractedRoot;

      if (!fs.existsSync(sourceDir)) {
        throw new Error(`Source directory not found: ${sourceDir}`);
      }

      this.copyDirectory(sourceDir, targetDir);

      // Clean up
      fs.rmSync(extractDir, { recursive: true, force: true });
    } catch (error) {
      throw new Error(`Failed to extract ZIP: ${error.message}`);
    }
  }

  copyDirectory(src, dest) {
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true });
        this.copyDirectory(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

// CLI Interface
function showHelp() {
  console.log(`
GitHub Repository Downloader (degit alternative)

Usage:
  node degit-alternative.js <github-url> <target-directory> [options]

Options:
  --branch <name>     Specify branch (default: main)
  --subdirectory <path>  Extract only a subdirectory
  --help, -h         Show this help message

Examples:
  node degit-alternative.js your-username/rn-starter MyNewProject
  node degit-alternative.js https://github.com/your-username/rn-starter MyProject
  node degit-alternative.js your-username/rn-starter MyProject --branch develop

GitHub URL formats supported:
  - your-username/repo-name
  - https://github.com/your-username/repo-name
  - https://github.com/your-username/repo-name.git

`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    showHelp();
    process.exit(0);
  }

  const repoUrl = args[0];
  const targetDir = args[1];

  if (!repoUrl || !targetDir) {
    console.error('❌ Error: Repository URL and target directory are required');
    showHelp();
    process.exit(1);
  }

  // Parse options
  const options = {};
  const branchIndex = args.indexOf('--branch');
  if (branchIndex !== -1 && args[branchIndex + 1]) {
    options.branch = args[branchIndex + 1];
  }

  const subdirIndex = args.indexOf('--subdirectory');
  if (subdirIndex !== -1 && args[subdirIndex + 1]) {
    options.subdirectory = args[subdirIndex + 1];
  }

  try {
    const downloader = new GitHubDownloader();
    await downloader.downloadRepository(repoUrl, targetDir, options);

    console.log(`\n📍 Next steps:`);
    console.log(`   cd ${targetDir}`);
    console.log(`   bun install`);
    console.log(`   bun dev`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { GitHubDownloader };
