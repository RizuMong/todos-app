import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import List from "./app/screens/List";
import Login from "./app/screens/Login";
import Details from "./app/screens/Details";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "./firebaseConfig";
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="My Todo" component={List} />
      <InsideStack.Screen name="Details" component={Details} />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [fontsLoaded] = useFonts({
    'Montserrat-Thin': require('./assets/fonts/Montserrat.ttf'),
    'Montserrat-Semibold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null
  }

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <Stack.Screen
            name="Inside"
            component={InsideLayout}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
