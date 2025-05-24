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
          <Text style={styles.primaryButtonText}>Start a project</Text>
        </TouchableOpacity>
      ) : null}
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => router.push('/form')}
          accessibilityLabel="Explore"
        >
          <Ionicons name="add-circle-outline" size={24} color={isFormActive ? '#007AFF' : '#8E8E93'} />
          <Text style={[styles.tabText, isFormActive && styles.activeTabText]}>Add</Text>
        </TouchableOpacity>
        
        {/* <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => router.push('/form')}
          accessibilityLabel="Projects"
        >
          <Ionicons name="folder-outline" size={24} color={isFormActive ? '#007AFF' : '#000000'} />
          <Text style={[styles.tabText, { color: '#000000', fontWeight: '600' }]}>Projects</Text>
        </TouchableOpacity> */}
        
        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => router.push('/history')}
          accessibilityLabel="Inbox"
        >
          <Ionicons name="archive-outline" size={24} color={isHistoryActive ? '#007AFF' : '#8E8E93'} />
          <Text style={[styles.tabText, isHistoryActive && styles.activeTabText]}>history</Text>
        </TouchableOpacity>
        
        {/* <TouchableOpacity 
          style={styles.tabItem} 
          accessibilityLabel="Profile"
        >
          <Ionicons name="person-outline" size={24} color="#8E8E93" />
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#FFFFFF',
    paddingTop: 12,
    paddingBottom: 34, // Safe area for devices with home indicator
    paddingHorizontal: 16,
    width: '100%',
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 60,
  },
  tabText: {
    fontSize: 10,
    color: '#8E8E93',
    marginTop: 4,
    textAlign: 'center',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});