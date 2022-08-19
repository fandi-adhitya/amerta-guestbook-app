import React, { type PropsWithChildren } from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';

import Authentication from './src/screens/authentication';
import Welcome from './src/screens/welcome';
import Home from './src/screens/home';
import Scanner from './src/screens/scan';
import Visitor from './src/screens/visitor';


const Stack = createNativeStackNavigator()

const App = () => {

  React.useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#FFF',
    }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Authentication"
            component={Authentication}
            options={{
              headerShown: false
            }}
          />

          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Scan"
            component={Scanner}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Visitor"
            component={Visitor}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    // paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
