import React, { useState } from 'react';
import { Platform, View } from 'react-native';
import { Calendar } from '~/lib/icons/Calendar';
import { cn } from '~/lib/utils';
import { Button } from './button';
import { DatePicker as DatePickerShadcn } from './date-picker-shadcn';
import { FlashCalendar } from './flash-calendar';
import { Text } from './text';

export interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  mode?: 'date' | 'time' | 'datetime';
  minimumDate?: Date;
  maximumDate?: Date;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  textClassName?: string;
}

export function DatePicker({
  value,
  onChange,
  mode = 'date',
  minimumDate,
  maximumDate,
  disabled = false,
  placeholder = 'Select date',
  className,
  buttonClassName,
  textClassName,
}: DatePickerProps) {
  const [showWebCalendar, setShowWebCalendar] = useState(false);

  // Format date for display
  const formatValue = (date: Date, mode: string) => {
    try {
      if (!date || !(date instanceof Date) || Number.isNaN(date.getTime())) {
        return placeholder;
      }

      switch (mode) {
        case 'time':
          return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        case 'datetime':
          return date.toLocaleString([], {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
        default:
          return date.toLocaleDateString([], {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
      }
    } catch (error) {
      console.error('Error formatting date:', error);
      return placeholder;
    }
  };

  // Web-specific input handling
  const getInputType = () => {
    switch (mode) {
      case 'time':
        return 'time';
      case 'datetime':
        return 'datetime-local';
      default:
        return 'date';
    }
  };

  const formatForInput = (date: Date) => {
    try {
      let validDate = date;
      if (!date || !(date instanceof Date) || Number.isNaN(date.getTime())) {
        validDate = new Date();
      }

      if (mode === 'time') {
        return validDate.toTimeString().slice(0, 5);
      }

      if (mode === 'datetime') {
        const pad = (num: number) => num.toString().padStart(2, '0');
        const year = validDate.getFullYear();
        const month = pad(validDate.getMonth() + 1);
        const day = pad(validDate.getDate());
        const hours = pad(validDate.getHours());
        const minutes = pad(validDate.getMinutes());
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      }

      const pad = (num: number) => num.toString().padStart(2, '0');
      const year = validDate.getFullYear();
      const month = pad(validDate.getMonth() + 1);
      const day = pad(validDate.getDate());
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error('Error formatting date for input:', error);
      const now = new Date();
      const pad = (num: number) => num.toString().padStart(2, '0');
      return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    }
  };

  const handleWebInputChange = (text: string) => {
    if (!text) return;

    let newDate: Date;
    if (mode === 'time') {
      const [hours, minutes] = text.split(':');
      newDate = new Date(value);
      newDate.setHours(Number.parseInt(hours), Number.parseInt(minutes), 0, 0);
    } else if (mode === 'datetime') {
      newDate = new Date(text);
    } else {
      newDate = new Date(`${text}T00:00:00`);
    }

    if (!Number.isNaN(newDate.getTime())) {
      onChange(newDate);
    }
  };

  // Helper for FlashCalendar
  const getDateId = (date: Date) => {
    try {
      if (!date || !(date instanceof Date) || Number.isNaN(date.getTime())) {
        const today = new Date();
        return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
          today.getDate()
        ).padStart(2, '0')}`;
      }

      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    } catch (error) {
      console.error('Error generating dateId:', error);
      const today = new Date();
      return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
        today.getDate()
      ).padStart(2, '0')}`;
    }
  };

  const handleFlashCalendarDateSelect = (dateId: string) => {
    if (!dateId || !/^\d{4}-\d{2}-\d{2}$/.test(dateId)) {
      return;
    }

    try {
      const [yearStr, monthStr, dayStr] = dateId.split('-');
      const year = Number.parseInt(yearStr, 10);
      const month = Number.parseInt(monthStr, 10) - 1;
      const day = Number.parseInt(dayStr, 10);

      const selectedDate = new Date(year, month, day);

      if (Number.isNaN(selectedDate.getTime())) {
        return;
      }

      // Keep the time from the current value for datetime mode
      if (mode === 'datetime' && value && !Number.isNaN(value.getTime())) {
        selectedDate.setHours(
          value.getHours(),
          value.getMinutes(),
          value.getSeconds(),
          value.getMilliseconds()
        );
      } else {
        selectedDate.setHours(0, 0, 0, 0);
      }

      onChange(selectedDate);
      setShowWebCalendar(false);
    } catch (error) {
      console.error('Error handling date selection:', error);
    }
  };

  // Get current month ID for FlashCalendar
  const getCurrentMonthId = () => {
    try {
      const date = value && !Number.isNaN(value.getTime()) ? value : new Date();
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    } catch (error) {
      const now = new Date();
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    }
  };

  // Web version
  if (Platform.OS === 'web') {
    // For date mode, use shadcn DatePickerShadcn for better UX
    if (mode === 'date') {
      return (
        <View className={cn('flex-row', className)}>
          <DatePickerShadcn
            value={value}
            onChange={(date: Date | undefined) => date && onChange(date)}
            placeholder={placeholder}
            disabled={disabled}
            className={buttonClassName}
          />
        </View>
      );
    }

    // For time and datetime modes, use native HTML inputs
    return (
      <View className={cn('flex-col', className)}>
        <View
          className={cn(
            'border rounded-lg bg-background hover:bg-gray-50',
            disabled && 'opacity-50'
          )}
        >
          {/* @ts-ignore - using native HTML input for web */}
          <input
            type={getInputType()}
            value={formatForInput(value)}
            onChange={(e: any) => handleWebInputChange(e.target.value)}
            disabled={disabled}
            min={minimumDate ? formatForInput(minimumDate) : undefined}
            max={maximumDate ? formatForInput(maximumDate) : undefined}
            placeholder={placeholder}
            style={{
              padding: '12px',
              fontSize: '16px',
              color: disabled ? '#9ca3af' : '#000000',
              width: '100%',
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
            }}
            className={cn('outline-none cursor-pointer', textClassName)}
          />
        </View>
      </View>
    );
  }

  // Mobile version - use FlashCalendar for date selection
  if (mode === 'date') {
    return (
      <View className={cn('flex-col space-y-2', className)}>
        <Button
          variant="outline"
          onPress={() => !disabled && setShowWebCalendar(!showWebCalendar)}
          disabled={disabled}
          className={cn('flex justify-start flex-row items-center', buttonClassName)}
        >
          <Calendar size={16} className="mr-2 text-muted-foreground" />
          <Text className={cn('text-left flex-1', textClassName)}>
            {value ? formatValue(value, mode) : placeholder}
          </Text>
        </Button>

        {showWebCalendar && (
          <FlashCalendar
            calendarMonthId={getCurrentMonthId()}
            calendarActiveDateRanges={[{ startId: getDateId(value), endId: getDateId(value) }]}
            onCalendarDayPress={handleFlashCalendarDateSelect}
            className="mt-2"
          />
        )}
      </View>
    );
  }

  // For time and datetime on mobile, show button with selected value
  // Note: Full mobile time/datetime picker would require additional implementation
  return (
    <View className={cn('flex-col', className)}>
      <Button
        variant="outline"
        onPress={() => !disabled && console.log('Time/DateTime picker not implemented for mobile')}
        disabled={disabled}
        className={cn('justify-start flex-row items-center', buttonClassName)}
      >
        <Calendar size={16} className="mr-2 text-muted-foreground" />
        <Text className={cn('text-left flex-1', textClassName)}>
          {value ? formatValue(value, mode) : placeholder}
        </Text>
      </Button>
    </View>
  );
}
