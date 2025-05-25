export interface Measurement {
  id: string;
  systolic: number;
  diastolic: number;
  pulse: number;
  date: string; // ISO string format
}

export interface MeasurementInput {
  systolic: number;
  diastolic: number;
  pulse: number;
}

export interface BloodPressureCategory {
  category: 'Normal' | 'Elevated' | 'High Stage 1' | 'High Stage 2' | 'Crisis';
  color: string;
  description?: string;
}

export interface StorageStats {
  count: number;
  oldestDate: string | null;
  newestDate: string | null;
}

// Validation ranges for measurements
export const MEASUREMENT_RANGES = {
  systolic: { min: 50, max: 300 },
  diastolic: { min: 30, max: 200 },
  pulse: { min: 30, max: 200 },
} as const;

// Blood pressure categories according to AHA guidelines
export const BP_CATEGORIES: Record<string, BloodPressureCategory> = {
  normal: {
    category: 'Normal',
    color: '#34C759',
    description: 'Less than 120/80 mmHg'
  },
  elevated: {
    category: 'Elevated',
    color: '#FF9500',
    description: '120-129 systolic and less than 80 diastolic'
  },
  stage1: {
    category: 'High Stage 1',
    color: '#FF9500',
    description: '130-139 systolic or 80-89 diastolic'
  },
  stage2: {
    category: 'High Stage 2',
    color: '#FF3B30',
    description: '140/90 mmHg or higher'
  },
  crisis: {
    category: 'Crisis',
    color: '#FF3B30',
    description: 'Higher than 180/120 mmHg'
  }
} as const;

// Utility type for form validation
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Modal configuration types
export interface ModalButton {
  text: string;
  style?: 'primary' | 'secondary';
  onPress: () => void;
}

export interface ModalConfig {
  title: string;
  description: string;
  buttons: ModalButton[];
}