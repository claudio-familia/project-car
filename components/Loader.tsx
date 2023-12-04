import React from "react";
import {
	useWindowDimensions,
	View,
	Text,
	ActivityIndicator,
	StyleSheet,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { ThemeColors } from "../models/theme";
import Color from "../utils/color-const";

let COLORS: ThemeColors = Color.light.colors;

type Props = {
	visible: boolean,
}

const Loader = ({visible = false}: Props) => {
	const {width, height} = useWindowDimensions();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	COLORS = useTheme().colors as any;
	
	return (
		visible && (
			<View style={[styles.container, {height, width}]}>
				<View style={styles.loader}>
					<ActivityIndicator size="large" color={COLORS.primary} />
					<Text style={styles.text}>Loading...</Text>
				</View>
			</View>
		)
	);
};

const styles = StyleSheet.create({
	loader: {
		height: 70,
		backgroundColor: COLORS.background,
		marginHorizontal: 50,
		borderRadius: 5,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	container: {
		position: "absolute",
		zIndex: 10,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
	},
	text: {
		marginLeft: 10,
		fontSize: 16
	}
});

export default Loader;