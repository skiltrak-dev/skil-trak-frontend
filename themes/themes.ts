import { baseTheme } from "./base";
import { darkTheme } from "./dark";
import { ThemeColors } from "./type";
import { getCurrentTheme } from "./utils";

export const Theme = {
	Base: baseTheme,
	Dark: darkTheme
};

export const getThemeColors = (): ThemeColors => {
	return (Theme as any)[getCurrentTheme()].colors;
};
