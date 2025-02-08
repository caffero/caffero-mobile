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

interface GridItemProps {
  title: string;
  imageUrl: string;
  onPress: () => void;
}

interface GridSectionProps {
  title: string;
  items: Array<{
    title: string;
    imageUrl: string;
  }>;
  onHeaderPress: () => void;
  onItemPress: (item: { title: string; imageUrl: string }) => void;
}

const GridItem: React.FC<GridItemProps> = ({ title, imageUrl, onPress }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity 
      style={styles.gridItem}
      onPress={onPress}
    >
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.gridItemBackground}
        imageStyle={{ borderRadius: borderRadius.md }}
      >
        <View style={styles.gridItemOverlay}>
          <Text style={[
            styles.gridItemTitle,
            theme.typography.body.large,
            { color: '#FFFFFF' }
          ]}>
            {title}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const GridSection: React.FC<GridSectionProps> = ({ title, items, onHeaderPress, onItemPress }) => {
  const { theme } = useTheme();
  return (
    <View style={styles.section}>
      <TouchableOpacity onPress={onHeaderPress}>
        <Text style={[
          styles.sectionTitle,
          theme.typography.title2,
          { color: theme.colors.text.primary }
        ]}>
          {title}
        </Text>
      </TouchableOpacity>
      <View style={styles.gridContainer}>
        {items.map((item, index) => (
          <GridItem
            key={index}
            title={item.title}
            imageUrl={item.imageUrl}
            onPress={() => onItemPress(item)}
          />
        ))}
      </View>
    </View>
  );
};

const PremiumContent = () => {
  const { theme } = useTheme();
  const { getText } = useLanguage();
  const navigation = useNavigation<RootStackNavigator>();

  const coupons = [
    { id: '1', title: getText('coupon1'), imageUrl: 'https://example.com/coupon1.jpg' },
    { id: '2', title: getText('coupon2'), imageUrl: 'https://example.com/coupon2.jpg' },
    { id: '3', title: getText('coupon3'), imageUrl: 'https://example.com/coupon3.jpg' },
  ];

  const events = [
    { title: getText('workshop'), imageUrl: 'https://example.com/workshop.jpg' },
    { title: getText('trivia'), imageUrl: 'https://example.com/trivia.jpg' },
    { title: getText('gathering'), imageUrl: 'https://example.com/gathering.jpg' },
    { title: getText('tasting'), imageUrl: 'https://example.com/tasting.jpg' },
  ];

  const tasteMatches = [
    { title: getText('dessert1'), imageUrl: 'https://example.com/dessert1.jpg' },
    { title: getText('dessert2'), imageUrl: 'https://example.com/dessert2.jpg' },
    { title: getText('food1'), imageUrl: 'https://example.com/food1.jpg' },
    { title: getText('food2'), imageUrl: 'https://example.com/food2.jpg' },
  ];
  
  return (
    <FlatList
      style={[styles.content, { backgroundColor: theme.colors.background.primary }]}
      ListHeaderComponent={
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Coupons')}>
            <Text style={[
              styles.sectionTitle,
              theme.typography.title2,
              { color: theme.colors.text.primary }
            ]}>
              {getText('coupons')}
            </Text>
          </TouchableOpacity>
          <Carousel
            title=""
            items={coupons}
            onItemPress={(id) => navigation.navigate('Coupons')}
          />
        </View>
      }
      data={[
        {
          id: 'events',
          component: (
            <GridSection
              title={getText('events')}
              items={events}
              onHeaderPress={() => navigation.navigate('Events')}
              onItemPress={(item) => navigation.navigate('EventDetail', { event: item })}
            />
          ),
        },
        {
          id: 'tasteMatches',
          component: (
            <GridSection
              title={getText('tasteMatches')}
              items={tasteMatches}
              onHeaderPress={() => navigation.navigate('TasteMatches')}
              onItemPress={(item) => navigation.navigate('TasteMatchDetail', { match: item })}
            />
          ),
        },
      ]}
      renderItem={({ item }) => item.component}
      keyExtractor={(item) => item.id}
    />
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
  const { isPremium } = useAuth();

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header title={getText('appName')} />
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
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  gridItem: {
    width: (width - spacing.md * 2 - spacing.xs * 2) / 2,
    aspectRatio: 1,
    margin: spacing.xs,
  },
  gridItemBackground: {
    flex: 1,
  },
  gridItemOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    padding: spacing.sm,
    borderRadius: borderRadius.md,
  },
  gridItemTitle: {
    textAlign: 'left',
  },
  couponItem: {
    width: width * 0.8,
    aspectRatio: 1,
    marginRight: spacing.md,
  },
  couponImage: {
    flex: 1,
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