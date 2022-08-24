import { useFormContext } from "react-hook-form";
import { MdCheckCircle, MdError } from "react-icons/md";

export const ValidationIcon = ({
	name,
	error,
}: {
	name: string;
	error?: boolean;
}) => {
	const formContext = useFormContext();

	const canShowError = () => {
		if (error) return true;
		if (formContext.formState.touchedFields[name]) {
			if (formContext.formState.errors[name]) return true;
			return false;
		}
		return null;
	};

	return (
		<>
			{canShowError() === true && (
				<MdError className="absolute -right-2 -bottom-2 text-2xl text-error z-10 bg-white p-px rounded-full" />
			)}

			{canShowError() === false && (
				<MdCheckCircle className="absolute -right-2 -bottom-2 text-2xl text-success z-10 bg-white p-px rounded-full" />
			)}
		</>
	);
};
