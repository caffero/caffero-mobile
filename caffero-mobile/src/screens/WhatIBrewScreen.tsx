import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  Text,
  Alert,
  ActivityIndicator
} from 'react-native';
import Screen from '../components/Screen';
import { Header } from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useCoffeeBeanService } from '../api/services/coffeeBeanService';
import { GetCoffeeBeanList } from '../api/models/CoffeeBean';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const WhatIBrewScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const { getText } = useLanguage();
  const coffeeBeanService = useCoffeeBeanService();
  
  const [coffeeBeans, setCoffeeBeans] = useState<GetCoffeeBeanList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCoffeeBeans();
  }, []);

  const fetchCoffeeBeans = async () => {
    try {
      setIsLoading(true);
      const data = await coffeeBeanService.getAll();
      setCoffeeBeans(data);
    } catch (error) {
      console.error('Error fetching coffee beans:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCoffeeBean = ({ item }: { item: GetCoffeeBeanList }) => (
    <TouchableOpacity 
      style={[
        styles.coffeeCard,
        {
          backgroundColor: theme.colors.surface.elevated,
          borderColor: theme.colors.border.primary,
          ...theme.shadows.medium,
        }
      ]}
      onPress={() => navigation.navigate('CoffeeBeanDetail', { id: item.coffeeId })}
    >
      <Image 
        source={{ uri: item.imageUrl || 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9' }} 
        style={styles.coffeeImage} 
      />
      <View style={[styles.coffeeInfo, { backgroundColor: theme.colors.surface.elevated }]}>
        <Text 
          style={[
            styles.coffeeName,
            theme.typography.headline,
            { color: theme.colors.text.primary }
          ]}
          numberOfLines={2}
        >
          {item.name}
        </Text>
        <View style={styles.ratingContainer}>
          <Icon name="coffee" size={20} color={theme.colors.primary.main} />
          <Text style={[styles.ratingText, { color: theme.colors.text.secondary }]}>
            {item.likePoint ? item.likePoint.toFixed(1) : '—'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
        <Header 
          title={getText('whatIBrew')} 
          rightIcon="delete"
          onRightPress={() => navigation.navigate('RemoveCoffeeBean')}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary.main} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header 
        title={getText('whatIBrew')} 
        rightIcon="delete"
        onRightPress={() => navigation.navigate('RemoveCoffeeBean')}
      />
      {coffeeBeans.length > 0 ? (
        <FlatList
          data={coffeeBeans}
          renderItem={renderCoffeeBean}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          refreshing={isLoading}
          onRefresh={fetchCoffeeBeans}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="coffee" size={64} color={theme.colors.text.secondary} />
          <Text style={[styles.emptyText, { color: theme.colors.text.secondary }]}>
            {getText('noCoffeeBeans')}
          </Text>
        </View>
      )}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.colors.primary.main }]}
        onPress={() => {
          Alert.alert(
            getText('addCoffeeBean'),
            getText('chooseCoffeeBeanAddMethod'),
            [
              {
                text: getText('scanQR'),
                onPress: () => navigation.navigate('Scan'),
              },
              {
                text: getText('searchByName'),
                onPress: () => navigation.navigate('AddCoffeeBean'),
              },
            ],
          );
        }}
      >
        <Icon name="add" size={24} color={theme.colors.text.inverse} />
      </TouchableOpacity>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 8,
  },
  coffeeCard: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
    elevation: 2,
  },
  coffeeImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  coffeeInfo: {
    padding: 12,
  },
  coffeeName: {
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
}); 