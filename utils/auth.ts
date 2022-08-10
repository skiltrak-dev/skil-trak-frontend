import jwt from "jwt-decode";

const KEYS = {
	TOKEN: "user-token",
};
export const setToken = (token: string) => {
	localStorage.setItem(KEYS.TOKEN, token);
};

export const getToken = () => {
	return localStorage.getItem(KEYS.TOKEN);
};

export const getUserCredentials = () => {
	const token = getToken();
	if (token) {
		return jwt(token);
	}
	return null
};

export const isAuthenticated = () => {
	return getToken() !== null;
};

export const logout = () => {
	localStorage.removeItem(KEYS.TOKEN);
};

export const AuthUtils = {
	setToken,
	getToken,
	getUserCredentials,
	isAuthenticated,
	logout,
};
