import React from 'react';
import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'CoffeeBeanDetail'>;

export const CoffeeBeanDetailScreen: React.FC<Props> = ({ route }) => {
  const { id } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Coffee Bean Detail Screen - ID: {id}</Text>
    </View>
  );
}; 