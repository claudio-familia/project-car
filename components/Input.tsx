/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from "@react-navigation/native";
import React from "react";
import {View, Text, TextInput, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemeColors } from "../models/theme";
import Color from "../utils/color-const";

let COLORS: ThemeColors = Color.light.colors;

const Input = ({
	label,
	iconName,
	error,
	password,
	onFocus = () => {},
	...props
}: any) => {

	const [hidePassword, setHidePassword] = React.useState(password);
	const [isFocused, setIsFocused] = React.useState(false);
	COLORS = useTheme().colors as any;

	return (
		<View style={{marginBottom: 20}}>
			<Text style={styles.label}>{label}</Text>
			<View
				style={[
					styles.inputContainer,
					error ? styles.inputError : {},
					isFocused ? styles.inputFocus : {}
				]}>
				<Icon
					name={iconName}
					style={[
						styles.inputIcon,
						error ? styles.inputIconError : {},
						isFocused ? styles.inputIconFocus : {}
					]}
				/>
				<TextInput
					autoCorrect={false}
					onFocus={() => {
						onFocus();
						setIsFocused(true);
					}}
					onBlur={() => setIsFocused(false)}
					secureTextEntry={hidePassword}
					style={{color: COLORS.text, flex: 1}}
					{...props}
				/>
				{password && (
					<Icon
						onPress={() => setHidePassword(!hidePassword)}
						name={hidePassword ? "eye-outline" : "eye-off-outline"}
						style={[
							styles.inputIcon,
							error ? styles.inputIconError : {},
							isFocused ? styles.inputIconFocus : {}
						]}
					/>
				)}
			</View>
			{error && (
				<Text style={{marginTop: 7, color: COLORS.danger, fontSize: 12}}>
					{error}
				</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	label: {
		marginVertical: 5,
		fontSize: 14,
		color: COLORS.text,
	},
	inputContainer: {
		height: 55,
		backgroundColor: COLORS.background,
		flexDirection: "row",
		paddingHorizontal: 15,
		borderWidth: 1,
		alignItems: "center",
	},
	inputError: {
		borderColor: COLORS.danger,
		borderWidth: 1.5,
	},
	inputFocus: {
		borderColor:  COLORS.primary,
		borderWidth: 1.5,
	},
	inputIcon: {
		color: COLORS.text,
		fontSize: 22,
		marginRight: 10
	},
	inputIconFocus: {
		color: COLORS.primary,
	},
	inputIconError: {
		color: COLORS.danger,
	}
});

export default Input;