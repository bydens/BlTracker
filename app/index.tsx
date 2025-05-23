import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.content}>
        <View style={styles.illustrationContainer}>
          <View style={styles.illustration}>
            <Ionicons name="heart-outline" size={80} color="#007AFF" />
          </View>
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to BlTracker</Text>
          <Text style={styles.subtitle}>
            Track your blood pressure measurements and monitor your health progress.
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handleContinue}
          accessibilityLabel="Get Started"
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  illustrationContainer: {
    marginBottom: 48,
  },
  illustration: {
    width: 120,
    height: 120,
    backgroundColor: '#F8F9FE',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    minWidth: 200,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});