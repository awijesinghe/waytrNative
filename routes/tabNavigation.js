import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/home";
import Eat from "../screens//eat/eat";
import Orders from "../screens/orders/orders";
import Account from "../screens/account";
import { FontAwesome } from "@expo/vector-icons";
import { UserContext } from "../contexts/UserContext";

const Tab = createBottomTabNavigator();

const TabNavigation = ({ user }) => {
  const { setCurrentUserId } = useContext(UserContext);
  setCurrentUserId(user);
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Eat") {
              iconName = "cutlery";
            } else if (route.name === "Orders") {
              iconName = "list-alt";
            } else if (route.name === "Account") {
              iconName = "user-circle-o";
            }
            return <FontAwesome name={iconName} size={size} color={color} />;
          }
        })}
        tabBarOptions={{
          activeTintColor: "#5CDC58",
          inactiveTintColor: "gray"
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Eat" component={Eat} />
        <Tab.Screen name="Orders" component={Orders} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigation;
