import { Calendar, CalendarActiveDateRange } from '@marceloterreiro/flash-calendar';
import React from 'react';
import { View } from 'react-native';
import { cn } from '~/lib/utils';

export interface FlashCalendarProps {
  className?: string;
  calendarMonthId: string;
  calendarActiveDateRanges: {
    startId: string;
    endId: string;
  }[];
  onCalendarDayPress: (dateId: string) => void;
}

/**
 * Simplified FlashCalendar component optimized for mobile
 */
export function FlashCalendar({
  className,
  calendarMonthId,
  calendarActiveDateRanges,
  onCalendarDayPress,
}: FlashCalendarProps) {
  // Simple validation for monthId
  const safeMonthId = React.useMemo(() => {
    if (calendarMonthId && /^\d{4}-\d{2}$/.test(calendarMonthId)) {
      return calendarMonthId;
    }
    // Fallback to current month
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }, [calendarMonthId]);

  // Simple validation for date ranges
  const safeRanges: CalendarActiveDateRange[] = React.useMemo(() => {
    if (!Array.isArray(calendarActiveDateRanges)) {
      return [];
    }

    return calendarActiveDateRanges
      .filter((range) => range?.startId && range?.endId)
      .map((range) => ({
        startId: range.startId,
        endId: range.endId,
      }));
  }, [calendarActiveDateRanges]);

  // Calendar theme optimized for mobile
  const calendarTheme = {
    rowMonth: {
      content: {
        textAlign: 'center' as const,
        color: '#374151',
        fontWeight: '600' as const,
      },
    },
    rowWeek: {
      container: {
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        paddingBottom: 4,
        marginBottom: 8,
      },
    },
    itemWeekName: {
      content: {
        color: '#6b7280',
        fontWeight: '500' as const,
        fontSize: 12,
      },
    },
    itemDayContainer: {
      activeDayFiller: {
        backgroundColor: '#3b82f6',
      },
    },
    itemDay: {
      idle: ({ isPressed, isWeekend }: any) => ({
        container: {
          backgroundColor: isPressed ? '#f3f4f6' : 'transparent',
          borderRadius: 8,
        },
        content: {
          color: isWeekend ? '#6b7280' : '#111827',
        },
      }),
      today: ({ isPressed }: any) => ({
        container: {
          borderColor: '#3b82f6',
          borderWidth: 2,
          backgroundColor: isPressed ? '#dbeafe' : 'transparent',
          borderRadius: 8,
        },
        content: {
          color: '#3b82f6',
          fontWeight: '600' as const,
        },
      }),
      active: ({ isPressed }: any) => ({
        container: {
          backgroundColor: isPressed ? '#2563eb' : '#3b82f6',
          borderRadius: 8,
        },
        content: {
          color: '#ffffff',
          fontWeight: '600' as const,
        },
      }),
      disabled: () => ({
        container: {
          backgroundColor: 'transparent',
        },
        content: {
          color: '#d1d5db',
        },
      }),
    },
  };

  return (
    <View className={cn('rounded-lg bg-white p-4', className)}>
      <Calendar
        theme={calendarTheme}
        calendarMonthId={safeMonthId}
        calendarActiveDateRanges={safeRanges}
        onCalendarDayPress={onCalendarDayPress}
      />
    </View>
  );
}
