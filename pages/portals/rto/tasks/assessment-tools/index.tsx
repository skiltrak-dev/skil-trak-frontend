import { ReactElement } from 'react'
// Layouts
import { RtoLayout } from '@layouts'
// Types
import { NextPageWithLayout } from '@types'
// Components
import { Typography } from '@components'
// React Icons

// Queries
import { useUpdateAssessmentToolArchiveMutation } from '@queries'
import { AssessmentsToolsContainer } from '@partials/rto'

type Props = {}

const RtoAssessmentTools: NextPageWithLayout = (props: Props) => {
    return (
        <>
            <AssessmentsToolsContainer />
        </>
    )
}
RtoAssessmentTools.getLayout = (page: ReactElement) => {
    return (
        <RtoLayout
            pageTitle={{
                title: 'Assessment Tools',
            }}
        >
            {page}
        </RtoLayout>
    )
}

export default RtoAssessmentTools
