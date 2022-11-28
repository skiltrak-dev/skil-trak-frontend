import { ReactElement, useEffect } from 'react'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { GeneralInformationContainer } from '@partials/industry'

const GeneralInformation: NextPageWithLayout = () => {
    return (
        <div>
            <GeneralInformationContainer />
        </div>
    )
}

GeneralInformation.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default GeneralInformation
