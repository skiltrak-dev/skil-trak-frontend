import { ReactElement } from 'react'
import { useRouter } from 'next/router'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// components
import { BackButton } from '@components'

// Context
import { useContextBar } from 'hooks'
import { ConsultationContainer } from '@partials/industry'

const IndustryConsultation: NextPageWithLayout = () => {
    const router = useRouter()

    return (
        <div>
            <BackButton link={'/portals/industry/general-information'} text={'Back To Dashboard'} />

            {/* Data */}
            <ConsultationContainer />
        </div>
    )
}

IndustryConsultation.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default IndustryConsultation
