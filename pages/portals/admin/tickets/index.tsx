import { ReactElement, useEffect, useState } from 'react'
// Layouts
import { AdminLayout } from '@layouts'
// Types
import {
    BackButton,
    Button,
    LoadingAnimation,
    Select,
    TabNavigation,
    TabProps,
    TechnicalError,
} from '@components'
import { PageHeading } from '@components/headings'
import { useNavbar } from '@hooks'
import {
    AllTickets,
    FilteredTickets,
    MyClosedTickets,
    MyOpenTickets,
} from '@partials/admin/Tickets'
import { NextPageWithLayout, OptionType, SubAdmin } from '@types'
import { useRouter } from 'next/router'
import { BsFillTicketDetailedFill } from 'react-icons/bs'
import { AdminApi, CommonApi } from '@queries'

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

    const [selectedSubadmin, setSelectedSubadmin] = useState<number | null>(
        null
    )
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setTitle('Tickets')
    }, [])

    const subadmins = AdminApi.Workplace.subadminForAssignWorkplace()
    const filteredTickets = CommonApi.Tickets.useGetAllTicket(
        {
            search: `${JSON.stringify({
                subAdminId: selectedSubadmin,
            })
                .replaceAll('{', '')
                .replaceAll('}', '')
                .replaceAll('"', '')
                .trim()}`,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        { skip: !selectedSubadmin, refetchOnMountOrArgChange: true }
    )

    const subAdminOptions = subadmins?.data?.map((subAdmin: SubAdmin) => ({
        label: subAdmin?.user?.name,
        value: subAdmin?.user?.id,
    }))

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

    const onAssignSubAdmin = (e: number) => {
        setSelectedSubadmin(e)
    }

    return (
        <div className="px-4">
            <div className="flex justify-between items-center my-5">
                <BackButton text={'Go Back'} />
                <div className="flex items-center gap-x-2">
                    <Button
                        variant={'dark'}
                        Icon={BsFillTicketDetailedFill}
                        onClick={() => {
                            router.push('/portals/admin/tickets/add-ticket')
                        }}
                    >
                        <span className="whitespace-pre">Create a Ticket</span>
                    </Button>
                    <div className="w-72">
                        <Select
                            name={'subAdmin'}
                            placeholder={'Search By Sub Admin'}
                            options={subAdminOptions}
                            loading={subadmins?.isLoading}
                            disabled={subadmins?.isLoading}
                            onChange={(e: number) => {
                                onAssignSubAdmin(e)
                            }}
                            onlyValue
                            showError={false}
                        />
                    </div>
                </div>
            </div>
            {selectedSubadmin && filteredTickets.isError && <TechnicalError />}
            {selectedSubadmin ? (
                filteredTickets.isLoading ? (
                    <LoadingAnimation />
                ) : (
                    filteredTickets.isSuccess && (
                        <FilteredTickets
                            setPage={setPage}
                            itemPerPage={itemPerPage}
                            tickets={filteredTickets}
                            setItemPerPage={setItemPerPage}
                        />
                    )
                )
            ) : null}

            {!selectedSubadmin && (
                <TabNavigation tabs={tabs}>
                    {({ header, element }: any) => {
                        return (
                            <div>
                                <div className="w-full">{header}</div>
                                <div className="mt-4 ml-4">
                                    <PageHeading
                                        title={'Ticket'}
                                        subtitle={
                                            'You can find all Tickets here'
                                        }
                                    ></PageHeading>
                                </div>
                                <div className="p-4">{element}</div>
                            </div>
                        )
                    }}
                </TabNavigation>
            )}
        </div>
    )
}

Tickets.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default Tickets
