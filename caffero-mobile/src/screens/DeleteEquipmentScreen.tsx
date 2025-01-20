import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from 'react-native';
import { Header } from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

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
  // Add more items...
];

export const DeleteEquipmentScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getText } = useLanguage();
  const { theme } = useTheme();
  const [selectedEquipment, setSelectedEquipment] = useState<Set<string>>(new Set());

  const toggleEquipmentSelection = (id: string) => {
    const newSelection = new Set(selectedEquipment);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedEquipment(newSelection);
  };

  const handleDelete = () => {
    if (selectedEquipment.size === 0) {
      Alert.alert(getText('error'), getText('deleteError'));
      return;
    }

    Alert.alert(
      getText('confirmDelete'),
      getText('confirmDeleteMessage').replace('{count}', selectedEquipment.size.toString()),
      [
        { text: getText('cancel'), style: 'cancel' },
        {
          text: getText('delete'),
          style: 'destructive',
          onPress: () => {
            // Delete logic here
            Alert.alert(
              getText('success'),
              getText('itemsDeleted'),
              [{ text: getText('ok'), onPress: () => navigation.goBack() }]
            );
          },
        },
      ]
    );
  };

  const renderEquipment = ({ item }: { item: Equipment }) => (
    <TouchableOpacity
      style={[styles.equipmentCard, { 
        backgroundColor: theme.colors.surface.primary,
        shadowColor: theme.colors.text.primary,
      }]}
      onPress={() => toggleEquipmentSelection(item.id)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.equipmentImage} />
      <View style={styles.equipmentInfo}>
        <Text style={[styles.equipmentTitle, { color: theme.colors.text.primary }]}>
          {item.title}
        </Text>
        <Text style={[styles.equipmentType, { color: theme.colors.text.secondary }]}>
          {getText(`equipmentType.${item.type}`)}
        </Text>
      </View>
      <View style={[styles.checkboxContainer, { backgroundColor: theme.colors.surface.primary }]}>
        <Icon
          name={selectedEquipment.has(item.id) ? 'check-box' : 'check-box-outline-blank'}
          size={24}
          color={selectedEquipment.has(item.id) ? theme.colors.primary.main : theme.colors.text.secondary}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header
        title="Delete Equipment"
        showBack
        onBack={() => navigation.goBack()}
      />
      <FlatList
        data={equipmentList}
        renderItem={renderEquipment}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity
        style={[
          styles.deleteButton,
          { 
            backgroundColor: theme.colors.status.error,
            opacity: selectedEquipment.size > 0 ? 1 : 0.5 
          }
        ]}
        onPress={handleDelete}
        disabled={selectedEquipment.size === 0}
      >
        <Text style={[styles.deleteButtonText, { color: theme.colors.text.inverse }]}>
          {getText('delete')}
        </Text>
      </TouchableOpacity>
    </View>
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
}); 