import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native'; 
import CustomModal from '../src/components/CustomModal';
import Footer from '../src/components/Footer';
import Header from '../src/components/Header';
import MeasurementItem from '../src/components/MeasurementItem';
import { deleteMeasurement, getMeasurements } from '../src/services/storageService';
import { Measurement } from '../src/types';

export default function HistoryScreen() {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [modalButtons, setModalButtons] = useState<{ text: string; style?: 'primary' | 'secondary'; onPress: () => void; }[]>([]);

  const showModal = (title: string, description: string, buttons: { text: string; style?: 'primary' | 'secondary'; onPress: () => void; }[]) => {
    setModalTitle(title);
    setModalDescription(description);
    setModalButtons(buttons);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setModalTitle('');
    setModalDescription('');
    setModalButtons([]);
  };

  const loadMeasurements = async () => {
    const data = await getMeasurements();
    setMeasurements(data);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadMeasurements();
    }, [])
  );

  const handleDeleteMeasurement = async (id: string) => {
    await deleteMeasurement(id);
    setMeasurements(prevMeasurements => 
      prevMeasurements.filter(measurement => measurement.id !== id)
    );
  };

  const confirmDelete = (id: string) => {
    showModal(
      'Confirm Deletion',
      'Are you sure you want to delete this measurement?',
      [
        { text: 'Cancel', style: 'secondary', onPress: hideModal },
        { text: 'Delete', style: 'primary', onPress: () => {
          handleDeleteMeasurement(id);
          hideModal();
        } },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header title="History" showBackButton={true} />
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
            style={styles.listStyle}
            data={measurements}
            renderItem={({ item }) => <MeasurementItem item={item} onDelete={confirmDelete} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContentContainer}
          />
        )}
      </View>
      <Footer />

      <CustomModal
        visible={modalVisible}
        onClose={hideModal}
        title={modalTitle}
        description={modalDescription}
        buttons={modalButtons}
      />
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
  listStyle: {
    flex: 1,
  },
  listContentContainer: {
    paddingBottom: 20,
  },
});