/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {TouchableOpacity, Text, StyleSheet} from "react-native";
import { ThemeColors } from "../models/theme";
import Color from "../utils/color-const";
import { useTheme } from "@react-navigation/native";

let COLORS: ThemeColors = Color.light.colors;

type Props = {
    title: string,
	onPress: () => void,
}

const Button = ({title, onPress = () => {}}: Props) => {
	COLORS = useTheme().colors as any;

	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.7}
			style={styles.button}>
			<Text style={styles.buttonText}>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		height: 55,
		width: "100%",
		backgroundColor: COLORS.primary,
		marginVertical: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		color: COLORS.white,
		fontWeight: "bold",
		fontSize: 18
	}
});

export default Button;