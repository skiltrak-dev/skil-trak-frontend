import { ReactElement } from 'react'

import { NextPageWithLayout } from '@types'

// query
import { IndustryLayout } from '@layouts'
import { IndustryCurrentStudents } from '@partials/industry/NewCurrentStudent'

const StudentDetail: NextPageWithLayout = () => {
    return (
        <>
            <IndustryCurrentStudents />
        </>
    )
}

StudentDetail.getLayout = (page: ReactElement) => {
    return (
        <IndustryLayout pageTitle={{ title: 'Student Detail' }}>
            {page}
        </IndustryLayout>
    )
}

export default StudentDetail
