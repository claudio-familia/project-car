/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {TouchableOpacity, Text, StyleSheet, View} from "react-native";
import { ThemeColors } from "../models/theme";
import Color from "../../utils/color-const";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

let COLORS: ThemeColors = Color.light.colors;

type Props = {
    title: string,
    message: string,
    type: "success" | "error",
	onPress?: () => void,
}

const ValidationMessage = ({title, message, type, onPress = () => {}}: Props) => {
	COLORS = useTheme().colors as any;

	const close = () => {
		console.log("dismiss");
		onPress();
	};

	return (
		<View
			style={[
				styles.validationMessage,
				styles[type]
			]}>
			<View style={styles.textContainer}>
				<Text style={styles.title}>
					{title}
				</Text>
				<Text style={styles.message}>
					{message}
				</Text>
			</View>
			<TouchableOpacity onPress={close} activeOpacity={0.7}>
				<Icon style={styles.closeIcon} name={"close"} />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	validationMessage: {
		width: "100%",
		backgroundColor: COLORS.primary,
		marginVertical: 20,
		padding: 5,
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row"
	},
	textContainer: {
		width: "90%",
	},
	success: {
		backgroundColor: COLORS.notification,
	},
	error: {
		backgroundColor: COLORS.error
	},
	title: {
		color: COLORS.white,
		fontWeight: "bold",
		fontSize: 18
	},
	message: {
		color: COLORS.text,
		fontSize: 16
	},
	closeIcon: {
		fontSize: 22,
	}
});

export default ValidationMessage;