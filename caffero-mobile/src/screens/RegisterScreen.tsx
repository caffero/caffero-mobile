import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export const RegisterScreen: React.FC<Props> = ({ navigation }) => {
    const theme = useTheme();
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
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <TextInput
                style={[styles.input, { 
                    borderColor: theme.colors.border,
                    backgroundColor: theme.colors.surface,
                    color: theme.colors.text
                }]}
                placeholder="Email"
                placeholderTextColor={theme.colors.placeholder}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={[styles.input, { 
                    borderColor: theme.colors.border,
                    backgroundColor: theme.colors.surface,
                    color: theme.colors.text
                }]}
                placeholder="Username"
                placeholderTextColor={theme.colors.placeholder}
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={[styles.input, { 
                    borderColor: theme.colors.border,
                    backgroundColor: theme.colors.surface,
                    color: theme.colors.text
                }]}
                placeholder="Password"
                placeholderTextColor={theme.colors.placeholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {error ? <Text style={[styles.error, theme.typography.error]}>{error}</Text> : null}
            <Button 
                title="Register" 
                onPress={handleRegister}
                color={theme.colors.primary}
            />
            <Button
                title="Already have an account? Login"
                onPress={() => navigation.navigate('Login')}
                color={theme.colors.secondary}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: theme.spacing.large,
    },
    input: {
        height: 40,
        borderWidth: 1,
        marginBottom: theme.spacing.medium,
        paddingHorizontal: theme.spacing.small,
        borderRadius: theme.borderRadius.small,
    },
    error: {
        marginBottom: theme.spacing.small,
    },
}); 