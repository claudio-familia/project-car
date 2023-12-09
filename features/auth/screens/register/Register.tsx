/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {Text, Keyboard, StyleSheet} from "react-native";
import { useTheme } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";

import { ThemeColors } from "../../../../core/models/theme";
import { FIREBASE_AUTH } from "../../../../firebase-config";
import PageLayout from "../../components/PageLayout";
import Input from "../../../../core/components/Input";
import Button from "../../../../core/components/Button";
import Color from "../../../../utils/color-const";


let COLORS: ThemeColors = Color.light.colors;

const RegisterScreen = ({navigation}: any) => {
	COLORS = useTheme().colors as any;

	const [state, setState] = React.useState({
		email: "", 
		password: "",
		city: "",
		username: "",
		errors: { 
			email: "",
			password: "",
			city: "",
			username: ""
		},
		loading: false
	});

	const submit = async () => {
		Keyboard.dismiss();
		
		if (!state.email) {
			handleError("Please input email", "email");
			return;
		}
		if (!state.password) {
			handleError("Please input password", "password");
			return;
		}

		setState(prevState => ({...prevState, loading: true}));

		try {
			await signInWithEmailAndPassword(FIREBASE_AUTH, state.email, state.password);
			navigation.navigate("Home");
		} catch (error: any) {
			console.error("Error signing in:", error.message);
		} finally {
			setState(prevState => ({...prevState, loading: false}));
		}
	};

	const handleOnchange = (text: string, input: string) => {
		setState(prevState => ({...prevState, [input]: text}));
	};

	const handleError = (error: string, input: "email" | "password" | "city" | "username") => {
		setState(prevState => {
			prevState.errors[input] = error;
			return {
				...prevState,
			};
		});
	};

	return (
		<PageLayout 
			title={"Register"}
			subtitle="Enter Your information to Login"
			loading={state.loading}
		>

			<Input
				onChangeText={(text: string) => handleOnchange(text, "username")}
				onFocus={() => handleError("", "username")}
				iconName="email-outline"
				label="Username"
				placeholder="Enter your username address"
				error={state.errors.username}
			/>					
			<Input
				onChangeText={(text: string) => handleOnchange(text, "email")}
				onFocus={() => handleError("", "email")}
				iconName="email-outline"
				autoCapitalize="none"
				label="Email"
				placeholder="Enter your email address"
				error={state.errors.email}
			/>
			<Input
				onChangeText={(text: string) => handleOnchange(text, "password")}
				onFocus={() => handleError("", "password")}
				iconName="lock-outline"
				autoCapitalize="none"
				label="Password"
				placeholder="Enter your password"
				error={state.errors.password}
				password
			/>
			<Input
				onChangeText={(text: string) => handleOnchange(text, "city")}
				onFocus={() => handleError("", "city")}
				iconName="email-outline"
				label="city"
				placeholder="Enter your city address"
				error={state.errors.city}
			/>
			<Button title="Log In" onPress={submit} />
			<Text
				onPress={() => navigation.navigate("Login")}
				style={styles.link}
			>
					Already have an account? Log in now!
			</Text>
		</PageLayout>
	);
};

const styles = StyleSheet.create({
	link: {
		color: COLORS.text,
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 16,
	}
});

export default RegisterScreen;