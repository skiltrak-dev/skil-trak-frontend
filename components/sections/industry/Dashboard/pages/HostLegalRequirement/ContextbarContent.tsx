import React from 'react'

// components
import {
  Typography,
  // OtherDocumentLinks,
  DisplayPrimaryActions,
} from 'components'
import { PrimaryActions as DashboardPrimaryActions } from '../IndustryDashboardContainer'
import { AdForRPL } from '../../../ApplyForRPL/AdForRPL'

export const ContextBarContent = () => {
  return (
    <>
      <AdForRPL short />

      <Typography variant="muted" color="gray">
        Related Links
      </Typography>

      {/* <OtherDocumentLinks hideLink={pathname.replace("/", "")} /> */}

      <Typography variant="muted" color="gray">
        Other Links
      </Typography>

      <DisplayPrimaryActions actions={DashboardPrimaryActions} />
    </>
  )
}
