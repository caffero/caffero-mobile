import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  StatusBar,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import Screen from '../components/Screen';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { RootStackParamList } from '../navigation/types';
import { spacing, borderRadius, typography, layout, fonts } from '../theme';
import { useRoasteryService } from '../api/services/roasteryService';
import { useCoffeeService } from '../api/services/coffeeService';
import { GetRoastery } from '../api/models/Roastery';
import { GetCoffeeList } from '../api/models/Coffee';

type Props = NativeStackScreenProps<RootStackParamList, 'RoasteryDetail'>;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const IMAGE_HEIGHT = SCREEN_HEIGHT * 0.4;
const STATUSBAR_HEIGHT = StatusBar.currentHeight || 0;

type CoffeeBean = GetCoffeeList;

export const RoasteryDetailScreen = ({ route, navigation }: Props) => {
  const { id } = route.params;
  const { theme } = useTheme();
  const { getText } = useLanguage();
  const roasteryService = useRoasteryService();
  const coffeeService = useCoffeeService();
  
  const [roastery, setRoastery] = useState<GetRoastery | null>(null);
  const [coffees, setCoffees] = useState<GetCoffeeList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch roastery details
        const roasteryData = await roasteryService.getById(id);
        setRoastery(roasteryData);
        
        // Fetch coffee beans for this roastery
        const params = new URLSearchParams({
          roasteryId: id,
          pageNumber: '1',
          pageSize: '20'
        });
        const coffeesData = await coffeeService.getAll(params);
        setCoffees(coffeesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  const renderCoffeeBean = ({ item }: { item: CoffeeBean }) => (
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
      <Image 
        source={{ uri: item.imageUrl || 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9' }} 
        style={styles.coffeeBeanImage} 
      />
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
          {item.countryName}, {item.county}
        </Text>
        <Text 
          style={[styles.coffeeBeanPrice, { color: theme.colors.primary.main }]}
        >
          {item.operationName}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (isLoading || !roastery) {
    return (
      <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary.main} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView style={styles.scrollView} bounces={false}>
        <View style={styles.imageContainer}>
          <Image
            // TODO: Replace with actual roastery image when available
            source={{ uri: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24' }}
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
            {roastery.name}
          </Text>
          
          <View style={styles.locationContainer}>
            <Icon name="location-on" size={20} color={theme.colors.text.secondary} />
            <Text style={[styles.location, { color: theme.colors.text.secondary }]}>
              {roastery.contactemail}
            </Text>
          </View>

          {/* <View style={styles.section}>
            <Text style={[styles.description, { color: theme.colors.text.primary }]}>
              {roastery.description}
            </Text>
          </View> */}

          {/* {roastery.specialties && roastery.specialties.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                Specialties
              </Text>
              <View style={styles.specialtiesContainer}>
                {roastery.specialties.map((specialty, index) => (
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
          )} */}

          {coffees.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                Our Coffee Selection
              </Text>
              <FlatList
                data={coffees}
                renderItem={renderCoffeeBean}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.coffeeBeansGrid}
                scrollEnabled={false}
              />
            </View>
          )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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