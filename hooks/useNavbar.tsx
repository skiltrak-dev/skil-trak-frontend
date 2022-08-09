import React, { createContext, useContext, useState } from "react";

interface NavbarContextType {
	title: string;
	setTitle: Function;
}

const NavbarContext = createContext<NavbarContextType | null>(null);

export const NavbarProvider = ({ children }: { children: React.ReactNode }) => {
	const [title, setTitle] = useState("");

	const values = {
		title,
		setTitle: (title: string) => setTitle(title),
	};

	return (
		<NavbarContext.Provider value={values}>
			{children}
		</NavbarContext.Provider>
	);
};

export const useNavbar = () => {
	return useContext(NavbarContext) as NavbarContextType;
};
