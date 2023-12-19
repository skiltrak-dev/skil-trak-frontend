import { RtoLayout } from '@layouts'
import { ViewDocumentAndSign } from '@partials'
import { NextPageWithLayout } from '@types'
import { ReactElement } from 'react'

const ESignDetail: NextPageWithLayout = () => {
    return (
        <div>
            <ViewDocumentAndSign />
        </div>
    )
}

ESignDetail.getLayout = (page: ReactElement) => {
    return <RtoLayout pageTitle={{ title: 'E-Sign Detail' }}>{page}</RtoLayout>
}

export default ESignDetail
