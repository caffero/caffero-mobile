import React from 'react';
import { 
  View, 
  ScrollView, 
  Image, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';

interface CarouselItem {
  id: string;
  title: string;
  imageUrl: string;
}

interface CarouselProps {
  title: string;
  items: CarouselItem[];
  onItemPress: (id: string) => void;
}

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.6;

export const Carousel: React.FC<CarouselProps> = ({ title, items, onItemPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemContainer}
            onPress={() => onItemPress(item.id)}
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.itemTitle} numberOfLines={2}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: ITEM_WIDTH,
    borderRadius: 8,
  },
  itemTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
  },
}); 