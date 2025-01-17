import React from 'react';
import { 
  View, 
  ScrollView, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import { Header } from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigator } from '../navigation/types';
import { useAuth } from '../contexts/AuthContext';

interface SettingsTabProps {
  title: string;
  onPress: () => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ title, onPress }) => (
  <TouchableOpacity style={styles.settingsTab} onPress={onPress}>
    <Text style={styles.settingsTabText}>{title}</Text>
  </TouchableOpacity>
);

export const ProfileScreen = () => {
  const navigation = useNavigation<RootStackNavigator>();
  const { user, logout } = useAuth();
  const isPremium = false; // This should come from your auth context or API

  const settingsTabs = [
    { id: 'edit-profile', title: 'Edit Profile' },
    { id: 'app-settings', title: 'Application Settings' },
    { id: 'notifications', title: 'Notification Settings' },
    { id: 'privacy', title: 'Personal Info Usage' },
    { id: 'contact', title: 'Contact Us' },
    { id: 'logout', title: 'Logout' },
  ];

  const handleTabPress = (tabId: string) => {
    switch (tabId) {
      case 'edit-profile':
        navigation.navigate('EditProfile');
        break;
      case 'app-settings':
        navigation.navigate('AppSettings');
        break;
      case 'notifications':
        navigation.navigate('NotificationSettings');
        break;
      case 'privacy':
        navigation.navigate('Privacy');
        break;
      case 'contact':
        navigation.navigate('ContactUs');
        break;
      case 'logout':
        logout();
        break;
      default:
        console.log(`Navigate to ${tabId}`);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Caffero" />
      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: 'https://example.com/default-avatar.jpg' }}
            style={styles.profileImage}
          />
          <Text style={styles.username}>{user?.username || 'User'}</Text>
          <Text style={styles.email}>{user?.email || 'email@example.com'}</Text>
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>
              {isPremium ? 'Premium User' : 'Free User'}
            </Text>
          </View>
        </View>

        <View style={styles.settingsContainer}>
          {settingsTabs.map((tab) => (
            <SettingsTab
              key={tab.id}
              title={tab.title}
              onPress={() => handleTabPress(tab.id)}
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
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  premiumBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  premiumText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  settingsContainer: {
    padding: 16,
  },
  settingsTab: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingsTabText: {
    fontSize: 16,
  },
}); 