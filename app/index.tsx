import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

// SVG для линии пульса
const heartbeatSvg = `
<svg width="200" height="60" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 30 H40 L50 10 L60 50 L70 20 L80 40 L90 30 H200" stroke="#007AFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.heartbeatContainer}>
          <SvgXml xml={heartbeatSvg} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Контроль давления</Text>
          <Text style={styles.subtitle}>
            Следите за своим здоровьем, записывая показатели давления и пульса
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/form')}
        >
          <Text style={styles.buttonText}>Новое измерение</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  heartbeatContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
  },
  textContainer: {
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 17,
    color: '#666666',
    lineHeight: 24,
    textAlign: 'center',
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