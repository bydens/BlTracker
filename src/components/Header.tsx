import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false, onBackPress }) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else if (router.canGoBack()) {
      router.back();
    } else {
      // Default fallback, can be adjusted as needed
      router.replace('/form'); 
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navBar}>
        {showBackButton ? (
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#006FFD" />
        </TouchableOpacity>
      ) : (
        // Maintain layout balance when back button is not shown
        <View style={styles.navBarLeftPlaceholder} /> 
      )}
      <View style={styles.navTitleContainer}>
        <Text style={styles.navTitle}>{title}</Text>
      </View>
      {/* Placeholder for potential right-side control, ensures title centering */}
        <View style={styles.navBarRightPlaceholder} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF', // Match navBar background
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 12,
    // marginTop: 12, // Removed as SafeAreaView handles top inset
  },
  navTitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: '#1F2024',
    textAlign: 'center',
  },
  backButton: {
    padding: 8,
    zIndex: 1,
  },
  navBarLeftPlaceholder: {
    width: 24 + 8 + 8, // Same width as backButton with padding
  },
  navBarRightPlaceholder: {
    width: 24 + 8 + 8, // Same width as backButton with padding
  },
});

export default Header;