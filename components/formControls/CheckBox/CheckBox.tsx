import { ErrorMessage, Field } from "formik";
import { withField } from "../withField";

interface CheckboxProps {
	label: string;
	name: string;
	formik?: boolean;
}

export const Checkbox = ({ label, name, formik = true }: CheckboxProps) => {
	const CheckBoxField = withField((props) => <input {...props} />);

	return (
		<>
			<label
				htmlFor={`id_${name}`}
				className="flex items-center gap-x-2.5 text-sm"
			>
				<CheckBoxField id={`id_${name}`} type="checkbox" name={name} />
				<p className="text-sm">{label}</p>
			</label>
			{formik && (
				<ErrorMessage
					name={name}
					component="span"
					className="text-error text-xs"
				/>
			)}
		</>
	);
};
