import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Measurement } from '../types';

interface MeasurementItemProps {
  item: Measurement;
  onDelete: (id: string) => void;
}

const MeasurementItem: React.FC<MeasurementItemProps> = ({ item, onDelete }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemDetailsContainer}>
        <Text style={styles.dateText}>{new Date(item.date).toLocaleString()}</Text>
        <Text style={styles.measurementText}>
          Pressure: {item.systolic}/{item.diastolic} mmHg
        </Text>
        <Text style={styles.measurementText}>Pulse: {item.pulse} bpm</Text>
      </View>
      <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={24} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemDetailsContainer: {
    flex: 1,
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  measurementText: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  deleteButton: {
    padding: 8,
  },
});

export default MeasurementItem;