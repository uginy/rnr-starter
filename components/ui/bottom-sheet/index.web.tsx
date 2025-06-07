import { type VariantProps, cva } from 'class-variance-authority';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { View } from 'react-native';
import { Drawer } from 'vaul';
import { cn } from '~/lib/utils';
import type {
  BottomSheetHandleProps,
  BottomSheetModalProps,
  BottomSheetModalRef,
  BottomSheetProps,
  BottomSheetRef,
  BottomSheetScrollViewProps,
  BottomSheetViewProps,
} from './types';

// Bottom Sheet variants using CVA for consistent styling
const bottomSheetVariants = cva('bg-background border-t border-border', {
  variants: {
    variant: {
      default: 'bg-background',
      card: 'bg-card',
      muted: 'bg-muted',
    },
    rounded: {
      none: '',
      sm: 'rounded-t-sm',
      md: 'rounded-t-md',
      lg: 'rounded-t-lg',
      xl: 'rounded-t-xl',
      '2xl': 'rounded-t-2xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    rounded: 'lg',
  },
});

const bottomSheetHandleVariants = cva('bg-muted-foreground/30 rounded-full mx-auto my-3', {
  variants: {
    size: {
      sm: 'w-8 h-1',
      md: 'w-12 h-1',
      lg: 'w-16 h-1.5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// Convert snap points to height percentages for web
const getHeightFromSnapPoint = (snapPoint: string | number): string => {
  if (typeof snapPoint === 'string' && snapPoint.includes('%')) {
    return snapPoint;
  }
  if (typeof snapPoint === 'number') {
    return `${snapPoint}px`;
  }
  return snapPoint.toString();
};

// Main BottomSheet component for web platform
export const BottomSheet = forwardRef<
  BottomSheetRef,
  BottomSheetProps & VariantProps<typeof bottomSheetVariants>
>(
  (
    {
      children,
      snapPoints = ['25%', '50%'],
      index = -1,
      onChange,
      onClose,
      className,
      style,
      variant,
      rounded,
      enablePanDownToClose = true,
      enableDynamicSizing = false,
      // Web specific props
      shouldScaleBackground = true,
      setBackgroundColorOnScale = true,
      closeThreshold = 0.25,
      scrollLockTimeout = 100,
      snapToSequentialPoint = false,
      fadeFromIndex = 0,
      modal = false,
      nested = false,
      direction = 'bottom',
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(index > -1);
    const [currentIndex, setCurrentIndex] = useState(index);

    useImperativeHandle(ref, () => ({
      expand: () => {
        setIsOpen(true);
        setCurrentIndex(snapPoints.length - 1);
        onChange?.(snapPoints.length - 1);
      },
      collapse: () => {
        setCurrentIndex(0);
        setIsOpen(true);
        onChange?.(0);
      },
      close: () => {
        setIsOpen(false);
        setCurrentIndex(-1);
        onChange?.(-1);
        onClose?.();
      },
      snapToIndex: (newIndex: number) => {
        if (newIndex >= 0 && newIndex < snapPoints.length) {
          setCurrentIndex(newIndex);
          setIsOpen(true);
          onChange?.(newIndex);
        } else if (newIndex === -1) {
          setIsOpen(false);
          setCurrentIndex(-1);
          onChange?.(-1);
          onClose?.();
        }
      },
      snapToPosition: (position: string | number) => {
        const index = snapPoints.findIndex((point) => point === position);
        if (index !== -1) {
          setCurrentIndex(index);
          setIsOpen(true);
          onChange?.(index);
        }
      },
      forceClose: () => {
        setIsOpen(false);
        setCurrentIndex(-1);
        onChange?.(-1);
        onClose?.();
      },
    }));

    useEffect(() => {
      const shouldOpen = index > -1;
      setIsOpen(shouldOpen);
      setCurrentIndex(index);
    }, [index]);

    const currentSnapPoint = currentIndex >= 0 ? snapPoints[currentIndex] : snapPoints[0];
    const height = getHeightFromSnapPoint(currentSnapPoint);

    return (
      <Drawer.Root
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            setCurrentIndex(-1);
            onChange?.(-1);
            onClose?.();
          }
        }}
        shouldScaleBackground={shouldScaleBackground}
        setBackgroundColorOnScale={setBackgroundColorOnScale}
        closeThreshold={closeThreshold}
        scrollLockTimeout={scrollLockTimeout}
        modal={modal}
        nested={nested}
        direction={direction}
        dismissible={enablePanDownToClose}
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-40" />
          <Drawer.Content
            className={cn(
              'fixed bottom-0 left-0 right-0 z-50 flex flex-col',
              bottomSheetVariants({ variant, rounded }),
              className
            )}
            style={{
              height: typeof height === 'string' ? height : `${height}px`,
              ...(style as any),
            }}
          >
            <Drawer.Title className="sr-only">Bottom Sheet</Drawer.Title>
            <Drawer.Description className="sr-only">Bottom sheet content</Drawer.Description>
            {children}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';

// BottomSheetModal component for web
export const BottomSheetModal = forwardRef<
  BottomSheetModalRef,
  BottomSheetModalProps & VariantProps<typeof bottomSheetVariants>
>(
  (
    {
      children,
      snapPoints = ['25%', '50%'],
      open = false,
      onOpenChange,
      onChange,
      onClose,
      className,
      style,
      variant,
      rounded,
      enablePanDownToClose = true,
      enableDynamicSizing = false,
      // Web specific props
      shouldScaleBackground = true,
      setBackgroundColorOnScale = true,
      closeThreshold = 0.25,
      scrollLockTimeout = 100,
      snapToSequentialPoint = false,
      fadeFromIndex = 0,
      modal = true,
      nested = false,
      direction = 'bottom',
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(-1);

    useImperativeHandle(ref, () => ({
      expand: () => {
        onOpenChange?.(true);
        setCurrentIndex(snapPoints.length - 1);
        onChange?.(snapPoints.length - 1);
      },
      collapse: () => {
        setCurrentIndex(0);
        onOpenChange?.(true);
        onChange?.(0);
      },
      close: () => {
        onOpenChange?.(false);
        setCurrentIndex(-1);
        onChange?.(-1);
        onClose?.();
      },
      snapToIndex: (newIndex: number) => {
        if (newIndex >= 0 && newIndex < snapPoints.length) {
          setCurrentIndex(newIndex);
          onOpenChange?.(true);
          onChange?.(newIndex);
        } else if (newIndex === -1) {
          onOpenChange?.(false);
          setCurrentIndex(-1);
          onChange?.(-1);
          onClose?.();
        }
      },
      snapToPosition: (position: string | number) => {
        const index = snapPoints.findIndex((point) => point === position);
        if (index !== -1) {
          setCurrentIndex(index);
          onOpenChange?.(true);
          onChange?.(index);
        }
      },
      forceClose: () => {
        onOpenChange?.(false);
        setCurrentIndex(-1);
        onChange?.(-1);
        onClose?.();
      },
      present: () => {
        onOpenChange?.(true);
        setCurrentIndex(snapPoints.length - 1);
        onChange?.(snapPoints.length - 1);
      },
      dismiss: () => {
        onOpenChange?.(false);
        setCurrentIndex(-1);
        onChange?.(-1);
        onClose?.();
      },
    }));

    const currentSnapPoint = currentIndex >= 0 ? snapPoints[currentIndex] : snapPoints[0];
    const height = getHeightFromSnapPoint(currentSnapPoint);

    return (
      <Drawer.Root
        open={open}
        onOpenChange={(isOpen) => {
          onOpenChange?.(isOpen);
          if (!isOpen) {
            setCurrentIndex(-1);
            onChange?.(-1);
            onClose?.();
          }
        }}
        shouldScaleBackground={shouldScaleBackground}
        setBackgroundColorOnScale={setBackgroundColorOnScale}
        closeThreshold={closeThreshold}
        scrollLockTimeout={scrollLockTimeout}
        modal={modal}
        nested={nested}
        direction={direction}
        dismissible={enablePanDownToClose}
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-40" />
          <Drawer.Content
            className={cn(
              'fixed bottom-0 left-0 right-0 z-50 flex flex-col',
              bottomSheetVariants({ variant, rounded }),
              className
            )}
            style={{
              height: typeof height === 'string' ? height : `${height}px`,
              ...(style as any),
            }}
          >
            <Drawer.Title className="sr-only">Bottom Sheet Modal</Drawer.Title>
            <Drawer.Description className="sr-only">Modal bottom sheet content</Drawer.Description>
            {children}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }
);

BottomSheetModal.displayName = 'BottomSheetModal';

// BottomSheetView component for web
export const BottomSheetView = forwardRef<View, BottomSheetViewProps>(
  ({ children, className, style, ...props }, ref) => {
    return (
      <View ref={ref} className={cn('flex-1 p-4', className)} style={style} {...props}>
        {children}
      </View>
    );
  }
);

BottomSheetView.displayName = 'BottomSheetView';

// BottomSheetScrollView component for web
export const BottomSheetScrollView = forwardRef<any, BottomSheetScrollViewProps>(
  (
    { children, className, style, contentContainerStyle, contentContainerClassName, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('flex-1 overflow-auto', contentContainerClassName)}
        style={{
          ...(contentContainerStyle as any),
          ...(style as any),
        }}
        {...props}
      >
        <View className={cn('p-4', className)}>{children}</View>
      </div>
    );
  }
);

BottomSheetScrollView.displayName = 'BottomSheetScrollView';

// BottomSheetHandle component for web
export const BottomSheetHandle = forwardRef<
  View,
  BottomSheetHandleProps & VariantProps<typeof bottomSheetHandleVariants>
>(({ className, style, indicatorClassName, indicatorStyle, size, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(
        'py-3 flex items-center justify-center cursor-grab active:cursor-grabbing',
        className
      )}
      style={style}
      {...props}
    >
      <View
        className={cn(bottomSheetHandleVariants({ size }), indicatorClassName)}
        style={indicatorStyle}
      />
    </View>
  );
});

BottomSheetHandle.displayName = 'BottomSheetHandle';

// Export variants for external usage
export { bottomSheetVariants, bottomSheetHandleVariants };

// Export types
export type {
  BottomSheetProps,
  BottomSheetModalProps,
  BottomSheetViewProps,
  BottomSheetScrollViewProps,
  BottomSheetHandleProps,
  BottomSheetRef,
  BottomSheetModalRef,
} from './types';
