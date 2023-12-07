const MUTUAL_COLORS = {
	colors: {
		white: "#FFFFFF",
		black: "#000000",
	},
};
  
const light = {
	dark: false,
	colors: {
		primary: "#006BA6",
		secondary: "#FFBE0B",
		danger: "#BA324F",
		error: "#fa6666",
		background: "#FBFBFF",
		text: "#0D0106",
		card: "#FBFBFF",
		border: "#0D0106",
		notification: "#3CCD65",
		...MUTUAL_COLORS.colors,
	},
};
  
const dark = {
	dark: true,
	colors: {
		primary: "#0085CC",
		secondary: "#FFC31F",
		danger: "#CC3E5C",
		error: "#fc8181",
		background: "#0D0106",
		text: "#FBFBFF",
		card: "#0D0106",
		border: "#FBFBFF",
		notification: "#4DD172",
		...MUTUAL_COLORS.colors,
	},
};
  
export default { light, dark };
