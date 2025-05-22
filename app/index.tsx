import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { saveMeasurement } from '../src/services/storageService';

export default function LogPressureScreen() {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [pulse, setPulse] = useState('');
  const router = useRouter();

  const handleSaveMeasurement = async () => {
    if (!systolic || !diastolic || !pulse) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля.');
      return;
    }

    const systolicNum = parseInt(systolic, 10);
    const diastolicNum = parseInt(diastolic, 10);
    const pulseNum = parseInt(pulse, 10);

    if (isNaN(systolicNum) || isNaN(diastolicNum) || isNaN(pulseNum)) {
      Alert.alert('Ошибка', 'Пожалуйста, введите корректные числовые значения.');
      return;
    }

    try {
      await saveMeasurement({ systolic: systolicNum, diastolic: diastolicNum, pulse: pulseNum });
      Alert.alert('Успех', 'Измерение сохранено.');
      setSystolic('');
      setDiastolic('');
      setPulse('');
      // Optionally navigate to history screen or clear form
      // router.push('/history'); 
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось сохранить измерение.');
      console.error('Failed to save measurement:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Систолическое давление (мм рт. ст.):</Text>
      <TextInput
        style={styles.input}
        value={systolic}
        onChangeText={setSystolic}
        keyboardType="number-pad"
        placeholder="120"
        accessibilityLabel="Поле ввода систолического давления"
      />

      <Text style={styles.label}>Диастолическое давление (мм рт. ст.):</Text>
      <TextInput
        style={styles.input}
        value={diastolic}
        onChangeText={setDiastolic}
        keyboardType="number-pad"
        placeholder="80"
        accessibilityLabel="Поле ввода диастолического давления"
      />

      <Text style={styles.label}>Пульс (уд/мин):</Text>
      <TextInput
        style={styles.input}
        value={pulse}
        onChangeText={setPulse}
        keyboardType="number-pad"
        placeholder="60"
        accessibilityLabel="Поле ввода пульса"
      />

      <Button title="Сохранить измерение" onPress={handleSaveMeasurement} accessibilityLabel="Кнопка Сохранить измерение" />
      <View style={styles.linkContainer}>
        <Button title="Перейти к истории" onPress={() => router.push('/history')} accessibilityLabel="Кнопка Перейти к истории" />
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
  label: {
    fontSize: 16,
    fontWeight: '500', // Slightly bolder
    color: '#333',
    marginBottom: 10, // Increased margin
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd', // Lighter border
    paddingVertical: 12, // Increased vertical padding
    paddingHorizontal: 15, // Increased horizontal padding
    marginBottom: 24, // Increased margin
    borderRadius: 8, // More rounded corners
    fontSize: 16,
    color: '#333',
  },
  buttonWrapper: { // Wrapper for button styling
    marginBottom: 15, // Space between buttons
  },
  linkContainer: {
    marginTop: 25, // Increased top margin
    alignItems: 'center', // Center the button if it's a single link
  },
});
