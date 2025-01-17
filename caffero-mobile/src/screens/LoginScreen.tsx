import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { spacing, borderRadius } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const { theme } = useTheme();

    const handleLogin = async () => {
        try {
            await login(email, password);
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
            <TextInput
                style={[
                    styles.input,
                    {
                        borderColor: theme.colors.border.primary,
                        backgroundColor: theme.colors.surface.primary,
                        color: theme.colors.text.primary,
                    }
                ]}
                placeholder="Email"
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
                placeholder="Password"
                placeholderTextColor={theme.colors.text.tertiary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {error ? (
                <Text style={[
                    styles.error,
                    theme.typography.body1,
                    { color: theme.colors.status.error }
                ]}>
                    {error}
                </Text>
            ) : null}
            <Button 
                title="Login" 
                onPress={handleLogin}
                color={theme.colors.primary.main}
            />
            <Button
                title="Don't have an account? Register"
                onPress={() => navigation.navigate('Register')}
                color={theme.colors.primary.light}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: spacing.lg,
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
}); 