import { useFormContext } from "react-hook-form";

import {
    HelpText,
    LoadingSpinner,
    RequiredStar,
    Tooltip,
    Typography,
    ValidationIcon
} from "@components";
import { getMethodsForInput } from "@utils";

import { InputErrorMessage } from "./InputErrorMessage";
import { InputProps } from "./InputPropType";
import { getTextInputClasses } from "./inputStyleClasses";

export type InputType =
	| "text"
	| "number"
	| "password"
	| "email"
	| "search"
	| "tel"
	| "date"
	| "time";

export type TextInputProps = InputProps & {
	type?: InputType;
	placeholder?: string;
};

export const TextInput = ({
	id,
	name,
	label,

	type,
	placeholder,

	helpText,
	tooltip,

	value,
	rules,
	onChange,
	onBlur,

	loading = false,
	required = false,
	disabled = false,
	validationIcons = false,
}: TextInputProps) => {
	const formContext = useFormContext();

	const inputFieldClasses = getTextInputClasses(
		formContext && formContext.getFieldState(name).error !== undefined,
		disabled
	);

	return (
		<div className="w-full">
			{label && (
				<div className="flex justify-between items-center">
					<div>
						<Typography variant={"label"}>{label}</Typography>
						{required && <RequiredStar />}
					</div>
					{tooltip && <Tooltip text={tooltip} />}
				</div>
			)}

			<div className="w-full">
				<div className="relative">
					<input
						className={inputFieldClasses}
						{...(id ? { id } : {})}
						type={type}
						placeholder={placeholder || ""}
						disabled={disabled}
						{...getMethodsForInput(
							name,
							formContext,
							rules,
							onChange,
							onBlur
						)}
						{...(value ? { value } : {})}
					/>

					{!loading && validationIcons && (
						<ValidationIcon name={name} />
					)}
					{loading && <LoadingSpinner loading={loading} />}
				</div>

				<HelpText text={helpText} />
				<InputErrorMessage name={name} />
			</div>
		</div>
	);
};
