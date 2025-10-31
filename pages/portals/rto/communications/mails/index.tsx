import { RtoLayoutV2 } from '@layouts'
import { Title } from '@partials'
import { MailsListing } from '@partials/common/MailsListing'
import React, { ReactElement } from 'react'
import { BiEnvelope } from 'react-icons/bi'

const MailsPage = () => {
    return (
        <div>
            <Title
                Icon={BiEnvelope}
                title="Emails"
                description="Manage all your RTO communications

"
            />
            <MailsListing />
        </div>
    )
}

MailsPage.getLayout = (page: ReactElement) => {
    return (
        <RtoLayoutV2
            titleProps={{
                Icon: BiEnvelope,
                title: 'Emails',
                description: 'Manage all your RTO communications',
            }}
        >
            {page}
        </RtoLayoutV2>
    )
}

export default MailsPage
