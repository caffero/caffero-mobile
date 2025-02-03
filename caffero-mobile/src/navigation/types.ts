import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NavigationProp } from '@react-navigation/native';

export type RootStackParamList = {
  // Auth screens
  Login: undefined;
  Register: undefined;
  
  // Main tabs
  MainTabs: undefined;
  Scan: undefined;

  // Profile screens
  EditProfile: undefined;
  AppSettings: undefined;
  NotificationSettings: undefined;
  Privacy: undefined;
  ContactUs: undefined;

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
  Subscription: undefined;

  // Premium features
  Coupons: undefined;
  Events: undefined;
  EventDetail: { event: { title: string; imageUrl: string } };
  TasteMatches: undefined;
  TasteMatchDetail: { match: { title: string; imageUrl: string } };
}; 

export type BottomTabParamList = {
  Home: undefined;
  Shelf: undefined;
  Scan: undefined;
  Premium: undefined;
  Profile: undefined;
}; 

export type RootStackNavigator = NavigationProp<RootStackParamList>; 
export type BottomTabNavigator = BottomTabNavigationProp<BottomTabParamList>; 