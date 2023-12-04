import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./routes/Routes";
import Colors from "./utils/color-const";
import { useColorScheme } from "react-native";
import { FIREBASE_AUTH } from "./firebase-config";

export default function App() {
	const theme = useColorScheme();

	const checkAuthState = () => {
		FIREBASE_AUTH.onAuthStateChanged((user) => {
			if (user) {
				console.log("User is signed in:", user.uid);
			} else {
				console.log("User is signed out");
			}
		});
	};

	useEffect(() => {
		checkAuthState();
	}, []);


	return (
		<NavigationContainer theme={theme === "dark" ? Colors.dark : Colors.light}>
			<Routes />
		</NavigationContainer>
	);
}

