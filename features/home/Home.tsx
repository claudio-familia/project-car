import { View, Text } from "react-native";
import React from "react";
import { FIREBASE_AUTH } from "../../firebase-config";
import Settings from "../settings/Setting";
import Button from "../../core/components/Button";

const HomeScreen = () => {
	const logout = () => {
		alert("Logout");
		FIREBASE_AUTH.signOut();
	};

	return (
		<View>
			<Text>HomeScreen</Text>
			<Settings />
			<Button title="Logout" onPress={logout} />
		</View>
	);
};

export default HomeScreen;