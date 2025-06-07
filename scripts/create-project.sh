#!/bin/bash

# Unix/Linux/macOS script for creating projects from React Native UI Boilerplate
# Usage: ./create-project.sh <project-name> [options]

set -e

show_help() {
    cat << EOF
React Native UI Boilerplate - Project Creator

Usage: ./create-project.sh <project-name> [options]

Options:
    --clean         Remove template-specific files after creation
    --skip-install  Skip dependency installation
    --help, -h      Show this help message

Examples:
    ./create-project.sh MyAwesomeApp
    ./create-project.sh MyApp --clean
    ./create-project.sh MyApp --skip-install

EOF
}

# Parse arguments
PROJECT_NAME=""
CLEAN_FLAG=""
SKIP_INSTALL_FLAG=""

while [[ $# -gt 0 ]]; do
    case $1 in
        --help|-h)
            show_help
            exit 0
            ;;
        --clean)
            CLEAN_FLAG="--clean"
            shift
            ;;
        --skip-install)
            SKIP_INSTALL_FLAG="--skip-install"
            shift
            ;;
        -*)
            echo "Unknown option: $1"
            show_help
            exit 1
            ;;
        *)
            if [[ -z "$PROJECT_NAME" ]]; then
                PROJECT_NAME="$1"
            else
                echo "Error: Multiple project names provided"
                show_help
                exit 1
            fi
            shift
            ;;
    esac
done

# Validate project name
if [[ -z "$PROJECT_NAME" ]]; then
    echo "❌ Error: Project name is required"
    show_help
    exit 1
fi

# Validate project name format
if [[ ! "$PROJECT_NAME" =~ ^[a-zA-Z][a-zA-Z0-9_-]*$ ]]; then
    echo "❌ Error: Project name must start with a letter and contain only letters, numbers, hyphens, and underscores"
    exit 1
fi

echo "🚀 Creating new React Native project: $PROJECT_NAME"

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMPLATE_DIR="$(dirname "$SCRIPT_DIR")"

echo "📂 Template directory: $TEMPLATE_DIR"

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed or not in PATH"
    echo "Please install Node.js >= 18.0.0 from https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2)
REQUIRED_VERSION="18.0.0"

if ! node -p "require('semver').gte('$NODE_VERSION', '$REQUIRED_VERSION')" 2>/dev/null; then
    echo "⚠️ Warning: Node.js version $NODE_VERSION detected. Recommended: >= $REQUIRED_VERSION"
fi

# Run the Node.js script
echo "🔧 Running project creation script..."
if node "$TEMPLATE_DIR/create-local-project.js" "$PROJECT_NAME" $CLEAN_FLAG $SKIP_INSTALL_FLAG; then
    echo ""
    echo "✅ Project created successfully!"
    echo ""
    echo "📍 Next steps:"
    echo "   cd $PROJECT_NAME"
    
    if [[ -n "$SKIP_INSTALL_FLAG" ]]; then
        echo "   bun install"
    fi
    
    echo "   bun dev"
    echo ""
    echo "🎉 Happy coding!"
else
    echo ""
    echo "❌ Failed to create project"
    exit 1
fi

# Optional: Open project in VS Code if available
read -p "🆚 Do you want to open the project in VS Code? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]] && command -v code &> /dev/null; then
    echo "📂 Opening project in VS Code..."
    code "$PROJECT_NAME"
fi