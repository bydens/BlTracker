import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Footer from '../src/components/Footer';
import { getMeasurements } from '../src/services/storageService';
import { Measurement } from '../src/types';

import { useRouter } from 'expo-router';

export default function HistoryScreen() {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const router = useRouter();

  const loadMeasurements = async () => {
    const data = await getMeasurements();
    setMeasurements(data);
  };

  // Load measurements when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadMeasurements();
    }, [])
  );

  const renderItem = ({ item }: { item: Measurement }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.dateText}>{new Date(item.date).toLocaleString()}</Text>
      <Text style={styles.measurementText}>
        Давление: {item.systolic}/{item.diastolic} мм рт. ст.
      </Text>
      <Text style={styles.measurementText}>Пульс: {item.pulse} уд/мин</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.canGoBack() ? router.back() : router.replace('/form')}>
          <Ionicons name="arrow-back" size={24} color="#006FFD" />
        </TouchableOpacity>
        <View style={styles.navTitleContainer}>
          <Text style={styles.navTitle}>History</Text>
        </View>
        {/* Placeholder for potential right-side control, not in current Figma node */}
        <View style={styles.navBarRightPlaceholder} />
      </View>
      <View style={styles.contentContainer}>
        {measurements.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyImageContainer}>
              <View style={styles.emptyImage}>
                <Ionicons name="document-outline" size={80} color="#E5E7EB" />
              </View>
            </View>
            <View style={styles.emptyTextContainer}>
              <Text style={styles.emptyTitle}>Nothing here. For now.</Text>
              <Text style={styles.emptySubtitle}>This is where you'll find your finished projects.</Text>
            </View>
          </View>
        ) : (
          <FlatList
            data={measurements}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContentContainer}
          />
        )}
      </View>
      <Footer />
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
    // paddingTop is handled by StatusBar component or SafeAreaView if used
  },
  navTitleContainer: {
    flex: 1, // Allows the title to take up available space for centering
    alignItems: 'center', // Centers the Text component horizontally
    justifyContent: 'center', // Centers the Text component vertically if navBar has extra height
  },
  navTitle: {
    // fontFamily: 'Inter', // style_WGZGFU
    fontWeight: '700', // style_WGZGFU
    fontSize: 16, // style_WGZGFU
    color: '#1F2024', // fill_XDLNSA
    textAlign: 'center', // Actual text alignment within the Text component
  },
  backButton: {
    // Corresponds to Left Button in Figma
    // Figma: x: 24, y: 18, width: 20, height: 20
    // Applying padding to make the touch target larger
    padding: 8, // Increased touch target
    // position: 'absolute', // Removed to allow flex layout to manage positioning
    // left: 16, // No longer needed with flex layout
    zIndex: 1, // Ensure back button is tappable if title overlaps
  },
  navBarRightPlaceholder: {
    width: 24 + 8 + 8, // Width of an icon (24) + padding of backButton (8+8 for horizontal)
    // This ensures the placeholder has the same effective width as the backButton for centering the title.
  },
  // contentSwitcher: {
  //   flexDirection: 'row',
  //   backgroundColor: '#F8F9FE',
  //   marginHorizontal: 16,
  //   marginBottom: 24,
  //   borderRadius: 16,
  //   padding: 4,
  // },
  // switcherTab: {
  //   flex: 1,
  //   paddingVertical: 8,
  //   paddingHorizontal: 12,
  //   borderRadius: 12,
  //   alignItems: 'center',
  // },
  // activeTab: {
  //   backgroundColor: '#FFFFFF',
  // },
  // inactiveTab: {
  //   backgroundColor: 'transparent',
  // },
  // activeTabText: {
  //   fontSize: 14,
  //   fontWeight: '500',
  //   color: '#000000',
  // },
  // inactiveTabText: {
  //   fontSize: 14,
  //   fontWeight: '500',
  //   color: '#6B7280',
  // },
  divider: {
    width: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyImageContainer: {
    marginBottom: 32,
  },
  emptyImage: {
    width: 120,
    height: 120,
    backgroundColor: '#F8F9FE',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTextContainer: {
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  measurementText: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  listContentContainer: {
    paddingBottom: 20,
  },
});