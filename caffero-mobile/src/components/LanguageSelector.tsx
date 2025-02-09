import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal, Pressable } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { spacing, borderRadius } from '../theme';

// Map language codes to country codes for flags
const COUNTRY_CODES: { [key: string]: string } = {
  'en': 'GB',
  'tr': 'TR',
  'es': 'ES',
  'fr': 'FR',
  'de': 'DE',
  'it': 'IT',
  'pt': 'PT',
  'ru': 'RU',
  'ar': 'SA',
  'zh': 'CN',
  'ja': 'JP',
  'ko': 'KR'
};

export const LanguageSelector = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const { theme } = useTheme();
  const { currentLanguage, languages, setLanguage } = useLanguage();

  const handleLanguageSelect = async (language: any) => {
    await setLanguage(language);
    setIsModalVisible(false);
  };

  const getCountryCode = (languageId: string) => {
    return COUNTRY_CODES[languageId.toLowerCase()] || 'GB';
  };

  const toggleModal = () => setIsModalVisible(!isModalVisible);

  return (
    <View>
      <TouchableOpacity
        onPress={toggleModal}
        style={[
          styles.selector,
          {
            backgroundColor: theme.colors.surface.primary,
            borderColor: theme.colors.border.primary,
          }
        ]}
      >
        {currentLanguage && (
          <>
            <CountryFlag
              isoCode={getCountryCode(currentLanguage.id)}
              size={16}
              style={styles.flag}
            />
            <Text style={[
              styles.languageText,
              { color: theme.colors.text.primary }
            ]}>
              {currentLanguage.name}
            </Text>
            <Icon
              name="arrow-drop-down"
              size={24}
              color={theme.colors.text.primary}
            />
          </>
        )}
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={toggleModal}
        >
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: theme.colors.surface.primary,
                borderColor: theme.colors.border.primary,
              }
            ]}
          >
            {languages.map((language) => (
              <TouchableOpacity
                key={language.id}
                style={[
                  styles.languageOption,
                  currentLanguage?.id === language.id && {
                    backgroundColor: theme.colors.primary.light,
                  }
                ]}
                onPress={() => handleLanguageSelect(language)}
              >
                <CountryFlag
                  isoCode={getCountryCode(language.id)}
                  size={20}
                  style={styles.flag}
                />
                <Text
                  style={[
                    styles.languageOptionText,
                    { color: theme.colors.text.primary }
                  ]}
                >
                  {language.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.xs,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    height: 36,
  },
  flag: {
    marginRight: spacing.xs,
    borderRadius: 2,
  },
  languageText: {
    flex: 1,
    marginHorizontal: spacing.xs,
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    maxWidth: 300,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  languageOptionText: {
    marginLeft: spacing.sm,
    fontSize: 16,
  },
}); 