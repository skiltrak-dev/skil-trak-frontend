import { RtoLayout } from '@layouts'
import { PlacementApprovalDetail } from '@partials'
import { ReactElement } from 'react'

const ApprovePlacementDetailPage = () => {
    return <PlacementApprovalDetail />
}

ApprovePlacementDetailPage.getLayout = (page: ReactElement) => {
    return <RtoLayout>{page}</RtoLayout>
}

export default ApprovePlacementDetailPage
