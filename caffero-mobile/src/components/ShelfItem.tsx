import React from 'react';
import { 
  TouchableOpacity, 
  ImageBackground, 
  Text, 
  StyleSheet, 
  Dimensions 
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { spacing } from '../theme';

interface ShelfItemProps {
  title: string;
  backgroundImage: string;
  onPress: () => void;
}

const { width } = Dimensions.get('window');

export const ShelfItem: React.FC<ShelfItemProps> = ({
  title,
  backgroundImage,
  onPress,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={{ uri: backgroundImage }}
        style={styles.container}
        imageStyle={[
          styles.backgroundImage,
          { borderRadius: theme.borderRadius.md }
        ]}
      >
        <Text style={[
          styles.title,
          theme.typography.h2,
          {
            color: theme.colors.text.inverse,
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
          }
        ]}>
          {title}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 32,
    height: 120,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    opacity: 0.7,
  },
  title: {
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
}); 