import { ReactElement } from 'react'

//Layouts
import { AdminLayout } from '@layouts'
import { StudentProfileDetail } from '@partials/common'
import { NextPageWithLayout } from '@types'

const StudentsProfileDetail: NextPageWithLayout = () => {
    return (
        <div>
            <StudentProfileDetail />
        </div>
    )
}
StudentsProfileDetail.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default StudentsProfileDetail
