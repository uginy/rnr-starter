#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

/**
 * Script for creating a new project from React Native UI Boilerplate template
 * Usage: node create-local-project.js <project-name> [target-path] [options]
 */

class ProjectCreator {
  constructor() {
    this.templateDir = __dirname;
    this.ignorePatterns = this.loadIgnorePatterns();
  }

  loadIgnorePatterns() {
    // Load patterns from .template-ignore file if it exists
    const patterns = [];

    try {
      const ignoreFile = path.join(this.templateDir, '.template-ignore');
      if (fs.existsSync(ignoreFile)) {
        const content = fs.readFileSync(ignoreFile, 'utf8');
        const filePatterns = content
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line && !line.startsWith('#'));
        patterns.push(...filePatterns);
      }
    } catch (error) {
      console.warn('Warning: Could not load .template-ignore file');
    }

    // Additional template-specific patterns to exclude
    const templatePatterns = [
      // Version control and git
      '.git',
      '.gitignore',

      // Dependencies and lock files
      'node_modules',
      'bun.lockb',
      'package-lock.json',
      'yarn.lock',

      // Build and cache directories
      '.expo',
      'dist',
      'build',
      'ios',
      'android',
      'web-build',
      '.cache',
      '.next',
      'out',

      // Environment files (except .env.example)
      '.env',
      '.env.local',
      '.env.production',
      '.env.staging',

      // IDE and editor files
      '.vscode',
      '.idea',
      '*.swp',
      '*.swo',
      '*~',

      // System files
      '.DS_Store',
      'Thumbs.db',
      '*.log',
      '*.tmp',
      '*.temp',

      // Testing and coverage
      'coverage',
      '.nyc_output',
      'junit.xml',

      // Template development files
      'docs',
      'example-projects',
      'scripts',
      'create-local-project.js',
      'README_LOCAL_USAGE.md',
      'LOCAL_USAGE_QUICK_START.md',
      'test-local-tools.sh',
      'test-template.sh',
      'template.json',
      '.template-ignore',

      // Documentation files
      'BOILERPLATE_CLEANUP_CHECKLIST.md',
      'TEMPLATE_PUBLICATION_GUIDE.md',
      'TEMPLATE_PUBLICATION_PLAN.md',
      'TEMPLATE_TESTING_GUIDE.md',
      'FINAL_READINESS_REPORT.md',

      // Build artifacts
      '*.tgz',
      '*.tar.gz',
      '*.zip',
      '.eslintcache',

      // EAS Build
      '*.p8',
      '*.p12',
      '*.jks',
      '*.keystore',
      'google-services.json',
      'GoogleService-Info.plist',

      // Metro
      '.metro-health-check*',
    ];

