import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  Modal,
  Animated,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import Screen from '../components/Screen';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { RootStackParamList } from '../navigation/types';
import { spacing, borderRadius, typography, layout, fonts } from '../theme';
import { useCoffeeService } from '../api/services/coffeeService';
import { useCoffeeBeanService } from '../api/services/coffeeBeanService';
import { GetCoffee } from '../api/models/Coffee';

type Props = NativeStackScreenProps<RootStackParamList, 'CoffeeBeanDetail'>;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const IMAGE_HEIGHT = SCREEN_HEIGHT * 0.6;

const STATUSBAR_HEIGHT = StatusBar.currentHeight || 0;

export const CoffeeBeanDetailScreen = ({ route, navigation }: Props) => {
  const { theme } = useTheme();
  const { getText } = useLanguage();
  const [showAddedModal, setShowAddedModal] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const [coffee, setCoffee] = useState<GetCoffee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const coffeeService = useCoffeeService();
  const coffeeBeanService = useCoffeeBeanService();

  useEffect(() => {
    const fetchCoffee = async () => {
      try {
        const data = await coffeeService.getById(route.params.id);
        setCoffee(data);
      } catch (error) {
        console.error('Error fetching coffee:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCoffee();
  }, [route.params.id]);

  const handleAddToShelf = async () => {
    if (!coffee || isAdding) return;

    setIsAdding(true);
    try {
      await coffeeBeanService.create({
        id: coffee.id,
        hasTasted: false
      });

      setShowAddedModal(true);
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(1500),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowAddedModal(false);
      });
    } catch (error) {
      console.error('Error adding coffee to shelf:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const renderProperty = (label: string, value: string) => (
    <View style={styles.propertyRow}>
      <Text style={[styles.propertyLabel, { color: theme.colors.text.secondary }]}>
        {label}
      </Text>
      <Text style={[styles.propertyValue, { color: theme.colors.text.primary }]}>
        {value}
      </Text>
    </View>
  );

  if (isLoading || !coffee) {
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
            source={{ uri: coffee.imageUrl || 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9' }}
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
              style={[styles.backButton, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {coffee.name}
            </Text>
          </View>
        </View>

        <View style={[styles.content, { backgroundColor: theme.colors.surface.primary }]}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            {coffee.name}
          </Text>
          <Text style={[styles.roastry, { color: theme.colors.text.secondary }]}>
            {coffee.roasteryName}
          </Text>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
              Origin
            </Text>
            {renderProperty('Country', coffee.countryName)}
            {renderProperty('Region', coffee.county)}
          </View>

          {coffee.coffeeDetails && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                Properties
              </Text>
              {coffee.coffeeDetails.acidityValue && renderProperty('Acidity', coffee.coffeeDetails.acidityValue.toString())}
              {coffee.coffeeDetails.bodyValue && renderProperty('Body', coffee.coffeeDetails.bodyValue.toString())}
              {renderProperty('Altitude', `${coffee.coffeeDetails.altitude} masl`)}
            </View>
          )}

          {coffee.tasteNotes && coffee.tasteNotes.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                Taste Profile
              </Text>
              <View style={styles.tasteContainer}>
                {coffee.tasteNotes.map((taste, index) => (
                  <View
                    key={index}
                    style={[styles.tastePill, { backgroundColor: theme.colors.background.accent }]}
                  >
                    <Text style={[styles.tasteText, { color: theme.colors.text.primary }]}>
                      {taste}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.fab,
          {
            backgroundColor: theme.colors.primary.main,
            ...theme.shadows.medium,
          },
          isAdding && styles.fabDisabled
        ]}
        onPress={handleAddToShelf}
        disabled={isAdding}
      >
        {isAdding ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Icon name="add" size={24} color="#FFFFFF" />
        )}
      </TouchableOpacity>

      <Modal
        visible={showAddedModal}
        transparent
        animationType="none"
      >
        <Animated.View
          style={[
            styles.modalContainer,
            {
              opacity: fadeAnim,
            }
          ]}
        >
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: theme.colors.surface.elevated,
                ...theme.shadows.medium,
              }
            ]}
          >
            <Icon name="check-circle" size={24} color={theme.colors.primary.main} />
            <Text
              style={[
                styles.modalText,
                { color: theme.colors.text.primary }
              ]}
            >
              Added to your shelf!
            </Text>
          </View>
        </Animated.View>
      </Modal>
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
  headerTitle: {
    ...typography.headline,
    color: '#FFFFFF',
    flex: 1,
    marginLeft: spacing.md,
    marginRight: spacing.xl,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
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
  roastry: {
    ...typography.headline,
    marginBottom: spacing.xl,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.title3,
    marginBottom: spacing.md,
  },
  propertyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  propertyLabel: {
    ...typography.body.medium,
    textTransform: 'capitalize',
  },
  propertyValue: {
    ...typography.body.medium,
    fontFamily: fonts.primary.semiBold,
  },
  tasteContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  tastePill: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
    margin: spacing.xs,
  },
  tasteText: {
    ...typography.caption,
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.xl,
    width: 56,
    height: 56,
    borderRadius: borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },
  modalText: {
    ...typography.button.medium,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabDisabled: {
    opacity: 0.6
  }
}); 