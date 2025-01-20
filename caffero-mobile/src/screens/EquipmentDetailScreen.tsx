import React from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';

type RouteProps = NativeStackScreenProps<RootStackParamList, 'EquipmentDetail'>['route'];
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');

// Dummy data - replace with API call
const getEquipment = (id: string) => ({
  id,
  title: 'My Chemex',
  type: 'Dripper',
  kind: 'Chemex',
  image: 'https://example.com/chemex-detail.jpg',
  description: 'The Chemex Coffeemaker is an elegant, one-piece, hourglass-shaped vessel made of high-quality, heat-resistant glass.',
  specifications: {
    capacity: '6 cups',
    material: 'Borosilicate Glass',
    filter: 'Chemex Bonded Filters',
  },
});

export const EquipmentDetailScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { id } = route.params;
  const { getText } = useLanguage();
  
  const equipment = getEquipment(id);

  return (
    <View style={styles.container}>
      <Header 
        title={getText('equipmentDetails')} 
        showBack 
        onBack={() => navigation.goBack()} 
      />
      <ScrollView style={styles.content}>
        <Image
          source={{ uri: equipment.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <Text style={styles.title}>{equipment.title}</Text>
          <View style={styles.typeContainer}>
            <Text style={styles.type}>{getText(`equipmentType.${equipment.type}`)}</Text>
            <Text style={styles.kind}>{getText(`equipmentKind.${equipment.kind}`)}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{getText('description')}</Text>
            <Text style={styles.description}>{getText(`equipmentDescription.${equipment.id}`)}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{getText('specifications')}</Text>
            {Object.entries(equipment.specifications).map(([key, value]) => (
              <View key={key} style={styles.specRow}>
                <Text style={styles.specLabel}>{getText(`spec${key}`)}</Text>
                <Text style={styles.specValue}>{value}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: width,
    height: width * 0.8,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  typeContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  type: {
    fontSize: 16,
    color: '#666',
    marginRight: 8,
  },
  kind: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  specLabel: {
    fontSize: 16,
    color: '#666',
    textTransform: 'capitalize',
  },
  specValue: {
    fontSize: 16,
    color: '#333',
  },
}); 