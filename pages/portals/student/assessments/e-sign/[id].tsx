import { StudentLayout } from '@layouts'
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
    return (
        <StudentLayout pageTitle={{ title: 'E-Sign Detail' }}>
            {page}
        </StudentLayout>
    )
}

export default ESignDetail
