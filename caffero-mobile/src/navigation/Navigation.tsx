import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { RootStackParamList, BottomTabParamList } from './types';

import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ShelfScreen } from '../screens/ShelfScreen';
import { ScanScreen } from '../screens/ScanScreen';
import { PremiumScreen } from '../screens/PremiumScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { EditProfileScreen } from '../screens/EditProfileScreen';
import { AppSettingsScreen } from '../screens/AppSettingsScreen';
import { NotificationSettingsScreen } from '../screens/NotificationSettingsScreen';
import { PrivacyScreen } from '../screens/PrivacyScreen';
import { ContactUsScreen } from '../screens/ContactUsScreen';
import { RecipeDetailScreen } from '../screens/RecipeDetailScreen';
import { UpdateRecipeScreen } from '../screens/UpdateRecipeScreen';
import { SuggestProductScreen } from '../screens/SuggestProductScreen';
import { UpdateEquipmentScreen } from '../screens/UpdateEquipmentScreen';
import { AddCoffeeBeanScreen } from '../screens/AddCoffeeBeanScreen';
import { WhatIBrewScreen } from '../screens/WhatIBrewScreen';
import { CoffeeBeanDetailScreen } from '../screens/CoffeeBeanDetailScreen';
import { WhatIBrewWithScreen } from '../screens/WhatIBrewWithScreen';
import { EquipmentDetailScreen } from '../screens/EquipmentDetailScreen';
import { CreateEquipmentScreen } from '../screens/CreateEquipmentScreen';
import { DeleteEquipmentScreen } from '../screens/DeleteEquipmentScreen';
import { HowIBrewScreen } from '../screens/HowIBrewScreen';
import { CreateRecipeScreen } from '../screens/CreateRecipeScreen';
import { DeleteRecipeScreen } from '../screens/DeleteRecipeScreen';

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
        tabBarActiveTintColor: theme.colors.accent,
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
      primary: theme.colors.accent,
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
        <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
          <ActivityIndicator size="large" color={theme.colors.accent} />
        </View>
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