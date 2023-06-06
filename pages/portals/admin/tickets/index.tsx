import { ReactElement, useEffect } from 'react'
// Layouts
import { AdminLayout } from '@layouts'
// Types
import { NextPageWithLayout } from '@types'
import { PageHeading } from '@components/headings'
import { useNavbar } from '@hooks'
import { BackButton, Button, TabNavigation, TabProps } from '@components'
import { BsFillTicketDetailedFill } from 'react-icons/bs'
import { MyOpenTickets } from '@partials/admin/Tickets'
import { useRouter } from 'next/router'

enum TicketType {
    MyOpenTickets = 'my-open-tickets',
    MyClosedTickets = 'my-closed-tickets',
    AllTickets = 'all-tickets',
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

            element: <MyOpenTickets />,
        },
        {
            label: 'All Tickets',
            href: {
                pathname: 'tickets',
                query: { tab: TicketType.AllTickets },
            },

            element: <MyOpenTickets />,
        },
    ]

    return (
        <div className="px-4">
            <TabNavigation tabs={tabs}>
                {({ header, element }: any) => {
                    return (
                        <div>
                            <div>{header}</div>
                            <div className="mt-4 ml-4">
                                <BackButton text={'Go Back'} />
                                <PageHeading
                                    title={'Ticket'}
                                    subtitle={'You can find all Tickets here'}
                                >
                                    <Button
                                        variant={'dark'}
                                        text={'Create a Ticket'}
                                        Icon={BsFillTicketDetailedFill}
                                        onClick={() => {
                                            router.push(
                                                '/portals/admin/tickets/add-ticket'
                                            )
                                        }}
                                    />
                                </PageHeading>
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
