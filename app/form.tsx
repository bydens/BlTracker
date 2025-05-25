import { useRouter } from 'expo-router';
import React, { useState, useRef } from 'react';
import { StatusBar, StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import CustomModal from '../src/components/CustomModal';
import Footer from '../src/components/Footer';
import Header from '../src/components/Header';
import { saveMeasurement } from '../src/services/storageService';

export default function LogPressureScreen() {
  const router = useRouter();
  const systolicInputRef = React.useRef<TextInput>(null);
  const diastolicInputRef = React.useRef<TextInput>(null); // Added ref for diastolic input
  const pulseInputRef = React.useRef<TextInput>(null); // Added ref for pulse input

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
      showModal('Error', 'Please fill in all fields.', [{ text: 'OK', onPress: hideModal }]);
      return;
    }

    const systolicNum = parseInt(systolic, 10);
    const diastolicNum = parseInt(diastolic, 10);
    const pulseNum = parseInt(pulse, 10);

    if (isNaN(systolicNum) || isNaN(diastolicNum) || isNaN(pulseNum)) {
      showModal('Error', 'Please enter valid numerical values.', [{ text: 'OK', onPress: hideModal }]);
      return;
    }

    try {
      await saveMeasurement({ systolic: systolicNum, diastolic: diastolicNum, pulse: pulseNum });
      showModal('Success', 'Measurement saved.', [
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
      showModal('Error', 'Failed to save measurement.', [{ text: 'OK', onPress: hideModal }]);
      console.error('Failed to save measurement:', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <Header title="Add Measurement" showBackButton={false} />

        <View style={styles.formContainer}>
          <Text style={styles.label}>Systolic Pressure (mmHg):</Text>
          <TextInput
            style={styles.input}
            value={systolic}
            onChangeText={setSystolic}
            keyboardType="number-pad"
            ref={systolicInputRef}
            placeholder="120"
            accessibilityLabel="Systolic pressure input field"
            returnKeyType="next"
            onSubmitEditing={() => diastolicInputRef.current?.focus()}
            blurOnSubmit={false}
          />

          <Text style={styles.label}>Diastolic Pressure (mmHg):</Text>
          <TextInput
            style={styles.input}
            value={diastolic}
            onChangeText={setDiastolic}
            keyboardType="number-pad"
            ref={diastolicInputRef} // Added ref
            placeholder="80"
            accessibilityLabel="Diastolic pressure input field"
            returnKeyType="next"
            onSubmitEditing={() => pulseInputRef.current?.focus()} // Focus next input
            blurOnSubmit={false} // Prevent keyboard dismissal on submit for intermediate fields
          />

          <Text style={styles.label}>Pulse (bpm):</Text>
          <TextInput
            style={styles.input}
            value={pulse}
            onChangeText={setPulse}
            keyboardType="number-pad"
            ref={pulseInputRef} // Added ref
            placeholder="60"
            accessibilityLabel="Pulse input field"
            returnKeyType="done" // "Done" for the last input
            onSubmitEditing={Keyboard.dismiss} // Dismiss keyboard on submit
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
    </TouchableWithoutFeedback>
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