import { RtoLayoutV2 } from '@layouts'
import { MailsListing } from '@partials/common/MailsListing'
import { ReactElement } from 'react'
import { BiEnvelope } from 'react-icons/bi'

const MailsPage = () => {
    return <MailsListing />
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
