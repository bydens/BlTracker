import { useFocusEffect, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
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
      <View style={styles.buttonContainer}>
        <Button title="Добавить новое измерение" onPress={() => router.push('/')} accessibilityLabel="Кнопка Добавить новое измерение" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24, // Increased padding
    backgroundColor: '#f7f7f7', // Softer background color
  },
  listContentContainer: {
    paddingBottom: 24, // Increased padding
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 18, // Increased padding
    marginBottom: 12, // Increased margin
    borderRadius: 10, // More rounded corners
    borderWidth: 1,
    borderColor: '#e0e0e0', // Slightly darker, more defined border
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05, // Softer shadow
    shadowRadius: 2.00,
    elevation: 2, // Subtle elevation for Android
  },
  dateText: {
    fontSize: 14,
    color: '#555', // Darker gray for better contrast
    marginBottom: 6,
    fontWeight: '500',
  },
  measurementText: {
    fontSize: 16,
    color: '#333', // Darker text color
    marginBottom: 4,
    lineHeight: 22, // Improved line height
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 60, // Increased margin
    fontSize: 18,
    color: '#777', // Slightly darker for better readability
  },
  buttonContainer: {
    marginTop: 24, // Increased top margin
    marginBottom: 15, // Increased bottom margin
  },
});