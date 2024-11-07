import { IndustryStudentsLayout } from '@partials/industry'
import { ViewDocumentAndSign } from '@partials/eSign/ViewDocumentAndSign'
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
    return (
        <IndustryStudentsLayout pageTitle={{ title: 'E-Sign Detail' }}>
            {page}
        </IndustryStudentsLayout>
    )
}

export default ESignDetail
