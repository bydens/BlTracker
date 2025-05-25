// App configuration constants
export const APP_CONFIG = {
  MAX_MEASUREMENTS: 1000,
  STORAGE_KEY: 'blood_pressure_measurements',
  VERSION: '1.0.0',
} as const;

// UI constants
export const UI_CONSTANTS = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  REFRESH_THRESHOLD: 50,
  LIST_ITEM_HEIGHT: 80,
  MODAL_BACKDROP_OPACITY: 0.5,
} as const;

// Color palette
export const COLORS = {
  // Primary colors
  primary: '#007AFF',
  primaryDark: '#0056CC',
  primaryLight: '#4DA6FF',

  // Background colors
  background: '#F8F9FA',
  surface: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Text colors
  textPrimary: '#1F2024',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',

  // Status colors
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#007AFF',

  // Border colors
  border: '#E5E5EA',
  borderLight: '#F3F4F6',

  // Blood pressure category colors
  bpNormal: '#34C759',
  bpElevated: '#FF9500',
  bpHigh: '#FF3B30',
  bpCrisis: '#FF3B30',
} as const;

// Typography
export const TYPOGRAPHY = {
  sizes: {
    xs: 10,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 18,
    '2xl': 20,
    '3xl': 24,
    '4xl': 32,
  },
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
} as const;

// Spacing scale
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 48,
  '5xl': 64,
} as const;

// Border radius scale
export const BORDER_RADIUS = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

// Shadow presets
export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

// Error messages
export const ERROR_MESSAGES = {
  STORAGE_ERROR: 'Failed to save data. Please try again.',
  VALIDATION_ERROR: 'Please check your input values.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
  DELETE_ERROR: 'Failed to delete measurement.',
  LOAD_ERROR: 'Failed to load measurements.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  MEASUREMENT_SAVED: 'Measurement saved successfully!',
  MEASUREMENT_DELETED: 'Measurement deleted successfully!',
  DATA_CLEARED: 'All data cleared successfully!',
} as const;