import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { User } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

import { FIREBASE_AUTH } from "../firebase-config";
import RegisterScreen from "../features/auth/screens/register/Register";
import LoginScreen from "../features/auth/screens/login/Login";
import HomeScreen from "../features/home/Home";

const Stack = createNativeStackNavigator();

const Routes = () => {
	const navigation = useNavigation<any>();
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	const checkAuthState = () => {
		FIREBASE_AUTH.onAuthStateChanged(async (user) => {
			if (user) {
				setCurrentUser(user);
				navigation.navigate("Home");
				navigation.reset({ index: 0, routes: [{ name: "Home" }]});
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
			<Stack.Navigator initialRouteName="Home">
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