import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackNavigator, RootStackParamList } from '../navigation/types';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Header } from '../components/Header';
import Screen from '../components/Screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { spacing, borderRadius } from '../theme';
import { Carousel } from '../components/Carousel';
import { Dimensions } from 'react-native';

type CafeDetailRouteProp = RouteProp<RootStackParamList, 'CafeDetail'>;

interface Cafe {
  id: string;
  name: string;
  district: string;
  city: string;
  description: string;
  images: string[];
  campaigns: Campaign[];
}

interface Campaign {
  id: string;
  name: string;
  description: string;
  details: {
    startDate: string;
    endDate: string;
    usagePerTimeFrame: string;
    usagePerUser: number;
    validLocations: string[];
  };
}

// Dummy data for testing
const dummyCafe: Cafe = {
  id: '1',
  name: 'Cafe Luminosa',
  district: 'Downtown',
  city: 'Istanbul',
  description: 'A cozy cafe with a modern twist, offering specialty coffee and handmade pastries. Our beans are ethically sourced and freshly roasted to ensure the best coffee experience.',
  images: [
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&auto=format',
    'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=500&auto=format',
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&auto=format',
  ],
  campaigns: [
    {
      id: '101',
      name: 'Morning Coffee Special',
      description: 'Get 20% off on all coffee beverages before 10 AM',
      details: {
        startDate: '2023-05-01',
        endDate: '2023-08-31',
        usagePerTimeFrame: 'Once per day',
        usagePerUser: 30,
        validLocations: ['Downtown Branch', 'Riverside Branch'],
      },
    },
    {
      id: '102',
      name: 'Weekend Brunch Deal',
      description: 'Buy one brunch set, get one free coffee on weekends',
      details: {
        startDate: '2023-06-01',
        endDate: '2023-07-31',
        usagePerTimeFrame: 'Once per weekend',
        usagePerUser: 8,
        validLocations: ['Downtown Branch'],
      },
    },
  ],
};

