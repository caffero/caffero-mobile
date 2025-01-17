import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { spacing, borderRadius } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export const RegisterScreen: React.FC<Props> = ({ navigation }) => {
    const { theme } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();

    const handleRegister = async () => {
        try {
            await register(email, password, username);
        } catch (err) {
            setError('Registration failed. Please try again.');
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
                placeholder="Username"
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
                title="Register" 
                onPress={handleRegister}
                color={theme.colors.primary.main}
            />
            <Button
                title="Already have an account? Login"
                onPress={() => navigation.navigate('Login')}
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