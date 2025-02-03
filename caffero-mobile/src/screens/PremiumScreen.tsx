import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Header } from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigator } from '../navigation/types';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { spacing } from '../theme';
import Screen from '../components/Screen';

const { width } = Dimensions.get('window');

const PremiumContent = () => {
  const { theme } = useTheme();
  const { getText } = useLanguage();
  
  return (
    <ScrollView style={[styles.content, { backgroundColor: theme.colors.background.primary }]}>
      {/* Coupons Section */}
      <View style={[styles.section, { padding: theme.spacing.md }]}>
        <Text style={[
          styles.sectionTitle,
          theme.typography.title2,
          { color: theme.colors.text.primary }
        ]}>
          {getText('exclusiveCoupons')}
        </Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ padding: theme.spacing.sm }}
        >
          {/* Add coupon cards here */}
        </ScrollView>
      </View>

      {/* Events Section */}
      <View style={[styles.section, { padding: theme.spacing.md }]}>
        <Text style={[
          styles.sectionTitle,
          theme.typography.title2,
          { color: theme.colors.text.primary }
        ]}>
          {getText('upcomingEvents')}
        </Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ padding: theme.spacing.sm }}
        >
          {/* Add event cards here */}
        </ScrollView>
      </View>

      {/* Recommendations Section */}
      <View style={[styles.section, { padding: theme.spacing.md }]}>
        <Text style={[
          styles.sectionTitle,
          theme.typography.title2,
          { color: theme.colors.text.primary }
        ]}>
          {getText('personalizedRecommendations')}
        </Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ padding: theme.spacing.sm }}
        >
          {/* Add recommendation cards here */}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const FreeUserContent = () => {
  const { theme } = useTheme();
  const { getText } = useLanguage();
  const navigation = useNavigation<RootStackNavigator>();

  return (
    <View style={[styles.freeContent, { backgroundColor: theme.colors.background.primary }]}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31' }}
        style={styles.adBackground}
        blurRadius={5}
      >
        <View style={[styles.adOverlay, { backgroundColor: 'rgba(0,0,0,0.6)' }]}>
          <Text style={[
            styles.adTitle,
            theme.typography.title1,
            { color: '#FFFFFF' }
          ]}>
            {getText('premiumTitle')}
          </Text>
          <Text style={[
            styles.adDescription,
            theme.typography.body.medium,
            { color: '#FFFFFF' }
          ]}>
            {getText('premiumDescription')}
          </Text>
          <TouchableOpacity
            style={[
              styles.upgradeButton,
              { backgroundColor: theme.colors.background.accent }
            ]}
            onPress={() => navigation.navigate('Subscription')}
          >
            <Text style={[
              styles.upgradeButtonText,
              theme.typography.body.large,
              { color: '#FFFFFF' }
            ]}>
              {getText('upgradeToPremium')}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export const PremiumScreen = () => {
  const { theme } = useTheme();
  const { getText } = useLanguage();
  const isPremium = false;

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header title={getText('premium')} />
      {isPremium ? <PremiumContent /> : <FreeUserContent />}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  freeContent: {
    flex: 1,
  },
  adBackground: {
    width: '100%',
    height: '100%',
  },
  adOverlay: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adTitle: {
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  adDescription: {
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  upgradeButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upgradeButtonText: {
    textAlign: 'center',
  },
}); 