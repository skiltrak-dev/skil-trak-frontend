export const getMethodsForInput = (
	name: string,
	formContext: any,
	rules: any,
	onChange: any,
	onBlur: any
) => {
	let methods: any = {};
	if (formContext) {
		return {
			...formContext.register(name, {
				...rules,
				...(onChange ? { onChange } : {}),
				...(onBlur ? { onBlur } : {}),
			}),
		};
	} else {
		if (onChange) {
			methods.onChange = (e: any) => {
				onChange(e);
			};
		}

		if (onBlur) {
			methods.onBlur = (e: any) => {
				onBlur(e);
			};
		}
	}

	return methods;
};
