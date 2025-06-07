import { Dimensions, Platform } from 'react-native';
import type { AnimationConfig, BottomSheetConfig, SnapPoint } from './types';

// Get device dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Convert snap points to consistent format
 */
export const normalizeSnapPoints = (snapPoints: (string | number)[]): string[] => {
  return snapPoints.map((point) => {
    if (typeof point === 'number') {
      // Convert pixel values to percentages
      return `${Math.round((point / SCREEN_HEIGHT) * 100)}%`;
    }
    return point.toString();
  });
};

/**
 * Convert percentage snap point to pixel value
 */
export const snapPointToPixels = (snapPoint: string | number): number => {
  if (typeof snapPoint === 'number') {
    return snapPoint;
  }

  if (typeof snapPoint === 'string' && snapPoint.includes('%')) {
    const percentage = Number.parseInt(snapPoint.replace('%', ''), 10);
    return Math.round((percentage / 100) * SCREEN_HEIGHT);
  }

  return Number.parseInt(snapPoint.toString(), 10) || 0;
};

/**
 * Calculate optimal snap points based on content and screen size
 */
export const calculateOptimalSnapPoints = (
  contentHeight?: number,
  options?: {
    minHeight?: number;
    maxHeight?: number;
    includeFullScreen?: boolean;
  }
): string[] => {
  const {
    minHeight = 200,
    maxHeight = SCREEN_HEIGHT * 0.9,
    includeFullScreen = false,
  } = options || {};

  const snapPoints: string[] = [];

  // Add minimum snap point
  const minPercentage = Math.max(15, Math.round((minHeight / SCREEN_HEIGHT) * 100));
  snapPoints.push(`${minPercentage}%`);

  // Add content-based snap point if available
  if (contentHeight) {
    const contentPercentage = Math.min(90, Math.round((contentHeight / SCREEN_HEIGHT) * 100));
    if (contentPercentage > minPercentage + 10) {
      snapPoints.push(`${contentPercentage}%`);
    }
  }

  // Add half screen snap point
  if (!snapPoints.includes('50%')) {
    snapPoints.push('50%');
  }

  // Add full screen if requested
  if (includeFullScreen) {
    const maxPercentage = Math.round((maxHeight / SCREEN_HEIGHT) * 100);
    snapPoints.push(`${maxPercentage}%`);
  }

  // Sort and deduplicate
  return [...new Set(snapPoints)].sort((a, b) => {
    const aValue = Number.parseInt(a.replace('%', ''), 10);
    const bValue = Number.parseInt(b.replace('%', ''), 10);
    return aValue - bValue;
  });
};

/**
 * Get snap point index by percentage or pixel value
 */
export const getSnapPointIndex = (
  snapPoints: (string | number)[],
  targetPoint: string | number
): number => {
  const normalizedTarget = typeof targetPoint === 'string' ? targetPoint : `${targetPoint}px`;

  return snapPoints.findIndex((point) => {
    const normalizedPoint = typeof point === 'string' ? point : `${point}px`;
    return normalizedPoint === normalizedTarget;
  });
};

/**
 * Create responsive snap points based on screen size
 */
export const createResponsiveSnapPoints = (config: {
  small?: string[];
  medium?: string[];
  large?: string[];
}): string[] => {
  const isTablet = SCREEN_WIDTH >= 768;
  const isDesktop = SCREEN_WIDTH >= 1024;

  if (isDesktop && config.large) {
    return config.large;
  }

  if (isTablet && config.medium) {
    return config.medium;
  }

  return config.small || ['25%', '50%'];
};

/**
 * Animation helpers for smooth transitions
 */
export const createAnimationConfig = (
  type: 'spring' | 'timing' = 'spring',
  options?: Partial<AnimationConfig>
): AnimationConfig => {
  const defaultSpringConfig = {
    damping: 50,
    stiffness: 500,
    mass: 1,
  };

  const defaultTimingConfig = {
    duration: 250,
    easing: 'ease-out' as const,
  };

  if (type === 'spring') {
    return {
      spring: { ...defaultSpringConfig, ...options?.spring },
    };
  }

  return {
    duration: options?.duration || defaultTimingConfig.duration,
    easing: options?.easing || defaultTimingConfig.easing,
  };
};

/**
 * Calculate backdrop opacity based on sheet position
 */
