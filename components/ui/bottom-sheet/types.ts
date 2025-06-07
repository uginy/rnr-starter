import type { BottomSheetProps as GorhomBottomSheetProps } from '@gorhom/bottom-sheet';
import type { ComponentProps, ReactNode } from 'react';
import type { ViewStyle } from 'react-native';

// Common types for all platforms
export interface BaseBottomSheetProps {
  children: ReactNode;
  snapPoints?: (string | number)[];
  index?: number;
  enablePanDownToClose?: boolean;
  enableDynamicSizing?: boolean;
  onClose?: () => void;
  onChange?: (index: number) => void;
  className?: string;
  style?: ViewStyle;
}

// Modal-specific props - includes native props for proper typing
export interface BottomSheetModalProps extends BaseBottomSheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  // Include native props for modal
  backdropComponent?: any;
  backgroundComponent?: any;
  handleComponent?: any;
  footerComponent?: any;
  keyboardBehavior?: 'extend' | 'fillParent' | 'interactive';
  keyboardBlurBehavior?: 'none' | 'restore';
  android_keyboardInputMode?: 'adjustNothing' | 'adjustPan' | 'adjustResize' | 'adjustUnspecified';
  enableContentPanningGesture?: boolean;
  enableHandlePanningGesture?: boolean;
  enableOverDrag?: boolean;
  overDragResistanceFactor?: number;
  animateOnMount?: boolean;
  topInset?: number;
  bottomInset?: number;
  detached?: boolean;
  // Web specific props
  shouldScaleBackground?: boolean;
  setBackgroundColorOnScale?: boolean;
  closeThreshold?: number;
  scrollLockTimeout?: number;
  snapToSequentialPoint?: boolean;
  fadeFromIndex?: number;
  modal?: boolean;
  nested?: boolean;
  direction?: 'top' | 'bottom' | 'left' | 'right';
}

// View container props
export interface BottomSheetViewProps {
  children: ReactNode;
  className?: string;
  style?: ViewStyle;
}

// Scrollable view props
export interface BottomSheetScrollViewProps extends BottomSheetViewProps {
  contentContainerStyle?: ViewStyle;
  contentContainerClassName?: string;
}

// Handle props
export interface BottomSheetHandleProps {
  className?: string;
  style?: ViewStyle;
  indicatorClassName?: string;
  indicatorStyle?: ViewStyle;
}

// Native platform specific props
export interface NativeBottomSheetProps extends BaseBottomSheetProps {
  // Additional @gorhom/bottom-sheet specific props
  backdropComponent?: GorhomBottomSheetProps['backdropComponent'];
  backgroundComponent?: GorhomBottomSheetProps['backgroundComponent'];
  handleComponent?: GorhomBottomSheetProps['handleComponent'];
  footerComponent?: GorhomBottomSheetProps['footerComponent'];
  keyboardBehavior?: GorhomBottomSheetProps['keyboardBehavior'];
  keyboardBlurBehavior?: GorhomBottomSheetProps['keyboardBlurBehavior'];
  android_keyboardInputMode?: GorhomBottomSheetProps['android_keyboardInputMode'];
  enableContentPanningGesture?: boolean;
  enableHandlePanningGesture?: boolean;
  enableOverDrag?: boolean;
  overDragResistanceFactor?: number;
  animateOnMount?: boolean;
  topInset?: number;
  bottomInset?: number;
  detached?: boolean;
}

// Web platform specific props (vaul)
export interface WebBottomSheetProps extends BaseBottomSheetProps {
  // Vaul drawer specific props
  shouldScaleBackground?: boolean;
  setBackgroundColorOnScale?: boolean;
  closeThreshold?: number;
  scrollLockTimeout?: number;
  snapToSequentialPoint?: boolean;
  fadeFromIndex?: number;
  modal?: boolean;
  nested?: boolean;
  direction?: 'top' | 'bottom' | 'left' | 'right';
}

// Export unified props
export type BottomSheetProps = BaseBottomSheetProps & {
  // Platform-specific props will be filtered based on platform
  [K in keyof (NativeBottomSheetProps & WebBottomSheetProps)]?: (NativeBottomSheetProps &
    WebBottomSheetProps)[K];
};

// Ref types
export interface BottomSheetRef {
  expand: () => void;
  collapse: () => void;
  close: () => void;
  snapToIndex: (index: number) => void;
  snapToPosition: (position: string | number) => void;
  forceClose: () => void;
}

export interface BottomSheetModalRef extends BottomSheetRef {
  present: () => void;
  dismiss: () => void;
}
