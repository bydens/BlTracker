import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  description: string;
  buttons: {
    text: string;
    style?: 'primary' | 'secondary';
    onPress: () => void;
  }[];
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  title,
  description,
  buttons,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          <View style={styles.actionsContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.button, button.style === 'secondary' ? styles.secondaryButton : styles.primaryButton]}
                onPress={button.onPress}
              >
                <Text style={[styles.buttonText, button.style === 'secondary' ? styles.secondaryButtonText : styles.primaryButtonText]}>
                  {button.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    gap: 20,
  },
  contentContainer: {
    width: '100%',
    padding: 8,
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontFamily: 'Inter',
    fontWeight: '800',
    fontSize: 16,
    lineHeight: 16 * 1.2102272510528564,
    letterSpacing: 16 * 0.005,
    textAlign: 'center',
    color: '#1F2024',
  },
  description: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 12 * 1.3333333333333333,
    letterSpacing: 12 * 0.01,
    textAlign: 'center',
    color: '#71727A',
  },
  actionsContainer: {
    width: '100%',
    flexDirection: 'row',
    // justifyContent: 'stretch',
    alignItems: 'stretch',
    gap: 8,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    height: 40,
  },
  primaryButton: {
    backgroundColor: '#006FFD',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#006FFD',
  },
  buttonText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 12 * 1.2102272510528564,
    textAlign: 'left',
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#006FFD',
  },
});

export default CustomModal;