export const CafeDetailScreen = () => {
  const navigation = useNavigation<RootStackNavigator>();
  const route = useRoute<CafeDetailRouteProp>();
  const { theme } = useTheme();
  const { getText } = useLanguage();
  const [cafe, setCafe] = useState<Cafe | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    // In a real app, fetch cafe details from an API using route.params.id
    // For now, using dummy data
    setTimeout(() => {
      setCafe(dummyCafe);
      setLoading(false);
    }, 800);
  }, [route.params.id]);

  const handleCampaignPress = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setModalVisible(true);
  };

  const handleUseCampaign = () => {
    if (selectedCampaign) {
      setModalVisible(false);
      navigation.navigate('UseCampaignScreen', { campaignId: selectedCampaign.id });
    }
  };

  if (loading) {
    return (
      <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
        <Header 
          title={getText('cafeDetails')}
          showBack
          onBack={() => navigation.goBack()}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary.main} />
        </View>
      </Screen>
    );
  }

  if (!cafe) {
    return (
      <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
        <Header 
          title={getText('cafeDetails')}
          showBack
          onBack={() => navigation.goBack()}
        />
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.colors.text.primary }]}>
            {getText('errorLoadingCafe')}
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header 
        title={getText('cafeDetails')}
        showBack
        onBack={() => navigation.goBack()}
      />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.carouselContainer}>
          <Carousel
            title=""
            items={cafe.images.map((imageUrl, index) => ({
              id: `image-${index}`,
              title: '',
              imageUrl,
            }))}
            onItemPress={() => {}}
            fullWidth={true}
            autoplay={true}
            autoplayInterval={4000}
          />
        </View>

        <View style={styles.detailsContainer}>
          <Text style={[styles.cafeName, { color: theme.colors.text.primary }]}>
            {cafe.name}
          </Text>
          <Text style={[styles.cafeLocation, { color: theme.colors.text.secondary }]}>
            {cafe.district}, {cafe.city}
          </Text>
          
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            {getText('about')}
          </Text>
          <Text style={[styles.cafeDescription, { color: theme.colors.text.primary }]}>
            {cafe.description}
          </Text>

          {cafe.campaigns.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                {getText('availableCampaigns')}
              </Text>
              
              {cafe.campaigns.map((campaign) => (
                <TouchableOpacity
                  key={campaign.id}
                  style={[styles.campaignCard, { 
                    backgroundColor: theme.colors.surface.primary,
                    borderColor: theme.colors.border.primary,
                  }]}
                  onPress={() => handleCampaignPress(campaign)}
                >
                  <View style={styles.campaignContent}>
                    <Text style={[styles.campaignName, { color: theme.colors.text.primary }]}>
                      {campaign.name}
                    </Text>
                    <Text style={[styles.campaignDescription, { color: theme.colors.text.secondary }]}>
                      {campaign.description}
                    </Text>
                  </View>
                  <Icon name="chevron-right" size={24} color={theme.colors.text.secondary} />
                </TouchableOpacity>
              ))}
            </>
          )}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.background.primary }]}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Icon name="close" size={24} color={theme.colors.text.primary} />
            </TouchableOpacity>

            {selectedCampaign && (
              <>
                <Text style={[styles.modalTitle, { color: theme.colors.text.primary }]}>
                  {selectedCampaign.name}
                </Text>
                <Text style={[styles.modalDescription, { color: theme.colors.text.primary }]}>
                  {selectedCampaign.description}
                </Text>
                
                <Text style={[styles.modalSectionTitle, { color: theme.colors.text.primary }]}>
                  {getText('campaignDetails')}
                </Text>
                
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: theme.colors.text.secondary }]}>
                    {getText('validFrom')}
                  </Text>
                  <Text style={[styles.detailValue, { color: theme.colors.text.primary }]}>
                    {selectedCampaign.details.startDate}
                  </Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: theme.colors.text.secondary }]}>
                    {getText('validUntil')}
                  </Text>
                  <Text style={[styles.detailValue, { color: theme.colors.text.primary }]}>
                    {selectedCampaign.details.endDate}
                  </Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: theme.colors.text.secondary }]}>
                    {getText('usageFrequency')}
                  </Text>
                  <Text style={[styles.detailValue, { color: theme.colors.text.primary }]}>
                    {selectedCampaign.details.usagePerTimeFrame}
                  </Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: theme.colors.text.secondary }]}>
                    {getText('maxUsage')}
                  </Text>
                  <Text style={[styles.detailValue, { color: theme.colors.text.primary }]}>
                    {selectedCampaign.details.usagePerUser} {getText('times')}
                  </Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: theme.colors.text.secondary }]}>
                    {getText('validLocations')}
                  </Text>
                  <Text style={[styles.detailValue, { color: theme.colors.text.primary }]}>
                    {selectedCampaign.details.validLocations.join(', ')}
                  </Text>
                </View>

                <TouchableOpacity
                  style={[styles.useCampaignButton, { backgroundColor: theme.colors.primary.main }]}
                  onPress={handleUseCampaign}
                >
                  <Text style={[styles.useCampaignButtonText, { color: theme.colors.primary.contrastText }]}>
                    {getText('useCampaign')}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  carouselContainer: {
    height: 250,
    width: '100%',
    overflow: 'hidden',
  },
  cafeImage: {
    width: '100%',
    height: 250,
  },
  detailsContainer: {
    padding: spacing.md,
  },
  cafeName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  cafeLocation: {
    fontSize: 16,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  cafeDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
  campaignCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginVertical: spacing.sm,
    borderWidth: 1,
  },
  campaignContent: {
    flex: 1,
  },
  campaignName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  campaignDescription: {
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: spacing.lg,
    maxHeight: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  detailLabel: {
    fontSize: 14,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  useCampaignButton: {
    marginTop: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  useCampaignButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 