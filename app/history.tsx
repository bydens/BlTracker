import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native'; // Removed TouchableOpacity as it's in Header
import Footer from '../src/components/Footer';
import Header from '../src/components/Header'; // Import the new Header component
import { getMeasurements } from '../src/services/storageService';
import { Measurement } from '../src/types';

// Removed useRouter import as it's handled within Header or not directly needed here anymore

export default function HistoryScreen() {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  // const router = useRouter(); // router instance is now in Header or passed via props if needed

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
      <Header title="History" showBackButton={true} />
      {/* The old navBar View is replaced by the Header component */}
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
            style={styles.listStyle} // Added style for FlatList itself
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
  listStyle: {
    flex: 1, // Ensures FlatList takes available space
  },
  listContentContainer: {
    paddingBottom: 20,
  },
});