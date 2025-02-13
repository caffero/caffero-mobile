import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { spacing, borderRadius } from '../theme';
import Screen from '../components/Screen';

type Props = NativeStackScreenProps<RootStackParamList, 'Otp'>;

export const OtpScreen: React.FC<Props> = ({ navigation }) => {
    const { theme } = useTheme();
    const { getText } = useLanguage();
    const { verifyOtp, verifyOtpAndLogin, isRegistered, passwordForgotten } = useAuth();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const inputRefs = useRef<Array<TextInput | null>>([]);

    const handleOtpChange = (value: string, index: number) => {
        if (value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move to next input if value is entered
            if (value !== '' && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async () => {
        try {
            const otpString = otp.join('');
            
            
            if (isRegistered) {
                // User just registered, they will be automatically logged in
                // Navigation component will handle the redirection based on user state
                await verifyOtpAndLogin(otpString);
            } else if (passwordForgotten) {
                // User is resetting their forgotten password
                await verifyOtp(otpString);
                navigation.navigate('ResetForgottenPassword');
            }
        } catch (err) {
            setError(getText('otpVerificationFailed'));
        }
    };

    return (
        <Screen style={styles.container}>
            <Text style={[
                styles.title,
                theme.typography.title1,
                { color: theme.colors.text.primary }
            ]}>
                {getText('confirmOtp')}
            </Text>

            <Text style={[
                styles.subheader,
                theme.typography.body.medium,
                { color: theme.colors.text.secondary }
            ]}>
                {getText('checkEmailForOtp')}
            </Text>

            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={ref => inputRefs.current[index] = ref}
                        style={[
                            styles.otpInput,
                            {
                                backgroundColor: theme.colors.surface.primary,
                                borderColor: theme.colors.border.primary,
                                color: theme.colors.text.primary
                            }
                        ]}
                        value={digit}
                        onChangeText={(value) => handleOtpChange(value, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        keyboardType="numeric"
                        maxLength={1}
                        selectTextOnFocus
                    />
                ))}
            </View>

            {error ? (
                <Text style={[
                    styles.error,
                    theme.typography.body.medium,
                    { color: theme.colors.status.error }
                ]}>
                    {error}
                </Text>
            ) : null}

            <TouchableOpacity
                style={[
                    styles.submitButton,
                    { backgroundColor: theme.colors.primary.main }
                ]}
                onPress={handleSubmit}
            >
                <Text style={[
                    styles.submitButtonText,
                    theme.typography.button.large,
                    { color: theme.colors.text.inverse }
                ]}>
                    {getText('submit')}
                </Text>
            </TouchableOpacity>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    subtitle: {
        marginBottom: spacing.xl,
        textAlign: 'center',
    },
    subheader: {
        marginBottom: spacing.lg,
        textAlign: 'center',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: spacing.xl,
    },
    otpInput: {
        width: 45,
        height: 45,
        borderWidth: 1,
        borderRadius: borderRadius.sm,
        textAlign: 'center',
        marginHorizontal: spacing.xs,
        fontSize: 20,
    },
    submitButton: {
        width: '100%',
        padding: spacing.md,
        borderRadius: borderRadius.md,
        alignItems: 'center',
    },
    submitButtonText: {
        textAlign: 'center',
    },
    error: {
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
}); 