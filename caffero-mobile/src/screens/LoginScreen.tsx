import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Platform, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { spacing, borderRadius } from '../theme';
import { LanguageSelector } from '../components/LanguageSelector';
import Screen from '../components/Screen';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const { theme } = useTheme();
    const { getText } = useLanguage();

    const handleLogin = async () => {
        try {
            await login(email, password);
        } catch (err) {
            setError(getText('loginFailed'));
        }
    };

    return (
        <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
            <View style={styles.content}>
                <Text style={[
                    styles.title,
                    theme.typography.title1,
                    { color: theme.colors.text.primary }
                ]}>
                    {getText('login')}
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
                    placeholder={getText('email')}
                    placeholderTextColor={theme.colors.text.tertiary}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
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
                    placeholder={getText('password')}
                    placeholderTextColor={theme.colors.text.tertiary}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

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
                    style={[styles.loginButton, { backgroundColor: theme.colors.primary.main }]}
                    onPress={handleLogin}
                >
                    <Text style={[
                        styles.loginButtonText,
                        theme.typography.button.large,
                        { color: theme.colors.primary.contrastText }
                    ]}>
                        {getText('login')}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.forgotPasswordButton}
                    onPress={() => navigation.navigate('ForgotPassword')}
                >
                    <Text style={[
                        styles.forgotPasswordText,
                        theme.typography.body.medium,
                        { color: theme.colors.primary.main }
                    ]}>
                        {getText('forgotPassword')}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={[
                        styles.registerButtonText,
                        theme.typography.body.medium,
                        { color: theme.colors.text.secondary }
                    ]}>
                        {getText('noAccountRegister')}
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
        justifyContent: 'center',
        padding: spacing.lg,
    },
    title: {
        marginBottom: spacing.md,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderWidth: 1,
        marginBottom: spacing.md,
        paddingHorizontal: spacing.sm,
        borderRadius: borderRadius.sm,
    },
    error: {
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    loginButton: {
        marginTop: spacing.md,
        alignItems: 'center',
    },
    loginButtonText: {
        textAlign: 'center',
    },
    forgotPasswordButton: {
        marginTop: spacing.md,
        alignItems: 'center',
    },
    forgotPasswordText: {
        textAlign: 'center',
    },
    registerButton: {
        marginTop: spacing.lg,
        alignItems: 'center',
    },
    registerButtonText: {
        textAlign: 'center',
    },
}); 