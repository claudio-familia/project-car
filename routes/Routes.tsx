import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home/Home";
import LoginScreen from "../screens/auth/login/Login";
import RegisterScreen from "../screens/auth/register/Register";
import { FIREBASE_AUTH } from "../firebase-config";
import { User } from "firebase/auth";

const Stack = createNativeStackNavigator();

const Routes = () => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	const checkAuthState = () => {
		FIREBASE_AUTH.onAuthStateChanged((user) => {
			if (user) {
				setCurrentUser(user);
			} else {
				setCurrentUser(null);
			}
		});
	};

	useEffect(() => {
		checkAuthState();
	}, []);

	return (
		<>
			<Stack.Navigator initialRouteName="Login">
				<Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
				<Stack.Screen name="SignIn" component={RegisterScreen} options={{headerShown: false}} />
				{currentUser &&
					(
						<Stack.Screen name="Home" component={HomeScreen} options={{title: "Welcome"}}/>
					)
				}
			</Stack.Navigator>
		</>
	);
};

export default Routes;