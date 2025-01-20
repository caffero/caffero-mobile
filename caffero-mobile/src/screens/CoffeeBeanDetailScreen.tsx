import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from '../components/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type RouteProps = NativeStackScreenProps<RootStackParamList, 'CoffeeBeanDetail'>['route'];

export const CoffeeBeanDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProps>();
  const { id } = route.params;

  return (
    <View style={styles.container}>
      <Header 
        title="Coffee Bean Details" 
        showBack 
        onBack={() => navigation.goBack()} 
      />
      <View style={styles.content}>
        <Text>Coffee Bean Detail Screen - ID: {id}</Text>
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 