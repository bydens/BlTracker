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
    padding: 20,
    backgroundColor: '#fff',
  },
  listContentContainer: {
    paddingBottom: 20, // Ensure last item is not hidden by button
  },
  itemContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  measurementText: {
    fontSize: 16,
    marginBottom: 3,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#888',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 10, // Add some space at the bottom
  },
});