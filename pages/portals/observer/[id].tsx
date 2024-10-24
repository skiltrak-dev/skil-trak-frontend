import { ReactElement } from 'react'

//Layouts
import { RtoContactPersonLayout } from '@layouts'
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
    return <RtoContactPersonLayout>{page}</RtoContactPersonLayout>
}

export default StudentsProfileDetail
