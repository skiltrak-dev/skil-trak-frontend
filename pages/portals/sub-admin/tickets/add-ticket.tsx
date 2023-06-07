import { ReactElement, useEffect } from 'react'

// Layouts
import { SubAdminLayout } from '@layouts'
// Types
import { BackButton, draftToHtmlText } from '@components'
import { PageHeading } from '@components/headings'
import { useNavbar, useNotification } from '@hooks'
import { AddTicketForm } from '@partials/common/Tickets'
import { NextPageWithLayout } from '@types'
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'

const AddTicket: NextPageWithLayout = () => {
    const { setTitle } = useNavbar()
    const { notification } = useNotification()
    const router = useRouter()

    const [createTicket, createTicketResult] =
        CommonApi.Tickets.useCreateTicket()

    useEffect(() => {
        setTitle('Add Tickets')
    }, [])

    useEffect(() => {
        if (createTicketResult.isSuccess) {
            notification.success({
                title: 'Ticket Created',
                description: 'Ticket Created Successfully',
            })
            router.push(
                `/portals/sub-admin/tickets/detail/${createTicketResult.data?.id}`
            )
        }
    }, [createTicketResult])

    const onSubmit = (values: any) => {
        const message = draftToHtmlText(values?.message)
        createTicket({ ...values, message })
    }

    return (
        <div className="px-4">
            <div className="mt-4">
                <BackButton
                    text={'Ticket'}
                    link={'/portals/sub-admin/tickets'}
                />
                <PageHeading
                    title={'Create New Ticket'}
                    subtitle={'You can add Ticket here'}
                ></PageHeading>
            </div>

            <AddTicketForm onSubmit={onSubmit} result={createTicketResult} />
        </div>
    )
}

AddTicket.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default AddTicket
