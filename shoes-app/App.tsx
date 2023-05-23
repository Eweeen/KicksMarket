import 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/LoginScreen';
import Slot from './src/screens/Slot';
import ShoesScreen from './src/screens/ShoesScreen';
import FirstPage from './src/screens/FirstPageScreen';
import SignUpScreen from './src/screens/SignupScreen';
import UserContextProvider from './src/contexts/UserContext';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function App() {
  const [token, setToken] = useState(null as null | string);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('@token');
    if (token) setToken(token);
  }

  useEffect(() => {
    getToken();
  }, []);

  return (
    <SafeAreaProvider>
      <UserContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={ token ? "Home" : "FirstPage" }>
            <Stack.Screen name="FirstPage" component={FirstPage} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Slot} options={{ headerShown: false }} />
            <Stack.Screen name="Shoes" component={ShoesScreen} options={{
              title: '',
              headerBackTitleVisible: false,
              headerBackground: () => (
                <>
                  <View style={{ backgroundColor: '#fff', height: 100 }} />
                </>
              ),
            }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </UserContextProvider>
    </SafeAreaProvider>
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
