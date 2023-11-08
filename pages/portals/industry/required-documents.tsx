import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { RequiredDocumentsContainer } from '@components/sections/industry/Dashboard'

const RequiredDocuments: NextPageWithLayout = () => {
    return (
        <div>
            <RequiredDocumentsContainer />
        </div>
    )
}

RequiredDocuments.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default RequiredDocuments
