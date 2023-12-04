/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {View, Text, SafeAreaView, Keyboard} from "react-native";
import Loader from "../../../components/Loader";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { ThemeColors } from "../../../models/theme";
import Color from "../../../utils/color-const";
import { useTheme } from "@react-navigation/native";
import { Props } from "./Login.utils";
import { FIREBASE_AUTH } from "../../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

let COLORS: ThemeColors = Color.light.colors;

const LoginScreen = ({navigation}: Props) => {
	const [state, setState] = React.useState({
		email: "", 
		password: "",
		errors: { email: "", password: ""},
		loading: false
	});
	COLORS = useTheme().colors as any;

	const validate = async () => {
		Keyboard.dismiss();
		let isValid = true;
		if (!state.email) {
			handleError("Please input email", "email");
			isValid = false;
		}
		if (!state.password) {
			handleError("Please input password", "password");
			isValid = false;
		}
		if (isValid) {
			login();
		}
	};

	const signIn = async (email: string, password: string) => {
		try {
			await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
			console.log("User signed in successfully!");
		} catch (error: any) {
			console.error("Error signing in:", error.message);
		}
	};


	const login = () => {
		setState(prevState => ({...prevState, loading: true}));
		signIn(state.email, state.password);
		setState(prevState => ({...prevState, loading: false}));
	};

	const handleOnchange = (text: string, input: string) => {
		setState(prevState => ({...prevState, [input]: text}));
	};

	const handleError = (error: any, input: "email" | "password") => {
		setState(prevState => {
			prevState.errors[input] = error;
			return {
				...prevState,
			};
		});
	};

	return (
		<SafeAreaView style={{backgroundColor: COLORS.background, flex: 1}}>
			<Loader visible={state.loading} />
			<View style={{paddingTop: 50, paddingHorizontal: 20}}>
				<Text style={{color: COLORS.black, fontSize: 40, fontWeight: "bold"}}>
          Log In
				</Text>
				<Text style={{color: COLORS.text, fontSize: 18, marginVertical: 10}}>
          Enter Your Details to Login
				</Text>
				<View style={{marginVertical: 20}}>
					<Input
						onChangeText={(text: string) => handleOnchange(text, "email")}
						onFocus={() => handleError(null, "email")}
						iconName="email-outline"
						label="Email"
						placeholder="Enter your email address"
						error={state.errors.email}
					/>
					<Input
						onChangeText={(text: string) => handleOnchange(text, "password")}
						onFocus={() => handleError(null, "password")}
						iconName="lock-outline"
						label="Password"
						placeholder="Enter your password"
						error={state.errors.password}
						password
					/>
					<Button title="Log In" onPress={validate} />
					<Text
						onPress={() => navigation.navigate("RegistrationScreen")}
						style={{
							color: COLORS.black,
							fontWeight: "bold",
							textAlign: "center",
							fontSize: 16,
						}}>
            Do not have account ? Register
					</Text>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default LoginScreen;