import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getMeasurements } from '../src/services/storageService';
import { Measurement } from '../src/types';

export default function HistoryScreen() {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const router = useRouter();

  const loadMeasurements = async () => {
    const data = await getMeasurements();
    setMeasurements(data);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadMeasurements();
    }, [])
  );

  const getStatusColor = (systolic: number, diastolic: number) => {
    if (systolic >= 140 || diastolic >= 90) return '#ff3b30';
    if (systolic <= 90 || diastolic <= 60) return '#ff9500';
    return '#34c759';
  };

  const renderItem = ({ item }: { item: Measurement }) => {
    const statusColor = getStatusColor(item.systolic, item.diastolic);
    const date = new Date(item.date);
    
    return (
      <View style={styles.itemContainer}>
        <View style={styles.measurementHeader}>
          <Text style={styles.dateText}>
            {date.toLocaleDateString('ru-RU', { 
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </Text>
          <Text style={styles.timeText}>
            {date.toLocaleTimeString('ru-RU', { 
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
        
        <View style={styles.measurementData}>
          <View style={styles.dataColumn}>
            <Text style={[styles.value, { color: statusColor }]}>{item.systolic}/{item.diastolic}</Text>
            <Text style={styles.label}>мм рт. ст.</Text>
          </View>
          <View style={[styles.dataColumn, styles.pulseColumn]}>
            <Text style={styles.value}>{item.pulse}</Text>
            <Text style={styles.label}>уд/мин</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {measurements.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Нет сохраненных измерений</Text>
          <Text style={styles.emptySubtext}>Добавьте ваше первое измерение</Text>
        </View>
      ) : (
        <FlatList
          data={measurements}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
      
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => router.push('/form')}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  measurementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dateText: {
    fontSize: 15,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  timeText: {
    fontSize: 15,
    color: '#666',
  },
  measurementData: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  dataColumn: {
    flex: 1,
  },
  pulseColumn: {
    alignItems: 'flex-end',
  },
  value: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  label: {
    fontSize: 13,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});