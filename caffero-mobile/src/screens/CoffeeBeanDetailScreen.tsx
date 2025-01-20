import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from '../components/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

type RouteProps = NativeStackScreenProps<RootStackParamList, 'CoffeeBeanDetail'>['route'];

export const CoffeeBeanDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProps>();
  const { id } = route.params;
  const { theme } = useTheme();
  const { getText } = useLanguage();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header 
        title={getText('coffeeBeanDetails')} 
        showBack 
        onBack={() => navigation.goBack()} 
      />
      <View style={[styles.content, { backgroundColor: theme.colors.surface.secondary }]}>
        <Text style={[styles.text, { color: theme.colors.text.primary }]}>
          Coffee Bean Detail Screen - ID: {id}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
  },
}); 