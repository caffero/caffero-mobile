import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import Screen from '../components/Screen';
import { useTheme } from '../contexts/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'RoasteryDetail'>;

export const RoasteryDetailScreen = ({ route }: Props) => {
  const { id } = route.params;
  const { theme } = useTheme();

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <View style={styles.content}>
        <Text style={[styles.text, { color: theme.colors.text.primary }]}>
          Roastery ID: {id}
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
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
}); 