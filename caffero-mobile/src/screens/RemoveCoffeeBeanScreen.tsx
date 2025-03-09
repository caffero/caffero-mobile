import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Header } from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import Screen from '../components/Screen';
import { useCoffeeBeanService } from '../api/services/coffeeBeanService';
import { GetCoffeeBeanList } from '../api/models/CoffeeBean';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const RemoveCoffeeBeanScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getText } = useLanguage();
  const { theme } = useTheme();
  const coffeeBeanService = useCoffeeBeanService();
  
  const [coffeeBeans, setCoffeeBeans] = useState<GetCoffeeBeanList[]>([]);
  const [selectedBeans, setSelectedBeans] = useState<Set<string>>(new Set());
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
      Alert.alert(
        getText('error'),
        getText('failedToLoadCoffeeBeans')
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleBeanSelection = (id: string) => {
    const newSelection = new Set(selectedBeans);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedBeans(newSelection);
  };

  const handleDelete = async () => {
    if (selectedBeans.size === 0) {
      Alert.alert(getText('error'), getText('selectCoffeeBeanToDelete'));
      return;
    }

    Alert.alert(
      getText('confirmDelete'),
      getText('confirmDeleteMessage').replace('{count}', selectedBeans.size.toString()),
      [
        { text: getText('cancel'), style: 'cancel' },
        {
          text: getText('delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              setIsLoading(true);
              
              // Delete each selected coffee bean
              const deletePromises = Array.from(selectedBeans).map(id => 
                coffeeBeanService.delete({ id })
              );
              
              await Promise.all(deletePromises);
              
              Alert.alert(
                getText('success'),
                getText('coffeeBeansDeleted'),
                [{ text: getText('ok'), onPress: () => navigation.goBack() }]
              );
            } catch (error) {
              console.error('Error deleting coffee beans:', error);
              Alert.alert(
                getText('error'),
                getText('failedToDeleteCoffeeBeans')
              );
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  const renderCoffeeBean = ({ item }: { item: GetCoffeeBeanList }) => (
    <TouchableOpacity
      style={[styles.coffeeCard, { 
        backgroundColor: theme.colors.surface.primary,
        shadowColor: theme.colors.text.primary,
      }]}
      onPress={() => toggleBeanSelection(item.id)}
    >
      <Image 
        source={{ uri: item.imageUrl || 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9' }} 
        style={styles.coffeeImage} 
      />
      <View style={styles.coffeeInfo}>
        <Text style={[styles.coffeeTitle, { color: theme.colors.text.primary }]}>
          {item.name}
        </Text>
        <Text style={[styles.coffeeDetails, { color: theme.colors.text.secondary }]}>
          {item.roastery || ''}
        </Text>
      </View>
      <View style={[styles.checkboxContainer, { backgroundColor: theme.colors.surface.primary }]}>
        <Icon
          name={selectedBeans.has(item.id) ? 'check-box' : 'check-box-outline-blank'}
          size={24}
          color={selectedBeans.has(item.id) ? theme.colors.primary.main : theme.colors.text.secondary}
        />
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
        <Header
          title={getText('removeCoffeeBeans')}
          showBack
          onBack={() => navigation.goBack()}
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
        title={getText('removeCoffeeBeans')}
        showBack
        onBack={() => navigation.goBack()}
      />
      {coffeeBeans.length > 0 ? (
        <>
          <FlatList
            data={coffeeBeans}
            renderItem={renderCoffeeBean}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.listContent}
            refreshing={isLoading}
            onRefresh={fetchCoffeeBeans}
          />
          <TouchableOpacity
            style={[
              styles.deleteButton,
              { 
                backgroundColor: theme.colors.status.error,
                opacity: selectedBeans.size > 0 ? 1 : 0.5 
              }
            ]}
            onPress={handleDelete}
            disabled={selectedBeans.size === 0}
          >
            <Icon name="delete" size={24} color={theme.colors.text.inverse} />
            <Text style={[styles.deleteButtonText, { color: theme.colors.text.inverse }]}>
              {getText('delete')}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="coffee" size={64} color={theme.colors.text.secondary} />
          <Text style={[styles.emptyText, { color: theme.colors.text.secondary }]}>
            {getText('noCoffeeBeans')}
          </Text>
        </View>
      )}
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
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
  coffeeTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  coffeeDetails: {
    fontSize: 14,
  },
  checkboxContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    borderRadius: 4,
    padding: 4,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
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