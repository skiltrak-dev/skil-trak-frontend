import { AdminLayout } from '@layouts'
import { TicketDashboard } from '@partials/common'
import { ReactElement } from 'react'

const TicketsPage = () => {
    return (
        <div className='p-5'>
            <TicketDashboard />
        </div>
    )
}

TicketsPage.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default TicketsPage
