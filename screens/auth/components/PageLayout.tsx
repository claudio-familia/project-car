/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from "react";
import {View, Text, SafeAreaView, StyleSheet, KeyboardAvoidingView, ScrollView} from "react-native";
import Loader from "../../../components/Loader";
import { ThemeColors } from "../../../models/theme";
import Color from "../../../utils/color-const";
import { useTheme } from "@react-navigation/native";

let COLORS: ThemeColors = Color.light.colors;

type Props = {
    title: string,
    subtitle: string,
    loading: boolean,
    children: ReactNode
}

const PageLayout = ({title, subtitle, loading, children}: Props) => {
	COLORS = useTheme().colors as any;

	return (
		<SafeAreaView style={styles.container}>
			<Loader visible={loading} />
			<ScrollView>
				<KeyboardAvoidingView behavior="padding" style={styles.content}>
					<Text style={styles.title}>
						{title}
					</Text>
					<Text style={styles.subtitle}>
						{subtitle}
					</Text>
					<View style={{marginVertical: 20}}>
						{children}
					</View>
				</KeyboardAvoidingView>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.background,
		flex: 1
	},
	content: {
		paddingTop: 50,
		paddingHorizontal: 20
	},
	title: {
		color: COLORS.text,
		fontSize: 40,
		fontWeight: "bold"
	},
	subtitle: {
		color: COLORS.text,
		opacity: 0.8,
		fontSize: 18,
		marginVertical: 10
	},
	link: {
		color: COLORS.text,
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 16,
	}
});

export default PageLayout;