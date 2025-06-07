#!/bin/bash

# Script to create example projects from the template
# This demonstrates different ways to use the boilerplate locally

set -e

echo "🚀 Creating example projects from React Native UI Boilerplate..."

# Get the script directory (where the template is located)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMPLATE_DIR="$(dirname "$SCRIPT_DIR")"

echo "📂 Template directory: $TEMPLATE_DIR"
echo "📁 Examples will be created in: $(pwd)/examples"

# Create examples directory
mkdir -p examples
cd examples

# Example 1: Basic project
echo "📱 Creating Example 1: Basic Todo App..."
node "$TEMPLATE_DIR/create-local-project.js" TodoApp --skip-install
echo "✅ TodoApp created"

# Example 2: E-commerce app with clean template
echo "🛒 Creating Example 2: E-commerce App (clean)..."
node "$TEMPLATE_DIR/create-local-project.js" ECommerceApp --clean --skip-install
echo "✅ ECommerceApp created (clean)"

# Example 3: Social media app
echo "📱 Creating Example 3: Social Media App..."
node "$TEMPLATE_DIR/create-local-project.js" SocialApp --skip-install
echo "✅ SocialApp created"

echo ""
echo "🎉 All example projects created successfully!"
echo ""
echo "📋 To run any example:"
echo "   cd examples/TodoApp"
echo "   bun install"
echo "   bun dev"
echo ""
echo "🗂️ Created projects:"
echo "   📱 TodoApp - Basic implementation with all template files"
echo "   🛒 ECommerceApp - Clean version without template files"
echo "   📱 SocialApp - Standard implementation"
echo ""
echo "💡 Each project is ready to use and can be customized for your needs!"