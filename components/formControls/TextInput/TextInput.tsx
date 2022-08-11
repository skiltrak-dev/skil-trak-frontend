import {
	ErrorMessage,
	Field,
	FieldInputProps,
	FieldMetaProps,
	useField,
} from "formik";

// Icons
import { AiFillCheckCircle } from "react-icons/ai";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import {
	MdCheckCircle,
	MdCheckCircleOutline,
	MdError,
	MdErrorOutline,
} from "react-icons/md";
import { ClipLoader } from "react-spinners";

// components
import { Typography } from "../../Typography";

// styles
// import { NotifiedDiv } from "./style";

interface TextInputProps {
	label?: string;
	type?: "text" | "number" | "email" | "search" | "tel" | "date" | "time";
	min?: string | number;
	max?: string | number;
	placeHolder?: string;
	name: string;
	id?: string;
	required?: boolean;
	loading?: boolean;
	onChange?: any;
	onBlur?: any;
	helpText?: string;
	toolTip?: string;
	formik?: boolean;
	validationIcons?: boolean;
	disabled?: boolean;
}

export const TextInput = ({
	id,
	name,
	label,
	type = "text",
	placeHolder,
	min,
	max,
	helpText,
	toolTip,
	onChange,
	onBlur,
	required,
	formik = true,
	validationIcons = false,
	loading,
	disabled,
}: TextInputProps) => {
	const inputFieldClasses = `border border text-black w-full rounded-md outline-none px-4 py-2 placeholder-gray text-sm`;

	const inputProps = {
		id,
		name,
		type,
		min,
		max,
		placeholder: placeHolder,
		onChange,
		onBlur,
		required,
		disabled,
	};

	return (
		<div className="w-full pb-2">
			{label && (
				<div className="flex justify-between items-center">
					<div>
						<Typography variant={"label"}>{label}</Typography>
						{required && <span className="text-primary">*</span>}
					</div>
					{toolTip && (
						<div className="relative">
							<BsFillQuestionSquareFill className="transition-all text-gray-light hover:text-gray cursor-pointer" />
							<div className="bottom-arrow absolute bottom-full mb-3.5 -right-3 w-44 h-auto p-2 bg-secondary-text rounded-md">
								<Typography variant={"muted"} color={"white"}>
									{toolTip}
								</Typography>
							</div>
						</div>
					)}
				</div>
			)}

			<div className="w-full flex items-center relative">
				<Field name={name}>
					{({
						field, // { name, value, onChange, onBlur }
						meta,
					}: {
						field: FieldInputProps<any>;
						meta: FieldMetaProps<any>;
					}) => (
						<>
							<input
								className={`${
									meta.touched && meta.error
										? "border-error"
										: "border-muted"
								} ${inputFieldClasses}`}
								{...inputProps}
								{...field}
								onChange={(e) => {
									field.onChange(e);
									onChange && onChange(e);
								}}
								onBlur={(e) => {
									field.onBlur(e);
									onBlur && onBlur(e);
								}}
							/>

							{!loading &&
							validationIcons &&
							meta.touched &&
							meta.error ? (
								<MdError className="absolute -right-2 -bottom-2 text-2xl text-error z-10 bg-white p-px rounded-full" />
							) : (
								<MdCheckCircle className="absolute -right-2 -bottom-2 text-2xl text-success z-10 bg-white p-px rounded-full" />
							)}
						</>
					)}
				</Field>

				{loading && (
					<div className="absolute -right-1 -bottom-2 bg-white p-1 rounded-full shadow-sm flex items-center justify-center">
						<ClipLoader size={16} />
					</div>
				)}
			</div>

			{helpText && (
				<div className="mt-1 ml-2">
					<Typography variant={"small"} color={"text-muted"}>
						{helpText}
					</Typography>
				</div>
			)}

			<ErrorMessage
				name={name}
				className="text-xs text-error -mt-2"
				component="span"
			/>
		</div>
	);
};
