import { ReactElement } from 'react'

//Layouts
import { SubAdminLayout } from '@layouts'
import { RtoStudentDetail } from '@partials'
import { NextPageWithLayout } from '@types'

const StudentsProfileDetail: NextPageWithLayout = () => {
    return <RtoStudentDetail />
}
StudentsProfileDetail.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'Student Profile' }}>
            {page}
        </SubAdminLayout>
    )
}

export default StudentsProfileDetail
