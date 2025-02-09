import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  Alert,
} from 'react-native';
import { Header } from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import Screen from '../components/Screen';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Equipment {
  id: string;
  title: string;
  type: string;
  kind: string;
  imageUrl: string;
}

// Dummy data
const equipmentList: Equipment[] = [
  {
    id: '1',
    title: 'My Chemex',
    type: 'Dripper',
    kind: 'Chemex',
    imageUrl: 'https://example.com/chemex.jpg',
  },
  {
    id: '2',
    title: 'Hario V60',
    type: 'Dripper',
    kind: 'V60',
    imageUrl: 'https://example.com/v60.jpg',
  },
  {
    id: '3',
    title: 'Timemore C2',
    type: 'Grinder',
    kind: 'Manual Grinder',
    imageUrl: 'https://example.com/grinder.jpg',
  },
  // Add more items...
];

export const WhatIBrewWithScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getText } = useLanguage();
  const { theme } = useTheme();

  const renderEquipment = ({ item }: { item: Equipment }) => (
    <TouchableOpacity
      style={[styles.equipmentCard, { 
        backgroundColor: theme.colors.surface.primary,
        shadowColor: theme.colors.text.primary,
      }]}
      onPress={() => navigation.navigate('EquipmentDetail', { id: item.id })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.equipmentImage} />
      <View style={styles.equipmentInfo}>
        <Text style={[styles.equipmentTitle, { color: theme.colors.text.primary }]}>
          {item.title}
        </Text>
        <Text style={[styles.equipmentType, { color: theme.colors.text.secondary }]}>
          {getText(`equipment.type.${item.type}`)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header
        title={getText('myEquipment')}
        showBack
        onBack={() => navigation.goBack()}
        rightIcon="delete"
        onRightPress={() => navigation.navigate('DeleteEquipment', { id: '' })}
      />
      <FlatList
        data={equipmentList}
        renderItem={renderEquipment}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.colors.primary.main }]}
        onPress={() => navigation.navigate('CreateEquipment')}
      >
        <Icon name="add" size={24} color={theme.colors.primary.contrastText} />
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
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
  equipmentTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
}); 