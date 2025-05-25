import React, { memo, useCallback } from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ModalButton } from '../types';

interface CustomModalProps {
  visible: boolean;
  title: string;
  description: string;
  buttons: ModalButton[];
  onClose: () => void;
  dismissOnBackdrop?: boolean;
}

interface ModalButtonComponentProps {
  button: ModalButton;
  index: number;
  totalButtons: number;
}

const ModalButtonComponent: React.FC<ModalButtonComponentProps> = memo(({ 
  button, 
  index, 
  totalButtons 
}) => {
  const isPrimary = button.style === 'primary';
  const isLastButton = index === totalButtons - 1;
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isPrimary ? styles.primaryButton : styles.secondaryButton,
        totalButtons === 1 && styles.singleButton,
      ]}
      onPress={button.onPress}
      activeOpacity={0.8}
    >
      <Text style={[
        styles.buttonText,
        isPrimary ? styles.primaryButtonText : styles.secondaryButtonText
      ]}>
        {button.text}
      </Text>
    </TouchableOpacity>
  );
});

ModalButtonComponent.displayName = 'ModalButtonComponent';

const CustomModal: React.FC<CustomModalProps> = memo(({
  visible,
  title,
  description,
  buttons,
  onClose,
  dismissOnBackdrop = true,
}) => {
  const handleBackdropPress = useCallback(() => {
    if (dismissOnBackdrop) {
      onClose();
    }
  }, [dismissOnBackdrop, onClose]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable style={styles.overlay} onPress={handleBackdropPress}>
        <Pressable style={styles.modal} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          
          <View style={[
            styles.buttonContainer,
            buttons.length === 1 && styles.singleButtonContainer
          ]}>
            {buttons.map((button, index) => (
              <ModalButtonComponent
                key={index}
                button={button}
                index={index}
                totalButtons={buttons.length}
              />
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
});

CustomModal.displayName = 'CustomModal';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    width: width - 40,
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2024',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  singleButtonContainer: {
    flexDirection: 'column',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center',
  },
  singleButton: {
    flex: 0,
  },
  primaryButton: {
    backgroundColor: '#FF3B30',
  },
  secondaryButton: {
    backgroundColor: '#F3F4F6',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#374151',
  },
});

export default CustomModal;