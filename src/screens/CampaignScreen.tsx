import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigator } from '../navigation/types';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Header } from '../components/Header';
import Screen from '../components/Screen';
import { spacing, borderRadius } from '../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Campaign {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  cafeId: string;
  cafeName: string;
  discount: string;
  details: {
    startDate: string;
    endDate: string;
    usagePerTimeFrame: string;
    usagePerUser: number;
    validLocations: string[];
  };
}

// Dummy data for testing
const tailoredCampaigns: Campaign[] = [
  // {
  //   id: '101',
  //   name: 'Morning Coffee Special',
  //   description: 'Get 20% off on all coffee beverages before 10 AM',
  //   imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&auto=format',
  //   cafeId: '1',
  //   cafeName: 'Cafe Luminosa',
  //   discount: '20% OFF',
  //   details: {
  //     startDate: '2023-05-01',
  //     endDate: '2023-08-31',
  //     usagePerTimeFrame: 'Once per day',
  //     usagePerUser: 30,
  //     validLocations: ['Downtown Branch', 'Riverside Branch'],
  //   },
  // },
  // {
  //   id: '102',
  //   name: 'Weekend Brunch Deal',
  //   description: 'Buy one brunch set, get one free coffee on weekends',
  //   imageUrl: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=500&auto=format',
  //   cafeId: '1',
  //   cafeName: 'Cafe Luminosa',
  //   discount: 'FREE COFFEE',
  //   details: {
  //     startDate: '2023-06-01',
  //     endDate: '2023-07-31',
  //     usagePerTimeFrame: 'Once per weekend',
  //     usagePerUser: 8,
  //     validLocations: ['Downtown Branch'],
  //   },
  // },
];

const neighborhoodCampaigns: Campaign[] = [
  // {
  //   id: '201',
  //   name: 'Happy Hour Pastries',
  //   description: '50% off all pastries between 4PM and 6PM',
  //   imageUrl: 'https://images.unsplash.com/photo-1567954970774-58d6aa6a3241?w=500&auto=format',
  //   cafeId: '2',
  //   cafeName: 'Sweet Corner',
  //   discount: '50% OFF',
  //   details: {
  //     startDate: '2023-06-15',
  //     endDate: '2023-09-15',
  //     usagePerTimeFrame: 'Once per day',
  //     usagePerUser: 20,
  //     validLocations: ['Main Branch'],
  //   },
  // },
  // {
  //   id: '202',
  //   name: 'Family Package',
  //   description: 'Four coffees and two desserts for the price of three coffees',
  //   imageUrl: 'https://images.unsplash.com/photo-1602663491496-73f07481dbea?w=500&auto=format',
  //   cafeId: '3',
  //   cafeName: 'Urban Roasters',
  //   discount: 'FAMILY DEAL',
  //   details: {
  //     startDate: '2023-07-01',
  //     endDate: '2023-10-31',
  //     usagePerTimeFrame: 'Once per weekend',
  //     usagePerUser: 5,
  //     validLocations: ['All locations'],
  //   },
  // },
];

const generalCampaigns: Campaign[] = [
  {
    id: '301',
    name: 'Summer Iced Drinks',
    description: 'Get any iced drink for only $3.99',
    imageUrl: 'https://images.unsplash.com/photo-1471696035578-3d8c78d99684?w=500&auto=format',
    cafeId: '4',
    cafeName: 'Brew Haven',
    discount: 'SPECIAL PRICE',
    details: {
      startDate: '2023-06-01',
      endDate: '2023-08-31',
      usagePerTimeFrame: 'Unlimited',
      usagePerUser: 0,
      validLocations: ['All locations'],
    },
  },
  {
    id: '302',
    name: 'Loyalty Reward',
    description: 'Get a free coffee after 8 purchases',
    imageUrl: 'https://images.unsplash.com/photo-1564979045531-fa386a275b27?w=500&auto=format',
    cafeId: '5',
    cafeName: 'Coffee Lab',
    discount: 'FREE COFFEE',
    details: {
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      usagePerTimeFrame: 'Once after 8 purchases',
      usagePerUser: 0,
      validLocations: ['All locations'],
    },
  },
];

export const CampaignScreen = () => {
  const navigation = useNavigation<RootStackNavigator>();
  const { theme } = useTheme();
  const { getText } = useLanguage();
  const [tailored, setTailored] = useState<Campaign[]>([]);
  const [neighborhood, setNeighborhood] = useState<Campaign[]>([]);
  const [general, setGeneral] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // In a real app, fetch campaigns from API
    // For now, using dummy data
    setTimeout(() => {
      setTailored(tailoredCampaigns);
      setNeighborhood(neighborhoodCampaigns);
      setGeneral(generalCampaigns);
      setLoading(false);
    }, 1000);
  }, []);

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

  const renderCampaignItem = ({ item }: { item: Campaign }) => (
    <TouchableOpacity
      style={[styles.campaignCard, { backgroundColor: theme.colors.surface.primary }]}
      onPress={() => handleCampaignPress(item)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.campaignImage} />
      <View style={styles.discount}>
        <Text style={styles.discountText}>{item.discount}</Text>
      </View>
      <View style={styles.campaignInfo}>
        <Text style={[styles.campaignName, { color: theme.colors.text.primary }]}>
          {item.name}
        </Text>
        <Text style={[styles.cafeName, { color: theme.colors.text.secondary }]}>
          {item.cafeName}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderSection = (title: string, data: Campaign[]) => {
    if (data.length === 0) return null;

    return (
      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          {title}
        </Text>
        <FlatList
          data={data}
          renderItem={renderCampaignItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContent}
        />
      </View>
    );
  };

  if (loading) {
    return (
      <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
        <Header title={getText('campaigns')} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary.main} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header title={getText('campaigns')} />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {tailored.length === 0 && neighborhood.length === 0 && general.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme.colors.text.secondary }]}>
              {getText('noCampaignsAvailable')}
            </Text>
          </View>
        ) : (
          <>
            {renderSection(getText('tailoredForYou'), tailored)}
            {renderSection(getText('yourNeighborhood'), neighborhood)}
            {renderSection(getText('general'), general)}
          </>
        )}
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
                <Text style={[styles.modalCafeName, { color: theme.colors.text.secondary }]}>
                  {selectedCampaign.cafeName}
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
                
                {selectedCampaign.details.usagePerUser > 0 && (
                  <View style={styles.detailRow}>
                    <Text style={[styles.detailLabel, { color: theme.colors.text.secondary }]}>
                      {getText('maxUsage')}
                    </Text>
                    <Text style={[styles.detailValue, { color: theme.colors.text.primary }]}>
                      {selectedCampaign.details.usagePerUser} {getText('times')}
                    </Text>
                  </View>
                )}
                
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: spacing.md,
  },
  sectionContainer: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  carouselContent: {
    paddingHorizontal: spacing.md,
  },
  campaignCard: {
    width: 270,
    borderRadius: borderRadius.md,
    marginRight: spacing.md,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  campaignImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  discount: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: '#FF3B30',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  campaignInfo: {
    padding: spacing.md,
  },
  campaignName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  cafeName: {
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: spacing.md,
    fontSize: 16,
    textAlign: 'center',
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
    marginBottom: spacing.xs,
  },
  modalCafeName: {
    fontSize: 16,
    marginBottom: spacing.md,
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