import { Ionicons } from '@expo/vector-icons'; // Предполагаем, что Ionicons доступны
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

  // Load measurements when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadMeasurements();
    }, [])
  );

  const renderItem = ({ item }: { item: Measurement }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.dateText}>{new Date(item.date).toLocaleString()}</Text>
      <Text style={styles.measurementText}>
        Давление: {item.systolic}/{item.diastolic} мм рт. ст.
      </Text>
      <Text style={styles.measurementText}>Пульс: {item.pulse} уд/мин</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {measurements.length === 0 ? (
        <Text style={styles.emptyText}>История измерений пуста.</Text>
      ) : (
        <FlatList
          data={measurements}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContentContainer}
        />
      )}
      <TouchableOpacity style={styles.fab} onPress={() => router.push('/form')} accessibilityLabel="Добавить новое измерение">
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // Existing styles will be updated below, and new styles for FAB will be added
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5', // Новый цвет фона как на дизайне
    paddingHorizontal: 16, // Горизонтальный padding
    paddingTop: 20, // Верхний padding
  },
  listContentContainer: {
    paddingBottom: 80, // Увеличиваем отступ снизу, чтобы FAB не перекрывал последний элемент
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280', // Серый цвет для даты
    marginBottom: 8,
    fontWeight: 'normal',
  },
  measurementText: {
    fontSize: 16,
    color: '#1F2937', // Темный цвет для основного текста
    marginBottom: 6,
    lineHeight: 24,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 80,
    fontSize: 18,
    color: '#6B7280',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 16,
    bottom: 16,
    backgroundColor: '#6366F1', // Фиолетовый цвет для FAB, можно подобрать точнее
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, // Тень для Android
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
  },
});