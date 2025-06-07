import { OTPInput, type OTPInputRef, type SlotProps } from 'input-otp-native';
import React, { useRef, useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  useSharedValue,
} from 'react-native-reanimated';
import { cn } from '~/lib/utils';

export interface OTPInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  maxLength?: number;
  variant?: 'default' | 'stripe' | 'apple' | 'dashed';
  className?: string;
}

const OTPInputComponent = React.forwardRef<OTPInputRef, OTPInputProps>(
  (
    { value, onChange, onComplete, maxLength = 6, variant = 'default', className, ...props },
    ref
  ) => {
    const internalRef = useRef<OTPInputRef>(null);
    const otpRef = ref || internalRef;

    const renderSlots = (slots: SlotProps[]) => {
      switch (variant) {
        case 'stripe':
          return <StripeSlots slots={slots} maxLength={maxLength} />;
        case 'apple':
          return <AppleSlots slots={slots} />;
        case 'dashed':
          return <DashedSlots slots={slots} />;
        default:
          return <DefaultSlots slots={slots} />;
      }
    };

    return (
      <OTPInput
        ref={otpRef}
        value={value}
        onChange={onChange}
        onComplete={onComplete}
        maxLength={maxLength}
        render={({ slots }) => (
          <View className={cn('flex-row items-center justify-center', className)}>
            {renderSlots(slots)}
          </View>
        )}
        {...props}
      />
    );
  }
);

OTPInputComponent.displayName = 'OTPInput';

// Default variant
function DefaultSlots({ slots }: { slots: SlotProps[] }) {
  return (
    <>
      {slots.map((slot, idx) => (
        <DefaultSlot key={`slot-${Date.now()}-${idx}`} {...slot} />
      ))}
    </>
  );
}

function DefaultSlot({ char, isActive, hasFakeCaret }: SlotProps) {
  return (
    <View
      className={cn(
        'mx-1 h-14 w-12 items-center justify-center rounded-lg border-2 border-border bg-background',
        {
          'border-primary': isActive,
        }
      )}
    >
      {char !== null && <Text className="text-2xl font-semibold text-foreground">{char}</Text>}
      {hasFakeCaret && <FakeCaret />}
    </View>
  );
}

// Stripe variant (grouped with dash)
function StripeSlots({ slots, maxLength }: { slots: SlotProps[]; maxLength: number }) {
  const firstHalf = slots.slice(0, Math.ceil(maxLength / 2));
  const secondHalf = slots.slice(Math.ceil(maxLength / 2));

  return (
    <>
      <View className="flex-row">
        {firstHalf.map((slot, idx) => (
          <StripeSlot
            key={`stripe-first-${idx}-${slot.char || 'empty'}`}
            {...slot}
            index={idx}
            isLast={idx === firstHalf.length - 1}
          />
        ))}
      </View>
      <FakeDash />
      <View className="flex-row">
        {secondHalf.map((slot, idx) => (
          <StripeSlot
            key={`stripe-second-${idx}-${slot.char || 'empty'}`}
            {...slot}
            index={idx}
            isLast={idx === secondHalf.length - 1}
          />
        ))}
      </View>
    </>
  );
}

function StripeSlot({
  char,
  isActive,
  hasFakeCaret,
  index,
  isLast,
}: SlotProps & { index: number; isLast: boolean }) {
  const isFirst = index === 0;

  return (
    <View
      className={cn('h-16 w-12 items-center justify-center border border-gray-200 bg-gray-50', {
        'rounded-l-lg': isFirst,
        'rounded-r-lg': isLast,
        'border-black bg-white': isActive,
      })}
    >
      {char !== null && <Text className="text-2xl font-medium text-gray-900">{char}</Text>}
      {hasFakeCaret && <FakeCaret />}
    </View>
  );
}

// Apple variant
function AppleSlots({ slots }: { slots: SlotProps[] }) {
  return (
    <>
      {slots.map((slot, idx) => (
        <AppleSlot key={`apple-${idx}-${slot.char || 'empty'}`} {...slot} />
      ))}
    </>
  );
}

function AppleSlot({ char, isActive, hasFakeCaret }: SlotProps) {
  return (
    <View
      className={cn('mx-1 h-14 w-12 items-center justify-center rounded-xl border-2', {
        'border-gray-300 bg-gray-50': !isActive,
        'border-blue-500 bg-white': isActive,
      })}
    >
      {char !== null && <Text className="text-2xl font-semibold text-gray-900">{char}</Text>}
      {hasFakeCaret && <FakeCaret color="#007AFF" />}
    </View>
  );
}

// Dashed variant
function DashedSlots({ slots }: { slots: SlotProps[] }) {
  return (
    <>
      {slots.map((slot, idx) => (
        <React.Fragment key={`dashed-${idx}-${slot.char || 'empty'}`}>
          <DashedSlot {...slot} />
          {idx < slots.length - 1 && <DashSeparator />}
        </React.Fragment>
      ))}
    </>
  );
}

function DashedSlot({ char, isActive, hasFakeCaret }: SlotProps) {
  return (
    <View className="h-14 w-12 items-center justify-center">
      {char !== null && <Text className="text-2xl font-semibold text-foreground">{char}</Text>}
      {hasFakeCaret && <FakeCaret />}
      <View
        className={cn('absolute bottom-0 h-0.5 w-full', {
          'bg-gray-300': !isActive,
          'bg-primary': isActive,
        })}
      />
    </View>
  );
}

function DashSeparator() {
  return (
    <View className="mx-2 h-14 items-center justify-center">
      <View className="h-0.5 w-4 bg-gray-300" />
    </View>
  );
}

// Helper components
function FakeDash() {
  return (
    <View className="mx-2 h-16 w-8 items-center justify-center">
      <View className="h-0.5 w-2 rounded-sm bg-gray-200" />
    </View>
  );
}

function FakeCaret({ color = '#000000' }: { color?: string }) {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(withTiming(0, { duration: 500 }), withTiming(1, { duration: 500 })),
      -1,
      true
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View className="absolute h-full w-full items-center justify-center">
      <Animated.View
        style={[
          {
            width: 2,
            height: 32,
            backgroundColor: color,
            borderRadius: 1,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
}

export { OTPInputComponent as OTPInput, type OTPInputRef };
