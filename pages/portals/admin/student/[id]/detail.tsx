import { ReactElement } from 'react'

//Layouts
import { AdminLayout } from '@layouts'
import { RtoStudentDetail } from '@partials'
import { NextPageWithLayout } from '@types'

const StudentsProfileDetail: NextPageWithLayout = () => {
    return (
        <div>
            <RtoStudentDetail />
        </div>
    )
}
StudentsProfileDetail.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default StudentsProfileDetail
