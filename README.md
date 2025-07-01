# 🚀 React Native UI Boilerplate

<div align="center">

[![React Native](https://img.shields.io/badge/React%20Native-0.79.4-61dafb?style=flat-square&logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-53.0.15-000020?style=flat-square&logo=expo)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![NativeWind](https://img.shields.io/badge/NativeWind-4.1-06b6d4?style=flat-square)](https://www.nativewind.dev/)
[![npm version](https://img.shields.io/npm/v/rnr-starter?style=flat-square&logo=npm)](https://www.npmjs.com/package/rnr-starter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A comprehensive React Native Expo boilerplate with **50+ modern UI components**, dark/light themes, internationalization, and production-ready architecture.

[**View Demo**](#-screenshots) • [**Getting Started**](#-quick-start) • [**Components**](#-ui-components) • [**Features**](#-features)

</div>

---

## 🎉 What's New in v1.3.1

- 📚 **Documentation Update** - Synchronized documentation across npm and GitHub
- 🔄 **Version Information** - Updated all version references

### Previous Updates (v1.3.0)
- 🎨 **New Examples Component** - Better organized demo content with modular structure
- 🔄 **Enhanced Error Handling** - New ErrorStore and comprehensive error handling demo
- 📱 **Improved Architecture** - QueryClientProvider moved to _layout.tsx for better organization
- ⬆️ **Major Updates** - Expo 53.0.15 and React Native 0.79.4

[**View Full Changelog**](./CHANGELOG.md) • [**Latest Release**](https://github.com/uginy/rnr-starter/releases/tag/v1.3.1)

---

## ✨ Features

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
- **Dynamic Language Switching** with persistent storage

### 🔄 **State Management**
- **Zustand** for global state management
- **React Query** for server state and caching
- **Form State** with React Hook Form + Zod validation

### 📱 **Developer Experience**
- **TypeScript** with strict mode and comprehensive types
- **NativeWind** for Tailwind CSS styling
- **Expo Router** for file-based navigation
- **ESLint + Prettier** for code formatting
- **Biome** for fast linting and formatting

---

## 🚀 Quick Start

### Installation

```bash
# Create new project using this template
npx create-expo-app MyApp --template rnr-starter

# Or clone directly  
git clone https://github.com/uginy/rnr-starter.git
cd rnr-starter
bun install
```

### Development

```bash
# Start development server
bun run dev

# Run on specific platforms
bun run ios      # iOS simulator
bun run android  # Android emulator
bun run web      # Web browser
```

### First Steps

1. **Customize Colors** - Edit `tailwind.config.js` for your brand colors
2. **Add Your Content** - Replace demo content in `app/index.tsx`
3. **Configure i18n** - Add your languages in `lib/locales/`
4. **Setup State** - Configure your global state in `lib/stores/`

---

## 📱 UI Components

### Core Components
- **Button** - Primary, secondary, outline, ghost variants with loading states
- **Card** - Flexible containers with header, content, and footer sections
- **Input** - Text inputs with validation states and icons
- **Badge** - Status indicators and labels with multiple variants
- **Avatar** - User profile pictures with fallback initials

### Layout Components
- **Accordion** - Collapsible content sections with smooth animations
- **Tabs** - Horizontal and vertical tab navigation
- **Dialog** - Modal dialogs with backdrop and focus management
- **Sheet** - Bottom sheets with native feel on mobile platforms
- **Table** - Data tables with sorting, filtering, and pagination

### Form Components
- **Select** - Dropdown selection with search and multi-select
- **Checkbox** - Boolean inputs with indeterminate states
- **RadioGroup** - Single selection from multiple options
- **Switch** - Toggle switches with smooth animations
- **DatePicker** - Date and time selection with calendar view

### Feedback Components
- **Alert** - Success, warning, error, and info notifications
- **Toast** - Temporary notifications with auto-dismiss
- **Progress** - Loading indicators and progress bars
- **Skeleton** - Loading placeholders that match content structure
- **Loading** - Spinners and loading states

### Navigation Components
- **DropdownMenu** - Context menus with keyboard navigation
- **NavigationMenu** - Complex navigation structures
- **Breadcrumb** - Hierarchical navigation indicators
- **Pagination** - Page navigation with customizable ranges

---

## 🎨 Theming

### Theme Configuration

```typescript
// lib/constants.ts
export const NAV_THEME = {
  light: {
    background: 'hsl(0 0% 100%)',
    foreground: 'hsl(240 10% 3.9%)',
    // ... more colors
  },
  dark: {
    background: 'hsl(240 10% 3.9%)',
    foreground: 'hsl(0 0% 98%)',
    // ... more colors
  },
};
```

### Custom Colors

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // Add your custom colors
      },
    },
  },
};
```

---

## 🌍 Internationalization

### Adding Languages

```typescript
// lib/locales/es.json
{
  "common": {
    "loading": "Cargando...",
    "error": "Error",
    "success": "Éxito"
  },
  "navigation": {
    "home": "Inicio",
    "settings": "Configuración"
  }
}
```

### Using Translations

```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <Text>{t('common.loading')}</Text>
  );
}
```

---

## 🔄 State Management

### Global State with Zustand

```typescript
// lib/stores/user-store.ts
import { create } from 'zustand';

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
```

### Server State with React Query

```typescript
// lib/api/posts.ts
import { useQuery } from '@tanstack/react-query';

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

