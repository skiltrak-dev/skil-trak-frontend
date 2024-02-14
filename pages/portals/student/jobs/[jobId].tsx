import { ReactElement } from 'react'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { JobDetail } from '@components/sections'

type Props = {}

const JobsDetail: NextPageWithLayout = (props: Props) => {
    return (
        <>
            <JobDetail />
        </>
    )
}
JobsDetail.getLayout = (page: ReactElement) => {
    return <StudentLayout pageTitle={{title:"Workplace"}}>{page}</StudentLayout>
}

export default JobsDetail
