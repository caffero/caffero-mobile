import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Platform, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { spacing, borderRadius } from '../theme';
import { LanguageSelector } from '../components/LanguageSelector';
import Screen from '../components/Screen';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export const RegisterScreen: React.FC<Props> = ({ navigation }) => {
    const { theme } = useTheme();
    const { getText } = useLanguage();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();

    const handleRegister = async () => {
        try {
            await register(email, password, username);
            navigation.navigate('Otp');
        } catch (err) {
            setError(getText('registrationFailed'));
        }
    };

    return (
        <Screen>
            <View style={[
                styles.languageSelectorContainer,
                Platform.select({
                    ios: { top: 60 }, // Adjusted for iOS status bar + some padding
                    android: { top: 60 }, // Adjusted for Android
                })
            ]}>
                <LanguageSelector />
            </View>
            <View style={styles.content}>
                <TextInput
                    style={[
                        styles.input,
                        {
                            borderColor: theme.colors.border.primary,
                            backgroundColor: theme.colors.surface.primary,
                            color: theme.colors.text.primary,
                        }
                    ]}
                    placeholder={getText('email')}
                    placeholderTextColor={theme.colors.text.tertiary}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <TextInput
                    style={[
                        styles.input,
                        {
                            borderColor: theme.colors.border.primary,
                            backgroundColor: theme.colors.surface.primary,
                            color: theme.colors.text.primary,
                        }
                    ]}
                    placeholder={getText('username')}
                    placeholderTextColor={theme.colors.text.tertiary}
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={[
                        styles.input,
                        {
                            borderColor: theme.colors.border.primary,
                            backgroundColor: theme.colors.surface.primary,
                            color: theme.colors.text.primary,
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
                    style={[
                        styles.button,
                        styles.registerButton,
                        { backgroundColor: theme.colors.primary.main }
                    ]}
                    onPress={handleRegister}
                >
                    <Text style={[
                        styles.buttonText,
                        theme.typography.button.large,
                        { color: theme.colors.primary.contrastText }
                    ]}>
                        {getText('register')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.loginButton]}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={[
                        styles.buttonText,
                        theme.typography.body.medium,
                        { color: theme.colors.primary.main }
                    ]}>
                        {getText('haveAccountLogin')}
                    </Text>
                </TouchableOpacity>
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: spacing.lg,
    },
    languageSelectorContainer: {
        position: 'absolute',
        right: spacing.lg,
        zIndex: 1,
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
    button: {
        padding: spacing.md,
        borderRadius: borderRadius.md,
        minHeight: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: spacing.xs,
    },
    buttonText: {
        textAlign: 'center',
    },
    registerButton: {
        marginTop: spacing.lg,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    loginButton: {
        marginTop: spacing.md,
    },
}); 