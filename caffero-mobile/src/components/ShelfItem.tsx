import React from 'react';
import { 
  TouchableOpacity, 
  ImageBackground, 
  Text, 
  StyleSheet, 
  Dimensions,
  View,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { spacing } from '../theme';
import ErrorBoundary from './ErrorBoundary';

interface ShelfItemProps {
  title: string;
  imageUrl: string;
  onPress: () => void;
}

const { width } = Dimensions.get('window');

const ShelfItemContent: React.FC<ShelfItemProps> = ({
  title,
  imageUrl,
  onPress,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[
        styles.container,
        {
          borderRadius: theme.borderRadius.md,
          ...theme.shadows.medium,
        }
      ]}
    >
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.imageBackground}
        imageStyle={[
          styles.backgroundImage,
          { borderRadius: theme.borderRadius.md }
        ]}
      >
        <View style={styles.overlay}>
          <Text 
            style={[
              styles.title,
              theme.typography.h2,
              {
                color: '#FFFFFF',
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 10,
              }
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export const ShelfItem: React.FC<ShelfItemProps> = (props) => {
  return (
    <ErrorBoundary fallback={
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>Failed to load item.</Text>
      </View>
    }>
      <ShelfItemContent {...props} />
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 32,
    height: 160,
    marginVertical: spacing.sm,
    overflow: 'hidden',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    opacity: 0.8,
  },
  overlay: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
  },
}); 