import { IndustryLayout } from '@layouts'
import { HeadQuarterContainer } from '@partials/industry/HeadQuarter'
import { ReactElement } from 'react'

const HeadQuarters = () => {
    return (
        <div>
            <HeadQuarterContainer />
        </div>
    )
}

HeadQuarters.getLayout = (page: ReactElement) => {
    return (
        <IndustryLayout pageTitle={{ title: 'HeadQuarters' }}>
            {page}
        </IndustryLayout>
    )
}

export default HeadQuarters
