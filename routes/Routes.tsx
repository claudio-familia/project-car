import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home/Home";
import LoginScreen from "../screens/login/Login";

const Stack = createNativeStackNavigator();

const Routes = () => {
	return (
		<>
			<Stack.Navigator initialRouteName="Login">
				<Stack.Screen name="Home" component={HomeScreen} options={{title: "Welcome"}}/>
				<Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
			</Stack.Navigator>
		</>
	);
};

export default Routes;