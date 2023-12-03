import { View, Text, TextInput, ActivityIndicator, Button, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../firebase-config";
import { NavigationProp } from "@react-navigation/native";


const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		justifyContent: "center"
	},
});

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigation: NavigationProp<any, any>
}


const RegisterScreen = ({ navigation }: Props) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const goToLogin = async (): Promise<void> => {
		setLoading(true);
		try {
			navigation.navigate("Login");
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const signUp = async (): Promise<void>  =>  {
		setLoading(true);
		try {
			await createUserWithEmailAndPassword(FIREBASE_AUTH, username, password);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<KeyboardAvoidingView behavior="padding">
				<Text>Register screen</Text>
				<TextInput 
					value={username}
					placeholder="Username"
					onChangeText={val => setUsername(val)}
					autoCapitalize="none"
				/>
				<TextInput 
					value={password}
					placeholder="Password"
					onChangeText={val => setPassword(val)}
					autoCapitalize="none"
					secureTextEntry={true}
				/>

				{loading ? 
					<ActivityIndicator size="large" color={"#123485"} /> : 
					<>
						<Button title={"Register"} onPress={() => signUp()} />
						<Button title={"Login"} onPress={() => goToLogin()} />
					</> }
			</KeyboardAvoidingView>
		</View>
	);
};

export default RegisterScreen;