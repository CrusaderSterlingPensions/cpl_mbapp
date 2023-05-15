import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './src/redux/store';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState, useRef } from 'react';
import {
  Login,
  LandingScreen,
  OpenAccount,
  DrawerMenu,
  Profile,
  LogoutModal,
  VerifyOTP,
  SetPassword,
} from './src/screens';
import { useNavigation } from '@react-navigation/native';
import { SplashVideo } from './src/screens';

const Stack = createNativeStackNavigator();

export default function App() {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
  };

  const [loaded] = useFonts({
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer theme={navTheme}>
        <StatusBar translucent style="auto" animated={true} />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            presentation: 'transparentModal',
          }}
          initialRouteName={'SplashVideo'}
        >
          {/* {isToken === null ? (
            <Stack.Group>
              <Stack.Screen name="Login" component={Login} />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen name="AddPropertyPgFive" component={AddPropertyPgFive} />
            </Stack.Group>
          )} */}
          {/* <Stack.Screen
            name="SplashVideo"
            component={SplashVideo}
            options={{ headerShown: false }}
          /> */}
          <Stack.Screen name="LandingScreen" component={LandingScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="OpenAccount" component={OpenAccount} />
          <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
          <Stack.Screen name="SetPassword" component={SetPassword} />
          <Stack.Screen name="DrawerMenu" component={DrawerMenu} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="LogoutModal" component={LogoutModal} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
