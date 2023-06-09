import { ReactElement, useEffect } from 'react'
// Layouts
import { AdminLayout } from '@layouts'
// Types
import { BackButton, Button, TabNavigation, TabProps } from '@components'
import { PageHeading } from '@components/headings'
import { useNavbar } from '@hooks'
import {
    AllTickets,
    MyClosedTickets,
    MyOpenTickets,
} from '@partials/admin/Tickets'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { BsFillTicketDetailedFill } from 'react-icons/bs'

enum TicketType {
    MyOpenTickets = 'my-open-tickets',
    MyClosedTickets = 'my-closed-tickets',
    AllTickets = 'all-tickets',
}

export enum TicketStatus {
    OPEN = 'open',
    CLOSED = 'close',
    REOPENED = 'reopened',
}

const Tickets: NextPageWithLayout = () => {
    const router = useRouter()
    const { setTitle } = useNavbar()

    useEffect(() => {
        setTitle('Tickets')
    }, [])

    const tabs: TabProps[] = [
        {
            label: 'My Open Tickets',
            href: {
                pathname: 'tickets',
                query: { tab: TicketType.MyOpenTickets },
            },

            element: <MyOpenTickets />,
        },
        {
            label: 'My Closed Tickets',
            href: {
                pathname: 'tickets',
                query: { tab: TicketType.MyClosedTickets },
            },

            element: <MyClosedTickets />,
        },
        {
            label: 'All Tickets',
            href: {
                pathname: 'tickets',
                query: { tab: TicketType.AllTickets },
            },

            element: <AllTickets />,
        },
    ]

    return (
        <div className="px-4">
            <div className="flex justify-between items-center my-5">
                <BackButton text={'Go Back'} />
                <Button
                    variant={'dark'}
                    text={'Create a Ticket'}
                    Icon={BsFillTicketDetailedFill}
                    onClick={() => {
                        router.push('/portals/admin/tickets/add-ticket')
                    }}
                />
            </div>
            <TabNavigation tabs={tabs}>
                {({ header, element }: any) => {
                    return (
                        <div>
                            <div>{header}</div>
                            <div className="mt-4 ml-4">
                                <PageHeading
                                    title={'Ticket'}
                                    subtitle={'You can find all Tickets here'}
                                ></PageHeading>
                            </div>
                            <div className="p-4">{element}</div>
                        </div>
                    )
                }}
            </TabNavigation>
        </div>
    )
}

Tickets.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default Tickets
