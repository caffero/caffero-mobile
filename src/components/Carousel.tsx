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
  fullWidth?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
}

const { width: WINDOW_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = Math.min(WINDOW_WIDTH * 0.6, layout.contentMaxWidth);
const ITEM_HEIGHT = ITEM_WIDTH * 1.5;
const SPACING = spacing.md;

const CarouselContent: React.FC<CarouselProps> = ({ 
  title, 
  items, 
  onItemPress, 
  fullWidth = false,
  autoplay = false,
  autoplayInterval = 4000 
}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const scrollViewRef = React.useRef<ScrollView>(null);
  const { theme } = useTheme();
  
  // Use different dimensions for full-width carousel
  const itemWidth = fullWidth ? WINDOW_WIDTH : ITEM_WIDTH;
  const itemHeight = fullWidth ? 250 : ITEM_HEIGHT;
  const itemSpacing = fullWidth ? 0 : SPACING;

  // Autoplay functionality
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoplay && items.length > 1) {
      interval = setInterval(() => {
        if (scrollViewRef.current) {
          const nextIndex = (currentIndex + 1) % items.length;
          scrollViewRef.current.scrollTo({
            x: nextIndex * itemWidth,
            animated: true
          });
          setCurrentIndex(nextIndex);
        }
      }, autoplayInterval);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [autoplay, autoplayInterval, currentIndex, items.length, itemWidth]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { 
      useNativeDriver: false,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (fullWidth) {
          const scrollPosition = event.nativeEvent.contentOffset.x;
          const index = Math.round(scrollPosition / itemWidth);
          setCurrentIndex(index);
        }
      }
    }
  );

  const renderItem = ({ item, index }: { item: CarouselItem; index: number }) => {
    const inputRange = [
      (index - 1) * (itemWidth + itemSpacing),
      index * (itemWidth + itemSpacing),
      (index + 1) * (itemWidth + itemSpacing),
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: fullWidth ? [1, 1, 1] : [0.95, 1, 0.95],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: fullWidth ? [1, 1, 1] : [0.6, 1, 0.6],
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
            width: itemWidth,
            height: itemHeight,
            marginRight: itemSpacing,
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
    <View style={[
      styles.container, 
      fullWidth && { marginVertical: 0 }
    ]}>
      {title ? (
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>{title}</Text>
      ) : null}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          fullWidth && { paddingHorizontal: 0 }
        ]}
        decelerationRate="fast"
        snapToInterval={itemWidth + itemSpacing}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        pagingEnabled={fullWidth}
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