import dayjs, { Dayjs, ConfigType, UnitType, ManipulateType } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useMemo } from 'react';

// Initialize dayjs with plugins
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(customParseFormat);

export interface UseDayJsReturn {
  // Core dayjs instance
  dayjs: typeof dayjs;

  // Formatting functions
  formatDate: (date: ConfigType, format?: string) => string;
  formatTime: (date: ConfigType, format?: string) => string;
  formatDateTime: (date: ConfigType, format?: string) => string;

  // Relative time functions
  timeAgo: (date: ConfigType) => string;
  timeFromNow: (date: ConfigType) => string;

  // Comparison functions
  isBefore: (date1: ConfigType, date2: ConfigType, unit?: UnitType) => boolean;
  isAfter: (date1: ConfigType, date2: ConfigType, unit?: UnitType) => boolean;
  isSame: (date1: ConfigType, date2: ConfigType, unit?: UnitType) => boolean;
  isDifferent: (date1: ConfigType, date2: ConfigType, unit?: UnitType) => boolean;

  // Manipulation functions
  add: (date: ConfigType, value: number, unit: ManipulateType) => Dayjs;
  subtract: (date: ConfigType, value: number, unit: ManipulateType) => Dayjs;

  // Date part functions
  getDay: (date: ConfigType) => number;
  getMonth: (date: ConfigType) => number;
  getYear: (date: ConfigType) => number;

  // Timezone functions
  toTimezone: (date: ConfigType, timezone: string) => Dayjs;
  getTimezone: () => string;

  // Validation functions
  isValid: (date: ConfigType) => boolean;
  parse: (date: string, format?: string) => Dayjs;
}

export const useDayJs = (): UseDayJsReturn => {
  return useMemo(
    () => ({
      // Core dayjs instance
      dayjs,

      // Formatting functions
      formatDate: (date: ConfigType, format = 'YYYY-MM-DD') => {
        return dayjs(date).format(format);
      },

      formatTime: (date: ConfigType, format = 'HH:mm:ss') => {
        return dayjs(date).format(format);
      },

      formatDateTime: (date: ConfigType, format = 'YYYY-MM-DD HH:mm:ss') => {
        return dayjs(date).format(format);
      },

      // Relative time functions
      timeAgo: (date: ConfigType) => {
        return dayjs(date).fromNow();
      },

      timeFromNow: (date: ConfigType) => {
        return dayjs(date).toNow();
      },

      // Comparison functions
      isBefore: (date1: ConfigType, date2: ConfigType, unit?: UnitType) => {
        return dayjs(date1).isBefore(dayjs(date2), unit);
      },

      isAfter: (date1: ConfigType, date2: ConfigType, unit?: UnitType) => {
        return dayjs(date1).isAfter(dayjs(date2), unit);
      },

      isSame: (date1: ConfigType, date2: ConfigType, unit?: UnitType) => {
        return dayjs(date1).isSame(dayjs(date2), unit);
      },

      isDifferent: (date1: ConfigType, date2: ConfigType, unit?: UnitType) => {
        return !dayjs(date1).isSame(dayjs(date2), unit);
      },

      // Manipulation functions
      add: (date: ConfigType, value: number, unit: ManipulateType) => {
        return dayjs(date).add(value, unit);
      },

      subtract: (date: ConfigType, value: number, unit: ManipulateType) => {
        return dayjs(date).subtract(value, unit);
      },

      // Date part functions
      getDay: (date: ConfigType) => {
        return dayjs(date).day();
      },

      getMonth: (date: ConfigType) => {
        return dayjs(date).month();
      },

      getYear: (date: ConfigType) => {
        return dayjs(date).year();
      },

      // Timezone functions
      toTimezone: (date: ConfigType, timezone: string) => {
        return dayjs(date).tz(timezone);
      },

      getTimezone: () => {
        return dayjs.tz.guess();
      },

      // Validation functions
      isValid: (date: ConfigType) => {
        return dayjs(date).isValid();
      },

      parse: (date: string, format?: string) => {
        return format ? dayjs(date, format) : dayjs(date);
      },
    }),
    []
  );
};
