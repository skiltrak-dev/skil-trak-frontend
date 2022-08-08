import { createContext, useContext, useState } from "react";

import { Alert, AlertType, AlertProps } from "@components";

type AlertObjectType = {
	success: (props: AlertProps) => void;
	info: (props: AlertProps) => void;
	warning: (props: AlertProps) => void;
	error: (props: AlertProps) => void;
};

interface AlertContextType {
	alert: AlertObjectType;
	alerts: Object[];
	dismiss: Function;
}

const AlertContext = createContext<AlertContextType | null>(null);

export const AlertProvider = ({ children }: { children: any }) => {
	const [lastId, setLastId] = useState(1);
	const [alerts, setAlerts] = useState<any>([]);

	const dismiss = (alertId: number) => {
		const filteredAlerts = alerts.filter(
			(alert: any) => alert.id !== alertId
		);
		setAlerts([...filteredAlerts]);
	};

	const createAlert = ({
		title,
		description,
		dismiss = true,
		autoDismiss = true,
		avatar,
		icon,
		variant,
	}: AlertProps) => {
		setAlerts([
			...alerts,
			{
				id: lastId,
				element: (
					<Alert
						id={lastId}
						title={title}
						description={description}
						variant={variant}
						dismiss={dismiss}
						avatar={avatar}
						icon={icon}
						autoDismiss={autoDismiss}
					/>
				),
			},
		]);
		setLastId(lastId + 1);
	};

	const alert = {
		success: (alertProps: AlertProps) =>
			createAlert({ ...alertProps, variant: AlertType.success as any }),
		info: (alertProps: AlertProps) =>
			createAlert({ ...alertProps, variant: AlertType.info as any }),
		warning: (alertProps: AlertProps) =>
			createAlert({ ...alertProps, variant: AlertType.waning as any }),
		error: (alertProps: AlertProps) =>
			createAlert({ ...alertProps, variant: AlertType.error as any }),
	};

	const values: any = {
		alert,
		alerts,
		dismiss,
	};

	return (
		<AlertContext.Provider value={values}>{children}</AlertContext.Provider>
	);
};

export const useAlert = () => {
	return useContext(AlertContext) as AlertContextType;
};
