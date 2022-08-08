import {
	buildStyles,
	CircularProgressbarWithChildren,
} from "react-circular-progressbar";

// components
import { getThemeColors } from "@theme";
import { Typography } from "@components";

const ThemeColors = getThemeColors();

export const CircularProgressBar = () => {
	return (
		<div className="flex justify-center items-center w-full">
			<CircularProgressbarWithChildren
				value={Math.floor((30 / 45) * 100)}
				styles={buildStyles({
					pathColor: ThemeColors.primary.dark,
					trailColor: ThemeColors.secondary.dark,
					strokeLinecap: "butt",
				})}
				className="w-full h-[170px]"
				// classes="w-20"
			>
				<Typography variant={"subtitle"}>Total Students</Typography>
				<Typography variant={"h4"}>30/45</Typography>
			</CircularProgressbarWithChildren>
		</div>
	);
};
