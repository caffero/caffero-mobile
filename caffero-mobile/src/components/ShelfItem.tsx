import React from 'react';
import { 
  TouchableOpacity, 
  ImageBackground, 
  Text, 
  StyleSheet, 
  Dimensions 
} from 'react-native';

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
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={{ uri: backgroundImage }}
        style={styles.container}
        imageStyle={styles.backgroundImage}
      >
        <Text style={styles.title}>{title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 32,
    height: 120,
    marginHorizontal: 16,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    borderRadius: 8,
    opacity: 0.7,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
}); 