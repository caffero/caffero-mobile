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
import { Header } from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import Screen from '../components/Screen';
import { useEquipmentService } from '../api/services/equipmentService';
import { GetEquipmentList } from '../api/models/Equipment';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const WhatIBrewWithScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getText } = useLanguage();
  const { theme } = useTheme();
  const equipmentService = useEquipmentService();
  
  const [equipment, setEquipment] = useState<GetEquipmentList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      setIsLoading(true);
      const data = await equipmentService.getAll();
      setEquipment(data);
    } catch (error) {
      console.error('Error fetching equipment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderEquipment = ({ item }: { item: GetEquipmentList }) => (
    <TouchableOpacity 
      style={[
        styles.equipmentCard,
        {
          backgroundColor: theme.colors.surface.elevated,
          borderColor: theme.colors.border.primary,
          ...theme.shadows.medium,
        }
      ]}
      onPress={() => navigation.navigate('EquipmentDetail', { id: item.id })}
    >
      <Image 
        source={{ uri: item.imageUrl || 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6' }} 
        style={styles.equipmentImage} 
      />
      <View style={[styles.equipmentInfo, { backgroundColor: theme.colors.surface.elevated }]}>
        <Text 
          style={[
            styles.equipmentName,
            theme.typography.headline,
            { color: theme.colors.text.primary }
          ]}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text style={[styles.equipmentType, { color: theme.colors.text.secondary }]}>
          {item.type}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
        <Header 
          title={getText('whatIBrewWith')} 
          rightIcon="delete"
          onRightPress={() => navigation.navigate('DeleteEquipment', { id: '' })}
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
        title={getText('whatIBrewWith')} 
        rightIcon="delete"
        onRightPress={() => navigation.navigate('DeleteEquipment', { id: '' })}
      />
      {equipment.length > 0 ? (
        <FlatList
          data={equipment}
          renderItem={renderEquipment}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          refreshing={isLoading}
          onRefresh={fetchEquipment}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="coffee-maker" size={64} color={theme.colors.text.secondary} />
          <Text style={[styles.emptyText, { color: theme.colors.text.secondary }]}>
            {getText('noEquipment')}
          </Text>
        </View>
      )}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.colors.primary.main }]}
        onPress={() => navigation.navigate('CreateEquipment')}
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
  equipmentCard: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
    elevation: 2,
  },
  equipmentImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  equipmentInfo: {
    padding: 12,
  },
  equipmentName: {
    marginBottom: 8,
  },
  equipmentType: {
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