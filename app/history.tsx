import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomModal from '../src/components/CustomModal';
import Footer from '../src/components/Footer';
import Header from '../src/components/Header';
import { deleteMeasurement, getMeasurements } from '../src/services/storageService';
import { Measurement } from '../src/types';

const HistoryScreen = () => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMeasurement, setSelectedMeasurement] = useState<Measurement | null>(null);

  const loadMeasurements = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    
    try {
      const data = await getMeasurements();
      setMeasurements(data);
    } catch (error) {
      console.error('Error loading measurements:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const handleDeleteMeasurement = useCallback((measurement: Measurement) => {
    setSelectedMeasurement(measurement);
    setModalVisible(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!selectedMeasurement) return;
    
    try {
      await deleteMeasurement(selectedMeasurement.id);
      setMeasurements(prev => prev.filter(m => m.id !== selectedMeasurement.id));
    } catch (error) {
      console.error('Error deleting measurement:', error);
    } finally {
      setModalVisible(false);
      setSelectedMeasurement(null);
    }
  }, [selectedMeasurement]);

  const cancelDelete = useCallback(() => {
    setModalVisible(false);
    setSelectedMeasurement(null);
  }, []);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, []);

  const getBPCategory = useCallback((systolic: number, diastolic: number) => {
    if (systolic < 120 && diastolic < 80) return { category: 'Normal', color: '#34C759' };
    if (systolic < 130 && diastolic < 80) return { category: 'Elevated', color: '#FF9500' };
    if (systolic < 140 || diastolic < 90) return { category: 'High Stage 1', color: '#FF9500' };
    if (systolic < 180 || diastolic < 120) return { category: 'High Stage 2', color: '#FF3B30' };
    return { category: 'Crisis', color: '#FF3B30' };
  }, []);

  const renderMeasurement = useCallback(({ item }: { item: Measurement }) => {
    const bpCategory = getBPCategory(item.systolic, item.diastolic);
    
    return (
      <View style={styles.measurementCard}>
        <View style={styles.measurementHeader}>
          <Text style={styles.dateText}>{formatDate(item.date)}</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteMeasurement(item)}
            accessibilityLabel="Delete measurement"
          >
            <Ionicons name="trash-outline" size={20} color="#FF3B30" />
          </TouchableOpacity>
        </View>
        <View style={styles.measurementData}>
          <View style={styles.pressureContainer}>
            <Text style={styles.pressureText}>{item.systolic}/{item.diastolic}</Text>
            <Text style={styles.unitText}>mmHg</Text>
          </View>
          <View style={styles.pulseContainer}>
            <Text style={styles.pulseText}>{item.pulse}</Text>
            <Text style={styles.unitText}>bpm</Text>
          </View>
        </View>
        <View style={[styles.categoryBadge, { backgroundColor: bpCategory.color }]}>
          <Text style={styles.categoryText}>{bpCategory.category}</Text>
        </View>
      </View>
    );
  }, [formatDate, getBPCategory, handleDeleteMeasurement]);

  useEffect(() => {
    loadMeasurements();
  }, [loadMeasurements]);

  const keyExtractor = useCallback((item: Measurement) => item.id, []);

  const emptyComponent = useMemo(() => (
    <View style={styles.emptyContainer}>
      <Ionicons name="clipboard-outline" size={64} color="#C7C7CC" />
      <Text style={styles.emptyTitle}>No measurements yet</Text>
      <Text style={styles.emptySubtitle}>Start tracking your blood pressure by adding your first measurement</Text>
    </View>
  ), []);

  if (loading && !refreshing) {
    return (
      <View style={styles.container}>
        <Header title="History" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading measurements...</Text>
        </View>
        <Footer />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="History" />
      <FlatList
        data={measurements}
        renderItem={renderMeasurement}
        keyExtractor={keyExtractor}
        style={styles.list}
        contentContainerStyle={measurements.length === 0 ? styles.emptyListContent : styles.listContent}
        ListEmptyComponent={emptyComponent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadMeasurements(true)}
            tintColor="#007AFF"
          />
        }
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
      <Footer />
      
      <CustomModal
        visible={modalVisible}
        title="Delete Measurement"
        description="Are you sure you want to delete this measurement? This action cannot be undone."
        buttons={[
          {
            text: 'Cancel',
            style: 'secondary',
            onPress: cancelDelete
          },
          {
            text: 'Delete',
            style: 'primary',
            onPress: confirmDelete
          }
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2024',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#71727A',
    textAlign: 'center',
    lineHeight: 22,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#71727A',
  },
  measurementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  measurementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateText: {
    fontSize: 14,
    color: '#71727A',
    fontWeight: '500',
  },
  deleteButton: {
    padding: 4,
  },
  measurementData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  pressureContainer: {
    alignItems: 'center',
  },
  pressureText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2024',
  },
  pulseContainer: {
    alignItems: 'center',
  },
  pulseText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2024',
  },
  unitText: {
    fontSize: 12,
    color: '#71727A',
    marginTop: 2,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default HistoryScreen;