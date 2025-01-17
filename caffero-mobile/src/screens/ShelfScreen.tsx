import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Header } from '../components/Header';
import { ShelfItem } from '../components/ShelfItem';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigator } from '../navigation/types';

interface ShelfItemType {
  id: string;
  title: string;
  image: string;
  route: keyof RootStackParamList;
  params?: any;
}

const shelfItems: ShelfItemType[] = [
  {
    id: 'what-i-brew',
    title: 'What I Brew',
    image: 'https://example.com/coffee-beans.jpg',
    route: 'WhatIBrew',
    params: undefined,
  },
  {
    id: 'what-i-brew-with',
    title: 'What I Brew With',
    image: 'https://example.com/equipment.jpg',
    route: 'WhatIBrewWith',
    params: undefined,
  },
  {
    id: 'how-i-brew',
    title: 'How I Brew',
    image: 'https://example.com/brewing.jpg',
    route: 'HowIBrew',
    params: undefined,
  },
];

export const ShelfScreen = () => {
  const navigation = useNavigation<RootStackNavigator>();

  return (
    <View style={styles.container}>
      <Header title="My Shelf" />
      <ScrollView style={styles.content}>
        {shelfItems.map((item) => (
          <ShelfItem
            key={item.id}
            title={item.title}
            backgroundImage={item.image}
            onPress={() => navigation.navigate(item.route, item.params)}
          />
        ))}
      </ScrollView>
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
    paddingVertical: 16,
  },
}); 