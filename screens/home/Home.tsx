import { View, Text } from "react-native";
import React from "react";
import Button from "../../components/Button";
import { FIREBASE_AUTH } from "../../firebase-config";

const HomeScreen = () => {
	const logout = () => {
		alert("Logout");
		FIREBASE_AUTH.signOut();
	};

	return (
		<View>
			<Text>HomeScreen</Text>
			<Button title="Logout" onPress={logout} />
		</View>
	);
};

export default HomeScreen;