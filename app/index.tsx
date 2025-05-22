import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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

      <TouchableOpacity style={styles.button} onPress={handleSaveMeasurement} accessibilityLabel="Кнопка Сохранить измерение">
        <Text style={styles.buttonText}>Сохранить измерение</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => router.push('/history')} accessibilityLabel="Кнопка Перейти к истории">
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>Перейти к истории</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // Existing styles will be updated below
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: '#F0F2F5', // Новый цвет фона
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937', // Темный цвет для заголовков
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB', // Светло-серый бордер
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderRadius: 10,
    fontSize: 16,
    color: '#1F2937',
  },
  button: {
    backgroundColor: '#6366F1', // Фиолетовый цвет кнопки
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#6366F1',
    borderWidth: 1,
  },
  secondaryButtonText: {
    color: '#6366F1',
  },
  // linkContainer будет удален, так как кнопки теперь стилизованы индивидуально
});
