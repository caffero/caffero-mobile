import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../components/Header';
import { useTheme } from '../contexts/ThemeContext';

export const PrivacyScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header title="Manage Personal Info Usage" showBack />
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Privacy Policy
          </Text>
          <Text style={[styles.paragraph, { color: theme.colors.text.secondary }]}>
            At Caffero, we take your privacy seriously. This notice explains how we collect,
            use, and protect your personal information.
          </Text>
          
          <Text style={[styles.subtitle, { color: theme.colors.text.primary }]}>
            Information Collection
          </Text>
          <Text style={[styles.paragraph, { color: theme.colors.text.secondary }]}>
            We collect information that you provide directly to us, including your name,
            email address, and coffee preferences. We also collect data about your coffee
            brewing habits and equipment usage to enhance your experience.
          </Text>

          <Text style={[styles.subtitle, { color: theme.colors.text.primary }]}>
            How We Use Your Information
          </Text>
          <Text style={[styles.paragraph, { color: theme.colors.text.secondary }]}>
            Your information helps us personalize your coffee experience, provide
            brewing recommendations, and improve our services. We never sell your
            personal data to third parties.
          </Text>

          <Text style={[styles.subtitle, { color: theme.colors.text.primary }]}>
            Data Protection
          </Text>
          <Text style={[styles.paragraph, { color: theme.colors.text.secondary }]}>
            We implement industry-standard security measures to protect your data.
            Your information is encrypted and stored securely on our servers.
          </Text>

          <Text style={[styles.subtitle, { color: theme.colors.text.primary }]}>
            Your Rights
          </Text>
          <Text style={[styles.paragraph, { color: theme.colors.text.secondary }]}>
            You have the right to access, modify, or delete your personal information
            at any time. Contact our support team for assistance with managing your data.
          </Text>

          <Text style={[styles.footer, { color: theme.colors.text.tertiary }]}>
            Last updated: June 2023
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