import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NavigationProp } from '@react-navigation/native';

export type RootStackParamList = {
  // Auth Stack
  Login: undefined;
  Register: undefined;
  Otp: undefined;
  ForgotPassword: undefined;
  ResetForgottenPassword: undefined;
  
  // Main App Stack
  MainTabs: undefined;
  Scan: undefined;

  // Profile screens
  EditProfile: undefined;
  ResetPassword: undefined;
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
  DeleteEquipment: { id: string };
  HowIBrew: undefined;
  RecipeDetail: { id: string };
  CreateRecipe: undefined;
  UpdateRecipe: { id: string };
  DeleteRecipe: { id: string };
  SuggestProduct: undefined;
  Subscription: undefined;

  // Post screens
  WhatIThink: undefined;
  PostDetail: { id: string };
  CreatePost: undefined;
  UpdatePost: { id: string };
  DeletePosts: undefined;

  // Premium features
  Coupons: undefined;
  Events: undefined;
  EventDetail: { event: { title: string; imageUrl: string } };
  TasteMatches: undefined;
  TasteMatchDetail: { match: { title: string; imageUrl: string } };
  PromotionCodeDetail: { promotionId: string };

  // New routes
  RoasteryDetail: { id: string };
  PaymentScreen: undefined;
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