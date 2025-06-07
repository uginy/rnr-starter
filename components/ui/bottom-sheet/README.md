# Universal Bottom Sheet

A universal bottom sheet component that works across all platforms (iOS, Android, Web) with a unified API.

## Features

- **Cross-platform**: Works on iOS, Android, and Web
- **Unified API**: Same interface across all platforms
- **NativeWind Support**: Full className styling support
- **Dark Theme**: Built-in dark mode support
- **TypeScript**: Full type safety
- **Customizable**: Extensive styling and behavior options
- **Snap Points**: Multiple snap positions support
- **Modal Mode**: Both sheet and modal variants

## Platform Implementation

- **Native (iOS/Android)**: Uses `@gorhom/bottom-sheet`
- **Web**: Uses `vaul` drawer component

## Components

### BottomSheet

Main bottom sheet component for persistent sheets.

```tsx
import { BottomSheet, BottomSheetView } from '~/components/ui/bottom-sheet';

function MyComponent() {
  const bottomSheetRef = useRef<BottomSheetRef>(null);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={['25%', '50%', '75%']}
      index={-1}
      enablePanDownToClose
    >
      <BottomSheetView>
        <Text>Sheet content here</Text>
      </BottomSheetView>
    </BottomSheet>
  );
}
```

### BottomSheetModal

Modal variant that can be controlled with open/close state.

```tsx
import { BottomSheetModal } from '~/components/ui/bottom-sheet';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BottomSheetModal
      open={isOpen}
      onOpenChange={setIsOpen}
      snapPoints={['50%', '90%']}
    >
      <BottomSheetView>
        <Text>Modal content here</Text>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
```

### BottomSheetView

Container component for sheet content.

```tsx
<BottomSheetView className="p-4">
  <Text>Your content here</Text>
</BottomSheetView>
```

### BottomSheetScrollView

Scrollable container for longer content.

```tsx
<BottomSheetScrollView className="p-4">
  {longContent.map(item => (
    <View key={item.id}>
      <Text>{item.title}</Text>
    </View>
  ))}
</BottomSheetScrollView>
```

### BottomSheetHandle

Custom handle component for better visual indication.

```tsx
<BottomSheet>
  <BottomSheetHandle size="lg" />
  <BottomSheetView>
    <Text>Content with custom handle</Text>
  </BottomSheetView>
</BottomSheet>
```

## Props

### Common Props (All Components)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content to display |
| `className` | `string` | - | NativeWind classes |
| `style` | `ViewStyle` | - | Inline styles |

### BottomSheet Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `snapPoints` | `(string \| number)[]` | `['25%', '50%']` | Snap positions |
| `index` | `number` | `-1` | Initial snap index (-1 = closed) |
| `enablePanDownToClose` | `boolean` | `true` | Allow pan down to close |
| `enableDynamicSizing` | `boolean` | `false` | Dynamic content sizing |
| `onChange` | `(index: number) => void` | - | Snap point change callback |
| `onClose` | `() => void` | - | Close callback |
| `variant` | `'default' \| 'card' \| 'muted'` | `'default'` | Background variant |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'lg'` | Border radius |

### BottomSheetModal Props

Extends BottomSheet props with:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Open state |
| `onOpenChange` | `(open: boolean) => void` | - | Open state change callback |

### BottomSheetHandle Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Handle size |
| `indicatorClassName` | `string` | - | Handle indicator classes |
| `indicatorStyle` | `ViewStyle` | - | Handle indicator styles |

## Ref Methods

### BottomSheetRef

```tsx
interface BottomSheetRef {
  expand(): void;           // Expand to last snap point
  collapse(): void;         // Collapse to first snap point
  close(): void;           // Close the sheet
  snapToIndex(index: number): void;  // Snap to specific index
  snapToPosition(position: string | number): void;  // Snap to specific position
  forceClose(): void;      // Force close without animation
}
```

### BottomSheetModalRef

Extends BottomSheetRef with:

```tsx
interface BottomSheetModalRef extends BottomSheetRef {
  present(): void;         // Present the modal
  dismiss(): void;         // Dismiss the modal
}
```

## Styling

### Variants

```tsx
// Background variants
<BottomSheet variant="default" />  // bg-background
<BottomSheet variant="card" />     // bg-card
<BottomSheet variant="muted" />    // bg-muted

