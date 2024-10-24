import { StudentLayout } from '@layouts'
import { MailDetail } from '@partials/common/MailsListing'
import { NextPageWithLayout } from '@types'
import { ReactElement } from 'react'

const EmailDetail: NextPageWithLayout = () => {
    return <MailDetail />
}

EmailDetail.getLayout = (page: ReactElement) => {
    return (
        <StudentLayout pageTitle={{ title: 'Mail Detail' }}>
            {page}
        </StudentLayout>
    )
}

export default EmailDetail
