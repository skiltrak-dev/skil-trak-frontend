import { ReactElement } from 'react'

import { NextPageWithLayout } from '@types'

// query
import { useContextBar } from '@hooks'
import { IndustryStudentsLayout } from '@partials/industry'
import { IndustryApi } from '@queries'
import { useRouter } from 'next/router'

const StudentDetail: NextPageWithLayout = () => {
    const router = useRouter()
    const contextBar = useContextBar()

    const detail = IndustryApi.Workplace.useWorkplaceDetail(
        Number(router.query.id),
        { skip: !router.query.id }
    )

    return (
        <>
            <p>Saad</p>
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
