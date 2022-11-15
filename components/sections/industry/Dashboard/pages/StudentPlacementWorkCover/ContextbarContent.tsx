import {
	DisplayPrimaryActions,
	OtherDocumentLinks,
	Typography
} from "components";
import { useLocation } from "react-router-dom";
import { AdForRPL } from "../../../ApplyForRPL/AdForRPL";
import { PrimaryActions as DashboardPrimaryActions } from "../Dashboard";

export const ContextBarContent = () => {
	const location = useLocation();

	return (
		<>
			<AdForRPL short />

			<Typography variant="muted" color="gray">
				Related Links
			</Typography>

			<OtherDocumentLinks hideLink={location.pathname.replace("/", "")} />

			<Typography variant="muted" color="gray">
				Other Links
			</Typography>

			<DisplayPrimaryActions actions={DashboardPrimaryActions} />
		</>
	);
};
