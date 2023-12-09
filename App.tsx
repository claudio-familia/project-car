import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./routes/Routes";
import Colors from "./utils/color-const";
import { useColorScheme } from "react-native";
import "./localization/i18n";

export default function App() {
	const theme = useColorScheme();

	return (
		<NavigationContainer theme={theme === "dark" ? Colors.dark : Colors.light}>
			<Routes />
		</NavigationContainer>
	);
}

