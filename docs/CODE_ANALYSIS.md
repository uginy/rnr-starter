# Code Analysis Commands

This project includes several commands for analyzing unused code and dependencies using [knip](https://knip.dev/).

## Available Commands

### Basic Analysis
```bash
# Find unused files, exports, and dependencies
npm run dead-code

# Find only unused dependencies
npm run unused-deps

# Run both dead code and dependency analysis
npm run analyze
```

### Advanced Analysis
```bash
# Strict mode - more thorough analysis with stricter rules
npm run dead-code:strict

# Production analysis - focus on production dependencies only
npm run analyze:production
```

## Understanding Results

### Unused Files
Files that are not imported or used anywhere in the codebase. In this template project, many UI components may appear unused because they are meant to be used when building your application.

### Unused Dependencies
Dependencies listed in `package.json` that are not actually imported or used in the code.

### Unlisted Binaries
Command-line tools used in scripts but not listed as dependencies.

### Configuration Hints
Suggestions for improving the knip configuration.

## Configuration

The analysis is configured in `knip.json`. Template components and common dependencies are excluded from analysis to reduce false positives.

## For Template Users

When using this template for your project:

1. Run `npm run analyze` periodically to check for unused code
2. Remove unused components and dependencies as you build your application
3. Adjust `knip.json` configuration based on your specific needs

## Exit Codes

- Exit code 0: No issues found
- Exit code 1: Issues found (warnings/suggestions)
- Exit code 2: Configuration errors