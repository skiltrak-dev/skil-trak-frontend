import { RtoLayoutV2 } from '@layouts'
import { SignDocuments } from '@partials'
import React, { ReactElement } from 'react'

const SignDocumentsPage = () => {
    return (
        <div>
            <SignDocuments />
        </div>
    )
}

SignDocumentsPage.getLayout = (page: ReactElement) => {
    return <RtoLayoutV2>{page}</RtoLayoutV2>
}

export default SignDocumentsPage
