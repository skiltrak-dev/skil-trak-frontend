import { ReactElement } from 'react'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { RPLForm } from '@components/sections/industry/ApplyForRPL/forms/RPLForm/RPLForm'

// components

const ApplyForRpl: NextPageWithLayout = () => {
    return (
        <div>
            <RPLForm />
        </div>
    )
}

ApplyForRpl.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default ApplyForRpl
