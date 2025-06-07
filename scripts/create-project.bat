@echo off
setlocal enabledelayedexpansion

REM Windows batch script for creating projects from React Native UI Boilerplate
REM Usage: create-project.bat <project-name> [options]

if "%1"=="" (
    echo Error: Project name is required
    echo Usage: create-project.bat ^<project-name^> [--clean] [--skip-install]
    echo Example: create-project.bat MyAwesomeApp
    exit /b 1
)

set PROJECT_NAME=%1
set CLEAN_FLAG=
set SKIP_INSTALL_FLAG=

REM Parse additional arguments
:parse_args
if "%2"=="--clean" (
    set CLEAN_FLAG=--clean
    shift
    goto parse_args
)
if "%2"=="--skip-install" (
    set SKIP_INSTALL_FLAG=--skip-install
    shift
    goto parse_args
)
if not "%2"=="" (
    shift
    goto parse_args
)

echo Creating new React Native project: %PROJECT_NAME%

REM Get script directory
set SCRIPT_DIR=%~dp0
set TEMPLATE_DIR=%SCRIPT_DIR%..

REM Run the Node.js script
node "%TEMPLATE_DIR%\create-local-project.js" %PROJECT_NAME% %CLEAN_FLAG% %SKIP_INSTALL_FLAG%

if %ERRORLEVEL% equ 0 (
    echo.
    echo ✅ Project created successfully!
    echo.
    echo Next steps:
    echo   cd %PROJECT_NAME%
    if not "%SKIP_INSTALL_FLAG%"=="--skip-install" (
        echo   bun dev
    ) else (
        echo   bun install
        echo   bun dev
    )
) else (
    echo.
    echo ❌ Failed to create project
    exit /b 1
)