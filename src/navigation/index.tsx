import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Dashboard from "../screens/Dashboard";
import { useAppSelector } from "../redux/rtkHooks";
import React from 'react';


export const LoginNavigation = createStackNavigator();
export const DashboardNavigation = createStackNavigator();

export default function AppNavigation() {

    const user = useAppSelector((store) => store?.user);

    return (
        <NavigationContainer>
            {user.user == null ?
                <LoginNavigation.Navigator>
                    <LoginNavigation.Screen name="Login"
                        component={Login}
                        options={{ headerShown: false }} />
                </LoginNavigation.Navigator>
                :
                <DashboardNavigation.Navigator>
                    <DashboardNavigation.Screen name="Dashboard"
                        component={Dashboard}
                        options={{ headerShown: false }} />
                </DashboardNavigation.Navigator>}

        </NavigationContainer>
    )
}
