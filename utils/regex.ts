export const onlyAlphabets = () => /^[A-Za-z ]*$/;
export const strongPassword = () =>
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

export const validEmail = () => /\S+@\S+\.\S+/;

export const isEmailValid = (email:string) => {
	return validEmail().test(email);
};
