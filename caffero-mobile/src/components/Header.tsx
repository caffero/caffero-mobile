import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar, StyleProp, ViewStyle, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../contexts/ThemeContext';
import { spacing } from '../theme';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

export interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightIcon?: string;
  onRightPress?: () => void;
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton,
  onBackPress,
  rightIcon,
  onRightPress,
  titleStyle,
  containerStyle,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[
      styles.header,
      {
        backgroundColor: theme.colors.background.primary,
        ...theme.shadows.small,
      }
    ]}>
      <View style={[
        styles.container,
        { backgroundColor: theme.colors.background.primary },
        containerStyle,
      ]}>
        {showBackButton && (
          <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
            <IconCommunity name="arrow-left" size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>
        )}
        <Text
          style={[
            styles.title,
            theme.typography.title2,
            { color: theme.colors.text.primary },
            titleStyle,
          ]}
          numberOfLines={2}
        >
          {title}
        </Text>
        {rightIcon && (
          <TouchableOpacity onPress={onRightPress} style={styles.rightButton}>
            <Icon name={rightIcon} size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;

const styles = StyleSheet.create({
  header: {
    height: 56 + STATUSBAR_HEIGHT,
    paddingTop: STATUSBAR_HEIGHT,
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  container: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
  backButton: {
    marginRight: spacing.md,
  },
  rightButton: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
});