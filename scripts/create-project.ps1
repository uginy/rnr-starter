# PowerShell script for creating projects from React Native UI Boilerplate
# Usage: .\create-project.ps1 <project-name> [options]

param(
    [Parameter(Mandatory=$true, Position=0)]
    [string]$ProjectName,
    
    [switch]$Clean,
    [switch]$SkipInstall,
    [switch]$Help
)

function Show-Help {
    Write-Host @"
React Native UI Boilerplate - Project Creator (PowerShell)

Usage: .\create-project.ps1 <project-name> [options]

Parameters:
    -ProjectName    Name of the project to create (required)
    -Clean          Remove template-specific files after creation
    -SkipInstall    Skip dependency installation
    -Help           Show this help message

Examples:
    .\create-project.ps1 MyAwesomeApp
    .\create-project.ps1 MyApp -Clean
    .\create-project.ps1 MyApp -SkipInstall
    .\create-project.ps1 MyApp -Clean -SkipInstall

"@
}

if ($Help) {
    Show-Help
    exit 0
}

# Validate project name
if (-not $ProjectName) {
    Write-Host "❌ Error: Project name is required" -ForegroundColor Red
    Show-Help
    exit 1
}

if ($ProjectName -notmatch '^[a-zA-Z][a-zA-Z0-9_-]*$') {
    Write-Host "❌ Error: Project name must start with a letter and contain only letters, numbers, hyphens, and underscores" -ForegroundColor Red
    exit 1
}

Write-Host "🚀 Creating new React Native project: $ProjectName" -ForegroundColor Green

# Get script directory
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$TemplateDir = Split-Path -Parent $ScriptDir

Write-Host "📂 Template directory: $TemplateDir" -ForegroundColor Cyan

# Check if Node.js is available
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js >= 18.0.0 from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Prepare arguments for Node.js script
$args = @($ProjectName)
if ($Clean) { $args += "--clean" }
if ($SkipInstall) { $args += "--skip-install" }

# Run the Node.js script
Write-Host "🔧 Running project creation script..." -ForegroundColor Yellow

try {
    $createScriptPath = Join-Path $TemplateDir "create-local-project.js"
    & node $createScriptPath @args
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Project created successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "📍 Next steps:" -ForegroundColor Cyan
        Write-Host "   cd $ProjectName"
        
        if ($SkipInstall) {
            Write-Host "   bun install"
        }
        
        Write-Host "   bun dev"
        Write-Host ""
        Write-Host "🎉 Happy coding!" -ForegroundColor Magenta
        
        # Optional: Open project in VS Code
        $openInVscode = Read-Host "🆚 Do you want to open the project in VS Code? (y/N)"
        if ($openInVscode -match '^[Yy]$') {
            try {
                code $ProjectName
                Write-Host "📂 Opening project in VS Code..." -ForegroundColor Green
            } catch {
                Write-Host "⚠️ VS Code not found in PATH" -ForegroundColor Yellow
            }
        }
        
    } else {
        Write-Host ""
        Write-Host "❌ Failed to create project" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host ""
    Write-Host "❌ Error occurred: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}