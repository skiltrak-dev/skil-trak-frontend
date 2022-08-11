import { baseTheme } from "./base";
import { ThemeColors } from "./type";
import { getCurrentTheme } from "./utils";

export const Theme = {
	Base: baseTheme,
};

export const getThemeColors = (): ThemeColors => {
	return (Theme as any)[getCurrentTheme()].colors;
};
