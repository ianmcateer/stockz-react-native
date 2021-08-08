import React, { useContext } from "react";

import { Colors } from "./../components/styles";

// React Navigation
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// screens
import Login from "./../screens/LoginScreen";
import Signup from "./../screens/SignupScreen";
import { useCredentialsContext } from "../contexts/CredentialsContext";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator();

const { tertiary } = Colors;

const RootStack = () => {
    const { storedCredentials } = useCredentialsContext();
    return (
        <NavigationContainer theme={DarkTheme}>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "transparent",
                    },
                    headerTintColor: tertiary,
                    headerTransparent: true,
                    headerStatusBarHeight: 10,
                }}
            >
                {/* If stored credentials show Home else show Login screen */}
                {storedCredentials ? (
                    <>
                        <Stack.Screen
                            options={{ headerShown: false }}
                            name="Home"
                            component={BottomTabNavigator}
                        />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Signup" component={Signup} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootStack;
