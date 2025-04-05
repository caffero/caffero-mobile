import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { RootStackParamList, BottomTabParamList } from './types';
import { LoadingScreen } from '../components/LoadingScreen';

// Auth Screens
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { OtpScreen } from '../screens/OtpScreen';
import { ForgotPasswordScreen } from '../screens/ForgotPasswordScreen';
import { ResetForgottenPasswordScreen } from '../screens/ResetForgottenPasswordScreen';
import { ResetPasswordScreen } from '../screens/ResetPasswordScreen';

// Main Tab Screens
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { CampaignScreen } from '../screens/CampaignScreen';
import { CafeDetailScreen } from '../screens/CafeDetailScreen';
import { UseCampaignScreen } from '../screens/UseCampaignScreen';

// Profile Related Screens
import { EditProfileScreen } from '../screens/EditProfileScreen';
import { AppSettingsScreen } from '../screens/AppSettingsScreen';
import { NotificationSettingsScreen } from '../screens/NotificationSettingsScreen';
import { PrivacyScreen } from '../screens/PrivacyScreen';
import { ContactUsScreen } from '../screens/ContactUsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

const MainTabs = () => {
  const { theme } = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: { name: string } }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background.primary,
          borderTopColor: theme.colors.border.primary,
        },
        tabBarActiveTintColor: theme.colors.background.accent,
        tabBarInactiveTintColor: theme.colors.text.tertiary,
        tabBarIcon: ({ color, size }: { color: string; size: number }) => {
          let iconName: string;
          const routeName = route.name as keyof BottomTabParamList;
          switch (routeName) {
            case 'Home':
              iconName = 'storefront';
              break;
            case 'Campaigns':
              iconName = 'local-offer';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'help';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Campaigns" component={CampaignScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export const Navigation = () => {
  const { user, isLoading } = useAuth();
  const { theme } = useTheme();

  const navigationTheme = {
    dark: false,
    colors: {
      primary: theme.colors.background.accent,
      background: theme.colors.background.primary,
      card: theme.colors.surface.primary,
      text: theme.colors.text.primary,
      border: theme.colors.border.primary,
      notification: theme.colors.status.error,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Stack.Navigator 
          screenOptions={{ 
            headerShown: false,
            contentStyle: { backgroundColor: theme.colors.background.primary },
          }}
        >
          {!user ? (
            // Auth Stack
            <>
              <Stack.Screen 
                name="Login" 
                component={LoginScreen}
                options={{
                  animationTypeForReplace: !user ? 'pop' : 'push',
                }}
              />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Otp" component={OtpScreen} />
              <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
              <Stack.Screen name="ResetForgottenPassword" component={ResetForgottenPasswordScreen} />
            </>
          ) : (
            // Main App Stack
            <>
              <Stack.Screen name="MainTabs" component={MainTabs} />

              <Stack.Group screenOptions={{ presentation: 'card' }}>
                <Stack.Screen name="CafeDetail" component={CafeDetailScreen} />
                <Stack.Screen name="UseCampaignScreen" component={UseCampaignScreen} />
              </Stack.Group>

              <Stack.Group screenOptions={{ presentation: 'card' }}>
                <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
                <Stack.Screen name="AppSettings" component={AppSettingsScreen} />
                <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
                <Stack.Screen name="Privacy" component={PrivacyScreen} />
                <Stack.Screen name="ContactUs" component={ContactUsScreen} />
              </Stack.Group>
            </>
          )}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 