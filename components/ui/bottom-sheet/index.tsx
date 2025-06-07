import GorhomBottomSheet, {
  BottomSheetView as GorhomBottomSheetView,
  BottomSheetScrollView as GorhomBottomSheetScrollView,
  BottomSheetModal as GorhomBottomSheetModal,
  BottomSheetHandle as GorhomBottomSheetHandle,
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { type VariantProps, cva } from 'class-variance-authority';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { cn } from '~/lib/utils';
import type {
  BottomSheetHandleProps,
  BottomSheetModalProps,
  BottomSheetModalRef,
  BottomSheetProps,
  BottomSheetRef,
  BottomSheetScrollViewProps,
  BottomSheetViewProps,
  NativeBottomSheetProps,
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

// Custom backdrop component with proper styling
const CustomBackdrop = ({ animatedIndex, style, ...props }: BottomSheetBackdropProps) => {
  return (
    <BottomSheetBackdrop
      {...props}
      animatedIndex={animatedIndex}
      style={style}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      opacity={0.5}
    />
  );
};

// Main BottomSheet component for native platforms
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
      // Native specific props
      backdropComponent = CustomBackdrop,
      backgroundComponent,
      handleComponent,
      footerComponent,
      keyboardBehavior = 'interactive',
      keyboardBlurBehavior = 'restore',
      android_keyboardInputMode = 'adjustResize',
      enableContentPanningGesture = true,
      enableHandlePanningGesture = true,
      enableOverDrag = true,
      overDragResistanceFactor = 0,
      animateOnMount = true,
      topInset = 0,
      bottomInset = 0,
      detached = false,
      ...props
    },
    ref
  ) => {
    const snapPointsMemo = useMemo(() => snapPoints, [snapPoints]);

    const handleSheetChanges = useCallback(
      (sheetIndex: number) => {
        onChange?.(sheetIndex);
        if (sheetIndex === -1) {
          onClose?.();
        }
      },
      [onChange, onClose]
    );

    return (
      <GorhomBottomSheet
        ref={ref}
        index={index}
        snapPoints={snapPointsMemo}
        onChange={handleSheetChanges}
        enablePanDownToClose={enablePanDownToClose}
        enableDynamicSizing={enableDynamicSizing}
        backdropComponent={backdropComponent}
        backgroundComponent={backgroundComponent}
        handleComponent={handleComponent}
        footerComponent={footerComponent}
        keyboardBehavior={keyboardBehavior}
        keyboardBlurBehavior={keyboardBlurBehavior}
        android_keyboardInputMode={android_keyboardInputMode}
        enableContentPanningGesture={enableContentPanningGesture}
        enableHandlePanningGesture={enableHandlePanningGesture}
        enableOverDrag={enableOverDrag}
        overDragResistanceFactor={overDragResistanceFactor}
        animateOnMount={animateOnMount}
        topInset={topInset}
        bottomInset={bottomInset}
        detached={detached}
        style={[style]}
        backgroundStyle={[
          {
            backgroundColor: 'transparent',
          },
        ]}
        handleIndicatorStyle={{
          backgroundColor: 'transparent',
        }}
        {...props}
      >
        <View className={cn(bottomSheetVariants({ variant, rounded }), className)}>{children}</View>
      </GorhomBottomSheet>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';

// BottomSheetModal component
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
      // Native specific props
      backdropComponent = CustomBackdrop,
      backgroundComponent,
      handleComponent,
      footerComponent,
      keyboardBehavior = 'interactive',
      keyboardBlurBehavior = 'restore',
      android_keyboardInputMode = 'adjustResize',
      enableContentPanningGesture = true,
      enableHandlePanningGesture = true,
      enableOverDrag = true,
      overDragResistanceFactor = 0,
      animateOnMount = true,
      topInset = 0,
      bottomInset = 0,
      detached = false,
      ...props
    },
    ref
  ) => {
    const snapPointsMemo = useMemo(() => snapPoints, [snapPoints]);

    const handleSheetChanges = useCallback(
      (sheetIndex: number) => {
        onChange?.(sheetIndex);
        if (sheetIndex === -1) {
          onClose?.();
          onOpenChange?.(false);
        }
      },
      [onChange, onClose, onOpenChange]
    );

    // Present/dismiss based on open prop
    React.useEffect(() => {
      if (ref && 'current' in ref && ref.current) {
        if (open) {
          ref.current.present();
        } else {
          ref.current.dismiss();
        }
      }
    }, [open, ref]);

    return (
      <GorhomBottomSheetModal
        ref={ref}
        snapPoints={snapPointsMemo}
        onChange={handleSheetChanges}
        enablePanDownToClose={enablePanDownToClose}
        enableDynamicSizing={enableDynamicSizing}
        backdropComponent={backdropComponent}
        backgroundComponent={backgroundComponent}
        handleComponent={handleComponent}
        footerComponent={footerComponent}
        keyboardBehavior={keyboardBehavior}
        keyboardBlurBehavior={keyboardBlurBehavior}
        android_keyboardInputMode={
          android_keyboardInputMode === 'adjustNothing' ||
          android_keyboardInputMode === 'adjustUnspecified'
            ? 'adjustResize'
            : android_keyboardInputMode
        }
        enableContentPanningGesture={enableContentPanningGesture}
        enableHandlePanningGesture={enableHandlePanningGesture}
        enableOverDrag={enableOverDrag}
        overDragResistanceFactor={overDragResistanceFactor}
        animateOnMount={animateOnMount}
        topInset={topInset}
        bottomInset={bottomInset}
        detached={detached}
        style={[style]}
        backgroundStyle={[
          {
            backgroundColor: 'transparent',
          },
        ]}
        handleIndicatorStyle={{
          backgroundColor: 'transparent',
        }}
        {...props}
      >
        <View className={cn(bottomSheetVariants({ variant, rounded }), className)}>{children}</View>
      </GorhomBottomSheetModal>
    );
  }
);

BottomSheetModal.displayName = 'BottomSheetModal';

// BottomSheetView component
export const BottomSheetView = forwardRef<View, BottomSheetViewProps>(
  ({ children, className, style, ...props }, ref) => {
    return (
      <GorhomBottomSheetView style={style} {...props}>
        <View ref={ref} className={cn('flex-1', className)}>
          {children}
        </View>
      </GorhomBottomSheetView>
    );
  }
);

BottomSheetView.displayName = 'BottomSheetView';

// BottomSheetScrollView component
export const BottomSheetScrollView = forwardRef<any, BottomSheetScrollViewProps>(
  (
    { children, className, style, contentContainerStyle, contentContainerClassName, ...props },
    ref
  ) => {
    return (
      <GorhomBottomSheetScrollView
        ref={ref}
        style={style}
        contentContainerStyle={[contentContainerStyle]}
        {...props}
      >
        <View className={cn('flex-1', contentContainerClassName)}>
          <View className={cn('', className)}>{children}</View>
        </View>
      </GorhomBottomSheetScrollView>
    );
  }
);

BottomSheetScrollView.displayName = 'BottomSheetScrollView';

// BottomSheetHandle component
export const BottomSheetHandle = forwardRef<
  View,
  BottomSheetHandleProps & VariantProps<typeof bottomSheetHandleVariants>
>(({ className, style, indicatorClassName, indicatorStyle, size, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn('py-3 flex items-center justify-center', className)}
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
