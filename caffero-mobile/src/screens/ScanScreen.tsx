import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigator } from '../navigation/types';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { spacing } from '../theme';

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
      <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]} />
    );
  }

  if (hasPermission === false) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
        <Header title={getText('scan')} />
        <View style={[styles.content, { padding: theme.spacing.md }]}>
          <Text style={[
            theme.typography.body1,
            { color: theme.colors.text.primary }
          ]}>
            {getText('noCameraAccess')}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header title={getText('scan')} />
      <View style={[styles.content, { padding: theme.spacing.md }]}>
        {/* Camera view will go here */}
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
  },
}); 