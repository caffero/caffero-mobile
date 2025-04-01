import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { spacing, borderRadius } from '../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface AgreementBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const { height } = Dimensions.get('window');

export const AgreementBottomSheet: React.FC<AgreementBottomSheetProps> = ({
  isVisible,
  onClose,
  title,
  content,
}) => {
  const { theme } = useTheme();

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.modalContent,
            {
              backgroundColor: theme.colors.surface.primary,
            },
          ]}
        >
          <View style={styles.header}>
            <Text
              style={[
                styles.title,
                theme.typography.title2,
                { color: theme.colors.text.primary },
              ]}
            >
              {title}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color={theme.colors.text.primary} />
            </TouchableOpacity>
          </View>
          <ScrollView
            style={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text
              style={[
                styles.content,
                theme.typography.body.medium,
                { color: theme.colors.text.secondary },
              ]}
            >
              {content}
            </Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
    maxHeight: height * 0.8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  title: {
    flex: 1,
  },
  closeButton: {
    padding: spacing.xs,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  content: {
    lineHeight: 24,
  },
}); 