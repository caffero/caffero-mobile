import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import Screen from '../components/Screen';
import { Header } from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useEquipmentService } from '../api/services/equipmentService';
import { GetEquipmentList } from '../api/models/Equipment';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SelectEquipment = () => {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const { getText } = useLanguage();
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

  const handleSelect = (id: string, title: string) => {
    // Return to CreateRecipeScreen with the selected equipment
    navigation.navigate('CreateRecipe', { 
      selectedEquipmentId: id, 
      selectedEquipmentName: title 
    });
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
      onPress={() => handleSelect(item.id, item.title)}
    >
      <Image 
        source={{ uri: item.imageUrl || 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6' }} 
        style={styles.equipmentImage} 
      />
      <View style={[styles.equipmentInfo, { backgroundColor: theme.colors.surface.elevated }]}>
        <Text 
          style={[
            styles.equipmentName,
            { color: theme.colors.text.primary, fontWeight: '600' }
          ]}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text 
          style={[
            styles.equipmentType,
            { color: theme.colors.text.secondary }
          ]}
        >
          {item.type || ''}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header
        title={getText('selectEquipment')}
        showBack
        onBack={() => navigation.goBack()}
      />
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary.main} />
        </View>
      ) : equipment.length > 0 ? (
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
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: theme.colors.primary.main }]}
            onPress={() => navigation.navigate('CreateEquipment')}
          >
            <Text style={[styles.addButtonText, { color: theme.colors.text.inverse }]}>
              {getText('addEquipment')}
            </Text>
          </TouchableOpacity>
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
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  equipmentInfo: {
    padding: 12,
  },
  equipmentName: {
    fontSize: 14,
    marginBottom: 4,
  },
  equipmentType: {
    fontSize: 12,
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
    marginBottom: 24,
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
}); 