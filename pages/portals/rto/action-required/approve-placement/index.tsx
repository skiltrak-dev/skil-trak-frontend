import { RtoLayoutV2 } from '@layouts'
import { RtoWpApprovalPlacements } from '@partials'
import React, { ReactElement } from 'react'

const ApprovePlacementsPage = () => {
    return (
        <div>
            <RtoWpApprovalPlacements />
        </div>
    )
}

ApprovePlacementsPage.getLayout = (page: ReactElement) => {
    return <RtoLayoutV2>{page}</RtoLayoutV2>
}

export default ApprovePlacementsPage
