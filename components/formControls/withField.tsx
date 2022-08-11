import { useField, useFormikContext } from "formik";

export const withField = (WrappedComponent: React.ComponentType) => {
	const displayName =
		WrappedComponent.displayName || WrappedComponent.name || "Component";

	const ComponentWithOrWithoutFormik = (props: any) => {
		console.log(":::: PROPS", props, WrappedComponent)
		const formikContext = useFormikContext();

		if (formikContext) {
			const [field] = useField(props);
			return <WrappedComponent {...field} {...props} />;
		}

		return <WrappedComponent {...props} />;
	};

	ComponentWithOrWithoutFormik.displayName = `withOrWithoutFormik(${displayName})`;

	return ComponentWithOrWithoutFormik;
};