---

## 📋 Form Validation

### Zod Schemas

```typescript
// lib/validation/user-schema.ts
import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Must be at least 18 years old'),
});
```

### React Hook Form Integration

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

function UserForm() {
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: { name: '', email: '', age: 0 },
  });

  return (
    <Form {...form}>
      {/* Form fields */}
    </Form>
  );
}
```

---

## 🔧 Customization

### Adding Custom Components

```typescript
// components/ui/custom-button.tsx
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';

interface CustomButtonProps extends ButtonProps {
  gradient?: boolean;
}

export function CustomButton({ 
  gradient, 
  className, 
  ...props 
}: CustomButtonProps) {
  return (
    <Button
      className={cn(
        gradient && 'bg-gradient-to-r from-blue-500 to-purple-600',
        className
      )}
      {...props}
    />
  );
}
```

### Custom Hooks

```typescript
// lib/hooks/use-local-storage.ts
import { useState, useEffect } from 'react';
import { storage } from '~/lib/storage';

export function useLocalStorage<T>(
  key: string, 
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    const item = storage.getString(key);
    if (item) {
      setStoredValue(JSON.parse(item));
    }
  }, [key]);

  const setValue = (value: T) => {
    setStoredValue(value);
    storage.set(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
}
```

---

## 📱 Screenshots

### Light Theme
![Light Theme](https://via.placeholder.com/300x600/ffffff/000000?text=Light+Theme)

### Dark Theme  
![Dark Theme](https://via.placeholder.com/300x600/000000/ffffff?text=Dark+Theme)

### Components Showcase
![Components](https://via.placeholder.com/600x400/f0f0f0/333333?text=UI+Components)

---

## 🛠️ Development

### Project Structure

```
├── app/                    # Expo Router pages
├── components/             # Reusable components
│   ├── ui/                # Base UI components
│   └── demo/              # Demo components
├── lib/                   # Utilities and configurations
│   ├── api/               # API calls and React Query
│   ├── hooks/             # Custom hooks
│   ├── stores/            # Zustand stores
│   ├── validation/        # Zod schemas
│   └── utils.ts           # Utility functions
├── assets/                # Images and static files
└── locales/               # Translation files
```

### Scripts

```bash
# Development
bun run dev          # Start Expo dev server
bun run ios          # Run on iOS simulator
bun run android      # Run on Android emulator
bun run web          # Run on web browser

# Building
bun run build        # Build for production
bun run preview      # Preview production build

# Code Quality
bun run lint         # Run ESLint
bun run format       # Format with Prettier
bun run type-check   # Run TypeScript checks

# Testing
bun run test         # Run tests
bun run test:watch   # Run tests in watch mode
```

---

## 📦 Production Build

### EAS Build Configuration

```json
// eas.json
{
  "build": {
    "production": {
      "node": "20.11.0"
    },
    "preview": {
      "distribution": "internal"
    }
  },
  "submit": {
    "production": {}
  }
}
```

### Building for Stores

```bash
# Build for iOS App Store
eas build --platform ios --profile production

# Build for Google Play Store  
eas build --platform android --profile production

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](docs/CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/rnr-starter.git`
3. Install dependencies: `bun install`
4. Create a branch: `git checkout -b feature/amazing-feature`
5. Make your changes and commit: `git commit -m 'Add amazing feature'`
6. Push to your fork: `git push origin feature/amazing-feature`
7. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) - Universal React Native platform
- [NativeWind](https://www.nativewind.dev/) - Tailwind CSS for React Native
- [React Navigation](https://reactnavigation.org/) - Routing and navigation
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [React Query](https://tanstack.com/query) - Server state management
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://github.com/colinhacks/zod) - Schema validation

---

## 📞 Support

- 📧 **Email**: [support@rnr-starter.com](mailto:support@rnr-starter.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/uginy/rnr-starter/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/uginy/rnr-starter/discussions)
- 📚 **Documentation**: [Full Documentation](docs/README.md)

---

<div align="center">

**⭐ Star this repo if it helped you!**

Made with ❤️ by [Uginy](https://github.com/uginy)

</div>
