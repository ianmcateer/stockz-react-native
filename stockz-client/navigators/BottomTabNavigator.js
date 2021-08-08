import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarIcon from "../components/TabBarIcon";
import StocksScreen from "../screens/StocksScreen";
import SearchScreen from "../screens/SearchScreen";
import { StocksProvider } from "../contexts/StocksContext";
import { logout } from "../services/api";
import { useCredentialsContext } from "../contexts/CredentialsContext";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    const { clearStoredCredentials } = useCredentialsContext();
    return (
        <StocksProvider>
            <BottomTab.Navigator>
                <BottomTab.Screen
                    name="Stocks"
                    component={StocksScreen}
                    options={{
                        title: "Stocks",
                        tabBarIcon: ({ focused }) => (
                            <TabBarIcon
                                focused={focused}
                                name="md-trending-up"
                            />
                        ),
                    }}
                />
                <BottomTab.Screen
                    name="Search"
                    component={SearchScreen}
                    options={{
                        title: "Search",
                        tabBarIcon: ({ focused }) => (
                            <TabBarIcon focused={focused} name="md-search" />
                        ),
                    }}
                />
                <BottomTab.Screen
                    name="Logout"
                    options={{
                        title: "Logout",
                        tabBarIcon: ({ focused }) => (
                            <TabBarIcon
                                focused={focused}
                                name="md-exit-outline"
                            />
                        ),
                    }}
                    listeners={{
                        tabPress: async (e) => {
                            e.preventDefault();
                            try {
                                await logout();
                            } catch (err) {
                                console.log(
                                    "There was an error logging out",
                                    err
                                );
                            }
                            try {
                                await clearStoredCredentials();
                            } catch (err) {
                                console.log(
                                    "There was an error clearing the storage ",
                                    err
                                );
                            }
                        },
                    }}
                >
                    {() => null}
                </BottomTab.Screen>
            </BottomTab.Navigator>
        </StocksProvider>
    );
}
