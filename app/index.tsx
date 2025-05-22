import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg'; // Предполагаем, что react-native-svg установлен

// SVG-код для линии пульса
const heartbeatSvg = `
<svg width="150" height="100" viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg" fill="none">
  <path d="M0 50 H30 L40 30 L50 70 L60 40 L70 60 L80 50 H150" stroke="#6366F1" stroke-width="4" />
</svg>
`;

export default function WelcomeScreen() {
  const router = useRouter();

  const handleContinue = () => {
    router.replace('/form'); // Переход на главный экран (index)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добро пожаловать!</Text>
      <View style={styles.svgContainer}>
        <SvgXml xml={heartbeatSvg} width="150" height="100" />
      </View>
      <Text style={styles.subtitle}>
        Это приложение поможет вам отслеживать ваше артериальное давление.
      </Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={handleContinue}
        accessibilityLabel="Кнопка Продолжить"
      >
        <Text style={styles.buttonText}>Продолжить</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  svgContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 26,
  },
  button: {
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
    maxWidth: 300,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});