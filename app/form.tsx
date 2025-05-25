import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import CustomModal from '../src/components/CustomModal';
import Footer from '../src/components/Footer';
import Header from '../src/components/Header';
import { saveMeasurement } from '../src/services/storageService';

export default function LogPressureScreen() {
  const router = useRouter();
  const systolicInputRef = React.useRef<TextInput>(null);
  const diastolicInputRef = React.useRef<TextInput>(null);
  const pulseInputRef = React.useRef<TextInput>(null);
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [pulse, setPulse] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [modalButtons, setModalButtons] = useState<{ text: string; style?: 'primary' | 'secondary'; onPress: () => void; }[]>([]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });
    
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

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

  const handleSaveMeasurement = useCallback(async () => {
    if (!systolic || !diastolic || !pulse) {
      showModal('Error', 'Please fill in all fields.', [{ text: 'OK', onPress: hideModal }]);
      return;
    }

    const systolicNum = parseInt(systolic, 10);
    const diastolicNum = parseInt(diastolic, 10);
    const pulseNum = parseInt(pulse, 10);

    if (isNaN(systolicNum) || isNaN(diastolicNum) || isNaN(pulseNum)) {
      showModal('Error', 'Please enter valid numeric values.', [{ text: 'OK', onPress: hideModal }]);
      return;
    }

    if (systolicNum < 50 || systolicNum > 300 || diastolicNum < 30 || diastolicNum > 200 || pulseNum < 30 || pulseNum > 200) {
      showModal('Error', 'Please enter realistic values.', [{ text: 'OK', onPress: hideModal }]);
      return;
    }

    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  }, [systolic, diastolic, pulse]);

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
          <Header title="Add Measurement" showBackButton={false} />
          
          <ScrollView 
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.formContainer}>
              <Text style={styles.label}>Systolic pressure (mmHg):</Text>
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
                maxLength={3}
              />

              <Text style={styles.label}>Diastolic pressure (mmHg):</Text>
              <TextInput
                style={styles.input}
                value={diastolic}
                onChangeText={setDiastolic}
                keyboardType="number-pad"
                ref={diastolicInputRef}
                placeholder="80"
                accessibilityLabel="Diastolic pressure input field"
                returnKeyType="next"
                onSubmitEditing={() => pulseInputRef.current?.focus()}
                maxLength={3}
              />

              <Text style={styles.label}>Pulse (bpm):</Text>
              <TextInput
                style={styles.input}
                value={pulse}
                onChangeText={setPulse}
                keyboardType="number-pad"
                ref={pulseInputRef}
                placeholder="60"
                accessibilityLabel="Pulse input field"
                returnKeyType="done"
                onSubmitEditing={handleSaveMeasurement}
                maxLength={3}
              />
            </View>
          </ScrollView>
          
          <Footer 
            showSaveButton={true} 
            onSave={handleSaveMeasurement} 
            isKeyboardVisible={isKeyboardVisible}
          />

          <CustomModal
            visible={modalVisible}
            onClose={hideModal}
            title={modalTitle}
            description={modalDescription}
            buttons={modalButtons}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  formContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
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