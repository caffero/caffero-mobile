import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Share,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Header } from '../components/Header';
import Screen from '../components/Screen';
import { spacing, borderRadius } from '../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type PromotionCodeDetailRouteProp = RouteProp<RootStackParamList, 'PromotionCodeDetail'>;

// Mock data - In a real app, this would come from an API
const getPromotionDetails = (id: string) => {
  const promotions = {
    '1': {
      campaignName: 'summerSpecialPromo',
      code: 'SUMMER2024',
      roasteryName: 'coffeeMastersRoastery',
      imageUrl: 'https://example.com/promo1.jpg',
      description: 'promotionSummerDescription',
      validUntil: '2024-08-31',
      discountAmount: '25%',
      termsAndConditions: 'promotionTerms',
    },
    '2': {
      campaignName: 'firstPurchasePromo',
      code: 'WELCOME10',
      roasteryName: 'beanBrothersRoastery',
      imageUrl: 'https://example.com/promo2.jpg',
      description: 'promotionWelcomeDescription',
      validUntil: '2024-12-31',
      discountAmount: '10%',
      termsAndConditions: 'promotionTerms',
    },
    '3': {
      campaignName: 'weekendDealPromo',
      code: 'WEEKEND25',
      roasteryName: 'roastHouseRoastery',
      imageUrl: 'https://example.com/promo3.jpg',
      description: 'promotionWeekendDescription',
      validUntil: '2024-07-31',
      discountAmount: '25%',
      termsAndConditions: 'promotionTerms',
    },
  };
  return promotions[id as keyof typeof promotions];
};

export const PromotionCodeDetailScreen = () => {
  const route = useRoute<PromotionCodeDetailRouteProp>();
  const { theme } = useTheme();
  const { getText } = useLanguage();
  const navigation = useNavigation();
  
  const promotion = getPromotionDetails(route.params.promotionId);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${getText(promotion.campaignName)} - ${getText('useCode')}: ${promotion.code}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCopyCode = () => {
    // In a real app, implement clipboard functionality
    // Clipboard.setString(promotion.code);
  };

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header 
        title={getText('promotionDetails')} 
        showBackButton
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{ uri: promotion.imageUrl }}
          style={styles.banner}
          imageStyle={{ borderRadius: borderRadius.lg }}
        >
          <View style={[styles.overlay, { backgroundColor: 'rgba(0,0,0,0.6)' }]}>
            <Text style={[styles.campaignName, { color: '#FFFFFF' }]}>
              {getText(promotion.campaignName)}
            </Text>
            <Text style={[styles.roasteryName, { color: '#FFFFFF' }]}>
              {getText(promotion.roasteryName)}
            </Text>
          </View>
        </ImageBackground>

        <View style={styles.codeSection}>
          <Text style={[styles.codeLabel, { color: theme.colors.text.secondary }]}>
            {getText('promotionCode')}
          </Text>
          <View style={[styles.codeContainer, { backgroundColor: theme.colors.background.secondary }]}>
            <Text style={[styles.code, { color: theme.colors.primary.main }]}>
              {promotion.code}
            </Text>
            <View style={styles.codeActions}>
              <TouchableOpacity onPress={handleCopyCode} style={styles.iconButton}>
                <Icon name="content-copy" size={24} color={theme.colors.primary.main} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleShare} style={styles.iconButton}>
                <Icon name="share-variant" size={24} color={theme.colors.primary.main} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.detailsSection}>
          <View style={styles.detailItem}>
            <Text style={[styles.detailLabel, { color: theme.colors.text.secondary }]}>
              {getText('discount')}
            </Text>
            <Text style={[styles.detailValue, { color: theme.colors.text.primary }]}>
              {promotion.discountAmount}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={[styles.detailLabel, { color: theme.colors.text.secondary }]}>
              {getText('validUntil')}
            </Text>
            <Text style={[styles.detailValue, { color: theme.colors.text.primary }]}>
              {promotion.validUntil}
            </Text>
          </View>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={[styles.descriptionTitle, { color: theme.colors.text.primary }]}>
            {getText('description')}
          </Text>
          <Text style={[styles.description, { color: theme.colors.text.secondary }]}>
            {getText(promotion.description)}
          </Text>
        </View>

        <View style={styles.termsSection}>
          <Text style={[styles.termsTitle, { color: theme.colors.text.primary }]}>
            {getText('termsAndConditions')}
          </Text>
          <Text style={[styles.terms, { color: theme.colors.text.secondary }]}>
            {getText(promotion.termsAndConditions)}
          </Text>
        </View>
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
  banner: {
    height: 200,
    margin: spacing.lg,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  overlay: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'flex-end',
  },
  campaignName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  roasteryName: {
    fontSize: 16,
    fontWeight: '500',
  },
  codeSection: {
    padding: spacing.lg,
  },
  codeLabel: {
    fontSize: 14,
    marginBottom: spacing.sm,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderRadius: borderRadius.md,
  },
  code: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 1,
  },
  codeActions: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: spacing.md,
  },
  detailsSection: {
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    marginBottom: spacing.xs,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  descriptionSection: {
    padding: spacing.lg,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  termsSection: {
    padding: spacing.lg,
  },
  termsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  terms: {
    fontSize: 14,
    lineHeight: 20,
  },
}); 