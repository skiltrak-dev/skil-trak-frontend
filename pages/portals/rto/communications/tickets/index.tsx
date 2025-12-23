import React, { ReactElement } from 'react'
import { RtoLayoutV2 } from '@layouts'
import { BiEnvelope } from 'react-icons/bi'
import { TicketDashboard } from '@partials/common'

const TicketsPage = () => {
    return (
        <div>
            <TicketDashboard />
        </div>
    )
}

TicketsPage.getLayout = (page: ReactElement) => {
    return (
        <RtoLayoutV2
            titleProps={{
                Icon: BiEnvelope,
                title: 'Tickets',
                description: 'Manage all your Tickets',
            }}
        >
            {page}
        </RtoLayoutV2>
    )
}

export default TicketsPage
