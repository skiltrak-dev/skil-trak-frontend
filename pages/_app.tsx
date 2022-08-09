import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

import { applyTheme, getCurrentTheme, Theme } from "@theme";
import { AlertProvider, NavbarProvider } from "@hooks";

const MyApp = ({ Component, pageProps }: AppProps) => {
	// Apply theme from local storage
	useEffect(() => {
		applyTheme((Theme as any)[getCurrentTheme()].theme);
	}, []);

	return (
		<AlertProvider>
			<NavbarProvider>
				<Component {...pageProps} />
			</NavbarProvider>
		</AlertProvider>
	);
};

export default MyApp;
