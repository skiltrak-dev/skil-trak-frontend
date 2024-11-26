import { ReactElement } from 'react'

//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { StudentMyWorkplace } from '@partials/student'

const WorkplaceDetail: NextPageWithLayout = () => {
    return <StudentMyWorkplace />
}
WorkplaceDetail.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default WorkplaceDetail