    patterns.push(...templatePatterns);
    return patterns;
  }

  shouldIgnore(filePath) {
    const relativePath = path.relative(this.templateDir, filePath);
    const fileName = path.basename(filePath);

    // Convert Windows paths to Unix style for consistent matching
    const normalizedPath = relativePath.replace(/\\/g, '/');

    const shouldSkip = this.ignorePatterns.some((pattern) => {
      // Handle glob patterns
      if (pattern.includes('*')) {
        // Convert glob to regex
        const regexPattern = pattern.replace(/\./g, '\\.').replace(/\*/g, '.*').replace(/\?/g, '.');
        const regex = new RegExp(`^${regexPattern}$`);
        return regex.test(normalizedPath) || regex.test(fileName);
      }

      // Handle exact matches for files and directories
      return (
        normalizedPath === pattern ||
        fileName === pattern ||
        normalizedPath.startsWith(`${pattern}/`) ||
        normalizedPath === pattern.replace(/\/$/, '') ||
        // Handle directory patterns ending with /
        (pattern.endsWith('/') && normalizedPath.startsWith(pattern))
      );
    });

    return shouldSkip;
  }

  async createProject(projectName, options = {}) {
    const { clean = false, skipInstall = false, targetPath = null } = options;

    console.log(`🚀 Creating new project: ${projectName}`);
    console.log(`📂 Template directory: ${this.templateDir}`);

    // Determine target directory
    let targetDir;
    if (targetPath) {
      // Handle both absolute and relative paths
      let resolvedTargetPath;
      if (path.isAbsolute(targetPath)) {
        resolvedTargetPath = targetPath;
      } else {
        // Resolve relative path from current working directory
        resolvedTargetPath = path.resolve(process.cwd(), targetPath);
      }

      targetDir = path.join(resolvedTargetPath, projectName);
      console.log(`📁 Target base path: ${resolvedTargetPath}`);
      console.log(`📁 Full target path: ${targetDir}`);
    } else {
      // Default behavior - create in current directory
      targetDir = path.resolve(process.cwd(), projectName);
      console.log(`📁 Target path: ${targetDir}`);
    }

    // Prevent creating project inside template directory (would cause recursion)
    const normalizedTemplateDir = path.resolve(this.templateDir);
    const normalizedTargetDir = path.resolve(targetDir);

    if (normalizedTargetDir.startsWith(normalizedTemplateDir)) {
      throw new Error(
        `Cannot create project inside template directory!
Template: ${normalizedTemplateDir}
Target: ${normalizedTargetDir}
Please choose a different target directory.`
      );
    }

    // Check if target directory exists
    if (fs.existsSync(targetDir)) {
      throw new Error(`Directory ${projectName} already exists at ${targetDir}!`);
    }

    // Create target directory (including parent directories if needed)
    try {
      fs.mkdirSync(targetDir, { recursive: true });
      console.log(`📁 Created target directory: ${targetDir}`);
    } catch (error) {
      throw new Error(`Failed to create target directory: ${error.message}`);
    }

    // Copy template files
    console.log('📋 Copying template files...');
    await this.copyDirectory(this.templateDir, targetDir);

    // Update project configuration
    console.log('⚙️ Updating project configuration...');
    await this.updateProjectConfig(targetDir, projectName);

    // Clean template-specific files if requested
    if (clean) {
      console.log('🧹 Cleaning template-specific files...');
      await this.cleanTemplateFiles(targetDir);
    }

    // Install dependencies
    if (!skipInstall) {
      console.log('📦 Installing dependencies...');
      await this.installDependencies(targetDir);
    }

    // Initialize git repository
    console.log('🔧 Initializing git repository...');
    await this.initGitRepo(targetDir);

    console.log('✅ Project created successfully!');
    console.log('\n📍 Next steps:');
    console.log(`   cd ${projectName}`);
    if (skipInstall) {
      console.log('   bun install');
    }
    console.log('   bun dev');
    console.log('\n🎉 Happy coding!');
  }

  async copyDirectory(src, dest) {
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (this.shouldIgnore(srcPath)) {
        console.log(`   Skipping: ${path.relative(this.templateDir, srcPath)}`);
        continue;
      }

      if (entry.isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true });
        await this.copyDirectory(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
        console.log(`   Copied: ${path.relative(this.templateDir, srcPath)}`);
      }
    }
  }

  async updateProjectConfig(targetDir, projectName) {
    await this.updatePackageJson(targetDir, projectName);
    await this.updateAppJson(targetDir, projectName);
    await this.createEnvFile(targetDir);
  }

  async updatePackageJson(targetDir, projectName) {
    const packageJsonPath = path.join(targetDir, 'package.json');
    if (!fs.existsSync(packageJsonPath)) return;

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    packageJson.name = this.kebabCase(projectName);
    packageJson.description = `${projectName} - Created from React Native UI Boilerplate`;

    // Clean up template-specific scripts
    if (packageJson.scripts) {
      const scriptsToRemove = ['create-project', 'create-project:clean'];
      for (const script of scriptsToRemove) {
        if (packageJson.scripts[script]) {
          packageJson.scripts[script] = undefined;
        }
      }
    }

    // Update repository URLs (placeholder)
    const kebabName = this.kebabCase(projectName);
    if (packageJson.repository?.url) {
      packageJson.repository.url = `https://github.com/your-username/${kebabName}`;
    }
    if (packageJson.bugs?.url) {
      packageJson.bugs.url = `https://github.com/your-username/${kebabName}/issues`;
    }
    if (packageJson.homepage) {
      packageJson.homepage = `https://github.com/your-username/${kebabName}#readme`;
    }

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }

  async updateAppJson(targetDir, projectName) {
    const appJsonPath = path.join(targetDir, 'app.json');
    if (!fs.existsSync(appJsonPath)) return;

    const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));

    if (!appJson.expo) return;

    appJson.expo.name = projectName;
    appJson.expo.slug = this.kebabCase(projectName);

    const bundleId = `com.yourcompany.${this.camelCase(projectName)}`;
    appJson.expo.scheme = bundleId;

    if (appJson.expo.ios?.bundleIdentifier) {
      appJson.expo.ios.bundleIdentifier = bundleId;
    }
    if (appJson.expo.android?.package) {
      appJson.expo.android.package = bundleId;
    }

    // Update project ID placeholder
    if (appJson.expo.extra?.eas?.projectId) {
      appJson.expo.extra.eas.projectId = 'your-project-id-here';
    }
    if (appJson.expo.owner) {
      appJson.expo.owner = 'your-expo-username';
    }

    fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));
  }

  async createEnvFile(targetDir) {
    // Create/update .env from .env.example
    const envExamplePath = path.join(targetDir, '.env.example');
    const envPath = path.join(targetDir, '.env');
    if (fs.existsSync(envExamplePath) && !fs.existsSync(envPath)) {
      fs.copyFileSync(envExamplePath, envPath);
    }
  }

  async cleanTemplateFiles(targetDir) {
    const filesToRemove = [
      'docs/BOILERPLATE_CLEANUP_CHECKLIST.md',
      'docs/TEMPLATE_PUBLICATION_GUIDE.md',
      'docs/TEMPLATE_PUBLICATION_PLAN.md',
      'docs/TEMPLATE_TESTING_GUIDE.md',
      'docs/FINAL_READINESS_REPORT.md',
      'template.json',
      '.template-ignore',
      'test-template.sh',
    ];

    for (const file of filesToRemove) {
      const filePath = path.join(targetDir, file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`   Removed: ${file}`);
      }
    }

    // Remove docs directory if it's empty
    const docsDir = path.join(targetDir, 'docs');
    if (fs.existsSync(docsDir)) {
      const files = fs.readdirSync(docsDir);
      if (files.length === 0) {
        fs.rmdirSync(docsDir);
        console.log('   Removed: docs/ (empty)');
      }
    }
  }

  async installDependencies(targetDir) {
    try {
      execSync('bun install', {
        cwd: targetDir,
        stdio: 'inherit',
        timeout: 300000, // 5 minutes timeout
      });
    } catch (error) {
      console.warn('⚠️ Warning: Failed to install dependencies with bun, trying npm...');
      try {
        execSync('npm install', {
          cwd: targetDir,
          stdio: 'inherit',
          timeout: 300000,
        });
      } catch (npmError) {
        console.error('❌ Failed to install dependencies. Please run manually:');
        console.error(`   cd ${path.basename(targetDir)} && bun install`);
      }
    }
  }

  async initGitRepo(targetDir) {
    try {
      execSync('git init', { cwd: targetDir, stdio: 'pipe' });
      execSync('git add .', { cwd: targetDir, stdio: 'pipe' });
      execSync('git commit -m "Initial commit from React Native UI Boilerplate"', {
        cwd: targetDir,
        stdio: 'pipe',
      });
    } catch (error) {
      console.warn('⚠️ Warning: Failed to initialize git repository');
    }
  }

  kebabCase(str) {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  }

  camelCase(str) {
    return str
      .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
      .replace(/^(.)/, (_, c) => c.toLowerCase());
  }
}

