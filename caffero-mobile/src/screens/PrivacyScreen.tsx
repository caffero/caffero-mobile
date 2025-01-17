import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../components/Header';

export const PrivacyScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Manage Personal Info Usage" showBack />
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.title}>Privacy Notice</Text>
          <Text style={styles.paragraph}>
            At Caffero, we take your privacy seriously. This notice explains how we collect,
            use, and protect your personal information.
          </Text>
          
          <Text style={styles.subtitle}>Information We Collect</Text>
          <Text style={styles.paragraph}>
            We collect information that you provide directly to us, including your name,
            email address, and coffee preferences. We also collect data about your coffee
            brewing habits and equipment usage to enhance your experience.
          </Text>

          <Text style={styles.subtitle}>How We Use Your Information</Text>
          <Text style={styles.paragraph}>
            Your information helps us personalize your coffee experience, provide
            brewing recommendations, and improve our services. We never sell your
            personal data to third parties.
          </Text>

          <Text style={styles.subtitle}>Data Protection</Text>
          <Text style={styles.paragraph}>
            We implement industry-standard security measures to protect your data.
            Your information is encrypted and stored securely on our servers.
          </Text>

          <Text style={styles.subtitle}>Your Rights</Text>
          <Text style={styles.paragraph}>
            You have the right to access, modify, or delete your personal information
            at any time. Contact our support team for assistance with managing your data.
          </Text>

          <Text style={styles.footer}>
            Last updated: March 2024
          </Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
    color: '#444',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 16,
  },
  footer: {
    marginTop: 32,
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
}); 