# 🤝 Contributing to React Native UI Boilerplate

<div align="center">

[![Contributors Welcome](https://img.shields.io/badge/Contributors-Welcome-brightgreen?style=flat-square)](.)
[![React Native](https://img.shields.io/badge/React%20Native-0.79.2-61dafb?style=flat-square&logo=react)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Good First Issues](https://img.shields.io/github/issues/username/react-native-ui-boilerplate/good%20first%20issue?style=flat-square)](https://github.com/username/react-native-ui-boilerplate/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

We love contributions! This guide will help you get started contributing to our React Native UI Boilerplate with **50+ modern components**.

[🚀 Quick Start](#-quick-start) • [🧩 Adding Components](#-adding-ui-components) • [🎨 Styling Guide](#-styling-guidelines) • [🧪 Testing](#-testing-requirements)

</div>

---

## 📋 Table of Contents

1. [Quick Start](#-quick-start)
2. [Development Workflow](#-development-workflow)
3. [Adding UI Components](#-adding-ui-components)
4. [Styling Guidelines](#-styling-guidelines)
5. [Testing Requirements](#-testing-requirements)
6. [Documentation Standards](#-documentation-standards)
7. [Pull Request Process](#-pull-request-process)
8. [Community Guidelines](#-community-guidelines)

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ (check with `node --version`)
- **Bun** (preferred) or npm/yarn
- **Git** for version control
- **Expo CLI** for React Native development
- **iOS Simulator** (macOS) and/or **Android Emulator**

### 1. Fork & Clone

```bash
# 1. Fork the repository on GitHub
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/react-native-ui-boilerplate.git
cd react-native-ui-boilerplate

# 3. Add upstream remote
git remote add upstream https://github.com/original-username/react-native-ui-boilerplate.git
```

### 2. Setup Development Environment

```bash
# Install dependencies
bun install  # or npm install

# Start development server
bun run dev

# Verify setup by running on different platforms
bun run ios      # iOS Simulator
bun run android  # Android Emulator  
bun run web      # Web Browser
```

### 3. Verify Your Setup

```bash
# Run all quality checks
bun run check       # Biome linting + formatting
bun run lint        # Additional linting
bun run format      # Code formatting

# TypeScript compilation check
npx tsc --noEmit

# All checks should pass ✅
```

---

## 🔄 Development Workflow

### Git Workflow

We use **GitHub Flow** with feature branches:

```bash
# 1. Create feature branch from main
git checkout main
git pull upstream main
git checkout -b feature/amazing-component

# 2. Make your changes
# ... develop your feature ...

# 3. Commit changes
git add .
git commit -m "feat: add amazing component with accessibility support"

# 4. Push and create PR
git push origin feature/amazing-component
# Create Pull Request on GitHub
```

### Branch Naming Convention

- **Features**: `feature/component-name` or `feature/add-date-picker`
- **Bug fixes**: `fix/issue-description` or `fix/button-loading-state`
- **Documentation**: `docs/update-readme` or `docs/component-documentation`
- **Refactoring**: `refactor/theme-system` or `refactor/cleanup-types`

### Commit Message Standards

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format: type(scope): description

# Types:
feat: new feature or component
fix: bug fix
docs: documentation changes
style: formatting changes (not affecting code logic)
refactor: code refactoring
test: adding or updating tests
chore: maintenance tasks

# Examples:
feat(ui): add DatePicker component with accessibility
fix(button): resolve loading state animation issue
docs(readme): update installation instructions
style(theme): format color variables consistently
refactor(types): simplify component prop interfaces
test(table): add comprehensive table component tests
chore(deps): update dependencies to latest versions
```

---

## 🧩 Adding UI Components

### Component Structure

All UI components follow this structure:

```
components/ui/your-component/
├── index.ts              # Main export
├── your-component.tsx    # Component implementation
├── types.ts             # TypeScript interfaces
└── README.md            # Component documentation
```

### 1. Create New Component

```bash
# Create component directory
mkdir components/ui/your-component
cd components/ui/your-component
```

### 2. Component Template

```tsx
// components/ui/your-component/your-component.tsx
import React from 'react';
import { View, type ViewProps } from 'react-native';
import { cn } from '~/lib/utils';
import { Text } from '~/components/ui/text';

// TypeScript interfaces
interface YourComponentProps extends ViewProps {
  /**
   * The content to display
   */
  children: React.ReactNode;
  /**
   * Component variant
   * @default 'default'
   */
  variant?: 'default' | 'outlined' | 'ghost';
  /**
   * Component size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Disable the component
   * @default false
   */
  disabled?: boolean;
}

/**
 * YourComponent - A reusable UI component
 * 
 * @example
 * ```tsx
 * <YourComponent variant="outlined" size="large">
 *   Content here
 * </YourComponent>
 * ```
 */
export function YourComponent({
  children,
  variant = 'default',
  size = 'medium',
  className,
  disabled = false,
  ...props
}: YourComponentProps) {
  return (
    <View
      className={cn(
        // Base styles
        'rounded-lg border',
        
        // Variant styles
        {
          'bg-background border-border': variant === 'default',
          'bg-transparent border-input': variant === 'outlined',
          'bg-transparent border-transparent': variant === 'ghost',
        },
        
        // Size styles
        {
          'p-2': size === 'small',
          'p-4': size === 'medium', 
          'p-6': size === 'large',
        },
        
        // State styles
        {
          'opacity-50': disabled,
        },
        
        className
      )}
      {...props}
    >
      <Text className="text-foreground">
        {children}
      </Text>
    </View>
  );
}

// Export types
export type { YourComponentProps };
```

### 3. Types Definition

```tsx
// components/ui/your-component/types.ts
import type { ViewProps } from 'react-native';

export interface YourComponentProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  disabled?: boolean;
}

export type YourComponentVariant = YourComponentProps['variant'];
export type YourComponentSize = YourComponentProps['size'];
```

### 4. Export Configuration

```tsx
// components/ui/your-component/index.ts
export { YourComponent } from './your-component';
export type { 
  YourComponentProps,
  YourComponentVariant,
  YourComponentSize 
} from './types';
```

### 5. Add to Main Index

```tsx
// components/ui/index.ts
// ... existing exports ...
export * from './your-component';
```

### 6. Component Documentation

```markdown
<!-- components/ui/your-component/README.md -->
# YourComponent

A brief description of what your component does and when to use it.

## Features

- ✅ Cross-platform (iOS, Android, Web)
- ✅ TypeScript support with strict typing
- ✅ Accessibility support (screen readers)
- ✅ Dark/Light theme compatibility
- ✅ Customizable variants and sizes
- ✅ NativeWind/Tailwind CSS styling

## Usage

```tsx
import { YourComponent } from '~/components/ui/your-component';

export function Example() {
  return (
    <YourComponent variant="outlined" size="large">
      Your content here
    </YourComponent>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Content to display |
| `variant` | `'default' \| 'outlined' \| 'ghost'` | `'default'` | Visual variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Component size |
| `disabled` | `boolean` | `false` | Disable interaction |
| `className` | `string` | - | Additional CSS classes |

## Examples

### Basic Usage
```tsx
<YourComponent>
  Basic component
</YourComponent>
```

### With Variants
```tsx
<YourComponent variant="outlined">
  Outlined variant
</YourComponent>
```

### Accessibility
The component includes proper accessibility features:
- Screen reader support
- Keyboard navigation
- High contrast mode compatibility
```

---

## 🎨 Styling Guidelines

### NativeWind/Tailwind CSS

We use **NativeWind v4** for styling, which provides Tailwind CSS classes for React Native:

```tsx
// ✅ Good - Use semantic color classes
<View className="bg-background border-border">
  <Text className="text-foreground">Content</Text>
</View>

// ❌ Avoid - Hard-coded colors
<View style={{ backgroundColor: '#ffffff', borderColor: '#e5e5e5' }}>
  <Text style={{ color: '#000000' }}>Content</Text>
</View>
```

### Theme System

Use CSS variables defined in [`global.css`](global.css):

```css
/* Available theme variables */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 84% 4.9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark theme variables */
}
```

### Component Styling Patterns

```tsx
// 1. Use cn() utility for conditional classes
import { cn } from '~/lib/utils';

const buttonClasses = cn(
  // Base styles
  'px-4 py-2 rounded-lg font-medium',
  
  // Conditional styles
  {
    'bg-primary text-primary-foreground': variant === 'default',
    'bg-secondary text-secondary-foreground': variant === 'secondary',
    'opacity-50': disabled,
  },
  
  // Additional classes
  className
);

// 2. Responsive design patterns
<View className="p-4 md:p-6 lg:p-8">
  <Text className="text-lg md:text-xl lg:text-2xl">
    Responsive text
  </Text>
</View>

// 3. Platform-specific styles
<View className="ios:pt-safe-area-top android:pt-4">
  Content with platform-specific padding
</View>
```

### Accessibility Styling

```tsx
// Ensure proper contrast ratios
<Text className="text-foreground"> <!-- Good contrast -->
<Text className="text-muted-foreground"> <!-- Reduced contrast, use carefully -->

// Focus states for keyboard navigation
<Pressable className="focus:ring-2 focus:ring-ring focus:ring-offset-2">
  <Text>Focusable element</Text>
</Pressable>

// High contrast mode support
<View className="border border-border contrast-more:border-2">
  Content with enhanced borders in high contrast mode
</View>
```

---

## 🧪 Testing Requirements

### Component Testing Standards

Every new component must include comprehensive tests:

```tsx
// components/ui/your-component/__tests__/your-component.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { YourComponent } from '../your-component';

describe('YourComponent', () => {
  it('renders children correctly', () => {
    render(<YourComponent>Test Content</YourComponent>);
    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('applies variant styles correctly', () => {
    render(<YourComponent variant="outlined">Content</YourComponent>);
    // Test variant-specific styling
  });

  it('handles disabled state', () => {
    render(<YourComponent disabled>Content</YourComponent>);
    // Test disabled styling and behavior
  });

  it('supports custom className', () => {
    render(<YourComponent className="custom-class">Content</YourComponent>);
    // Test custom class application
  });

  it('meets accessibility requirements', () => {
    render(<YourComponent>Accessible Content</YourComponent>);
    // Test screen reader support
    // Test keyboard navigation
  });
});
```

### Cross-platform Testing

Test your components on all platforms:

```bash
# iOS testing
bun run ios
# Test component behavior in iOS simulator

# Android testing  
bun run android
# Test component behavior in Android emulator

# Web testing
bun run web
# Test component behavior in web browser
```

### Manual Testing Checklist

For each new component, verify:

- [ ] **iOS Compatibility**
  - [ ] Renders correctly in iOS simulator
  - [ ] Touch interactions work properly
  - [ ] Native iOS styling respected

- [ ] **Android Compatibility**
  - [ ] Renders correctly in Android emulator
  - [ ] Material Design guidelines followed
  - [ ] Android-specific features work

- [ ] **Web Compatibility**
  - [ ] Renders correctly in web browsers
  - [ ] Mouse interactions work
  - [ ] Responsive design functions properly
  - [ ] Keyboard navigation supported

- [ ] **Theme Support**
  - [ ] Light theme appearance correct
  - [ ] Dark theme appearance correct
  - [ ] Theme switching works seamlessly
  - [ ] CSS variables used properly

- [ ] **Accessibility**
  - [ ] Screen reader announces component properly
  - [ ] Keyboard navigation supported
  - [ ] Focus management correct
  - [ ] Color contrast meets WCAG guidelines

- [ ] **Internationalization**
  - [ ] Text scaling works properly
  - [ ] RTL layout supported (if applicable)
  - [ ] No hardcoded strings

### Integration Testing

```tsx
// Example: Test component with theme provider
import { ThemeProvider } from '~/lib/theme-provider';

describe('YourComponent Integration', () => {
  it('works with theme provider', () => {
    render(
      <ThemeProvider>
        <YourComponent>Content</YourComponent>
      </ThemeProvider>
    );
    // Test theme integration
  });
});
```

---

## 📚 Documentation Standards

### Component Documentation Requirements

Every component must include:

1. **Clear description** of purpose and use cases
2. **Complete prop documentation** with types and defaults
3. **Usage examples** with code snippets
4. **Accessibility information**
5. **Platform-specific notes** if applicable

### Documentation Template

```markdown
# ComponentName

Brief description of what the component does and when to use it.

## Installation

This component is included in the React Native UI Boilerplate template.

## Features

- ✅ Cross-platform support (iOS, Android, Web)
- ✅ TypeScript with strict typing
- ✅ Accessibility support
- ✅ Dark/Light theme compatible
- ✅ Customizable styling

## Basic Usage

```tsx
import { ComponentName } from '~/components/ui/component-name';

export function Example() {
  return (
    <ComponentName>
      Your content here
    </ComponentName>
  );
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Component content |
| `variant` | `string` | `'default'` | Visual variant |

### Examples

#### Basic Example
```tsx
<ComponentName>
  Basic usage
</ComponentName>
```

#### Advanced Example
```tsx
<ComponentName 
  variant="outlined" 
  size="large"
  onPress={() => console.log('Pressed')}
>
  Advanced usage
</ComponentName>
```

## Accessibility

- Supports screen readers
- Keyboard navigation
- High contrast mode
- Focus management

## Styling

The component uses semantic color tokens that adapt to light/dark themes:

```tsx
// Theme colors automatically applied
<ComponentName className="bg-background text-foreground" />
```

## Platform Notes

### iOS
- Uses native iOS styling patterns
- Respects iOS design guidelines

### Android
- Follows Material Design principles
- Supports Android-specific features

### Web
- Responsive design
- Mouse and keyboard interactions
```

### README.md Updates

When adding new components, update the main README.md:

```markdown
<!-- Add to components list -->
### 📝 Form Components
- **Button** / **ButtonAsync** - Enhanced buttons with loading states
- **YourNewComponent** - Brief description of your component
<!-- ... -->
```

---

## 🔄 Pull Request Process

### Before Creating a PR

1. **Sync with upstream**:
   ```bash
   git checkout main
   git pull upstream main
   git checkout your-feature-branch
   git rebase main
   ```

2. **Run quality checks**:
   ```bash
   bun run check        # Linting and formatting
   bun run lint         # Additional checks
   npx tsc --noEmit     # TypeScript validation
   ```

3. **Test thoroughly**:
   ```bash
   # Test on all platforms
   bun run ios
   bun run android
   bun run web
   
   # Manual testing checklist completed
   ```

### PR Title and Description

```markdown
## PR Title Format
feat(ui): add DatePicker component with accessibility support

## PR Description Template
### What
Brief description of what this PR does.

### Why
Explanation of why this change is needed.

### How
Technical details about the implementation.

### Testing
- [ ] Tested on iOS
- [ ] Tested on Android  
- [ ] Tested on Web
- [ ] Accessibility verified
- [ ] Dark/Light theme tested

### Screenshots
<!-- Include screenshots for UI changes -->

### Breaking Changes
<!-- List any breaking changes -->

### Related Issues
Closes #123
Related to #456
```

### Code Review Process

1. **Automated checks** must pass:
   - Biome linting
   - TypeScript compilation
   - Format validation

2. **Manual review** covers:
   - Code quality and patterns
   - Component API design
   - Documentation completeness
   - Test coverage
   - Accessibility compliance

3. **Testing verification**:
   - Cross-platform functionality
   - Theme compatibility
   - Performance impact

### Review Guidelines

**For Authors:**
- Keep PRs focused and small
- Include comprehensive tests
- Update documentation
- Respond to feedback promptly

**For Reviewers:**
- Be constructive and helpful
- Test changes locally
- Check accessibility
- Verify cross-platform compatibility

---

## 🌟 Community Guidelines

### Code of Conduct

We are committed to providing a welcoming and inclusive environment:

- **Be respectful** and considerate in all interactions
- **Be patient** with newcomers and those learning
- **Be constructive** when providing feedback
- **Be collaborative** and help others succeed

### Getting Help

- **GitHub Discussions** - General questions and ideas
- **GitHub Issues** - Bug reports and feature requests
- **Discord Community** - Real-time chat and support
- **Documentation** - Comprehensive guides and examples

### Recognition

Contributors are recognized through:

- **GitHub Contributors** page
- **Release notes** mentions
- **Community highlights** in announcements
- **Maintainer status** for consistent contributors

### Types of Contributions

We welcome various types of contributions:

**Code Contributions:**
- New UI components
- Bug fixes and improvements
- Performance optimizations
- Cross-platform enhancements

**Documentation:**
- Component documentation
- Usage examples
- Tutorial creation
- Translation improvements

**Community:**
- Issue triage and support
- Testing and feedback
- Design suggestions
- Accessibility audits

### Maintainer Responsibilities

**Core Maintainers:**
- Review and merge pull requests
- Maintain code quality standards
- Plan roadmap and releases
- Support community members

**Component Maintainers:**
- Own specific component areas
- Review related pull requests
- Ensure component quality
- Update documentation

---

## 🎯 Quick Reference

### Essential Commands

```bash
# Development
bun run dev          # Start development server
bun run ios          # Run on iOS simulator
bun run android      # Run on Android emulator
bun run web          # Run in web browser

# Quality Assurance
bun run check        # Run all checks
bun run lint         # Lint code
bun run format       # Format code
npx tsc --noEmit     # TypeScript check

# Testing
bun run test         # Run unit tests
bun run test:watch   # Run tests in watch mode
bun run test:coverage # Generate coverage report
```

### File Structure Quick Guide

```
📦 react-native-ui-boilerplate/
├── 🧩 components/ui/           # All UI components
│   ├── button/                 # Button component
│   ├── card/                   # Card component
│   └── your-component/         # Your new component
├── 📚 lib/                     # Utilities and hooks
│   ├── hooks/                  # Custom React hooks
│   ├── utils.ts               # Utility functions
│   └── types.ts               # TypeScript types
├── 🎨 global.css              # Theme and styling
└── 📄 Documentation files
```

### Component Checklist

- [ ] TypeScript interfaces defined
- [ ] Cross-platform compatibility verified
- [ ] Accessibility features implemented
- [ ] Dark/Light theme support
- [ ] Tests written and passing
- [ ] Documentation complete
- [ ] Examples provided
- [ ] Exported from main index

---

## 🚀 Ready to Contribute?

1. **Find an issue** labeled [`good first issue`](https://github.com/username/react-native-ui-boilerplate/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
2. **Comment on the issue** to let others know you're working on it
3. **Fork the repository** and create your feature branch
4. **Follow this guide** to implement your changes
5. **Create a pull request** and celebrate your contribution! 🎉

---

<div align="center">

**Thank you for contributing to React Native UI Boilerplate!** 

Your contributions help make React Native development faster and more enjoyable for developers worldwide.

[🌟 View Contributors](https://github.com/username/react-native-ui-boilerplate/graphs/contributors) • [💬 Join Community](https://discord.gg/expo) • [📝 Report Issues](https://github.com/username/react-native-ui-boilerplate/issues)

</div>

---

*Last updated: January 2025*  
*Contributing Guide v1.0*