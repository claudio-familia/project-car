/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {Text, Keyboard, StyleSheet} from "react-native";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { ThemeColors } from "../../../models/theme";
import Color from "../../../utils/color-const";
import { useTheme } from "@react-navigation/native";
import { Props } from "./Login.utils";
import { FIREBASE_AUTH } from "../../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import PageLayout from "../components/PageLayout";
import { ERROR_MESSAGE } from "../models/firebase-error";

let COLORS: ThemeColors = Color.light.colors;

const LoginScreen = ({navigation}: Props) => {
	COLORS = useTheme().colors as any;

	const [state, setState] = React.useState({
		email: "", 
		password: "",
		errors: { email: "", password: ""},
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
			navigation.reset({ index: 0, routes: [{ name: "Home" }]});
		} catch (error: any) {
			alert(ERROR_MESSAGE[error.code]);
		} finally {
			setState(prevState => ({...prevState, loading: false}));
		}
	};

	const handleOnchange = (text: string, input: string) => {
		setState(prevState => ({...prevState, [input]: text}));
	};

	const handleError = (error: string, input: "email" | "password") => {
		setState(prevState => {
			prevState.errors[input] = error;
			return {
				...prevState,
			};
		});
	};

	return (
		<PageLayout 
			title={"Log In"}
			subtitle="Enter Your Details to Login"
			loading={state.loading}
		>
			<Input
				onChangeText={(text: string) => handleOnchange(text, "email")}
				onFocus={() => handleError("", "email")}
				iconName="email-outline"
				label="Email"
				placeholder="Enter your email address"
				error={state.errors.email}
			/>
			<Input
				onChangeText={(text: string) => handleOnchange(text, "password")}
				onFocus={() => handleError("", "password")}
				iconName="lock-outline"
				label="Password"
				placeholder="Enter your password"
				error={state.errors.password}
				password
			/>
			<Button title="Log In" onPress={submit} />
			<Text
				onPress={() => navigation.navigate("SignIn")}
				style={styles.link}
			>
						Do not have account? Register now!
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

export default LoginScreen;