import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Provider } from "react-redux";

import { applyTheme, getCurrentTheme, Theme } from "@theme";
import { AlertProvider, NavbarProvider } from "@hooks";

import { store } from "../redux/store";

const MyApp = ({ Component, pageProps }: AppProps) => {
	// Apply theme from local storage
	useEffect(() => {
		applyTheme((Theme as any)[getCurrentTheme()].theme);
	}, []);

	return (
		<Provider store={store}>
			<AlertProvider>
				<NavbarProvider>
					<Component {...pageProps} />
				</NavbarProvider>
			</AlertProvider>
		</Provider>
	);
};

export default MyApp;
