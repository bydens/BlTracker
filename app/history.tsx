import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Footer from '../src/components/Footer';
import Header from '../src/components/Header';
import { deleteMeasurement, getMeasurements } from '../src/services/storageService';
import { Measurement } from '../src/types';

// Removed useRouter import as it's handled within Header or not directly needed here anymore

export default function HistoryScreen() {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [selectedMeasurementId, setSelectedMeasurementId] = useState<string | null>(null);
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

  const handleDeleteMeasurement = async (id: string) => {
    await deleteMeasurement(id);
    // Update local state instead of reloading all measurements
    setMeasurements(prevMeasurements => 
      prevMeasurements.filter(measurement => measurement.id !== id)
    );
    setSelectedMeasurementId(null);
  };

  const confirmDelete = (id: string) => {
    // Check if running on web
    if (typeof window !== 'undefined' && window.document) {
      // Use browser's confirm for web
      if (window.confirm("Are you sure you want to delete this measurement?")) {
        handleDeleteMeasurement(id);
      }
    } else {
      // Use React Native Alert for native platforms
      Alert.alert(
        "Confirm Delete",
        "Are you sure you want to delete this measurement?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { 
            text: "Delete", 
            onPress: () => handleDeleteMeasurement(id),
            style: "destructive" 
          }
        ],
        { cancelable: true }
      );
    }
  };

  const renderItem = ({ item }: { item: Measurement }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemDetailsContainer}>
        <Text style={styles.dateText}>{new Date(item.date).toLocaleString()}</Text>
        <Text style={styles.measurementText}>
          Давление: {item.systolic}/{item.diastolic} мм рт. ст.
        </Text>
        <Text style={styles.measurementText}>Пульс: {item.pulse} уд/мин</Text>
      </View>
      <TouchableOpacity onPress={() => confirmDelete(item.id)} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={24} color="#FF3B30" />
      </TouchableOpacity>
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
    flexDirection: 'row', // Added for delete button alignment
    justifyContent: 'space-between', // Added for delete button alignment
    alignItems: 'center', // Added for delete button alignment
  },
  itemDetailsContainer: {
    flex: 1, // Allows text content to take available space
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
  deleteButton: {
    padding: 8, // Add some padding for easier touch
  },
});