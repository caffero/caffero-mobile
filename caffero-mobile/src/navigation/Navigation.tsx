import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../contexts/AuthContext';
// import { RootStackParamList, BottomTabParamList } from './types';

/* Screen imports commented for debugging
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ShelfScreen } from '../screens/ShelfScreen';
import { ScanScreen } from '../screens/ScanScreen';
import { PremiumScreen } from '../screens/PremiumScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
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
*/

// Temporarily remove type parameters while debugging
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Temporary components for testing navigation
const LoadingMessage = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#8B4513" />
    <Text>Loading...</Text>
  </View>
);

const AuthMessage = () => (
  <View style={styles.container}>
    <Text>Auth State: Authenticated</Text>
  </View>
);

const NoAuthMessage = () => (
  <View style={styles.container}>
    <Text>Auth State: Not Authenticated</Text>
  </View>
);

/* Original MainTabs component commented for debugging
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: { name: string } }) => ({
        headerShown: false,
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
*/

export const Navigation = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <NavigationContainer>
        <LoadingMessage />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen 
            name="AuthMessage" 
            component={AuthMessage}
          />
        ) : (
          <Stack.Screen 
            name="NoAuthMessage" 
            component={NoAuthMessage}
          />
        )}
        {/* Original screens commented for debugging
        {user ? (
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
          </>
        ) : (
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
        )}
        */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
}); 