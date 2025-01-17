import React from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, Platform } from 'react-native';
import { Header } from '../components/Header';
import { useTheme } from '../contexts/ThemeContext';
import { spacing, typography, borderRadius, shadows } from '../theme';

export const AppSettingsScreen = () => {
  const { theme, isDark, toggleTheme } = useTheme();

  const appInfo = {
    version: '1.0.0',
    buildNumber: '100',
    environment: __DEV__ ? 'Development' : 'Production',
    platform: Platform.OS,
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header title="App Settings" showBack />
      <ScrollView style={styles.content}>
        <View style={[styles.section, { backgroundColor: theme.colors.surface.secondary }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>Theme</Text>
          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.colors.text.primary }]}>Dark Mode</Text>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: theme.colors.border.primary, true: theme.colors.vibrantAqua }}
              thumbColor={isDark ? theme.colors.background.primary : theme.colors.background.primary}
            />
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.surface.secondary }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>App Information</Text>
          {Object.entries(appInfo).map(([key, value]) => (
            <View key={key} style={[styles.infoRow, { borderBottomColor: theme.colors.border.primary }]}>
              <Text style={[styles.infoLabel, { color: theme.colors.text.primary }]}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
              <Text style={[styles.infoValue, { color: theme.colors.text.secondary }]}>{value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: spacing.md,
    marginBottom: spacing.md,
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    ...shadows.small,
  },
  sectionTitle: {
    ...typography.title3,
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  label: {
    ...typography.body.large,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
  },
  infoLabel: {
    ...typography.body.large,
  },
  infoValue: {
    ...typography.body.large,
  },
}); 