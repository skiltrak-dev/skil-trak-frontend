import { RtoLayout } from '@layouts'
import { InsuranceDocuments } from '@partials/rto'
import React, { ReactElement } from 'react'

const RtoInsuranceDocuments = () => {
    return (
        <div>
            <InsuranceDocuments />
        </div>
    )
}

RtoInsuranceDocuments.getLayout = (page: ReactElement) => {
    return (
        <RtoLayout pageTitle={{ title: 'Insurance Documents' }}>
            {page}
        </RtoLayout>
    )
}

export default RtoInsuranceDocuments
