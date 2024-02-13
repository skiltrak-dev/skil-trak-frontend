import {
    DisplayPrimaryActions,
    // OtherDocumentLinks,
    Typography,
} from '@components'
import { AdForRPL } from '@components/sections/industry'
import { PrimaryActions as DashboardPrimaryActions } from '../IndustryDashboardContainer'

export const ContextBarContent = () => {
    return (
        <>
            <AdForRPL short />

            <Typography variant="muted" color="gray">
                Related Links
            </Typography>

            {/* <OtherDocumentLinks hideLink={location.pathname.replace("/", "")} /> */}

            <Typography variant="muted" color="gray">
                Other Links
            </Typography>

            <DisplayPrimaryActions actions={DashboardPrimaryActions} />
        </>
    )
}
