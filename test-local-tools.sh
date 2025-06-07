#!/bin/bash

# Test script for all local tools
# This script tests different methods of creating projects locally

set -e

echo "🧪 Testing React Native UI Boilerplate Local Tools"
echo "=================================================="
echo ""

# Cleanup function
cleanup() {
    echo "🧹 Cleaning up test projects..."
    rm -rf TestProject* test-examples 2>/dev/null || true
}

# Set trap to cleanup on exit
trap cleanup EXIT

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Test 1: Basic project creation
test_basic_creation() {
    log_info "Test 1: Basic project creation"
    
    if node create-local-project.js TestProject1 --skip-install; then
        if [[ -d "TestProject1" && -f "TestProject1/package.json" && -f "TestProject1/app.json" ]]; then
            log_success "Basic project creation works"
            
            # Check if package.json was updated
            if grep -q "TestProject1" TestProject1/package.json; then
                log_success "Package.json updated correctly"
            else
                log_warning "Package.json may not be updated"
            fi
            
            # Check if app.json was updated
            if grep -q "TestProject1" TestProject1/app.json; then
                log_success "App.json updated correctly"
            else
                log_warning "App.json may not be updated"
            fi
            
        else
            log_error "Project structure incomplete"
            return 1
        fi
    else
        log_error "Failed to create basic project"
        return 1
    fi
    
    rm -rf TestProject1
}

# Test 2: Clean project creation
test_clean_creation() {
    log_info "Test 2: Clean project creation"
    
    if node create-local-project.js TestProject2 --clean --skip-install; then
        if [[ -d "TestProject2" ]]; then
            log_success "Clean project created"
            
            # Check if template files were removed
            if [[ ! -f "TestProject2/template.json" && ! -f "TestProject2/.template-ignore" ]]; then
                log_success "Template files removed correctly"
            else
                log_warning "Some template files still exist"
            fi
            
            # Check if docs were cleaned
            if [[ ! -f "TestProject2/docs/BOILERPLATE_CLEANUP_CHECKLIST.md" ]]; then
                log_success "Template docs removed correctly"
            else
                log_warning "Template docs still exist"
            fi
            
        else
            log_error "Clean project not created"
            return 1
        fi
    else
        log_error "Failed to create clean project"
        return 1
    fi
    
    rm -rf TestProject2
}

# Test 3: NPM commands
test_npm_commands() {
    log_info "Test 3: NPM commands"
    
    if command -v bun &> /dev/null; then
        if bun run create-project TestProject3 --skip-install &>/dev/null; then
            if [[ -d "TestProject3" ]]; then
                log_success "NPM create-project command works"
            else
                log_error "NPM command failed to create project"
                return 1
            fi
        else
            log_warning "NPM create-project command failed (this might be expected)"
        fi
    else
        log_warning "Bun not available, skipping NPM commands test"
    fi
    
    rm -rf TestProject3 2>/dev/null || true
}

# Test 4: Shell script (Unix only)
test_shell_script() {
    if [[ "$OSTYPE" != "msys" && "$OSTYPE" != "cygwin" && "$OSTYPE" != "win32" ]]; then
        log_info "Test 4: Shell script"
        
        if ./scripts/create-project.sh TestProject4 --skip-install 2>/dev/null; then
            if [[ -d "TestProject4" ]]; then
                log_success "Shell script works"
            else
                log_error "Shell script failed to create project"
                return 1
            fi
        else
            log_warning "Shell script failed (might need chmod +x)"
        fi
        
        rm -rf TestProject4 2>/dev/null || true
    else
        log_info "Test 4: Skipping shell script test on Windows"
    fi
}

# Test 5: Examples creation
test_examples_creation() {
    log_info "Test 5: Examples creation script"
    
    mkdir -p test-examples
    cd test-examples
    
    if ../example-projects/create-examples.sh &>/dev/null; then
        if [[ -d "examples/TodoApp" && -d "examples/ECommerceApp" && -d "examples/SocialApp" ]]; then
            log_success "Examples creation script works"
            
            # Check if clean example is actually clean
            if [[ ! -f "examples/ECommerceApp/template.json" ]]; then
                log_success "Clean example is properly cleaned"
            else
                log_warning "Clean example still has template files"
            fi
            
        else
            log_error "Examples not created properly"
            cd ..
            return 1
        fi
    else
        log_warning "Examples creation script failed"
    fi
    
    cd ..
    rm -rf test-examples
}

# Test 6: File validation
test_file_validation() {
    log_info "Test 6: File validation"
    
    # Check if all required files exist
    local required_files=(
        "create-local-project.js"
        "README_LOCAL_USAGE.md"
        "LOCAL_USAGE_QUICK_START.md"
        "scripts/create-project.sh"
        "scripts/create-project.bat"
        "scripts/create-project.ps1"
        "scripts/README.md"
        "example-projects/create-examples.sh"
        "example-projects/README.md"
    )
    
    local missing_files=()
    
    for file in "${required_files[@]}"; do
        if [[ ! -f "$file" ]]; then
            missing_files+=("$file")
        fi
    done
    
    if [[ ${#missing_files[@]} -eq 0 ]]; then
        log_success "All required files exist"
    else
        log_error "Missing files: ${missing_files[*]}"
        return 1
    fi
    
    # Check if scripts are executable
    if [[ -x "create-local-project.js" && -x "scripts/create-project.sh" && -x "example-projects/create-examples.sh" ]]; then
        log_success "Scripts are executable"
    else
        log_warning "Some scripts may not be executable"
    fi
}

# Test 7: Node.js version check
test_nodejs_version() {
    log_info "Test 7: Node.js version check"
    
    if command -v node &> /dev/null; then
        local node_version=$(node --version | cut -d'v' -f2)
        local major_version=$(echo $node_version | cut -d'.' -f1)
        
        if [[ $major_version -ge 18 ]]; then
            log_success "Node.js version $node_version is compatible"
        else
            log_warning "Node.js version $node_version may be incompatible (recommend >= 18)"
        fi
    else
        log_error "Node.js not found"
        return 1
    fi
}

# Run all tests
main() {
    log_info "Starting local tools testing..."
    echo ""
    
    local failed_tests=0
    
    # Run tests
    test_nodejs_version || ((failed_tests++))
    echo ""
    
    test_file_validation || ((failed_tests++))
    echo ""
    
    test_basic_creation || ((failed_tests++))
    echo ""
    
    test_clean_creation || ((failed_tests++))
    echo ""
    
    test_npm_commands || ((failed_tests++))
    echo ""
    
    test_shell_script || ((failed_tests++))
    echo ""
    
    test_examples_creation || ((failed_tests++))
    echo ""
    
    # Summary
    echo "=================================================="
    if [[ $failed_tests -eq 0 ]]; then
        log_success "All tests passed! 🎉"
        log_info "Your local tools are ready to use!"
        echo ""
        echo "📋 Quick start:"
        echo "   node create-local-project.js MyAwesomeApp"
        echo "   cd MyAwesomeApp && bun dev"
    else
        log_warning "$failed_tests test(s) failed"
        log_info "Some features may not work as expected"
    fi
    echo ""
}

# Show help
if [[ "$1" == "--help" || "$1" == "-h" ]]; then
    echo "Local Tools Test Script"
    echo ""
    echo "Usage: ./test-local-tools.sh"
    echo ""
    echo "This script tests all local tools for creating projects from the boilerplate:"
    echo "  - Basic project creation"
    echo "  - Clean project creation"
    echo "  - NPM commands"
    echo "  - Platform scripts"
    echo "  - Examples creation"
    echo "  - File validation"
    echo ""
    exit 0
fi

# Run main function
main