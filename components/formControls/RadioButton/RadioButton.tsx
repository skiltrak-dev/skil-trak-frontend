import React from "react";
import { Field, ErrorMessage, FieldInputProps } from "formik";

interface RadioButtonOption {
	label: string;
	value: string | number;
}

interface RadioButtonProps {
	label: string;
	name: string;

	options: RadioButtonOption[];
	formik?: boolean;
}

export const RadioButton = ({
	name,
	options,
	formik = true,
}: RadioButtonProps) => {
	return (
		<>
			<div className="flex flex-col">
				{formik ? (
					<Field name={name}>
						{({ field }: { field: FieldInputProps<any> }) => (
							<div>
								{options.map((option) => (
									<div
										key={option.value}
										className="radio-item"
									>
										<input
											type="radio"
											id={`id_${option.value}`}
											{...field}
											value={option.value}
										/>
										<label htmlFor={`id_${option.value}`}>
											{option.label}
										</label>
									</div>
								))}
							</div>
						)}
					</Field>
				) : (
					<div>
						{options.map((option) => (
							<div key={option.value} className="radio-item">
								<input
									type="radio"
									id={`id_${option.value}`}
									value={option.value}
								/>
								<label htmlFor={`id_${option.value}`}>
									{option.label}
								</label>
							</div>
						))}
					</div>
				)}
			</div>
			{formik && (
				<ErrorMessage
					name={name}
					className="text-error text-11"
					component="span"
				/>
			)}
		</>
	);
};
