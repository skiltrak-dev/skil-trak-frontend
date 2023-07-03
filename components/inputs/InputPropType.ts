import { ChangeEvent, ReactElement } from "react";

export type InputProps = {
	id?: string;
	name: string;
	label?: string | ReactElement;

	helpText?: string;
	tooltip?: string;

	onBlur?: any;
	rules?: any;
	onChange?: any
	value?: any;

	loading?: boolean;
	disabled?: boolean;
	required?: boolean;
	validationIcons?: boolean;

	className?: string;
};
