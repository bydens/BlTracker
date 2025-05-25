import AsyncStorage from '@react-native-async-storage/async-storage';
import { Measurement } from '../types';

const MEASUREMENTS_KEY = 'measurements';
const MAX_MEASUREMENTS = 1000; // Prevent unlimited storage growth

// Custom error types for better error handling
export class StorageError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message);
    this.name = 'StorageError';
  }
}

// Generate a more robust unique ID
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const saveMeasurement = async (measurement: Omit<Measurement, 'id' | 'date'>): Promise<Measurement> => {
  try {
    const existingMeasurements = await getMeasurements();
    const newMeasurement: Measurement = {
      ...measurement,
      id: generateId(),
      date: new Date().toISOString(),
    };

    // Keep only the most recent measurements to prevent storage bloat
    const updatedMeasurements = [newMeasurement, ...existingMeasurements]
      .slice(0, MAX_MEASUREMENTS);

    await AsyncStorage.setItem(MEASUREMENTS_KEY, JSON.stringify(updatedMeasurements));
    return newMeasurement;
  } catch (error) {
    console.error('Error saving measurement:', error);
    throw new StorageError('Failed to save measurement', error as Error);
  }
};

export const getMeasurements = async (): Promise<Measurement[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(MEASUREMENTS_KEY);
    if (jsonValue === null) {
      return [];
    }

    const measurements = JSON.parse(jsonValue);

    // Validate the data structure
    if (!Array.isArray(measurements)) {
      console.warn('Invalid measurements data structure, resetting to empty array');
      await AsyncStorage.setItem(MEASUREMENTS_KEY, JSON.stringify([]));
      return [];
    }

    // Sort by date (newest first) and validate each measurement
    return measurements
      .filter(validateMeasurement)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error fetching measurements:', error);
    throw new StorageError('Failed to fetch measurements', error as Error);
  }
};

// Validate measurement data structure
const validateMeasurement = (measurement: any): measurement is Measurement => {
  return (
    measurement &&
    typeof measurement.id === 'string' &&
    typeof measurement.systolic === 'number' &&
    typeof measurement.diastolic === 'number' &&
    typeof measurement.pulse === 'number' &&
    typeof measurement.date === 'string' &&
    !isNaN(new Date(measurement.date).getTime())
  );
};

export const deleteMeasurement = async (id: string): Promise<boolean> => {
  try {
    const existingMeasurements = await getMeasurements();
    const initialLength = existingMeasurements.length;
    const updatedMeasurements = existingMeasurements.filter(measurement => measurement.id !== id);

    if (updatedMeasurements.length === initialLength) {
      // No measurement was found with the given ID
      return false;
    }

    await AsyncStorage.setItem(MEASUREMENTS_KEY, JSON.stringify(updatedMeasurements));
    return true;
  } catch (error) {
    console.error('Error deleting measurement:', error);
    throw new StorageError('Failed to delete measurement', error as Error);
  }
};

// Additional utility functions
export const clearAllMeasurements = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(MEASUREMENTS_KEY);
  } catch (error) {
    console.error('Error clearing measurements:', error);
    throw new StorageError('Failed to clear measurements', error as Error);
  }
};

export const getMeasurementById = async (id: string): Promise<Measurement | null> => {
  try {
    const measurements = await getMeasurements();
    return measurements.find(measurement => measurement.id === id) || null;
  } catch (error) {
    console.error('Error fetching measurement by ID:', error);
    throw new StorageError('Failed to fetch measurement', error as Error);
  }
};

export const getStorageStats = async (): Promise<{ count: number; oldestDate: string | null; newestDate: string | null }> => {
  try {
    const measurements = await getMeasurements();
    if (measurements.length === 0) {
      return { count: 0, oldestDate: null, newestDate: null };
    }

    const dates = measurements.map(m => new Date(m.date).getTime()).sort((a, b) => a - b);
    return {
      count: measurements.length,
      oldestDate: new Date(dates[0]).toISOString(),
      newestDate: new Date(dates[dates.length - 1]).toISOString(),
    };
  } catch (error) {
    console.error('Error getting storage stats:', error);
    throw new StorageError('Failed to get storage statistics', error as Error);
  }
};