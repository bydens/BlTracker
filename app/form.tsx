import React, { useState } from 'react';
import { Alert, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import Footer from '../src/components/Footer';
import { saveMeasurement } from '../src/services/storageService';

export default function LogPressureScreen() {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [pulse, setPulse] = useState('');

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
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <View style={styles.navTitleContainer}>
          <Text style={styles.navTitle}>Add Measurement</Text>
        </View>
      </View>

      {/* Content Switcher */}
      {/* <View style={styles.contentSwitcher}>
        <TouchableOpacity style={[styles.switcherTab, styles.inactiveTab]}>
          <Text style={styles.inactiveTabText}>To do</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={[styles.switcherTab, styles.inactiveTab]}>
          <Text style={styles.inactiveTabText}>In progress</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.switcherTab, styles.activeTab]}>
          <Text style={styles.activeTabText}>Finished</Text>
        </TouchableOpacity>
      </View> */}

      {/* Form Content */}
      <View style={styles.formContainer}>
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
      </View>
      
      <Footer showSaveButton={true} onSave={handleSaveMeasurement} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Distributes space: left icon, title, right placeholder
    backgroundColor: '#FFFFFF', // fill_RL25A2
    height: 56, // layout_6X9PSO height
    paddingHorizontal: 16, // Standard padding, Figma node has 24 for left icon
    marginBottom: 12, // layout_6X9PSO bottom padding
    marginTop: 12, // layout_6X9PSO top padding
  },
  navBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navTitle: {
    // fontFamily: 'Inter', // style_WGZGFU
    fontWeight: '700', // style_WGZGFU
    fontSize: 16, // style_WGZGFU
    color: '#1F2024', // fill_XDLNSA
    textAlign: 'center', // Actual text alignment within the Text component
  },
  navTitleContainer: {
    flex: 1, // Allows the title to take up available space for centering
    alignItems: 'center', // Centers the Text component horizontally
    justifyContent: 'center', // Centers the Text component vertically if navBar has extra height
  },
  contentSwitcher: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FE',
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    padding: 4,
  },
  switcherTab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
  },
  inactiveTab: {
    backgroundColor: 'transparent',
  },
  activeTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  inactiveTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  divider: {
    width: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
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
