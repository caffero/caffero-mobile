import React, { useState } from 'react';
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

type Props = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;

export const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { getText } = useLanguage();
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    if (!email.trim()) {
      Alert.alert(getText('error'), getText('enterEmail'));
      return;
    }

    try {
      await forgotPassword(email);
      navigation.navigate('Otp');
    } catch (error) {
      Alert.alert(getText('error'), error instanceof Error ? error.message : getText('error'));
    }
  };

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header 
        title={getText('forgotPassword')} 
        showBack 
        onBack={() => navigation.goBack()} 
      />
      <View style={styles.content}>
        <Text style={[
          styles.description,
          theme.typography.body.large,
          { color: theme.colors.text.primary }
        ]}>
          {getText('forgotPasswordDescription')}
        </Text>

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.surface.primary,
              borderColor: theme.colors.border.primary,
              color: theme.colors.text.primary
            }
          ]}
          placeholder={getText('enterEmail')}
          placeholderTextColor={theme.colors.text.tertiary}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
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
  description: {
    marginBottom: spacing.xl,
    textAlign: 'center',
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