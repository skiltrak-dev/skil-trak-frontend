import { ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { default as ReactSelect } from "react-select";

// components
import { Typography } from "../../Typography";

import { Field } from "formik";
// Colors

import { MdCheckCircle, MdError } from "react-icons/md";
import { getThemeColors } from "@theme";

const Colors = getThemeColors();

interface SelectProps {
	name: string;
	label: string;
	errors: any;
	options: any;
	touched: any;
	errorIcons: boolean;
	defaultValue: any;
	setFieldValue: any;
	disabled: boolean;
	multi: boolean;
	loading: boolean;
	onChange: any;
	onlyValue: any;
}

export const Select = ({
	name,
	label,
	errors,
	options,
	touched,
	errorIcons,
	defaultValue,
	setFieldValue,
	disabled,
	multi,
	loading,
	onChange,
	onlyValue,
}: SelectProps) => {
	const [value, setValue] = useState("");

	useEffect(() => {
		if (defaultValue && value === "") {
			setValue(defaultValue);
			if (setFieldValue) {
				if (Array.isArray(defaultValue)) {
					setFieldValue(
						name,
						onlyValue
							? defaultValue.map((v) => v.value)
							: defaultValue
					);
				}
			}
		}
	}, [defaultValue]);

	const CustomStyle = {
		control: (base: any, state: { isFocused: any }) => ({
			...base,
			backgroundColor: "#ffffff",
			color: "white",
			boxShadow: state.isFocused ? "0.5px 0.5px #888888" : "none",
			border: state.isFocused
				? `1px solid ${Colors.secondary.dark} !important`
				: touched && touched[name] && errors && errors[name]
				? `1px solid red !important`
				: `1px solid ${Colors.secondary.dark} !important`,
			"&:hover": {
				border: state.isFocused
					? `1px solid ${Colors.muted} !important`
					: `1px solid ${Colors.muted} !important`,
			},
		}),
		input: (base: any, state: any) => ({
			...base,
			fontSize: "14px",
		}),
		placeholder: (
			base: any,
			state: { selectProps: { menuIsOpen: any } }
		) => ({
			...base,
			color: state.selectProps.menuIsOpen
				? Colors.secondary.dark
				: Colors.muted,
			fontSize: "14px",
		}),
		option: (base: any, state: any) => ({
			...base,
			borderBottom: "1px dotted #ccc",
			backgroundColor: state.isSelected ? "#00000010" : "#ffffff",
			color: "black",
			fontSize: "14px",
			"&:hover": {
				backgroundColor: Colors.secondary.DEFAULT,
			},
		}),
		menu: (provided: any, state: any) => ({
			...provided,
			borderBottom: "1px dotted pink",
			color: "black",
		}),
		dropdownIndicator: (style: any, state: any) => ({
			transform: state.selectProps.menuIsOpen
				? "rotateX(-180deg)"
				: "rotateX(0)",
			transition: "all 0.5s",
			color: "black",
			padding: "7px",
		}),
		singleValue: (provided: any, state: any) => {
			const color = state.selectProps.menuIsOpen
				? Colors.secondary.DEFAULT
				: "#000000";
			const transition = "opacity 300ms";
			const fontSize = "14px";

			return { ...provided, color, transition, fontSize };
		},
		noOptionsMessage: (provided: any, state: any) => ({
			...provided,
			fontSize: "14px",
		}),
		multiValue: (styles: any, { data }: { data: any }) => {
			const color = "transparent";
			return {
				...styles,
				backgroundColor: color,
				border: "1px solid #ccc",
				borderRadius: "4px",
			};
		},
		multiValueRemove: (styles: any, { data }: { data: any }) => ({
			...styles,
			color: "orange",
			":hover": {
				backgroundColor: "orange",
				color: "white",
			},
		}),
	};

	const handleChange = (event: any) => {
		// Overwrite the event with your own object if it doesn't exist
		if (!event) {
			event = "";
		}
		setValue(event);

		if (setFieldValue) {
			if (Array.isArray(event)) {
				setFieldValue(
					name,
					onlyValue ? event.map((e) => e.value) : event
				);
			} else {
				onlyValue
					? setFieldValue(name, event.value)
					: setFieldValue(name, event);
			}
		}

		onChange && onChange(event);
	};

	return (
		<div className="w-full">
			{label && <Typography variant={"label"}>{label}</Typography>}
			<div className="w-full flex items-center relative">
				{/* <Field name={name}>
					{({ field, ...rest }) => ( */}
				<ReactSelect
					isSearchable
					isClearable={value !== ""}
					name={name}
					value={value}
					options={options}
					className="basic-single w-full"
					classNamePrefix="select"
					styles={CustomStyle}
					isLoading={loading}
					isDisabled={disabled}
					isMulti={multi}
					// {...field}
					// {...rest}
					onChange={handleChange}
				/>
				{/* )} */}
				{/* </Field> */}
				{errorIcons && (
					<>
						{touched[name] && (
							<>
								{errors[name] ? (
									<MdError className="absolute -right-2 -bottom-2 text-xl text-error" />
								) : (
									<MdCheckCircle className="absolute -right-2 -bottom-2 text-xl text-success" />
								)}
							</>
						)}
					</>
				)}
			</div>
			<ErrorMessage
				name={name}
				className="text-xs text-error"
				component="span"
			/>
		</div>
	);
};
