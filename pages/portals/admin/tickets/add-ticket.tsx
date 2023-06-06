import { ReactElement, useEffect } from 'react'

// Layouts
import { AdminLayout } from '@layouts'
// Types
import {
    BackButton,
    ShowErrorNotifications,
    draftToHtmlText,
} from '@components'
import { PageHeading } from '@components/headings'
import { useNavbar, useNotification } from '@hooks'
import { AddTicketForm } from '@partials/common/Tickets'
import { NextPageWithLayout } from '@types'
import { AdminApi } from '@queries'

const AddTicket: NextPageWithLayout = () => {
    const { setTitle } = useNavbar()
    const { notification } = useNotification()

    const [createTicket, createTicketResult] =
        AdminApi.Tickets.useCreateTicket()

    useEffect(() => {
        setTitle('Add Tickets')
    }, [])

    useEffect(() => {
        if (createTicketResult.isSuccess) {
            notification.success({
                title: 'Ticket Created',
                description: 'Ticket Created Successfully',
            })
        }
    }, [createTicketResult])

    const onSubmit = (values: any) => {
        const message = draftToHtmlText(values?.message)
        createTicket({ ...values, message })
    }

    return (
        <>
            <ShowErrorNotifications result={createTicketResult} />
            <div className="px-4">
                <div className="mt-4">
                    <BackButton
                        text={'Ticket'}
                        link={'/portals/admin/tickets'}
                    />
                    <PageHeading
                        title={'Create New Ticket'}
                        subtitle={'You can add Ticket here'}
                    ></PageHeading>
                </div>

                <AddTicketForm
                    onSubmit={onSubmit}
                    result={createTicketResult}
                />
            </div>
        </>
    )
}

AddTicket.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default AddTicket
