import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en";
import es from "./es";
const resources = {
	en,
	es
};
i18n.use(initReactI18next)
	.init({
		compatibilityJSON: "v3",
		resources,
		lng: "es",
		interpolation: {
			escapeValue: false,
		},
	});
export default i18n;