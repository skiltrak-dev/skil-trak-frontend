import { ReactElement } from 'react'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { JobContainer } from '@components/sections'
import { UploadFile } from '@components/inputs/UploadFile'

type Props = {}

const Jobs: NextPageWithLayout = (props: Props) => {
    return <JobContainer />
}
Jobs.getLayout = (page: ReactElement) => {
    return <StudentLayout title="Workplace">{page}</StudentLayout>
}

export default Jobs
