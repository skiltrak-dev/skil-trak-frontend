import React, { ReactElement } from 'react'

import { NextPageWithLayout } from '@types'
import { AdminLayout } from '@layouts'
import { WpCancelationRequest } from '@partials/common'

const CancelledWorkplaceRequests: NextPageWithLayout = () => {
    return (
        <div>
            <WpCancelationRequest />
        </div>
    )
}

CancelledWorkplaceRequests.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default CancelledWorkplaceRequests
