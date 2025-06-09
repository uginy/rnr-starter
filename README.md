# 🚀 React Native UI Boilerplate

<div align="center">

[![React Native](https://img.shields.io/badge/React%20Native-0.79.2-61dafb?style=flat-square&logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-53.0-000020?style=flat-square&logo=expo)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![NativeWind](https://img.shields.io/badge/NativeWind-4.1-06b6d4?style=flat-square)](https://www.nativewind.dev/)
[![npm version](https://img.shields.io/npm/v/rnr-starter?style=flat-square&logo=npm)](https://www.npmjs.com/package/rnr-starter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A comprehensive React Native Expo boilerplate with **50+ modern UI components**, dark/light themes, internationalization, and production-ready architecture.

[**View Demo**](#-screenshots) • [**Getting Started**](#-quick-start) • [**Components**](#-ui-components) • [**Features**](#-features)

</div>

---

## 🎉 What's New in v1.1.0

- 🎨 **Enhanced UI components** with better accessibility
- 🔧 **InitializationProvider** for better app startup management  
- 📱 **LoadingScreen component** for smooth app initialization
- 🌐 **Improved internationalization** support
- 🔄 **Enhanced state management** with better error handling
- 🐛 **Fixed text node rendering** issues in React Native components

[**View Full Changelog**](./CHANGELOG.md) • [**GitHub Release**](https://github.com/uginy/rnr-starter/releases/tag/v1.1.0)

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

### 🔧 **State Management**
- **Zustand** for lightweight global state
- **React Query** for server state and caching
- **MMKV** for high-performance local storage
- **React Hook Form** with Zod validation

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

1. **Update App Configuration**
   ```bash
   # Edit app.json for your app details
   nano app.json
   ```

2. **Configure Theme Colors**
   ```bash
   # Customize colors in global.css
   nano global.css
   ```

3. **Add Your Content**
   ```bash
   # Start building in app/index.tsx
   nano app/index.tsx
   ```

---

## 🧩 UI Components

### 📝 Form Components
- **Button** / **ButtonAsync** - Enhanced buttons with loading states
- **Input** / **Textarea** - Styled text inputs with validation
- **Select** / **RadioGroup** - Selection components
- **Checkbox** / **Switch** - Toggle components  
- **DatePicker** - Cross-platform date selection
- **OTPInput** - One-time password input with multiple styles

### 📊 Data Display
- **Table** - Advanced data tables with sorting/filtering
- **Card** - Content containers with headers/footers
- **Badge** / **Avatar** - Status and profile components
- **Progress** - Loading and progress indicators
- **Skeleton** - Loading placeholder components

### 🎯 Navigation & Layout
- **Tabs** - Tab navigation with animations
- **Accordion** - Collapsible content sections
- **Separator** - Visual content dividers
- **AspectRatio** - Responsive aspect ratio containers

### 💬 Overlays & Modals
- **Dialog** / **AlertDialog** - Modal dialogs
- **BottomSheet** / **BottomSheetModal** - Native bottom sheets
- **Popover** / **Tooltip** - Contextual overlays
- **HoverCard** - Rich hover interactions (web)
- **Toast** - Non-intrusive notifications

### 🎛 Interactive Components
- **DropdownMenu** / **ContextMenu** - Context-aware menus
- **NavigationMenu** / **Menubar** - Navigation components
- **Toggle** / **ToggleGroup** - Toggle controls
- **Collapsible** - Expandable content areas

### 📄 Typography
- **Text** - Enhanced text component with variants
- **H1** / **H2** / **H3** / **H4** - Heading components
- **P** / **BlockQuote** / **Code** - Content typography
- **Lead** / **Large** / **Small** / **Muted** - Text variants

---

## 📸 Screenshots

> **Note**: Add your app screenshots here

```
[Hero Screenshot]     [Dark Mode]        [Components Demo]
     iOS/Android         Theme Demo         UI Library
```

---

## 🏗 Project Structure

```
📦 react-native-ui-boilerplate/
├── 📱 app/                          # Expo Router pages
│   ├── _layout.tsx                  # Root layout with providers
│   ├── index.tsx                    # Landing page
│   └── +not-found.tsx              # 404 page
├── 🧩 components/                   # Reusable components
│   ├── ui/                          # UI primitives (50+ components)
│   │   ├── button.tsx              # Button variants
│   │   ├── card.tsx                # Card components
│   │   ├── table.tsx               # Data table
│   │   ├── bottom-sheet/           # Bottom sheet components
│   │   └── ...                     # All other UI components
│   ├── ThemeToggle.tsx             # Theme switcher
│   ├── LanguageToggle.tsx          # Language switcher
│   └── AvatarUploader.tsx          # Avatar upload component
├── 📚 lib/                         # Core utilities
│   ├── hooks/                      # Custom React hooks
│   │   ├── useDayJs.ts            # Date utilities
│   │   ├── useMMKV.ts             # Storage hooks
│   │   └── useTable.ts            # Table utilities
│   ├── stores/                     # State management
│   │   └── toast-store.ts         # Toast notifications
│   ├── toast/                      # Toast system
│   │   ├── providers/             # Toast providers
│   │   ├── hooks/                 # Toast hooks
│   │   └── utils/                 # Toast utilities
│   ├── icons/                      # Custom icons
│   ├── locales/                    # i18n translations
│   │   ├── en.json                # English translations
│   │   └── ru.json                # Russian translations
│   ├── constants.ts                # App constants
│   ├── i18n.ts                     # Internationalization setup
│   ├── store.ts                    # Zustand store
│   ├── utils.ts                    # Utility functions
│   └── types.ts                    # TypeScript types
├── 🎨 assets/                      # Static assets
├── 📄 docs/                        # Documentation
└── ⚙️ Configuration files
    ├── app.json                    # Expo configuration
    ├── tailwind.config.js          # Tailwind CSS config
    ├── biome.json                  # Biome linter config
    ├── tsconfig.json               # TypeScript config
    └── metro.config.js             # Metro bundler config
```

---

## 🔧 Customization

### Theme Configuration

```typescript
// global.css - Customize your color palette
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  /* Add your custom colors */
}
```

### Adding New Languages

```typescript
// lib/locales/your-language.json
{
  "common": {
    "welcome": "Your translation",
    "loading": "Your translation"
  }
}

// lib/i18n.ts - Register new language
import yourLanguage from './locales/your-language.json';

resources: {
  'your-lang': { translation: yourLanguage }
}
```

### Custom Components

```tsx
// components/ui/your-component.tsx
import { cn } from '~/lib/utils';
import { Text } from '~/components/ui/text';

interface YourComponentProps {
  className?: string;
  children: React.ReactNode;
}

export function YourComponent({ className, children }: YourComponentProps) {
  return (
    <Text className={cn('your-default-styles', className)}>
      {children}
    </Text>
  );
}
```

---

## 📱 Usage Examples

### Basic Form with Validation

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  return (
    <View className="space-y-4">
      <Input
        placeholder="Email"
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        placeholder="Password"
        secureTextEntry
        {...register('password')}
        error={errors.password?.message}
      />
      <Button onPress={handleSubmit(onSubmit)}>
        Login
      </Button>
    </View>
  );
}
```

### Data Table with Filtering

```tsx
import { Table } from '~/components/ui/table';
import { useTable } from '~/lib/hooks/useTable';

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role' },
];

export function UsersTable() {
  const [globalFilter, setGlobalFilter] = useState('');
  
  return (
    <Table
      data={users}
      columns={columns}
      enableSorting
      enableFiltering
      globalFilter={globalFilter}
      onGlobalFilterChange={setGlobalFilter}
      enablePagination
      pageSize={10}
    />
  );
}
```

### Bottom Sheet Implementation

```tsx
import { BottomSheetModal, BottomSheetView } from '~/components/ui/bottom-sheet';

export function ProfileModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BottomSheetModal
      open={isOpen}
      onOpenChange={setIsOpen}
      snapPoints={['50%', '90%']}
    >
      <BottomSheetView className="p-6">
        <Text className="text-2xl font-bold mb-4">User Profile</Text>
        {/* Your content here */}
      </BottomSheetView>
    </BottomSheetModal>
  );
}
```

---

## 🔨 Available Scripts

```bash
# Development
bun run dev              # Start development server
bun run dev:web          # Start web development server
bun run dev:android      # Start Android development
bun run ios              # Run on iOS simulator
bun run android          # Run on Android emulator

# Code Quality
bun run lint             # Run linter
bun run lint:fix         # Fix linting issues
bun run format           # Format code
bun run format:write     # Format and write changes
bun run check            # Run all checks
bun run check:fix        # Fix all issues

# Building
bun run build:dev:android        # Development Android build
bun run build:preview:android    # Preview Android build
bun run build:prod:android       # Production Android build
bun run build:dev:ios           # Development iOS build
bun run build:preview:ios       # Preview iOS build
bun run build:prod:ios          # Production iOS build
```

---

## 🎯 Production Checklist

- [ ] Update `app.json` with your app details
- [ ] Replace placeholder icons in `assets/`
- [ ] Configure environment variables in `.env.example`
- [ ] Update repository URLs in `package.json`
- [ ] Add your custom colors to `global.css`
- [ ] Configure EAS Build in `eas.json`
- [ ] Add app store metadata
- [ ] Test on physical devices
- [ ] Set up CI/CD pipeline
- [ ] Configure analytics and crash reporting

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) - The platform that makes React Native development a joy
- [NativeWind](https://www.nativewind.dev/) - Tailwind CSS for React Native
- [RN Primitives](https://github.com/mrzachnugent/react-native-reusables) - Unstyled, accessible components
- [Shadcn/ui](https://ui.shadcn.com/) - Design inspiration and component patterns

## 📋 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a detailed history of changes.

### Latest Updates (v1.1.0)
- 🎨 Enhanced UI components with better accessibility
- 🔧 Added InitializationProvider for better app startup
- 📱 New LoadingScreen component
- 🐛 Fixed text rendering issues in React Native
- 🌐 Improved internationalization support

---

<div align="center">

**Built with ❤️ for the React Native community**

[⭐ Star this repository](https://github.com/your-username/react-native-ui-boilerplate) if it helped you!

</div>
