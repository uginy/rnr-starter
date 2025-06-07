import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { TextClassContext } from '~/components/ui/text';
import { cn } from '~/lib/utils';

const buttonVariants = cva(
  'group flex items-center justify-center rounded-md web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary web:hover:opacity-90 active:opacity-90',
        destructive: 'bg-destructive web:hover:opacity-90 active:opacity-90',
        outline:
          'border border-input bg-background web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent',
        secondary: 'bg-secondary web:hover:opacity-80 active:opacity-80',
        ghost: 'web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent',
        link: 'web:underline-offset-4 web:hover:underline web:focus:underline',
      },
      size: {
        default: 'h-10 px-4 py-2 native:h-12 native:px-5 native:py-3',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8 native:h-14',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva(
  'web:whitespace-nowrap text-sm native:text-base font-medium text-foreground web:transition-colors',
  {
    variants: {
      variant: {
        default: 'text-primary-foreground',
        destructive: 'text-destructive-foreground',
        outline: 'group-active:text-accent-foreground',
        secondary: 'text-secondary-foreground group-active:text-secondary-foreground',
        ghost: 'group-active:text-accent-foreground',
        link: 'text-primary group-active:underline',
      },
      size: {
        default: '',
        sm: '',
        lg: 'native:text-lg',
        icon: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonAsyncProps = React.ComponentProps<typeof Pressable> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
    spinnerSize?: number;
    spinnerColor?: string;
  };

function ButtonAsync({
  ref,
  className,
  variant,
  size,
  loading = false,
  spinnerSize = 16,
  spinnerColor,
  children,
  ...props
}: ButtonAsyncProps) {
  // Определяем цвет спиннера на основе варианта кнопки
  const getSpinnerColor = () => {
    if (spinnerColor) return spinnerColor;

    switch (variant) {
      case 'outline':
      case 'ghost':
      case 'link':
        return '#374151'; // text-gray-700
      case 'secondary':
        return '#1f2937'; // text-gray-800
      default:
        return 'white';
    }
  };

  return (
    <TextClassContext.Provider
      value={buttonTextVariants({ variant, size, className: 'web:pointer-events-none' })}
    >
      <Pressable
        className={cn(
          (props.disabled || loading) && 'opacity-75 web:pointer-events-none',
          buttonVariants({ variant, size, className })
        )}
        ref={ref}
        disabled={props.disabled || loading}
        {...props}
      >
        {loading ? (
          <View className="flex-row items-center justify-center gap-2">
            <View
              testID="button-loading-spinner"
              className="animate-spin rounded-full border-2 border-transparent border-t-current"
              style={{
                width: spinnerSize,
                height: spinnerSize,
                borderTopColor: getSpinnerColor(),
              }}
            />
            {children && (
              <View>
                {typeof children === 'function'
                  ? children({ pressed: false, hovered: false })
                  : children}
              </View>
            )}
          </View>
        ) : typeof children === 'function' ? (
          children({ pressed: false, hovered: false })
        ) : (
          children
        )}
      </Pressable>
    </TextClassContext.Provider>
  );
}

export { ButtonAsync, buttonTextVariants, buttonVariants };
export type { ButtonAsyncProps };
