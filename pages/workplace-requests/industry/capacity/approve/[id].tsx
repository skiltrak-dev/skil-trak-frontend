import { SiteLayout } from '@layouts'
import { CapacityApproveFromSite } from '@partials/common/StudentProfileDetail/components'
import React, { ReactElement } from 'react'

const IndustryCapacityApprove = () => {
    return (
        <div>
            <CapacityApproveFromSite />
        </div>
    )
}

IndustryCapacityApprove.getLayout = (page: ReactElement) => {
    return <SiteLayout>{page}</SiteLayout>
}

export default IndustryCapacityApprove
