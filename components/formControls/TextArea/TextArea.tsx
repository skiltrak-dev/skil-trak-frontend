import React from "react";
import { Field, ErrorMessage } from "formik";

// Icons
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdCancel } from "react-icons/md";

// components
import { Typography } from "../../Typography";

interface TextAreaProps {
	label: string;
	placeholder: string;
	name: string;
	errorIcons: boolean;
	touched: any;
	errors: any;
	inputDescription: string;
}

export const TextArea = ({
	label,
	placeholder,
	name,
	errorIcons,
	touched,
	errors,
	inputDescription,
}: TextAreaProps) => {
	const borderColorClasses = {
		gray: "border-gray",
		error: "border-error",
		primaryDark: "border-primary-dark",
		secondaryDark: "border-secondary-dark",
	};

	// Border Colors
	const styles = (errors: any, touched: any, field: any) => {
		return errors[field] && touched[field] ? "error" : "secondaryDark";
	};

	return (
		<div className="w-full">
			<div className="flex justify-between items-center">
				<Typography variant={"label"}>{label}</Typography>
			</div>
			<div className="w-full flex items-center relative">
				<Field
					as="textarea"
					rows="4"
					className={`border ${
						borderColorClasses[styles(errors, touched, name)]
					} text-black w-full rounded-md outline-none remove-scrollbar py-2 px-4 placeholder-gray text-xs`}
					placeholder={placeholder || ""}
					name={name}
					id={name}
					autoComplete={"on"}
				/>

				{errorIcons && (
					<>
						{touched[name] && (
							<>
								{errors[name] ? (
									<MdCancel className="absolute -right-6 text-xl text-error" />
								) : (
									<AiFillCheckCircle className="absolute -right-6 text-xl text-success" />
								)}
							</>
						)}
					</>
				)}
			</div>
			{inputDescription && (
				<Typography variant={"small"} color={"grayLight"}>
					{inputDescription}
				</Typography>
			)}
			<ErrorMessage
				name={name}
				className="text-11 text-error"
				component="span"
			/>
		</div>
	);
};
