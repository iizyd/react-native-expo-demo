import React from "react";
import { StatusBar } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "@rneui/themed";
import Home from "./pages/home/Home";
import Setting from "./pages/setting/Setting";
import SearchPage from "./pages/search/Search";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeTabs = () => {
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "home";
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ title: "首页" }} />
      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{ title: "设置" }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const { theme } = useTheme();
  return (
    <>
      <StatusBar backgroundColor={theme.colors.primary} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        >
          <Stack.Screen
            name="SearchPage"
            component={SearchPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name="SearchPage"
            component={SearchPage}
            options={{ headerShown: false }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}