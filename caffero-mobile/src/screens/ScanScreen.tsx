import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigator } from '../navigation/types';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { spacing } from '../theme';
import Screen from '../components/Screen';

export const ScanScreen = () => {
  const navigation = useNavigation<RootStackNavigator>();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const { theme } = useTheme();
  const { getText } = useLanguage();

  React.useEffect(() => {
    // TODO: Request camera permissions
    setHasPermission(false);
  }, []);

  if (hasPermission === null) {
    return (
      <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
        <View style={styles.content} />
      </Screen>
    );
  }

  if (hasPermission === false) {
    return (
      <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
        <Header title={getText('scan')} />
        <View style={[styles.content, { padding: theme.spacing.md }]}>
          <Text style={[
            theme.typography.body1,
            { color: theme.colors.text.primary }
          ]}>
            {getText('noCameraAccess')}
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header title={getText('scan')} />
      <View style={[styles.content, { padding: theme.spacing.md }]}>
        {/* Camera view will go here */}
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
  },
}); 