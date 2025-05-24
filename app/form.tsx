import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import CustomModal from '../src/components/CustomModal';
import Footer from '../src/components/Footer';
import Header from '../src/components/Header';
import { saveMeasurement } from '../src/services/storageService';

export default function LogPressureScreen() {
  const router = useRouter();
  const systolicInputRef = React.useRef<TextInput>(null);
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [pulse, setPulse] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [modalButtons, setModalButtons] = useState<{ text: string; style?: 'primary' | 'secondary'; onPress: () => void; }[]>([]);

  const showModal = (title: string, description: string, buttons: { text: string; style?: 'primary' | 'secondary'; onPress: () => void; }[]) => {
    setModalTitle(title);
    setModalDescription(description);
    setModalButtons(buttons);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setModalTitle('');
    setModalDescription('');
    setModalButtons([]);
  };

  const handleSaveMeasurement = async () => {
    if (!systolic || !diastolic || !pulse) {
      showModal('Ошибка', 'Пожалуйста, заполните все поля.', [{ text: 'OK', onPress: hideModal }]);
      return;
    }

    const systolicNum = parseInt(systolic, 10);
    const diastolicNum = parseInt(diastolic, 10);
    const pulseNum = parseInt(pulse, 10);

    if (isNaN(systolicNum) || isNaN(diastolicNum) || isNaN(pulseNum)) {
      showModal('Ошибка', 'Пожалуйста, введите корректные числовые значения.', [{ text: 'OK', onPress: hideModal }]);
      return;
    }

    try {
      await saveMeasurement({ systolic: systolicNum, diastolic: diastolicNum, pulse: pulseNum });
      showModal('Успех', 'Измерение сохранено.', [
        {
          text: 'OK',
          onPress: () => {
            hideModal();
            setSystolic('');
            setDiastolic('');
            setPulse('');
            systolicInputRef.current?.focus();
            router.push('/history');
          }
        }
      ]);
    } catch (error) {
      showModal('Ошибка', 'Не удалось сохранить измерение.', [{ text: 'OK', onPress: hideModal }]);
      console.error('Failed to save measurement:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header title="Add Measurement" showBackButton={false} />
      {/* The old navBar View is replaced by the Header component */}

      {/* Form Content */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Систолическое давление (мм рт. ст.):</Text>
        <TextInput
          style={styles.input}
          value={systolic}
          onChangeText={setSystolic}
          keyboardType="number-pad"
          ref={systolicInputRef}
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
      </View>
      
      <Footer showSaveButton={true} onSave={handleSaveMeasurement} />

      <CustomModal
        visible={modalVisible}
        onClose={hideModal}
        title={modalTitle}
        description={modalDescription}
        buttons={modalButtons}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderRadius: 12,
    fontSize: 16,
    color: '#1F2937',
  },
});