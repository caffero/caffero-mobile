import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import Screen from '../../components/Screen';
import { Header } from '../../components/Header';
import { spacing, borderRadius } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ResetPassword'>;

export const ResetPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { getText } = useLanguage();
  const { resetPassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    if (!currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      Alert.alert(getText('error'), getText('fillAllFields'));
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert(getText('error'), getText('passwordsDontMatch'));
      return;
    }

    try {
      await resetPassword(currentPassword, newPassword);
      Alert.alert(
        getText('success'),
        getText('passwordChangeSuccess'),
        [
          {
            text: getText('ok'),
            onPress: () => navigation.navigate('EditProfile')
          }
        ]
      );
    } catch (error) {
      Alert.alert(getText('error'), error instanceof Error ? error.message : getText('error'));
    }
  };

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header 
        title={getText('resetPassword')} 
        showBack 
        onBack={() => navigation.goBack()} 
      />
      <View style={styles.content}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.surface.primary,
              borderColor: theme.colors.border.primary,
              color: theme.colors.text.primary
            }
          ]}
          placeholder={getText('enterCurrentPassword')}
          placeholderTextColor={theme.colors.text.tertiary}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
        />

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.surface.primary,
              borderColor: theme.colors.border.primary,
              color: theme.colors.text.primary
            }
          ]}
          placeholder={getText('enterNewPassword')}
          placeholderTextColor={theme.colors.text.tertiary}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.surface.primary,
              borderColor: theme.colors.border.primary,
              color: theme.colors.text.primary
            }
          ]}
          placeholder={getText('confirmNewPassword')}
          placeholderTextColor={theme.colors.text.tertiary}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: theme.colors.primary.main }]}
          onPress={handleSubmit}
        >
          <Text style={[
            styles.submitButtonText,
            theme.typography.button.large,
            { color: theme.colors.primary.contrastText }
          ]}>
            {getText('submit')}
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  submitButton: {
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    textAlign: 'center',
  },
}); 