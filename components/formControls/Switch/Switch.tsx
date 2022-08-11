import React, { useState } from "react";
import { default as ReactSwitch } from "react-switch";
import { Field, ErrorMessage } from "formik";

// components
import { Typography } from "components";
import { getThemeColors } from "@theme";

const Colors = getThemeColors();

interface SwitchProps {
	value: string;
	name: string;
	label: string;
	setFieldValue: any;
	disabled: boolean;
}
export const Switch = ({
	value,
	name,
	label,
	setFieldValue,
	disabled = false,
}: SwitchProps) => {
	const handleChange = (checked: boolean) => {
		setFieldValue(name, checked);
	};
	return (
		<div className="flex items-center gap-x-2">
			<ReactSwitch
				disabled={disabled}
				width={40}
				height={16}
				checked={value !== ""}
				handleDiameter={0}
				checkedIcon={false}
				uncheckedIcon={false}
				onChange={handleChange}
				onColor={Colors.primary.light}
				offColor={Colors.secondary.dark}
				id={name}
			/>

			<Typography variant={"label"} htmlFor={name}>
				{label}
			</Typography>
		</div>
	);
};
