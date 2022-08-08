import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

import { applyTheme, getCurrentTheme, Theme } from "@theme";
import { AlertProvider } from "@hooks";

const MyApp = ({ Component, pageProps }: AppProps) => {
	// Apply theme from local storage
	useEffect(() => {
		applyTheme((Theme as any)[getCurrentTheme()]);
	}, []);

	return (
		<AlertProvider>
			<Component {...pageProps} />
		</AlertProvider>
	);
};

export default MyApp;
