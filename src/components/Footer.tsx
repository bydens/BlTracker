import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { memo, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FooterProps {
  activeTab?: 'form' | 'history';
}

interface TabButtonProps {
  iconName: keyof typeof Ionicons.glyphMap;
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const TabButton: React.FC<TabButtonProps> = memo(({ iconName, label, isActive, onPress }) => (
  <TouchableOpacity
    style={[styles.tab, isActive && styles.activeTab]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Ionicons
      name={iconName}
      size={24}
      color={isActive ? '#006FFD' : '#8E8E93'}
    />
    <Text style={[styles.tabText, isActive && styles.activeTabText]}>
      {label}
    </Text>
  </TouchableOpacity>
));

TabButton.displayName = 'TabButton';

const Footer: React.FC<FooterProps> = memo(({ activeTab }) => {
  const router = useRouter();

  const navigateToForm = useCallback(() => {
    router.push('/form');
  }, [router]);

  const navigateToHistory = useCallback(() => {
    router.push('/history');
  }, [router]);

  return (
    <View style={styles.footer}>
      <TabButton
        iconName="add-circle-outline"
        label="Добавить"
        isActive={activeTab === 'form'}
        onPress={navigateToForm}
      />
      <TabButton
        iconName="list-outline"
        label="История"
        isActive={activeTab === 'history'}
        onPress={navigateToHistory}
      />
    </View>
  );
});

Footer.displayName = 'Footer';

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E5EA',
    paddingBottom: 34, // Safe area for home indicator
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    // Additional styling for active tab if needed
  },
  tabText: {
    fontSize: 10,
    color: '#8E8E93',
    marginTop: 2,
  },
  activeTabText: {
    color: '#006FFD',
    fontWeight: '600',
  },
});

export default Footer;