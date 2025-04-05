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

  // Profile screens
  EditProfile: undefined;
  ResetPassword: undefined;
  AppSettings: undefined;
  NotificationSettings: undefined;
  Privacy: undefined;
  ContactUs: undefined;

  // New Cafe Discount App Screens
  CafeDetail: { id: string };
  CampaignScreen: undefined;
  UseCampaignScreen: { campaignId: string };
}; 

export type BottomTabParamList = {
  Home: undefined;
  Campaigns: undefined;
  Profile: undefined;
}; 

export type RootStackNavigator = NavigationProp<RootStackParamList>; 
export type BottomTabNavigator = BottomTabNavigationProp<BottomTabParamList>; 