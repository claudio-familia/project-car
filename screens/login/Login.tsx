import { View, Text } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});


const LoginScreen = () => {
	return (
		<View style={styles.container}>
			<Text>LoginScreen</Text>
		</View>
	);
};

export default LoginScreen;