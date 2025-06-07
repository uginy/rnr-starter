// Re-export bottom sheet types for convenient access
export type {
  BottomSheetProps,
  BottomSheetModalProps,
  BottomSheetViewProps,
  BottomSheetScrollViewProps,
  BottomSheetHandleProps,
  BottomSheetRef,
  BottomSheetModalRef,
  BaseBottomSheetProps,
  NativeBottomSheetProps,
  WebBottomSheetProps,
} from '~/components/ui/bottom-sheet/types';

// Common utility types
export interface SnapPoint {
  value: string | number;
  label?: string;
}

export interface BottomSheetConfig {
  snapPoints: (string | number)[];
  initialIndex?: number;
  enablePanDownToClose?: boolean;
  enableDynamicSizing?: boolean;
}

// Animation types
export interface AnimationConfig {
  duration?: number;
  easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
  spring?: {
    damping?: number;
    stiffness?: number;
    mass?: number;
  };
}

// Gesture types
export interface GestureConfig {
  enablePanDownToClose?: boolean;
  enableContentPanningGesture?: boolean;
  enableHandlePanningGesture?: boolean;
  enableOverDrag?: boolean;
  overDragResistanceFactor?: number;
}

// Style variants
export type BottomSheetVariant = 'default' | 'card' | 'muted';
export type BottomSheetRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type BottomSheetHandleSize = 'sm' | 'md' | 'lg';

// Platform detection
export type Platform = 'ios' | 'android' | 'web';

// Event handlers
export interface BottomSheetEventHandlers {
  onChange?: (index: number) => void;
  onClose?: () => void;
  onOpen?: () => void;
  onAnimate?: (fromIndex: number, toIndex: number) => void;
}

// Keyboard behavior (native only)
export type KeyboardBehavior = 'extend' | 'fillParent' | 'interactive';
export type KeyboardBlurBehavior = 'none' | 'restore';
export type AndroidKeyboardInputMode =
  | 'adjustNothing'
  | 'adjustPan'
  | 'adjustResize'
  | 'adjustUnspecified';

// Web-specific drawer types
export type DrawerDirection = 'top' | 'bottom' | 'left' | 'right';

// Common component props
export interface CommonUIProps {
  className?: string;
  style?: any;
  testID?: string;
}

// Enhanced bottom sheet props with additional configuration
export interface EnhancedBottomSheetProps
  extends BottomSheetConfig,
    GestureConfig,
    BottomSheetEventHandlers,
    CommonUIProps {
  variant?: BottomSheetVariant;
  rounded?: BottomSheetRounded;
  animation?: AnimationConfig;
  children: React.ReactNode;
}
