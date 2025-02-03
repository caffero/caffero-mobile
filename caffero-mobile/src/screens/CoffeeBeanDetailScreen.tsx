import React, { useState } from 'react';
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
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Screen from '../components/Screen';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { RootStackParamList } from '../navigation/types';
import { spacing, borderRadius, typography, layout, fonts } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'CoffeeBeanDetail'>;

// Dummy data for the coffee bean
const DUMMY_COFFEE_BEAN = {
  id: '1',
  title: 'Ethiopian Yirgacheffe',
  roastry: 'Artisan Coffee Roasters',
  image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9',
  origin: {
    country: 'Ethiopia',
    region: 'Yirgacheffe',
  },
  properties: {
    roastLevel: 'Medium Light',
    acidity: 'High',
    body: 'Medium',
    altitude: '1,750 - 2,200 masl',
    process: 'Washed',
    variety: 'Heirloom',
  },
  tasteProfile: [
    'Floral',
    'Citrus',
    'Bergamot',
    'Jasmine',
    'Honey',
  ],
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const IMAGE_HEIGHT = SCREEN_HEIGHT * 0.6;

export const CoffeeBeanDetailScreen = ({ route, navigation }: Props) => {
  const { theme } = useTheme();
  const { getText } = useLanguage();
  const [showAddedModal, setShowAddedModal] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const handleAddToShelf = () => {
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

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView style={styles.scrollView} bounces={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: DUMMY_COFFEE_BEAN.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={[
              styles.backButton,
              { backgroundColor: theme.colors.background.primary }
            ]}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>
        </View>

        <View style={[styles.content, { backgroundColor: theme.colors.surface.primary }]}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            {DUMMY_COFFEE_BEAN.title}
          </Text>
          <Text style={[styles.roastry, { color: theme.colors.text.secondary }]}>
            {DUMMY_COFFEE_BEAN.roastry}
          </Text>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
              Origin
            </Text>
            {renderProperty('Country', DUMMY_COFFEE_BEAN.origin.country)}
            {renderProperty('Region', DUMMY_COFFEE_BEAN.origin.region)}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
              Properties
            </Text>
            {Object.entries(DUMMY_COFFEE_BEAN.properties).map(([key, value]) => (
              renderProperty(key, value)
            ))}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
              Taste Profile
            </Text>
            <View style={styles.tasteContainer}>
              {DUMMY_COFFEE_BEAN.tasteProfile.map((taste, index) => (
                <View
                  key={index}
                  style={[
                    styles.tastePill,
                    { backgroundColor: theme.colors.background.accent }
                  ]}
                >
                  <Text style={[styles.tasteText, { color: theme.colors.text.primary }]}>
                    {taste}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.fab,
          {
            backgroundColor: theme.colors.primary.main,
            ...theme.shadows.medium,
          }
        ]}
        onPress={handleAddToShelf}
      >
        <Icon name="add" size={24} color="#FFFFFF" />
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
  backButton: {
    position: 'absolute',
    top: spacing.lg,
    left: spacing.md,
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
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
}); 