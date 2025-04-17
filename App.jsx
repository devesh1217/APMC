// App.js - Main entry point for the Farmer App

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

// Auth Screens
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import OtpVerificationScreen from './screens/auth/OtpVerificationScreen';

// Main App Screens
import HomeScreen from './screens/main/HomeScreen';
import AuctionListScreen from './screens/main/AuctionListScreen';
import AuctionDetailScreen from './screens/main/AuctionDetailScreen';
import CreateListingScreen from './screens/main/CreateListingScreen';
import ProfileScreen from './screens/main/ProfileScreen';
import TransactionHistoryScreen from './screens/main/TransactionHistoryScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Custom theme with Gujarat agriculture-inspired colors
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4CAF50', // Green representing agriculture
    accent: '#FFC107',  // Amber representing crops
    background: '#F5F5F5',
    text: '#212121',
    placeholder: '#757575',
  },
};

// Bottom tab navigator for main app flow
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Auctions') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Create') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: theme.colors.primary,
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Auctions" component={AuctionListScreen} />
      <Tab.Screen name="Create" component={CreateListingScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen 
              name="AuctionDetail" 
              component={AuctionDetailScreen}
              options={{ headerShown: true, title: 'Auction Details' }}
            />
            <Stack.Screen 
              name="TransactionHistory" 
              component={TransactionHistoryScreen}
              options={{ headerShown: true, title: 'My Transactions' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}