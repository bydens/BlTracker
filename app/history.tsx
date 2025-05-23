import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Footer from '../src/components/Footer';
import { getMeasurements } from '../src/services/storageService';
import { Measurement } from '../src/types';

export default function HistoryScreen() {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);

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
      
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <View style={styles.navBarContent}>
          <Text style={styles.navTitle}>Projects</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content Switcher */}
      <View style={styles.contentSwitcher}>
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
      </View>

      {/* Content */}
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
    backgroundColor: '#FFFFFF',
    paddingTop: 44, // Status bar height
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  navBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
  },
  searchButton: {
    padding: 4,
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