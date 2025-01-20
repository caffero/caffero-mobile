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

  const renderEquipment = ({ item }: { item: Equipment }) => (
    <TouchableOpacity
      style={styles.equipmentCard}
      onPress={() => navigation.navigate('EquipmentDetail', { id: item.id })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.equipmentImage} />
      <View style={styles.equipmentInfo}>
        <Text style={styles.equipmentTitle}>{item.title}</Text>
        <Text style={styles.equipmentType}>{getText(`equipment.type.${item.type}`)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header
        title={getText('myEquipment')}
        showBack
        onBack={() => navigation.goBack()}
        rightIcon="delete"
        onRightPress={() => navigation.navigate('DeleteEquipment')}
      />
      <FlatList
        data={equipmentList}
        renderItem={renderEquipment}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateEquipment')}
      >
        <Icon name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    padding: 8,
  },
  equipmentCard: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
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
    color: '#666',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
}); 