import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Header } from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { spacing } from '../theme';

export const NotificationSettingsScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { getText } = useLanguage();
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
    // TODO: Implement save logic
    setHasChanges(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header title={getText('manageNotifications')} showBack />
      <View style={[styles.content, { padding: theme.spacing.md }]}>
        <View style={[
          styles.section,
          {
            backgroundColor: theme.colors.surface.primary,
            borderRadius: theme.borderRadius.md,
            ...theme.shadows.small,
          }
        ]}>
          <View style={[styles.row, { borderBottomColor: theme.colors.border.primary }]}>
            <Text style={[
              styles.label,
              theme.typography.body1,
              { color: theme.colors.text.primary }
            ]}>
              {getText('pushNotifications')}
            </Text>
            <Switch
              value={pushEnabled}
              onValueChange={(value) => handleToggle('push', value)}
              trackColor={{
                false: theme.colors.border.primary,
                true: theme.colors.primary.main,
              }}
              thumbColor={theme.colors.background.primary}
            />
          </View>
          <View style={[styles.row, { borderBottomColor: theme.colors.border.primary }]}>
            <Text style={[
              styles.label,
              theme.typography.body1,
              { color: theme.colors.text.primary }
            ]}>
              {getText('emailNotifications')}
            </Text>
            <Switch
              value={emailEnabled}
              onValueChange={(value) => handleToggle('email', value)}
              trackColor={{
                false: theme.colors.border.primary,
                true: theme.colors.primary.main,
              }}
              thumbColor={theme.colors.background.primary}
            />
          </View>
          <View style={[styles.row, { borderBottomColor: theme.colors.border.primary }]}>
            <Text style={[
              styles.label,
              theme.typography.body1,
              { color: theme.colors.text.primary }
            ]}>
              {getText('smsNotifications')}
            </Text>
            <Switch
              value={smsEnabled}
              onValueChange={(value) => handleToggle('sms', value)}
              trackColor={{
                false: theme.colors.border.primary,
                true: theme.colors.primary.main,
              }}
              thumbColor={theme.colors.background.primary}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            {
              backgroundColor: hasChanges ? theme.colors.primary.main : theme.colors.disabled.main,
              borderRadius: theme.borderRadius.md,
            }
          ]}
          onPress={handleSubmit}
          disabled={!hasChanges}
        >
          <Text style={[
            styles.submitButtonText,
            theme.typography.button,
            { color: hasChanges ? theme.colors.primary.contrastText : theme.colors.disabled.contrastText }
          ]}>
            {getText('saveChanges')}
          </Text>
        </TouchableOpacity>
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
  },
  section: {
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
  },
  label: {
    flex: 1,
    marginRight: spacing.md,
  },
  submitButton: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  submitButtonText: {
    textAlign: 'center',
  },
}); 