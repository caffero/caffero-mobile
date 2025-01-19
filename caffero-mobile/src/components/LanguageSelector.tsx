import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { spacing, borderRadius } from '../theme';

export const LanguageSelector = () => {
    const { theme } = useTheme();
    const { currentLanguage, languages, setLanguage, getText } = useLanguage();

    return (
        <View style={[
            styles.container,
            {
                backgroundColor: theme.colors.surface.secondary,
                borderColor: theme.colors.border.primary
            }
        ]}>
            <Picker
                selectedValue={currentLanguage?.id}
                onValueChange={(itemValue: string) => {
                    const language = languages.find(lang => lang.id === itemValue);
                    if (language) {
                        setLanguage(language);
                    }
                }}
                style={[styles.picker, { color: theme.colors.text.primary }]}
                dropdownIconColor={theme.colors.text.primary}
            >
                {languages.map((language) => (
                    <Picker.Item
                        key={language.id}
                        label={language.name}
                        value={language.id}
                        color={theme.colors.text.primary}
                    />
                ))}
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: borderRadius.sm,
        borderWidth: 1,
        marginBottom: spacing.md,
        overflow: 'hidden',
    },
    picker: {
        height: 40,
    },
}); 