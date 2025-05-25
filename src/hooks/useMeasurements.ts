import { useCallback, useEffect, useState } from 'react';
import { ERROR_MESSAGES } from '../constants';
import { storageService } from '../services/storageService';
import { Measurement } from '../types';

interface UseMeasurementsReturn {
  measurements: Measurement[];
  loading: boolean;
  error: string | null;
  refreshing: boolean;
  loadMeasurements: () => Promise<void>;
  saveMeasurement: (measurement: Omit<Measurement, 'id'>) => Promise<boolean>;
  deleteMeasurement: (id: string) => Promise<boolean>;
  clearAllMeasurements: () => Promise<boolean>;
  refresh: () => Promise<void>;
}

export const useMeasurements = (): UseMeasurementsReturn => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadMeasurements = useCallback(async () => {
    try {
      setError(null);
      const data = await storageService.getMeasurements();
      setMeasurements(data);
    } catch (err) {
      console.error('Error loading measurements:', err);
      setError(ERROR_MESSAGES.LOAD_ERROR);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveMeasurement = useCallback(async (measurement: Omit<Measurement, 'id'>): Promise<boolean> => {
    try {
      setError(null);
      await storageService.saveMeasurement(measurement);
      await loadMeasurements();
      return true;
    } catch (err) {
      console.error('Error saving measurement:', err);
      setError(ERROR_MESSAGES.STORAGE_ERROR);
      return false;
    }
  }, [loadMeasurements]);

  const deleteMeasurement = useCallback(async (id: string): Promise<boolean> => {
    try {
      setError(null);
      await storageService.deleteMeasurement(id);
      await loadMeasurements();
      return true;
    } catch (err) {
      console.error('Error deleting measurement:', err);
      setError(ERROR_MESSAGES.DELETE_ERROR);
      return false;
    }
  }, [loadMeasurements]);

  const clearAllMeasurements = useCallback(async (): Promise<boolean> => {
    try {
      setError(null);
      await storageService.clearAllMeasurements();
      setMeasurements([]);
      return true;
    } catch (err) {
      console.error('Error clearing measurements:', err);
      setError(ERROR_MESSAGES.STORAGE_ERROR);
      return false;
    }
  }, []);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    await loadMeasurements();
    setRefreshing(false);
  }, [loadMeasurements]);

  useEffect(() => {
    loadMeasurements();
  }, [loadMeasurements]);

  return {
    measurements,
    loading,
    error,
    refreshing,
    loadMeasurements,
    saveMeasurement,
    deleteMeasurement,
    clearAllMeasurements,
    refresh,
  };
};