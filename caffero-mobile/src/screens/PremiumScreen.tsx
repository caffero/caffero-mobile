import React from 'react';
import { 
  View, 
  ScrollView, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ImageBackground,
  Dimensions 
} from 'react-native';
import { Header } from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigator } from '../navigation/types';

const { width } = Dimensions.get('window');

// Dummy data for premium content
const coupons = [
  { id: '1', title: '20% Off Coffee Beans', image: 'https://example.com/coupon1.jpg' },
  { id: '2', title: 'Free V60 Filter', image: 'https://example.com/coupon2.jpg' },
];

const events = [
  { id: '1', title: 'Coffee Tasting Workshop', image: 'https://example.com/event1.jpg' },
  { id: '2', title: 'Barista Training', image: 'https://example.com/event2.jpg' },
  { id: '3', title: 'Coffee Trivia Night', image: 'https://example.com/event3.jpg' },
  { id: '4', title: 'Roastery Tour', image: 'https://example.com/event4.jpg' },
];

const tasteMatches = [
  { id: '1', title: 'Dark Chocolate', image: 'https://example.com/taste1.jpg' },
  { id: '2', title: 'Blueberry Cheesecake', image: 'https://example.com/taste2.jpg' },
  { id: '3', title: 'Caramel Pudding', image: 'https://example.com/taste3.jpg' },
  { id: '4', title: 'Apple Pie', image: 'https://example.com/taste4.jpg' },
];

const PremiumContent = () => {
  return (
    <ScrollView style={styles.content}>
      {/* Coupons Carousel */}
      <View style={styles.section}>
        <TouchableOpacity>
          <Text style={styles.sectionTitle}>Coupons</Text>
        </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {coupons.map((coupon) => (
            <ImageBackground
              key={coupon.id}
              source={{ uri: coupon.image }}
              style={styles.couponCard}
              imageStyle={styles.cardImage}
            >
              <Text style={styles.cardTitle}>{coupon.title}</Text>
            </ImageBackground>
          ))}
        </ScrollView>
      </View>

      {/* Events Grid */}
      <View style={styles.section}>
        <TouchableOpacity>
          <Text style={styles.sectionTitle}>Events</Text>
        </TouchableOpacity>
        <View style={styles.grid}>
          {events.map((event) => (
            <ImageBackground
              key={event.id}
              source={{ uri: event.image }}
              style={styles.gridCard}
              imageStyle={styles.cardImage}
            >
              <Text style={styles.cardTitle}>{event.title}</Text>
            </ImageBackground>
          ))}
        </View>
      </View>

      {/* Taste Matches Grid */}
      <View style={styles.section}>
        <TouchableOpacity>
          <Text style={styles.sectionTitle}>Taste Matches</Text>
        </TouchableOpacity>
        <View style={styles.grid}>
          {tasteMatches.map((item) => (
            <ImageBackground
              key={item.id}
              source={{ uri: item.image }}
              style={styles.gridCard}
              imageStyle={styles.cardImage}
            >
              <Text style={styles.cardTitle}>{item.title}</Text>
            </ImageBackground>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const FreeUserContent = () => {
  return (
    <View style={styles.freeContent}>
      <ImageBackground
        source={{ uri: 'https://example.com/premium-ad.jpg' }}
        style={styles.adBackground}
        imageStyle={styles.adImage}
      >
        <View style={styles.adOverlay}>
          <Text style={styles.adTitle}>Upgrade to Premium</Text>
          <Text style={styles.adDescription}>
            Get access to exclusive coupons, events, and personalized taste matches!
          </Text>
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeButtonText}>Upgrade Now</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export const PremiumScreen = () => {
  const navigation = useNavigation<RootStackNavigator>();
  const isPremium = false; // This should come from your auth context or API

  return (
    <View style={styles.container}>
      <Header title="Premium" />
      {isPremium ? <PremiumContent /> : <FreeUserContent />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 12,
  },
  couponCard: {
    width: width * 0.8,
    height: 160,
    marginHorizontal: 8,
    justifyContent: 'flex-end',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  gridCard: {
    width: (width - 48) / 2,
    height: 160,
    margin: 8,
    justifyContent: 'flex-end',
  },
  cardImage: {
    borderRadius: 8,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  freeContent: {
    flex: 1,
  },
  adBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  adImage: {
    opacity: 0.7,
  },
  adOverlay: {
    padding: 24,
    alignItems: 'center',
  },
  adTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  adDescription: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
  },
  upgradeButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 24,
  },
  upgradeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 