import { baseTheme } from "./base";
import { getCurrentTheme } from "./utils";

export const Theme = {
	Base: baseTheme,
};

export const getThemeColors = () => {
	return (Theme as any)[getCurrentTheme()].colors;
};
