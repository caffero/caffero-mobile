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
import { spacing } from '../theme';

const { width } = Dimensions.get('window');

const PremiumContent = () => {
  const { theme } = useTheme();
  
  return (
    <ScrollView style={[styles.content, { backgroundColor: theme.colors.background.primary }]}>
      {/* Coupons Section */}
      <View style={[styles.section, { padding: theme.spacing.md }]}>
        <Text style={[
          styles.sectionTitle,
          theme.typography.h2,
          { color: theme.colors.text.primary }
        ]}>
          Exclusive Coupons
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
          theme.typography.h2,
          { color: theme.colors.text.primary }
        ]}>
          Upcoming Events
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
          theme.typography.h2,
          { color: theme.colors.text.primary }
        ]}>
          Personalized Recommendations
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
  
  return (
    <View style={[styles.freeContent, { backgroundColor: theme.colors.background.primary }]}>
      <ImageBackground
        source={{ uri: 'https://example.com/premium-ad.jpg' }}
        style={styles.adBackground}
        resizeMode="cover"
      >
        <View style={[
          styles.adOverlay,
          { backgroundColor: `${theme.colors.background.primary}CC` }
        ]}>
          <Text style={[
            styles.adTitle,
            theme.typography.h1,
            { color: theme.colors.text.primary }
          ]}>
            Upgrade to Premium
          </Text>
          <Text style={[
            styles.adDescription,
            theme.typography.body1,
            { color: theme.colors.text.secondary }
          ]}>
            Get access to exclusive coupons, events, and personalized taste matches!
          </Text>
          <TouchableOpacity 
            style={[
              styles.upgradeButton,
              {
                backgroundColor: theme.colors.primary.main,
                borderRadius: theme.borderRadius.md,
              }
            ]}
          >
            <Text style={[
              styles.upgradeButtonText,
              theme.typography.button,
              { color: theme.colors.primary.contrastText }
            ]}>
              Upgrade Now
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export const PremiumScreen = () => {
  const { theme } = useTheme();
  const isPremium = false;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header title="Premium" />
      {isPremium ? <PremiumContent /> : <FreeUserContent />}
    </View>
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