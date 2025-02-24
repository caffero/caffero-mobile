import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  FlatList,
} from 'react-native';
import { Header } from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigator } from '../navigation/types';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { spacing, borderRadius } from '../theme';
import Screen from '../components/Screen';
import { Carousel } from '../components/Carousel';
import { BottomNavBar } from '../components/BottomNavBar';

const { width } = Dimensions.get('window');

interface ProgressBarProps {
  title: string;
  progress: number;
  total: number;
}

interface PromotionCode {
  id: string;
  campaignName: string;
  code: string;
  roasteryName: string;
  imageUrl: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ title, progress, total }) => {
  const { theme } = useTheme();
  const percentage = (progress / total) * 100;

  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBarHeader}>
        <Text style={[styles.progressBarTitle, { color: theme.colors.text.primary }]}>
          {title}
        </Text>
        <Text style={[styles.progressBarCount, { color: theme.colors.text.secondary }]}>
          {progress}/{total}
        </Text>
      </View>
      <View style={[styles.progressBarTrack, { backgroundColor: theme.colors.background.secondary }]}>
        <View 
          style={[
            styles.progressBarFill, 
            { 
              backgroundColor: theme.colors.primary.main,
              width: `${percentage}%` 
            }
          ]} 
        />
      </View>
    </View>
  );
};

const PromotionCodeCard: React.FC<PromotionCode> = ({ campaignName, code, roasteryName, imageUrl }) => {
  const { theme } = useTheme();
  
  return (
    <ImageBackground
      source={{ uri: imageUrl }}
      style={styles.promotionCard}
      imageStyle={{ borderRadius: borderRadius.lg }}
    >
      <View style={[styles.promotionCardOverlay, { backgroundColor: 'rgba(0,0,0,0.6)' }]}>
        <Text style={[styles.promotionCampaignName, { color: '#FFFFFF' }]}>
          {campaignName}
        </Text>
        <Text style={[styles.promotionCode, { color: theme.colors.primary.main }]}>
          {code}
        </Text>
        <Text style={[styles.promotionRoasteryName, { color: '#FFFFFF' }]}>
          {roasteryName}
        </Text>
      </View>
    </ImageBackground>
  );
};

const PremiumContent = () => {
  const { theme } = useTheme();
  const { getText } = useLanguage();
  const navigation = useNavigation<RootStackNavigator>();

  const promotionCodes = [
    { 
      id: '1', 
      campaignName: getText('summerSpecialPromo'),
      code: 'SUMMER2024',
      roasteryName: getText('coffeeMastersRoastery'),
      imageUrl: 'https://example.com/promo1.jpg' 
    },
    { 
      id: '2', 
      campaignName: getText('firstPurchasePromo'),
      code: 'WELCOME10',
      roasteryName: getText('beanBrothersRoastery'),
      imageUrl: 'https://example.com/promo2.jpg' 
    },
    { 
      id: '3', 
      campaignName: getText('weekendDealPromo'),
      code: 'WEEKEND25',
      roasteryName: getText('roastHouseRoastery'),
      imageUrl: 'https://example.com/promo3.jpg' 
    },
  ];
  
  return (
    <View style={styles.promotionsSection}>
      <Text style={[
        styles.sectionTitle,
        theme.typography.title2,
        { color: theme.colors.text.primary }
      ]}>
        {getText('promotionCodes')}
      </Text>
      <FlatList
        data={promotionCodes}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => navigation.navigate('PromotionCodeDetail', { promotionId: item.id })}
            style={styles.promotionCardContainer}
          >
            <PromotionCodeCard {...item} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.promotionList}
      />
    </View>
  );
};

const FreeUserContent = () => {
  const { theme } = useTheme();
  const { getText } = useLanguage();
  const navigation = useNavigation<RootStackNavigator>();

  return (
    <View style={[styles.freeContent, { backgroundColor: theme.colors.background.primary }]}>
      <ImageBackground
        source={{ uri: 'https://example.com/premium-background.jpg' }}
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
            onPress={() => navigation.navigate('PaymentScreen')}
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
  const { isPremium } = useAuth();

  const progressData = [
    { title: getText('coffeeScanCount'), progress: 15, total: 50 },
    { title: getText('recipesSaved'), progress: 8, total: 20 },
    { title: getText('beansSaved'), progress: 12, total: 30 },
  ];

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header title={getText('appName')} />
      <ScrollView 
        style={[styles.content, { backgroundColor: theme.colors.background.primary }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.progressSection}>
          {progressData.map((item, index) => (
            <ProgressBar
              key={index}
              title={item.title}
              progress={item.progress}
              total={item.total}
            />
          ))}
        </View>
        {isPremium ? <PremiumContent /> : <FreeUserContent />}
      </ScrollView>
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
  progressSection: {
    padding: spacing.lg,
  },
  progressBarContainer: {
    marginBottom: spacing.md,
  },
  progressBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  progressBarTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressBarCount: {
    fontSize: 14,
  },
  progressBarTrack: {
    height: 8,
    borderRadius: borderRadius.round,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: borderRadius.round,
  },
  promotionsSection: {
    paddingTop: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  promotionList: {
    paddingHorizontal: spacing.lg,
  },
  promotionCardContainer: {
    marginRight: spacing.md,
  },
  promotionCard: {
    width: width * 0.8,
    height: 160,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  promotionCardOverlay: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'space-between',
    borderRadius: borderRadius.lg,
  },
  promotionCampaignName: {
    fontSize: 20,
    fontWeight: '700',
  },
  promotionCode: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 1,
  },
  promotionRoasteryName: {
    fontSize: 16,
    fontWeight: '500',
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
    borderRadius: borderRadius.md,
  },
  upgradeButtonText: {
    textAlign: 'center',
  },
}); 