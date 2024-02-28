import { ReactElement } from 'react'

import { NextPageWithLayout } from '@types'

// query
import { useContextBar } from '@hooks'
import { IndustryStudentsLayout } from '@partials/industry'
import { IndustryApi } from '@queries'
import { useRouter } from 'next/router'
import { IndustryCurrentStudents } from '@partials/industry/NewCurrentStudent'

const StudentDetail: NextPageWithLayout = () => {
    const router = useRouter()
    const contextBar = useContextBar()

    return (
        <>
            <IndustryCurrentStudents />
        </>
    )
}

StudentDetail.getLayout = (page: ReactElement) => {
    return (
        <IndustryStudentsLayout pageTitle={{ title: 'Student Detail' }}>
            {page}
        </IndustryStudentsLayout>
    )
}

export default StudentDetail
