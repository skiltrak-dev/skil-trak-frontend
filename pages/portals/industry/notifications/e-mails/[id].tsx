import { IndustryLayout } from '@layouts'
import { MailDetail } from '@partials/common/MailsListing'
import { NextPageWithLayout } from '@types'
import { ReactElement } from 'react'

const EmailDetail: NextPageWithLayout = () => {
    return <MailDetail />
}

EmailDetail.getLayout = (page: ReactElement) => {
    return (
        <IndustryLayout pageTitle={{ title: 'Mail Detail' }}>
            {page}
        </IndustryLayout>
    )
}

export default EmailDetail
