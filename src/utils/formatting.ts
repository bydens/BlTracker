import { BloodPressureCategory, BP_CATEGORIES } from '../types';

/**
 * Formats a date string to a localized format
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (error) {
    return 'Invalid Date';
  }
};

/**
 * Formats a date to a short format (e.g., "Jan 15")
 */
export const formatDateShort = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  } catch (error) {
    return 'Invalid';
  }
};

/**
 * Determines blood pressure category based on systolic and diastolic values
 * According to American Heart Association guidelines
 */
export const getBloodPressureCategory = (
  systolic: number,
  diastolic: number
): BloodPressureCategory => {
  // Crisis (Emergency care needed)
  if (systolic > 180 || diastolic > 120) {
    return BP_CATEGORIES.crisis;
  }

  // High Blood Pressure Stage 2
  if (systolic >= 140 || diastolic >= 90) {
    return BP_CATEGORIES.stage2;
  }

  // High Blood Pressure Stage 1
  if (systolic >= 130 || diastolic >= 80) {
    return BP_CATEGORIES.stage1;
  }

  // Elevated
  if (systolic >= 120 && diastolic < 80) {
    return BP_CATEGORIES.elevated;
  }

  // Normal
  return BP_CATEGORIES.normal;
};

/**
 * Formats blood pressure reading as "systolic/diastolic"
 */
export const formatBloodPressure = (systolic: number, diastolic: number): string => {
  return `${systolic}/${diastolic}`;
};

/**
 * Formats pulse with unit
 */
export const formatPulse = (pulse: number): string => {
  return `${pulse} bpm`;
};

/**
 * Generates a unique ID for measurements
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Truncates text to specified length with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};