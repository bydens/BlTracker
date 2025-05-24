import AsyncStorage from '@react-native-async-storage/async-storage';
import { Measurement } from '../types';

const MEASUREMENTS_KEY = 'measurements';

export const saveMeasurement = async (measurement: Omit<Measurement, 'id' | 'date'>): Promise<void> => {
  try {
    const existingMeasurements = await getMeasurements();
    const newMeasurement: Measurement = {
      ...measurement,
      id: Date.now().toString(), // Simple unique ID generation
      date: new Date().toISOString(),
    };
    const updatedMeasurements = [newMeasurement, ...existingMeasurements];
    await AsyncStorage.setItem(MEASUREMENTS_KEY, JSON.stringify(updatedMeasurements));
  } catch (error) {
    console.error('Error saving measurement:', error);
    // TODO: Add more robust error handling
  }
};

export const getMeasurements = async (): Promise<Measurement[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(MEASUREMENTS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error fetching measurements:', error);
    // TODO: Add more robust error handling
    return [];
  }
};

export const deleteMeasurement = async (id: string): Promise<void> => {
  try {
    const existingMeasurements = await getMeasurements();
    const updatedMeasurements = existingMeasurements.filter(measurement => measurement.id !== id);
    await AsyncStorage.setItem(MEASUREMENTS_KEY, JSON.stringify(updatedMeasurements));
  } catch (error) {
    console.error('Error deleting measurement:', error);
    // TODO: Add more robust error handling
  }
};