import { ReactElement, useEffect } from 'react'

// Layouts
import { SubAdminLayout } from '@layouts'
// Types
import { BackButton } from '@components'
import { PageHeading } from '@components/headings'
import { useNavbar } from '@hooks'
import { AddTicketForm } from '@partials/common/Tickets'
import { NextPageWithLayout } from '@types'

const AddTicket: NextPageWithLayout = () => {
    const { setTitle } = useNavbar()

    useEffect(() => {
        setTitle('Add Tickets')
    }, [])

    const onSubmit = (values: any) => {}

    return (
        <div className="px-4">
            <div className="mt-4">
                <BackButton text={'Ticket'} link={'/portals/admin/tickets'} />
                <PageHeading
                    title={'Create New Ticket'}
                    subtitle={'You can add Ticket here'}
                ></PageHeading>
            </div>

            <AddTicketForm onSubmit={onSubmit} result={{}} />
        </div>
    )
}

AddTicket.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default AddTicket
