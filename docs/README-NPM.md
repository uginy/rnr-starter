# 🚀 React Native UI Boilerplate - Expo Template

A comprehensive React Native Expo boilerplate with **50+ modern UI components**, dark/light themes, internationalization, and production-ready architecture.

## 🎉 What's New in v1.3.1

- 📚 **Documentation Update** - Synchronized documentation across npm and GitHub
- 🔄 **Version Information** - Updated all version references

### Previous Updates (v1.3.0)
- 🎨 **New Examples Component** - Better organized demo content with modular structure
- 🔄 **Enhanced Error Handling** - New ErrorStore and comprehensive error handling demo
- 📱 **Improved Architecture** - QueryClientProvider moved to _layout.tsx for better organization
- ⬆️ **Major Updates** - Expo 53.0.15 and React Native 0.79.4
- 📚 **Better Documentation** - Enhanced guides and examples
- 🛠️ **Code Organization** - Improved maintainability and structure

## 🚀 Quick Start

```bash
# Create a new project with this template
npx create-expo-app@latest MyApp --template rnr-starter

# Navigate to your project
cd MyApp

# Install dependencies
bun install
# or
npm install

# Start development server
bun dev
# or
npm run dev
```

## ✨ What's Included

### 🎨 **Rich UI Library**
- **50+ Production-ready Components** - Buttons, Cards, Forms, Tables, Modals, and more
- **Cross-platform Bottom Sheets** with native feel on iOS/Android
- **Advanced Data Tables** with sorting, filtering, and pagination
- **Form Components** with validation and error handling
- **Toast Notifications** with auto error interceptor

### 🌙 **Theming System**
- **Dark & Light Mode** with system preference detection
- **Persistent Theme Selection** across app sessions
- **Android Navigation Bar** automatically matches theme
- **Customizable Color Palette** with CSS variables

### 🌍 **Internationalization**
- **Multi-language Support** (English & Russian included)
- **React i18next Integration** with namespace support
- **RTL Layout Support** for Arabic/Hebrew languages
- **Dynamic Language Switching** without app restart

### 🛠 **Developer Experience**
- **TypeScript** with strict configuration
- **Biome** for lightning-fast linting and formatting
- **Hot Reload** with Expo development server
- **Path Mapping** with `~/` alias for clean imports
- **Pre-commit Hooks** for code quality

### 📱 **Cross-platform**
- **iOS** - Native performance with platform-specific optimizations
- **Android** - Material Design compliance with custom theming
- **Web** - Progressive Web App ready with responsive design

## 📚 Components Overview

### Core UI Components
- **Buttons** - Primary, Secondary, Outline, Ghost, Destructive, Async
- **Cards** - Basic, Header, Footer, Content variations
- **Forms** - Input, Textarea, Select, Checkbox, Radio, Date Picker
- **Navigation** - Bottom Tabs, Stack, Drawer with custom styling
- **Modals** - Alert Dialog, Bottom Sheet, Popover, Tooltip

### Advanced Components
- **Data Table** - Sortable, filterable, paginated tables
- **Calendar** - Date picker with range selection
- **File Upload** - Avatar uploader with image cropping
- **Toast System** - Auto error handling with i18n support
- **Theme Toggle** - Smooth dark/light mode switching

## 🏗 Architecture

### State Management
- **Zustand** for global state
- **React Query** for server state
- **MMKV** for persistent storage

### Styling
- **NativeWind** (Tailwind CSS for React Native)
- **CSS Variables** for theme customization
- **Platform-specific** styling when needed

### Development Tools
- **TypeScript** with strict mode
- **Biome** for linting and formatting
- **Knip** for dead code elimination
- **Expo Router** for file-based routing

## 📖 Documentation

After creating your project, check out:
- `README.md` - Project overview and setup
- `docs/SETUP.md` - Detailed setup instructions
- `docs/CONTRIBUTING.md` - Development guidelines

## 🤝 Contributing

Contributions are welcome! Please see our [Contributing Guide](https://github.com/eugene-m/create-expo-app-rnr-starter/blob/main/docs/CONTRIBUTING.md).

## 📝 License

MIT © [Eugene M](https://github.com/eugene-m)

---

**Happy coding!** 🎉
