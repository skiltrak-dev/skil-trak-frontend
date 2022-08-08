import React from "react";
import { Typography } from "@components";

export const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<div className="w-full flex-grow bg-white border-t border-secondary-dark absolute bottom-0 left-0 py-2">
			<div className="flex justify-center items-center">
				<Typography variant={"small"}>
					{`SkilTrak © ${year} - All Rights Reserved`}
				</Typography>
			</div>
		</div>
	);
};
