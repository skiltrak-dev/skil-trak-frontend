import { ReactElement } from 'react'

//Layouts
import { SubAdminLayout } from '@layouts'
import { PlacementApprovalDetail } from '@partials'

export const RtoWpApprovalRequestDetail = () => {
    return <PlacementApprovalDetail />
}

RtoWpApprovalRequestDetail.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'Rto Wp Approval Request' }}>
            {page}
        </SubAdminLayout>
    )
}

export default RtoWpApprovalRequestDetail
