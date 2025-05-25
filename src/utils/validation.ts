import { MEASUREMENT_RANGES, ValidationResult } from '../types';

/**
 * Validates a measurement value against its allowed range
 */
export const validateMeasurementValue = (
  value: number,
  type: keyof typeof MEASUREMENT_RANGES
): boolean => {
  const range = MEASUREMENT_RANGES[type];
  return value >= range.min && value <= range.max;
};

/**
 * Validates all measurement inputs
 */
export const validateMeasurement = (
  systolic: number,
  diastolic: number,
  pulse: number
): ValidationResult => {
  const errors: string[] = [];

  if (!validateMeasurementValue(systolic, 'systolic')) {
    errors.push(`Systolic pressure must be between ${MEASUREMENT_RANGES.systolic.min} and ${MEASUREMENT_RANGES.systolic.max}`);
  }

  if (!validateMeasurementValue(diastolic, 'diastolic')) {
    errors.push(`Diastolic pressure must be between ${MEASUREMENT_RANGES.diastolic.min} and ${MEASUREMENT_RANGES.diastolic.max}`);
  }

  if (!validateMeasurementValue(pulse, 'pulse')) {
    errors.push(`Pulse must be between ${MEASUREMENT_RANGES.pulse.min} and ${MEASUREMENT_RANGES.pulse.max}`);
  }

  if (systolic <= diastolic) {
    errors.push('Systolic pressure must be higher than diastolic pressure');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Checks if a string represents a valid number
 */
export const isValidNumber = (value: string): boolean => {
  const num = parseFloat(value);
  return !isNaN(num) && isFinite(num);
};

/**
 * Safely parses a string to number with fallback
 */
export const safeParseNumber = (value: string, fallback: number = 0): number => {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? fallback : parsed;
};