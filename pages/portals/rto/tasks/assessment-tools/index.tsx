import { ReactElement } from 'react'
// Layouts
import { RtoLayout } from '@layouts'
// Types
import { NextPageWithLayout } from '@types'
// Components

// Queries
import { AssessmentsToolsContainer } from '@partials/rto'

const RtoAssessmentTools: NextPageWithLayout = () => {
    return <AssessmentsToolsContainer />
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
