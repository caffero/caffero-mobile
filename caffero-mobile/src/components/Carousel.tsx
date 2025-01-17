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
import { spacing, borderRadius, layout } from '../theme';
import { useTheme } from '../contexts/ThemeContext';

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
const ITEM_WIDTH = Math.min(width * 0.8, layout.contentMaxWidth);
const ITEM_HEIGHT = ITEM_WIDTH * 0.6;
const SPACING = spacing.md;

export const Carousel: React.FC<CarouselProps> = ({ title, items, onItemPress }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.text.primary }]}>{title}</Text>
      <View>
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          decelerationRate="fast"
          snapToInterval={ITEM_WIDTH + SPACING}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          {items.map((item, index) => {
            const inputRange = [
              (index - 1) * (ITEM_WIDTH + SPACING),
              index * (ITEM_WIDTH + SPACING),
              (index + 1) * (ITEM_WIDTH + SPACING),
            ];

            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.95, 1, 0.95],
              extrapolate: 'clamp',
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.6, 1, 0.6],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={item.id}
                style={[
                  styles.animatedContainer,
                  {
                    transform: [{ scale }],
                    opacity,
                  },
                ]}
              >
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => onItemPress(item.id)}
                  style={[styles.touchable, { ...theme.shadows.medium }]}
                >
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <View style={[styles.overlay, { backgroundColor: theme.colors.deepNavyAlpha[60] }]}>
                    <View style={[styles.contentContainer, { backgroundColor: theme.colors.deepNavyAlpha[60] }]}>
                      <Text style={[styles.itemTitle, { color: theme.colors.text.inverse }]}>
                        {item.title}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </Animated.ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.lg,
  } as ViewStyle,
  title: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600',
    marginHorizontal: spacing.gutter,
    marginBottom: spacing.md,
  } as TextStyle,
  scrollContent: {
    paddingHorizontal: spacing.gutter,
  } as ViewStyle,
  animatedContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginRight: SPACING,
  } as ViewStyle,
  touchable: {
    flex: 1,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  } as ViewStyle,
  image: {
    width: '100%',
    height: '100%',
  } as ImageStyle,
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  } as ViewStyle,
  contentContainer: {
    padding: spacing.md,
    paddingBottom: spacing.lg,
  } as ViewStyle,
  itemTitle: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  } as TextStyle,
}); 