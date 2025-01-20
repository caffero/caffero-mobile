import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../components/Header';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

export const PrivacyScreen = () => {
  const { theme } = useTheme();
  const { getText } = useLanguage();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header title={getText('managePersonalInfo')} showBack />
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            {getText('privacyPolicy')}
          </Text>
          <Text style={[styles.paragraph, { color: theme.colors.text.secondary }]}>
            {getText('privacyPolicyIntro')}
          </Text>
          
          <Text style={[styles.subtitle, { color: theme.colors.text.primary }]}>
            {getText('informationCollection')}
          </Text>
          <Text style={[styles.paragraph, { color: theme.colors.text.secondary }]}>
            {getText('informationCollectionText')}
          </Text>

          <Text style={[styles.subtitle, { color: theme.colors.text.primary }]}>
            {getText('howWeUseInfo')}
          </Text>
          <Text style={[styles.paragraph, { color: theme.colors.text.secondary }]}>
            {getText('howWeUseInfoText')}
          </Text>

          <Text style={[styles.subtitle, { color: theme.colors.text.primary }]}>
            {getText('dataProtection')}
          </Text>
          <Text style={[styles.paragraph, { color: theme.colors.text.secondary }]}>
            {getText('dataProtectionText')}
          </Text>

          <Text style={[styles.subtitle, { color: theme.colors.text.primary }]}>
            {getText('yourRights')}
          </Text>
          <Text style={[styles.paragraph, { color: theme.colors.text.secondary }]}>
            {getText('yourRightsText')}
          </Text>

          <Text style={[styles.footer, { color: theme.colors.text.tertiary }]}>
            {getText('lastUpdated')}
          </Text>
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
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  footer: {
    marginTop: 32,
    fontSize: 14,
    textAlign: 'center',
  },
}); 