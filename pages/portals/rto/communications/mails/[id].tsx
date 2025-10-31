import { RtoLayoutV2 } from '@layouts'
import { MailDetail } from '@partials/common/MailsListing'
import React, { ReactElement } from 'react'
import { BiEnvelope } from 'react-icons/bi'

const MailDetailPage = () => {
    return <MailDetail />
}

MailDetailPage.getLayout = (page: ReactElement) => {
    return (
        <RtoLayoutV2
            titleProps={{
                Icon: BiEnvelope,
                title: 'Email Detail',
                description: 'Manage all your RTO communications',
            }}
        >
            {page}
        </RtoLayoutV2>
    )
}

export default MailDetailPage
