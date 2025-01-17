import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ImageStyle,
  TextStyle,
  ViewStyle,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { spacing, borderRadius, layout } from '../theme';
import { useTheme } from '../contexts/ThemeContext';

interface CarouselItem {
  id: string;
  title: string;
  imageUrl: string;
  subtitle?: string;
}

interface CarouselProps {
  title: string;
  items: CarouselItem[];
  onItemPress: (id: string) => void;
}

const { width: WINDOW_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = Math.min(WINDOW_WIDTH * 0.8, layout.contentMaxWidth);
const ITEM_HEIGHT = ITEM_WIDTH * 0.6;
const SPACING = spacing.md;

export const Carousel: React.FC<CarouselProps> = ({ title, items, onItemPress }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const { theme } = useTheme();

  const renderItem = ({ item }: { item: CarouselItem }) => (
    <Animated.View style={styles.animatedContainer}>
      <TouchableOpacity 
        style={styles.container}
        onPress={() => onItemPress(item.id)}
        activeOpacity={0.9}
      >
        <Image 
          source={{ uri: item.imageUrl }} 
          style={styles.image}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', theme.colors.deepNavyAlpha[80]]}
          style={styles.overlay}
        >
          <View style={styles.contentContainer}>
            <Text 
              style={[
                styles.title,
                {
                  color: theme.colors.text.inverse,
                  textShadowColor: 'rgba(0, 0, 0, 0.75)',
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 3,
                }
              ]}
              numberOfLines={2}
            >
              {item.title}
            </Text>
            {item.subtitle && (
              <Text 
                style={[
                  styles.subtitle,
                  {
                    color: theme.colors.text.inverse,
                    textShadowColor: 'rgba(0, 0, 0, 0.75)',
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 3,
                  }
                ]}
                numberOfLines={1}
              >
                {item.subtitle}
              </Text>
            )}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.text.primary }]}>{title}</Text>
      <View>
        <Animated.ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          style={styles.scrollContent}
        >
          {items.map((item, index) => renderItem({ item }))}
        </Animated.ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    height: 200,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  } as ViewStyle,
  scrollContent: {
    flex: 1,
  } as ViewStyle,
  animatedContainer: {
    width: WINDOW_WIDTH,
    height: 200,
  } as ViewStyle,
  image: {
    width: '100%',
    height: '100%',
    borderRadius: borderRadius.lg,
  } as ImageStyle,
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
  } as ViewStyle,
  contentContainer: {
    padding: spacing.md,
  } as ViewStyle,
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  } as TextStyle,
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
  } as TextStyle,
}); 