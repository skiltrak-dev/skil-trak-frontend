import classNames from "classnames";

export const getTextInputClasses = (error: boolean, disabled: boolean) => {
	return classNames({
		"border border text-black w-full rounded-md outline-none px-4 py-2 placeholder-gray text-sm":
			true,
		"border-error": error,
		"border-muted": !error,
		"bg-secondary-dark cursor-not-allowed placeholder-muted": disabled,
		"bg-white": !disabled,
	});
};
