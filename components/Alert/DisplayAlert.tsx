import { useAlert } from "hooks";

export const DisplayAlerts = () => {
	const { alerts } = useAlert();
	return (
		alerts && (
			<div className="flex flex-col-reverse gap-y-1">
				{alerts.map((alert: any) => (
					<div key={`alert-${alert.id}`}>{alert.element}</div>
				))}
			</div>
		)
	);
};
