/**
 * Utility functions for formatting data
 */

/**
 * Format number to IDR currency string
 */
export const formatIDR = (num: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(num);
};

/**
 * Format date to Indonesian long format
 */
export const formatDateIndo = (dateString: string, withDay: boolean = true): string => {
  if (!dateString) return '-';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };

    if (withDay) {
      options.weekday = 'long';
    }

    return date.toLocaleDateString('id-ID', options);
  } catch (e) {
    return dateString;
  }
};

/**
 * Extract numeric value from currency string (e.g. "Rp 100.000" -> 100000)
 */
export const extractNominal = (str: string): number => {
  if (!str) return 0;
  const match = str.match(/Rp\.?\s*([\d.]+)/);
  if (match && match[1]) {
    return parseInt(match[1].replace(/\./g, '')) || 0;
  }
  return 0;
};
