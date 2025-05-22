import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FooterProps {
  showSaveButton?: boolean;
  onSave?: () => void;
}

export default function Footer({ showSaveButton = false, onSave }: FooterProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  const isFormActive = pathname === '/form';
  const isHistoryActive = pathname === '/history';

  return (
    <View style={styles.footer}>
      {showSaveButton ? (
        <TouchableOpacity 
          style={[styles.button, styles.primaryButton]} 
          onPress={onSave}
          accessibilityLabel="Сохранить измерение"
        >
          <Text style={styles.primaryButtonText}>Сохранить измерение</Text>
        </TouchableOpacity>
      ) : null}
      
      <View style={styles.navButtons}>
        <TouchableOpacity 
          style={[styles.navButton, isFormActive && styles.activeNavButton]} 
          onPress={() => router.push('/form')}
          accessibilityLabel="Добавить измерение"
        >
          <Ionicons name="add-circle-outline" size={24} color={isFormActive ? '#6366F1' : '#6B7280'} />
          <Text style={[styles.navButtonText, isFormActive && styles.activeNavButtonText]}>Добавить</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navButton, isHistoryActive && styles.activeNavButton]} 
          onPress={() => router.push('/history')}
          accessibilityLabel="История измерений"
        >
          <Ionicons name="list-outline" size={24} color={isHistoryActive ? '#6366F1' : '#6B7280'} />
          <Text style={[styles.navButtonText, isHistoryActive && styles.activeNavButtonText]}>История</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#FFFFFF',
    paddingTop: 12,
    paddingBottom: 24, // Увеличенный отступ снизу для устройств с закругленными краями
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    width: '100%',
  },
  button: {
    paddingVertical: 14,
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
  primaryButton: {
    backgroundColor: '#6366F1',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  activeNavButton: {
    // Можно добавить стили для активной кнопки, если нужно
  },
  navButtonText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  activeNavButtonText: {
    color: '#6366F1',
    fontWeight: '500',
  },
});