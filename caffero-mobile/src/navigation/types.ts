import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type RootStackParamList = {
  // Auth screens
  Login: undefined;
  Register: undefined;
  
  // Main tabs
  MainTabs: undefined;
  Scan: undefined;

  // Main screens
  WhatIBrew: undefined;
  CoffeeBeanDetail: { id: string };
  AddCoffeeBean: undefined;
  RemoveCoffeeBean: undefined;
  WhatIBrewWith: undefined;
  EquipmentDetail: { id: string };
  CreateEquipment: undefined;
  UpdateEquipment: { id: string };
  DeleteEquipment: undefined;
  HowIBrew: undefined;
  RecipeDetail: { id: string };
  CreateRecipe: undefined;
  UpdateRecipe: { id: string };
  DeleteRecipe: undefined;
  SuggestProduct: undefined;
}; 

export type BottomTabParamList = {
  Home: undefined;
  Shelf: undefined;
  Scan: undefined;
  Premium: undefined;
  Profile: undefined;
}; 

export type RootStackNavigator = NativeStackNavigationProp<RootStackParamList>; 
export type BottomTabNavigator = BottomTabNavigationProp<BottomTabParamList>; 