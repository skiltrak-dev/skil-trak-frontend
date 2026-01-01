import { SubAdminLayout } from '@layouts'
import { TicketDashboard } from '@partials/common'
import { ReactElement } from 'react'

const TicketsPage = () => {
    return (
        <div>
            <TicketDashboard />
        </div>
    )
}

TicketsPage.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default TicketsPage