// CLI Interface
function showHelp() {
  console.log(`
React Native UI Boilerplate - Local Project Creator

Usage:
  node create-local-project.js <project-name> [target-path] [options]

Arguments:
  project-name    Name of the project to create (required)
  target-path     Directory where to create the project (optional, default: current directory)
                  Can be absolute path (/Users/username/Projects) or relative (../projects, ./my-apps)

Options:
  --clean         Remove template-specific files after creation
  --skip-install  Skip dependency installation
  --help, -h      Show this help message

Examples:
  # Create in current directory
  node create-local-project.js MyAwesomeApp

  # Create in absolute path
  node create-local-project.js MyApp /Users/username/Projects
  
  # Create in relative path (relative to current directory)
  node create-local-project.js MyApp ../projects
  node create-local-project.js MyApp ./my-apps
  node create-local-project.js MyApp ../../development
  
  # With options
  node create-local-project.js MyApp ../projects --clean
  node create-local-project.js MyApp ./apps --skip-install

`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    showHelp();
    process.exit(0);
  }

  // Parse arguments
  const nonOptionArgs = args.filter((arg) => !arg.startsWith('--'));
  const projectName = nonOptionArgs[0];
  const targetPath = nonOptionArgs[1]; // Optional second argument

  const options = {
    clean: args.includes('--clean'),
    skipInstall: args.includes('--skip-install'),
    targetPath: targetPath,
  };

  if (!projectName || projectName.startsWith('-')) {
    console.error('❌ Error: Project name is required');
    showHelp();
    process.exit(1);
  }

  // Validate project name
  if (!/^[a-zA-Z][a-zA-Z0-9-_]*$/.test(projectName)) {
    console.error(
      '❌ Error: Project name must start with a letter and contain only letters, numbers, hyphens, and underscores'
    );
    process.exit(1);
  }

  // Validate and create target path if provided
  if (targetPath) {
    let resolvedPath;
    if (path.isAbsolute(targetPath)) {
      resolvedPath = targetPath;
    } else {
      resolvedPath = path.resolve(process.cwd(), targetPath);
    }

    // Check if parent directory exists
    const parentDir = path.dirname(resolvedPath);
    if (!fs.existsSync(parentDir)) {
      console.error(`❌ Error: Parent directory does not exist: ${parentDir}`);
      process.exit(1);
    }

    // Create target path if it doesn't exist
    if (!fs.existsSync(resolvedPath)) {
      try {
        fs.mkdirSync(resolvedPath, { recursive: true });
        console.log(`📁 Created target base directory: ${resolvedPath}`);
      } catch (error) {
        console.error(`❌ Error: Cannot create target path: ${error.message}`);
        process.exit(1);
      }
    }
  }

  try {
    const creator = new ProjectCreator();
    await creator.createProject(projectName, options);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { ProjectCreator };
