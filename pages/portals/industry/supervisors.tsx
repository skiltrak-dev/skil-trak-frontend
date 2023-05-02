import { ReactElement } from 'react'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { Supervisor } from '@partials/common'
import { useIndustryProfileQuery } from '@queries'

const RequiredDocuments: NextPageWithLayout = () => {
    const { data } = useIndustryProfileQuery()

    return <Supervisor industry={data} />
}

RequiredDocuments.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default RequiredDocuments
