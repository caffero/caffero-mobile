import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Header } from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigator } from '../navigation/types';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { spacing } from '../theme';
import { useLanguage } from '../contexts/LanguageContext';

interface SettingsTabProps {
  title: string;
  onPress: () => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ title, onPress }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity 
      style={[styles.settingsTab, { borderBottomColor: theme.colors.border.primary }]} 
      onPress={onPress}
    >
      <Text style={[
        styles.settingsTabText,
        theme.typography.body1,
        { color: theme.colors.text.primary }
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const ProfileScreen = () => {
  const navigation = useNavigation<RootStackNavigator>();
  const { theme } = useTheme();
  const { getText } = useLanguage();
  const { user, logout } = useAuth();
  const isPremium = false;

  const settingsTabs = [
    {
      title: 'Edit Profile',
      onPress: () => navigation.navigate('EditProfile'),
    },
    {
      title: 'App Settings',
      onPress: () => navigation.navigate('AppSettings'),
    },
    {
      title: 'Notification Settings',
      onPress: () => navigation.navigate('NotificationSettings'),
    },
    {
      title: 'Privacy',
      onPress: () => navigation.navigate('Privacy'),
    },
    {
      title: 'Contact Us',
      onPress: () => navigation.navigate('ContactUs'),
    },
    {
      title: 'Logout',
      onPress: logout,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header title={getText('profile')} />
      <ScrollView style={styles.content}>
        <View style={[styles.profileHeader, { borderBottomColor: theme.colors.border.primary }]}>
          <Image
            source={{ uri: 'https://example.com/default-avatar.jpg' }}
            style={styles.profileImage}
          />
          <Text style={[
            styles.username,
            theme.typography.h1,
            { color: theme.colors.text.primary }
          ]}>
            {user?.username || getText('defaultUsername')}
          </Text>
          <Text style={[
            styles.email,
            theme.typography.body1,
            { color: theme.colors.text.secondary }
          ]}>
            {user?.email || getText('defaultEmail')}
          </Text>
          <View style={[
            styles.premiumBadge,
            {
              backgroundColor: theme.colors.primary.main,
              borderRadius: theme.borderRadius.round,
            }
          ]}>
            <Text style={[
              styles.premiumText,
              theme.typography.button,
              { color: theme.colors.primary.contrastText }
            ]}>
              {isPremium ? getText('premiumUser') : getText('freeUser')}
            </Text>
          </View>
        </View>

        <View style={styles.settingsContainer}>
          {settingsTabs.map((tab, index) => (
            <SettingsTab
              key={index}
              title={tab.title}
              onPress={tab.onPress}
            />
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
  profileHeader: {
    padding: spacing.lg,
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: spacing.md,
  },
  username: {
    marginBottom: spacing.xs,
  },
  email: {
    marginBottom: spacing.md,
  },
  premiumBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  premiumText: {
    textAlign: 'center',
  },
  settingsContainer: {
    paddingTop: spacing.md,
  },
  settingsTab: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
  },
  settingsTabText: {
    fontSize: 16,
  },
}); 