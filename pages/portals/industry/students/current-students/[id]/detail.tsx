import { ReactElement } from 'react'

import { NextPageWithLayout } from '@types'

// query
import { useContextBar } from '@hooks'
import { IndustryLayout } from '@layouts'
import { IndustryCurrentStudents } from '@partials/industry/NewCurrentStudent'
import { useRouter } from 'next/router'

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
        <IndustryLayout pageTitle={{ title: 'Student Detail' }}>
            {page}
        </IndustryLayout>
    )
}

export default StudentDetail
