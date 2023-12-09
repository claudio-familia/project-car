import React from "react";
import {Text, Keyboard, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useTranslation } from "react-i18next";

import { Props } from "./Login.utils";
import { ThemeColors } from "../../../../core/models/theme";
import { FIREBASE_AUTH } from "../../../../firebase-config";
import { ERROR_MESSAGE } from "../../models/firebase-error";
import PageLayout from "../../components/PageLayout";
import ValidationMessage from "../../../../core/components/ValidationMessage";
import Input from "../../../../core/components/Input";
import Button from "../../../../core/components/Button";
import Color from "../../../../utils/color-const";

let COLORS: ThemeColors = Color.light.colors;

const LoginScreen = ({navigation}: Props) => {
	COLORS = useTheme().colors as any;
	const { t } = useTranslation();

	const [state, setState] = React.useState({
		email: "", 
		password: "",
		errorMessage: "",
		errors: { email: "", password: ""},
		loading: false
	});

	const submit = async () => {
		Keyboard.dismiss();
		
		if (!state.email) {
			handleError(t("core.login_email_error"), "email");
			return;
		}
		if (!state.password) {
			handleError(t("core.login_password_error"), "password");
			return;
		}

		setState(prevState => ({...prevState, loading: true}));

		try {
			await signInWithEmailAndPassword(FIREBASE_AUTH, state.email, state.password);
			navigation.navigate("Home");
			navigation.reset({ index: 0, routes: [{ name: "Home" }]});
		} catch (error: any) {
			const _state = {...state};
			_state.errorMessage = ERROR_MESSAGE[error.code];
			setState(_state);
		} finally {
			setState(prevState => ({...prevState, loading: false}));
		}
	};

	const clearErrorMessage = () => {
		const _state = {...state};
		_state.errorMessage = "";
		setState(_state);
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
			title={t("core.login_title")}
			subtitle={t("core.login_subtitle")}
			loading={state.loading}
		>
			{state.errorMessage && 
				<ValidationMessage
					title= {t("core.login_errorMessageTitle")}
					message={t(state.errorMessage)}
					type="error"
					onPress={clearErrorMessage} />}
			<Input
				onChangeText={(text: string) => handleOnchange(text, "email")}
				onFocus={() => handleError("", "email")}
				iconName="email-outline"
				label={t("core.login_email_label")}
				placeholder={t("core.login_email_placeholder")}
				error={state.errors.email}
				autoCapitalize="none"
			/>
			<Input
				onChangeText={(text: string) => handleOnchange(text, "password")}
				onFocus={() => handleError("", "password")}
				iconName="lock-outline"
				autoCapitalize="none"
				label={t("core.login_password_label")}
				placeholder={t("core.login_password_placeholder")}
				error={state.errors.password}
				password
			/>
			<Button title={t("core.login_button")} onPress={submit} />
			<Button type="secondary" title={t("core.login_register")} onPress={() => navigation.navigate("SignIn")} />
			<Text
				onPress={() => navigation.navigate("SignIn")}
				style={styles.link}
			>{t("core.login_forgetpassword")}</Text>
		</PageLayout>
	);
};

const styles = StyleSheet.create({
	link: {
		color: COLORS.text,
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 16,
		marginTop: 15
	}
});

export default LoginScreen;