import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './src/redux/store';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import LandingScreen from './src/screens/LandingScreen';

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
          initialRouteName={'LandingScreen'}
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
          <Stack.Screen name="LandingScreen" component={LandingScreen} />
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
