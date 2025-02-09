import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { RootStackParamList, BottomTabParamList } from './types';

// Auth Screens
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { OtpScreen } from '../screens/OtpScreen';
import { ForgotPasswordScreen } from '../screens/ForgotPasswordScreen';
import { ResetForgottenPasswordScreen } from '../screens/ResetForgottenPasswordScreen';
import { ResetPasswordScreen } from '../screens/ResetPasswordScreen';

// Main Tab Screens
import { HomeScreen } from '../screens/HomeScreen';
import { ShelfScreen } from '../screens/ShelfScreen';
import { ScanScreen } from '../screens/ScanScreen';
import { PremiumScreen } from '../screens/PremiumScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

// Profile Related Screens
import { EditProfileScreen } from '../screens/EditProfileScreen';
import { AppSettingsScreen } from '../screens/AppSettingsScreen';
import { NotificationSettingsScreen } from '../screens/NotificationSettingsScreen';
import { PrivacyScreen } from '../screens/PrivacyScreen';
import { ContactUsScreen } from '../screens/ContactUsScreen';

// Recipe Related Screens
import { RecipeDetailScreen } from '../screens/RecipeDetailScreen';
import { CreateRecipeScreen } from '../screens/CreateRecipeScreen';
import { UpdateRecipeScreen } from '../screens/UpdateRecipeScreen';
import { DeleteRecipeScreen } from '../screens/DeleteRecipeScreen';

// Equipment Related Screens
import { WhatIBrewWithScreen } from '../screens/WhatIBrewWithScreen';
import { EquipmentDetailScreen } from '../screens/EquipmentDetailScreen';
import { CreateEquipmentScreen } from '../screens/CreateEquipmentScreen';
import { UpdateEquipmentScreen } from '../screens/UpdateEquipmentScreen';
import { DeleteEquipmentScreen } from '../screens/DeleteEquipmentScreen';

// Coffee Bean Related Screens
import { WhatIBrewScreen } from '../screens/WhatIBrewScreen';
import { CoffeeBeanDetailScreen } from '../screens/CoffeeBeanDetailScreen';
import { AddCoffeeBeanScreen } from '../screens/AddCoffeeBeanScreen';

// Post Related Screens
import { WhatIThinkScreen } from '../screens/WhatIThinkScreen';
import { PostDetailScreen } from '../screens/PostDetailScreen';
import { CreatePostScreen } from '../screens/CreatePostScreen';
import { UpdatePostScreen } from '../screens/UpdatePostScreen';
import { DeletePostsScreen } from '../screens/DeletePostsScreen';

// Other Screens
import { HowIBrewScreen } from '../screens/HowIBrewScreen';
import { SuggestProductScreen } from '../screens/SuggestProductScreen';
import { RoasteryDetailScreen } from '../screens/RoasteryDetailScreen';

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
              iconName = 'home';
              break;
            case 'Shelf':
              iconName = 'inventory';
              break;
            case 'Scan':
              iconName = 'qr-code-scanner';
              break;
            case 'Premium':
              iconName = 'star';
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
      <Tab.Screen name="Shelf" component={ShelfScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Premium" component={PremiumScreen} />
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

  if (isLoading) {
    // You might want to show a loading screen here
    return null;
  }

  return (
    <NavigationContainer theme={navigationTheme}>
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
              <Stack.Screen name="WhatIBrew" component={WhatIBrewScreen} />
              <Stack.Screen name="CoffeeBeanDetail" component={CoffeeBeanDetailScreen} />
              <Stack.Screen name="AddCoffeeBean" component={AddCoffeeBeanScreen} />
            </Stack.Group>

            <Stack.Group screenOptions={{ presentation: 'card' }}>
              <Stack.Screen name="WhatIBrewWith" component={WhatIBrewWithScreen} />
              <Stack.Screen name="EquipmentDetail" component={EquipmentDetailScreen} />
              <Stack.Screen name="CreateEquipment" component={CreateEquipmentScreen} />
              <Stack.Screen name="UpdateEquipment" component={UpdateEquipmentScreen} />
              <Stack.Screen name="DeleteEquipment" component={DeleteEquipmentScreen} />
            </Stack.Group>

            <Stack.Group screenOptions={{ presentation: 'card' }}>
              <Stack.Screen name="HowIBrew" component={HowIBrewScreen} />
              <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
              <Stack.Screen name="CreateRecipe" component={CreateRecipeScreen} />
              <Stack.Screen name="UpdateRecipe" component={UpdateRecipeScreen} />
              <Stack.Screen name="DeleteRecipe" component={DeleteRecipeScreen} />
            </Stack.Group>

            <Stack.Group screenOptions={{ presentation: 'card' }}>
              <Stack.Screen name="EditProfile" component={EditProfileScreen} />
              <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
              <Stack.Screen name="AppSettings" component={AppSettingsScreen} />
              <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
              <Stack.Screen name="Privacy" component={PrivacyScreen} />
              <Stack.Screen name="ContactUs" component={ContactUsScreen} />
            </Stack.Group>

            <Stack.Group screenOptions={{ presentation: 'card' }}>
              <Stack.Screen name="RoasteryDetail" component={RoasteryDetailScreen} />
              <Stack.Screen name="PostDetail" component={PostDetailScreen} />
            </Stack.Group>

            <Stack.Group screenOptions={{ presentation: 'card' }}>
              <Stack.Screen name="WhatIThink" component={WhatIThinkScreen} />
              <Stack.Screen name="CreatePost" component={CreatePostScreen} />
              <Stack.Screen name="UpdatePost" component={UpdatePostScreen} />
              <Stack.Screen name="DeletePosts" component={DeletePostsScreen} />
            </Stack.Group>
          </>
        )}
      </Stack.Navigator>
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