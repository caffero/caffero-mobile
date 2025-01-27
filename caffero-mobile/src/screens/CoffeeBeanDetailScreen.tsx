import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Header } from '../components/Header';
import Screen from '../components/Screen';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'CoffeeBeanDetail'>;

export const CoffeeBeanDetailScreen = ({ route }: Props) => {
  const { theme } = useTheme();
  const { getText } = useLanguage();
  const { id } = route.params;

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header title={getText('coffeeBeanDetail')} showBack />
      <View style={[styles.content, { backgroundColor: theme.colors.surface.primary }]}>
        <Text style={[styles.text, { color: theme.colors.text.primary }]}>
          {`Coffee Bean ID: ${id}`}
        </Text>
      </View>
    </Screen>
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