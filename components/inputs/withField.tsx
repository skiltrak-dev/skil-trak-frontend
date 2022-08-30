import { useFormContext } from "react-hook-form";

export type InputFieldType = {
	FormControl: any;
	ErrorMessage?: any;
	touched: boolean | null;
	error: boolean | null;
};

const getRegisterMethods = (formContext: any, inputProps: any) => {
	if (formContext) {
		const registerMethods = formContext.register(inputProps.name, {
			...inputProps.rules,
			...(inputProps.onChange ? { onChange: inputProps.onChange } : {}),
			...(inputProps.onBlur ? { onBlur: inputProps.inputProps } : {}),
		});

		return registerMethods;
	}

	return null;
};

export const withField = (WrappedComponent: React.ComponentType) => {
	const displayName =
		WrappedComponent.displayName || WrappedComponent.name || "Component";

	const ComponentWithOrWithoutForm = (props: any) => {
		const formContext = useFormContext();
		const { children, ...rest } = props;
		const registerMethods = getRegisterMethods(formContext, rest);

		return children({
			FormControl: ({
				useController,
				...inputProps
			}: {
				useController?: boolean;
			}) => {
				return (
					<WrappedComponent
						{...(formContext &&
							formContext.register &&
							formContext.register(rest.name, {
								...rest.rules,
								...(rest.onChange
									? { onChange: rest.onChange }
									: {}),
								...(rest.onBlur
									? { onBlur: rest.inputProps }
									: {}),
							}))}
						{...rest}
						{...inputProps}
						{...(!formContext && rest.onChange
							? {
									onChange: (e: any) => {
										rest.onChange && rest.onChange(e);
									},
							  }
							: {})}
						{...(!formContext && rest.onBlur
							? {
									onBlur: (e: any) => {
										rest.onBlur && rest.onBlur(e);
									},
							  }
							: {})}
					/>
				);
			},

			// ErrorMessage: () =>
			// 	formContext ? (
			// 		<ErrorMessage
			// 			errors={formContext.formState.errors}
			// 			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			// 			name={rest.name as any}
			// 			render={({ message }) => {
			// 				return (
			// 					<p className="mt-1 ml-1 text-xs text-left block text-red-600">
			// 						{message}
			// 					</p>
			// 				);
			// 			}}
			// 		/>
			// 	) : null,
			// touched: formContext
			// 	? formContext.formState.touchedFields[props.name]
			// 	: null,
			// error: formContext
			// 	? formContext.formState.errors[props.name]
			// 	: null,
		});
	};

	ComponentWithOrWithoutForm.displayName = `withOrWithoutForm(${displayName})`;

	return ComponentWithOrWithoutForm;
};
