import { format, parse, addDays, isBefore } from 'date-fns';

export const formatDate = (dateString: string): string => {
  try {
    const date = parse(dateString, 'yyyy-MM-dd', new Date());
    return format(date, 'EEEE, MMM d, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

export const formatTime = (timeString: string): string => {
  try {
    if (!timeString) return 'TBA';
    const time = parse(timeString, 'HH:mm:ss', new Date());
    return format(time, 'h:mm a');
  } catch (error) {
    console.error('Error formatting time:', error);
    return timeString || 'TBA';
  }
};

export const getCurrentDateISO = (): string => {
  return format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
};

export const getOneWeekLaterISO = (): string => {
  return format(addDays(new Date(), 7), "yyyy-MM-dd'T'HH:mm:ss'Z'");
};

export const isEventFree = (priceRanges?: { min: number }[]): boolean => {
  if (!priceRanges || priceRanges.length === 0) return false;
  return priceRanges.some(range => range.min === 0);
};

export const getTodayDateRange = (): { start: string; end: string } => {
  const today = new Date();
  const start = format(today, "yyyy-MM-dd'T'00:00:00'Z'");
  const end = format(today, "yyyy-MM-dd'T'23:59:59'Z'");
  return { start, end };
};

export const getThisWeekDateRange = (): { start: string; end: string } => {
  const today = new Date();
  const end = format(addDays(today, 7), "yyyy-MM-dd'T'23:59:59'Z'");
  const start = format(today, "yyyy-MM-dd'T'00:00:00'Z'");
  return { start, end };
};