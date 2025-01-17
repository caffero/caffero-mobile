import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Header } from '../components/Header';
import { useNavigation } from '@react-navigation/native';

export const NotificationSettingsScreen = () => {
  const navigation = useNavigation();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleToggle = (type: 'push' | 'email' | 'sms', value: boolean) => {
    setHasChanges(true);
    switch (type) {
      case 'push':
        setPushEnabled(value);
        break;
      case 'email':
        setEmailEnabled(value);
        break;
      case 'sms':
        setSmsEnabled(value);
        break;
    }
  };

  const handleSubmit = () => {
    // TODO: Implement saving notification preferences
    setHasChanges(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header title="Manage Notifications" showBack />
      <View style={styles.content}>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Push Notifications</Text>
            <Switch
              value={pushEnabled}
              onValueChange={(value) => handleToggle('push', value)}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email Notifications</Text>
            <Switch
              value={emailEnabled}
              onValueChange={(value) => handleToggle('email', value)}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>SMS Notifications</Text>
            <Switch
              value={smsEnabled}
              onValueChange={(value) => handleToggle('sms', value)}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, !hasChanges && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={!hasChanges}
        >
          <Text style={styles.submitButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
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
    padding: 16,
  },
  section: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 