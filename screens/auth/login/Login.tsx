/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigationProp } from "@react-navigation/native";
import React from "react";
import {View, Text, SafeAreaView, Keyboard} from "react-native";
import Loader from "../../../components/Loader";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { ThemeColors } from "../../../models/theme";
import Color from "../../../utils/color-const";
import { useTheme } from "@react-navigation/native";

let COLORS: ThemeColors = Color.light.colors;


type Props = {
	navigation: NavigationProp<any, any>
}

type LoginError = {
	email: string,
	password: string
}


const LoginScreen = ({navigation}: Props) => {
	const [inputs, setInputs] = React.useState({email: "", password: ""});
	const [errors, setErrors] = React.useState<LoginError>({ email: "", password: ""});
	const [loading, setLoading] = React.useState(false);
	COLORS = useTheme().colors as any;

	const validate = async () => {
		Keyboard.dismiss();
		let isValid = true;
		if (!inputs.email) {
			handleError("Please input email", "email");
			isValid = false;
		}
		if (!inputs.password) {
			handleError("Please input password", "password");
			isValid = false;
		}
		if (isValid) {
			login();
		}
	};

	const login = () => {
		setLoading(true);
		alert("Login");
		setLoading(false);
	};

	const handleOnchange = (text: string, input: string) => {
		setInputs(prevState => ({...prevState, [input]: text}));
	};

	const handleError = (error: any, input: string) => {
		setErrors(prevState => ({...prevState, [input]: error}));
	};

	return (
		<SafeAreaView style={{backgroundColor: COLORS.background, flex: 1}}>
			<Loader visible={loading} />
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
						error={errors.email}
					/>
					<Input
						onChangeText={(text: string) => handleOnchange(text, "password")}
						onFocus={() => handleError(null, "password")}
						iconName="lock-outline"
						label="Password"
						placeholder="Enter your password"
						error={errors.password}
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