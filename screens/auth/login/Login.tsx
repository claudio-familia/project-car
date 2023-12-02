import { View, Text, TextInput, ActivityIndicator, Button, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { inputStyles } from "../../../styles/input/Input";
import { signInWithEmailAndPassword } from "firebase/auth";
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


const LoginScreen = ({ navigation }: Props) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);


	const signIn = async (): Promise<void> => {
		setLoading(true);
		try {			
			const response = await signInWithEmailAndPassword(FIREBASE_AUTH, username, password);
			console.log("res", response);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const goToSignUp = async (): Promise<void>  =>  {
		navigation.navigate("SignIn");
	};

	return (
		<View style={styles.container}>
			<KeyboardAvoidingView behavior="padding">
				<Text>LoginScreen</Text>
				<TextInput 
					style={inputStyles.input}
					value={username}
					placeholder="Username"
					onChangeText={val => setUsername(val)}
					autoCapitalize="none"
				/>
				<TextInput 
					style={inputStyles.input}
					value={password}
					placeholder="Password"
					onChangeText={val => setPassword(val)}
					autoCapitalize="none"
				/>

				{loading ? 
					<ActivityIndicator size="large" color={"#123485"} /> : 
					<>
						<Button title={"Login"} onPress={() => signIn()} />
						<Button title={"Register"} onPress={() => goToSignUp()} />
					</> }
			</KeyboardAvoidingView>
		</View>
	);
};

export default LoginScreen;