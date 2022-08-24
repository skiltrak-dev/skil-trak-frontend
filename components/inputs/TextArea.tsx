import {
	HelpText,
	LoadingSpinner,
	RequiredStar,
	Tooltip,
	Typography,
	ValidationIcon
} from "@components";
import { getMethodsForInput } from "@utils";
import { useFormContext } from "react-hook-form";
import { InputErrorMessage } from "./InputErrorMessage";
import { InputProps } from "./InputPropType";
import { getTextInputClasses } from "./inputStyleClasses";


export type TextAreaProps = InputProps & {
	placeholder?: string;
};

export const TextArea = ({
	id,
	label,
	name,

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
}: TextAreaProps) => {
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

			<div className="w-full flex items-center relative">
				<textarea
					className={inputFieldClasses}
					{...(id ? { id } : {})}
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
				></textarea>

				{!loading && validationIcons && <ValidationIcon name={name} />}
				<LoadingSpinner loading={loading} />
			</div>

			<HelpText text={helpText} />
			<InputErrorMessage name={name} />
		</div>
	);
};