export const calculateBackdropOpacity = (
  currentIndex: number,
  snapPoints: (string | number)[],
  maxOpacity = 0.5
): number => {
  if (currentIndex < 0) return 0;

  const progress = currentIndex / (snapPoints.length - 1);
  return Math.min(maxOpacity, progress * maxOpacity);
};

/**
 * Get platform-specific default props
 */
export const getPlatformDefaults = (): Partial<BottomSheetConfig> => {
  const isWeb = Platform.OS === 'web';

  return {
    snapPoints: isWeb ? ['25%', '50%', '90%'] : ['25%', '50%'],
    initialIndex: -1,
    enablePanDownToClose: true,
    enableDynamicSizing: false,
  };
};

/**
 * Validate array structure
 */
const validateSnapPointsArray = (snapPoints: (string | number)[]): boolean => {
  if (!Array.isArray(snapPoints) || snapPoints.length === 0) {
    console.warn('BottomSheet: snapPoints must be a non-empty array');
    return false;
  }
  return true;
};

/**
 * Validate percentage string
 */
const validatePercentagePoint = (point: string): boolean => {
  if (!point.includes('%')) return true;

  const percentage = Number.parseInt(point.replace('%', ''), 10);
  if (Number.isNaN(percentage) || percentage < 0 || percentage > 100) {
    console.warn(`BottomSheet: Invalid percentage snap point: ${point}`);
    return false;
  }
  return true;
};

/**
 * Validate string snap point
 */
const validateStringPoint = (point: string): boolean => {
  return validatePercentagePoint(point);
};

/**
 * Validate number snap point
 */
const validateNumberPoint = (point: number): boolean => {
  if (point < 0) {
    console.warn(`BottomSheet: Snap point cannot be negative: ${point}`);
    return false;
  }
  return true;
};

/**
 * Validate single snap point
 */
const validateSingleSnapPoint = (point: string | number): boolean => {
  if (typeof point === 'string') {
    return validateStringPoint(point);
  }

  if (typeof point === 'number') {
    return validateNumberPoint(point);
  }

  console.warn(`BottomSheet: Invalid snap point type: ${typeof point}`);
  return false;
};

/**
 * Validate snap points
 */
export const validateSnapPoints = (snapPoints: (string | number)[]): boolean => {
  if (!validateSnapPointsArray(snapPoints)) {
    return false;
  }

  for (const point of snapPoints) {
    if (!validateSingleSnapPoint(point)) {
      return false;
    }
  }

  return true;
};

/**
 * Convert snap points to SnapPoint objects with labels
 */
export const createSnapPointsWithLabels = (
  snapPoints: (string | number)[],
  labels?: string[]
): SnapPoint[] => {
  return snapPoints.map((point, index) => ({
    value: point,
    label: labels?.[index] || `Position ${index + 1}`,
  }));
};

/**
 * Get safe area insets for better positioning
 */
export const getSafeAreaInsets = () => {
  // This would typically use react-native-safe-area-context
  // For now, returning default values
  return {
    top: Platform.OS === 'ios' ? 44 : 24,
    bottom: Platform.OS === 'ios' ? 34 : 0,
    left: 0,
    right: 0,
  };
};

/**
 * Calculate keyboard-aware snap points
 */
export const adjustSnapPointsForKeyboard = (
  snapPoints: (string | number)[],
  keyboardHeight: number
): string[] => {
  if (keyboardHeight === 0) {
    return normalizeSnapPoints(snapPoints);
  }

  const availableHeight = SCREEN_HEIGHT - keyboardHeight;

  return snapPoints.map((point) => {
    const pixelValue = snapPointToPixels(point);
    const adjustedValue = Math.min(pixelValue, availableHeight * 0.9);
    return `${Math.round((adjustedValue / SCREEN_HEIGHT) * 100)}%`;
  });
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Check if current platform supports native bottom sheets
 */
export const supportsNativeBottomSheet = (): boolean => {
  return Platform.OS === 'ios' || Platform.OS === 'android';
};

/**
 * Get optimal gesture configuration based on platform
 */
export const getOptimalGestureConfig = () => {
  const isNative = supportsNativeBottomSheet();

  return {
    enablePanDownToClose: true,
    enableContentPanningGesture: isNative,
    enableHandlePanningGesture: true,
    enableOverDrag: isNative,
    overDragResistanceFactor: isNative ? 0 : undefined,
  };
};
