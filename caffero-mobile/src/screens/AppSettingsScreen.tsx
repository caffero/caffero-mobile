import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, Platform } from 'react-native';
import { Header } from '../components/Header';

export const AppSettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const appInfo = {
    version: '1.0.0',
    buildNumber: '100',
    environment: __DEV__ ? 'Development' : 'Production',
    platform: Platform.OS,
  };

  return (
    <View style={styles.container}>
      <Header title="App Settings" showBack />
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Theme</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Dark Mode</Text>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Information</Text>
          {Object.entries(appInfo).map(([key, value]) => (
            <View key={key} style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
              <Text style={styles.infoValue}>{value}</Text>
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
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    marginBottom: 16,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    color: '#444',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#444',
  },
  infoValue: {
    fontSize: 16,
    color: '#666',
  },
}); 