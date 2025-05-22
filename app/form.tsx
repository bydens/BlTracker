import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { saveMeasurement } from '../src/services/storageService';

export default function LogPressureScreen() {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [pulse, setPulse] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSaveMeasurement = async () => {
    setError('');
    
    if (!systolic || !diastolic || !pulse) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    const systolicNum = parseInt(systolic, 10);
    const diastolicNum = parseInt(diastolic, 10);
    const pulseNum = parseInt(pulse, 10);

    if (isNaN(systolicNum) || isNaN(diastolicNum) || isNaN(pulseNum)) {
      setError('Пожалуйста, введите корректные числовые значения');
      return;
    }

    try {
      await saveMeasurement({ systolic: systolicNum, diastolic: diastolicNum, pulse: pulseNum });
      router.push('/history');
    } catch (error) {
      setError('Не удалось сохранить измерение');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.card}>
        <Text style={styles.title}>Систолическое</Text>
        <TextInput
          style={styles.input}
          value={systolic}
          onChangeText={setSystolic}
          keyboardType="number-pad"
          placeholder="120"
          placeholderTextColor="#999"
        />
        <Text style={styles.unit}>мм рт. ст.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Диастолическое</Text>
        <TextInput
          style={styles.input}
          value={diastolic}
          onChangeText={setDiastolic}
          keyboardType="number-pad"
          placeholder="80"
          placeholderTextColor="#999"
        />
        <Text style={styles.unit}>мм рт. ст.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Пульс</Text>
        <TextInput
          style={styles.input}
          value={pulse}
          onChangeText={setPulse}
          keyboardType="number-pad"
          placeholder="70"
          placeholderTextColor="#999"
        />
        <Text style={styles.unit}>уд/мин</Text>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSaveMeasurement}>
          <Text style={styles.buttonText}>Сохранить</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 16,
  },
  card: {
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
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    fontSize: 34,
    fontWeight: '600',
    color: '#1a1a1a',
    padding: 0,
    marginBottom: 4,
  },
  unit: {
    fontSize: 13,
    color: '#999',
  },
  error: {
    color: '#ff3b30',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
});