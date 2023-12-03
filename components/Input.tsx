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
					style={{color: COLORS.primary, fontSize: 22, marginRight: 10}}
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
						style={{color: COLORS.primary, fontSize: 22}}
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
		borderWidth: 0.5,
		alignItems: "center",
	},
	inputError: {
		borderColor: COLORS.danger
	},
	inputFocus: {
		borderColor:  COLORS.primary
	}
});

export default Input;