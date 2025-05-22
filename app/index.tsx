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
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 16,
  },
  linkContainer: {
    marginTop: 20,
  },
});
