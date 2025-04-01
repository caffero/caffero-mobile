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
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { spacing, borderRadius, layout } from '../theme';
import { useTheme } from '../contexts/ThemeContext';
import ErrorBoundary from './ErrorBoundary';

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
const ITEM_WIDTH = Math.min(WINDOW_WIDTH * 0.6, layout.contentMaxWidth);
const ITEM_HEIGHT = ITEM_WIDTH * 1.5;
const SPACING = spacing.md;

const CarouselContent: React.FC<CarouselProps> = ({ title, items, onItemPress }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const { theme } = useTheme();

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { 
      useNativeDriver: false, // TODO: change to true in production
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        // You can add additional scroll handling here if needed
      }
    }
  );

  const renderItem = ({ item, index }: { item: CarouselItem; index: number }) => {
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
          style={[styles.touchable, { ...theme.shadows.medium }]}
          onPress={() => onItemPress(item.id)}
          activeOpacity={0.9}
        >
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.overlay}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            locations={[0.3, 1]}
          >
            <View style={styles.contentContainer}>
              <Text 
                style={[
                  styles.itemTitle,
                  {
                    color: '#FFFFFF',
                    textShadowColor: 'rgba(0, 0, 0, 0.3)',
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 2,
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
                      color: 'rgba(255, 255, 255, 0.9)',
                      textShadowColor: 'rgba(0, 0, 0, 0.3)',
                      textShadowOffset: { width: 0, height: 1 },
                      textShadowRadius: 2,
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
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.text.primary }]}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToInterval={ITEM_WIDTH + SPACING}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {items.map((item, index) => renderItem({ item, index }))}
      </ScrollView>
    </View>
  );
};

export const Carousel: React.FC<CarouselProps> = (props) => {
  return (
    <ErrorBoundary fallback={
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load carousel.</Text>
      </View>
    }>
      <CarouselContent {...props} />
    </ErrorBoundary>
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
    paddingTop: spacing.xl,
  } as ViewStyle,
  itemTitle: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  } as TextStyle,
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    marginTop: spacing.xs,
    color: 'rgba(255, 255, 255, 0.9)',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  } as TextStyle,
  errorContainer: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: borderRadius.lg,
    marginHorizontal: spacing.gutter,
  } as ViewStyle,
  errorText: {
    fontSize: 16,
    color: '#666',
  } as TextStyle,
}); 