// Rounded corners
<BottomSheet rounded="none" />     // No rounding
<BottomSheet rounded="lg" />       // Large rounding (default)
<BottomSheet rounded="2xl" />      // Extra large rounding
```

### Custom Styling

```tsx
<BottomSheet
  className="bg-blue-500 border-blue-600"
  rounded="xl"
>
  <BottomSheetView className="p-6 bg-white dark:bg-gray-900">
    <Text className="text-gray-900 dark:text-white">
      Custom styled content
    </Text>
  </BottomSheetView>
</BottomSheet>
```

## Examples

### Basic Usage

```tsx
import { useRef } from 'react';
import { Button } from '~/components/ui/button';
import { BottomSheet, BottomSheetView, BottomSheetRef } from '~/components/ui/bottom-sheet';

export function BasicExample() {
  const bottomSheetRef = useRef<BottomSheetRef>(null);

  return (
    <>
      <Button onPress={() => bottomSheetRef.current?.expand()}>
        Open Sheet
      </Button>
      
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['25%', '50%']}
        index={-1}
      >
        <BottomSheetView className="p-4">
          <Text className="text-lg font-semibold mb-4">
            Basic Bottom Sheet
          </Text>
          <Text>
            This is a basic bottom sheet with two snap points.
          </Text>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
```

### Modal Example

```tsx
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { BottomSheetModal, BottomSheetView } from '~/components/ui/bottom-sheet';

export function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setIsOpen(true)}>
        Open Modal
      </Button>
      
      <BottomSheetModal
        open={isOpen}
        onOpenChange={setIsOpen}
        snapPoints={['50%', '90%']}
      >
        <BottomSheetView className="p-4">
          <Text className="text-lg font-semibold mb-4">
            Modal Bottom Sheet
          </Text>
          <Button 
            onPress={() => setIsOpen(false)}
            variant="outline"
          >
            Close Modal
          </Button>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}
```

### Scrollable Content

```tsx
import { BottomSheet, BottomSheetScrollView } from '~/components/ui/bottom-sheet';

export function ScrollableExample() {
  const items = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    title: `Item ${i + 1}`,
    description: `Description for item ${i + 1}`,
  }));

  return (
    <BottomSheet snapPoints={['25%', '50%', '90%']}>
      <BottomSheetScrollView className="p-4">
        <Text className="text-lg font-semibold mb-4">
          Scrollable Content
        </Text>
        {items.map(item => (
          <View key={item.id} className="p-3 border-b border-border">
            <Text className="font-medium">{item.title}</Text>
            <Text className="text-muted-foreground">{item.description}</Text>
          </View>
        ))}
      </BottomSheetScrollView>
    </BottomSheet>
  );
}
```

### Custom Handle

```tsx
import { BottomSheet, BottomSheetHandle, BottomSheetView } from '~/components/ui/bottom-sheet';

export function CustomHandleExample() {
  return (
    <BottomSheet snapPoints={['25%', '50%']}>
      <BottomSheetHandle 
        size="lg" 
        className="bg-blue-100 dark:bg-blue-900"
        indicatorClassName="bg-blue-500"
      />
      <BottomSheetView className="p-4">
        <Text>Content with custom handle</Text>
      </BottomSheetView>
    </BottomSheet>
  );
}
```

## Best Practices

1. **Snap Points**: Use percentage values for responsive design
2. **Performance**: Avoid heavy computations in sheet content
3. **Accessibility**: Include proper accessibility labels
4. **Dark Mode**: Use NativeWind dark mode classes
5. **Keyboard**: Handle keyboard interactions properly on web

## Platform Differences

### Native (iOS/Android)
- Uses native gesture handling
- Better performance for complex animations
- Platform-specific keyboard behaviors

### Web
- Uses CSS transforms and transitions
- Mouse and touch interaction support
- Responsive breakpoint considerations

## Troubleshooting

### Common Issues

1. **Sheet not opening**: Check if index is set correctly
2. **Styling issues**: Ensure NativeWind is configured properly
3. **TypeScript errors**: Import types from the correct path
4. **Performance**: Avoid inline functions in props

### Platform-Specific

**Native:**
- Ensure gesture handler is properly set up
- Check if safe area context is configured

**Web:**
- Ensure vaul styles are loaded
- Check for CSS conflicts with existing styles