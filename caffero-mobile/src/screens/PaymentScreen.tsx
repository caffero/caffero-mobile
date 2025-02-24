import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Header } from '../components/Header';
import Screen from '../components/Screen';
import { spacing, borderRadius } from '../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface PaymentForm {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export const PaymentScreen = () => {
  const { theme } = useTheme();
  const { getText } = useLanguage();
  const navigation = useNavigation();

  const [form, setForm] = useState<PaymentForm>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const groups = numbers.match(/.{1,4}/g);
    return groups ? groups.join(' ') : numbers;
  };

  const formatExpiryDate = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length >= 2) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`;
    }
    return numbers;
  };

  const handleSubmit = () => {
    // Validate form
    if (!form.cardNumber || !form.cardHolder || !form.expiryDate || !form.cvv) {
      Alert.alert(
        getText('error'),
        getText('fillAllFields'),
        [{ text: getText('ok') }]
      );
      return;
    }

    // In a real app, you would:
    // 1. Validate the card details
    // 2. Send to a payment processor
    // 3. Handle the response
    // 4. Update the user's subscription status

    Alert.alert(
      getText('success'),
      getText('paymentSuccess'),
      [
        {
          text: getText('ok'),
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header
        title={getText('payment')}
        showBackButton
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formSection}>
          <View style={styles.premiumInfo}>
            <Icon name="crown" size={32} color={theme.colors.primary.main} />
            <Text style={[styles.premiumTitle, { color: theme.colors.text.primary }]}>
              {getText('premiumMembership')}
            </Text>
            <Text style={[styles.premiumPrice, { color: theme.colors.primary.main }]}>
              $9.99 / {getText('month')}
            </Text>
            <Text style={[styles.premiumDescription, { color: theme.colors.text.secondary }]}>
              {getText('premiumDescription')}
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text.secondary }]}>
              {getText('cardNumber')}
            </Text>
            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: theme.colors.background.secondary,
                  color: theme.colors.text.primary,
                },
              ]}
              value={form.cardNumber}
              onChangeText={(value) => setForm({ ...form, cardNumber: formatCardNumber(value) })}
              placeholder="1234 5678 9012 3456"
              placeholderTextColor={theme.colors.text.tertiary}
              keyboardType="numeric"
              maxLength={19}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text.secondary }]}>
              {getText('cardHolder')}
            </Text>
            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: theme.colors.background.secondary,
                  color: theme.colors.text.primary,
                },
              ]}
              value={form.cardHolder}
              onChangeText={(value) => setForm({ ...form, cardHolder: value.toUpperCase() })}
              placeholder={getText('cardHolderPlaceholder')}
              placeholderTextColor={theme.colors.text.tertiary}
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: spacing.md }]}>
              <Text style={[styles.label, { color: theme.colors.text.secondary }]}>
                {getText('expiryDate')}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { 
                    backgroundColor: theme.colors.background.secondary,
                    color: theme.colors.text.primary,
                  },
                ]}
                value={form.expiryDate}
                onChangeText={(value) => setForm({ ...form, expiryDate: formatExpiryDate(value) })}
                placeholder="MM/YY"
                placeholderTextColor={theme.colors.text.disabled}
                keyboardType="numeric"
                maxLength={5}
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={[styles.label, { color: theme.colors.text.secondary }]}>
                {getText('cvv')}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { 
                    backgroundColor: theme.colors.background.secondary,
                    color: theme.colors.text.primary,
                  },
                ]}
                value={form.cvv}
                onChangeText={(value) => setForm({ ...form, cvv: value })}
                placeholder="123"
                placeholderTextColor={theme.colors.text.disabled}
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
              />
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: theme.colors.primary.main }]}
            onPress={handleSubmit}
          >
            <Text style={[styles.submitButtonText, { color: '#FFFFFF' }]}>
              {getText('subscribe')}
            </Text>
          </TouchableOpacity>
          <Text style={[styles.secureText, { color: theme.colors.text.secondary }]}>
            <Icon name="shield-check" size={16} color={theme.colors.text.secondary} />
            {' '}{getText('securePayment')}
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  formSection: {
    padding: spacing.lg,
  },
  premiumInfo: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  premiumTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  premiumPrice: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: spacing.md,
  },
  premiumDescription: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 14,
    marginBottom: spacing.xs,
  },
  input: {
    height: 48,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
  },
  footer: {
    padding: spacing.lg,
  },
  submitButton: {
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  secureText: {
    fontSize: 14,
    textAlign: 'center',
  },
}); 