import { RtoLayout, RtoLayoutV2 } from '@layouts'
import { RtoWpApprovalPlacements } from '@partials'
import React, { ReactElement } from 'react'

const ApprovePlacementsPage = () => {
    return <RtoWpApprovalPlacements />
}

ApprovePlacementsPage.getLayout = (page: ReactElement) => {
    return <RtoLayout>{page}</RtoLayout>
}

export default ApprovePlacementsPage
