import React from 'react';
import { 
  TouchableOpacity, 
  ImageBackground, 
  Text, 
  StyleSheet, 
  Dimensions 
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';

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
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={{ uri: backgroundImage }}
        style={styles.container}
        imageStyle={[styles.backgroundImage, { borderRadius: theme.borderRadius.medium }]}
      >
        <Text style={[
          styles.title, 
          theme.typography.h2,
          { color: theme.colors.white,
            textShadowColor: theme.colors.shadowDark }
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
    marginHorizontal: theme.spacing.medium,
    marginVertical: theme.spacing.small,
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