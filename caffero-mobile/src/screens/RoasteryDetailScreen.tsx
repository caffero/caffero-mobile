import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  StatusBar,
  FlatList
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import Screen from '../components/Screen';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { RootStackParamList } from '../navigation/types';
import { spacing, borderRadius, typography, layout, fonts } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'RoasteryDetail'>;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const IMAGE_HEIGHT = SCREEN_HEIGHT * 0.4;
const STATUSBAR_HEIGHT = StatusBar.currentHeight || 0;

// Dummy data for the roastery
const DUMMY_ROASTERY = {
  id: '1',
  name: 'Artisan Coffee Roasters',
  image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24',
  location: {
    address: '123 Coffee Street',
    city: 'Seattle',
    state: 'WA',
    country: 'USA'
  },
  description: 'A passionate coffee roastery dedicated to sourcing and roasting the finest single-origin coffees. Our master roasters carefully craft each batch to bring out the unique characteristics of every bean.',
  established: '2015',
  specialties: [
    'Single Origin',
    'Light Roasts',
    'Direct Trade',
    'Seasonal Selections'
  ],
  coffeeBeans: [
    {
      id: '1',
      name: 'Ethiopian Yirgacheffe',
      image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9',
      roastLevel: 'Light Medium',
      price: '$18.99'
    },
    {
      id: '2',
      name: 'Colombian Supremo',
      image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe',
      roastLevel: 'Medium',
      price: '$17.99'
    },
    {
      id: '3',
      name: 'Sumatra Mandheling',
      image: 'https://images.unsplash.com/photo-1559525839-8b46be0f6f54',
      roastLevel: 'Dark',
      price: '$19.99'
    },
    // Add more coffee beans as needed
  ]
};

export const RoasteryDetailScreen = ({ route, navigation }: Props) => {
  const { id } = route.params;
  const { theme } = useTheme();
  const { getText } = useLanguage();

  const renderCoffeeBean = ({ item }: { item: typeof DUMMY_ROASTERY.coffeeBeans[0] }) => (
    <TouchableOpacity
      style={[
        styles.coffeeCard,
        {
          backgroundColor: theme.colors.surface.elevated,
          ...theme.shadows.small
        }
      ]}
      onPress={() => navigation.navigate('CoffeeBeanDetail', { id: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.coffeeBeanImage} />
      <View style={styles.coffeeCardContent}>
        <Text 
          style={[styles.coffeeBeanName, { color: theme.colors.text.primary }]}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text 
          style={[styles.coffeeBeanInfo, { color: theme.colors.text.secondary }]}
        >
          {item.roastLevel}
        </Text>
        <Text 
          style={[styles.coffeeBeanPrice, { color: theme.colors.primary.main }]}
        >
          {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView style={styles.scrollView} bounces={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: DUMMY_ROASTERY.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'transparent']}
            style={styles.headerGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
          <View style={styles.header}>
            <TouchableOpacity
              style={[
                styles.backButton,
                { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
              ]}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.content, { backgroundColor: theme.colors.surface.primary }]}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            {DUMMY_ROASTERY.name}
          </Text>
          
          <View style={styles.locationContainer}>
            <Icon name="location-on" size={20} color={theme.colors.text.secondary} />
            <Text style={[styles.location, { color: theme.colors.text.secondary }]}>
              {`${DUMMY_ROASTERY.location.city}, ${DUMMY_ROASTERY.location.country}`}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.description, { color: theme.colors.text.primary }]}>
              {DUMMY_ROASTERY.description}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
              Specialties
            </Text>
            <View style={styles.specialtiesContainer}>
              {DUMMY_ROASTERY.specialties.map((specialty, index) => (
                <View
                  key={index}
                  style={[
                    styles.specialtyPill,
                    { backgroundColor: theme.colors.background.accent }
                  ]}
                >
                  <Text style={[styles.specialtyText, { color: theme.colors.text.primary }]}>
                    {specialty}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
              Our Coffee Selection
            </Text>
            <FlatList
              data={DUMMY_ROASTERY.coffeeBeans}
              renderItem={renderCoffeeBean}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.coffeeBeansGrid}
              scrollEnabled={false}
            />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: IMAGE_HEIGHT,
    width: SCREEN_WIDTH,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 140,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60 + STATUSBAR_HEIGHT,
    paddingTop: STATUSBAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  content: {
    flex: 1,
    marginTop: -borderRadius.xl,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  title: {
    ...typography.title1,
    marginBottom: spacing.xs,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  location: {
    ...typography.headline,
    marginLeft: spacing.xs,
  },
  section: {
    marginBottom: spacing.xl,
  },
  description: {
    ...typography.body.medium,
    lineHeight: 24,
  },
  sectionTitle: {
    ...typography.title3,
    marginBottom: spacing.md,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  specialtyPill: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
    margin: spacing.xs,
  },
  specialtyText: {
    ...typography.caption,
  },
  coffeeBeansGrid: {
    justifyContent: 'space-between',
    marginHorizontal: -spacing.xs,
  },
  coffeeCard: {
    width: (SCREEN_WIDTH - spacing.lg * 2 - spacing.md) / 2,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  coffeeBeanImage: {
    width: '100%',
    height: 120,
  },
  coffeeCardContent: {
    padding: spacing.sm,
  },
  coffeeBeanName: {
    ...typography.body.medium,
    marginBottom: spacing.xxs,
  },
  coffeeBeanInfo: {
    ...typography.caption,
    marginBottom: spacing.xxs,
  },
  coffeeBeanPrice: {
    ...typography.headline,
  },
}); 