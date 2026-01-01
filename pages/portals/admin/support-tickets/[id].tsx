import { AdminLayout } from '@layouts'
import { TicketDetails } from '@partials/common'
import { ReactElement } from 'react'

const TicketDetailPage = () => {
    return <TicketDetails />
}

TicketDetailPage.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default TicketDetailPage
