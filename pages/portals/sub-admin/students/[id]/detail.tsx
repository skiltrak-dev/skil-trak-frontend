import { ReactElement } from 'react'

//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { StudentProfileDetail } from '@partials/common'

const StudentsProfileDetail: NextPageWithLayout = () => {
    return (
        <div
        // style={{
        //     fontSize: '88%',
        // }}
        >
            <StudentProfileDetail />
        </div>
    )
}
StudentsProfileDetail.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default StudentsProfileDetail
