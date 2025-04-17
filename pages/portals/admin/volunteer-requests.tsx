import { ReactElement, useEffect, useState } from 'react'

import { AdminLayout } from '@layouts'
import { AppointmentTypeFilterType, NextPageWithLayout } from '@types'

// query
import { AdminApi } from '@queries'

// components

import {
    AppointmentTypeFilters,
    Filter,
    TabNavigation,
    TabProps,
} from '@components'
import { useNavbar } from '@hooks'
import {
    ApprovedRequests,
    CancelledVolunteerRequests,
    PendingRequests,
    RejectedVolunteerRequests,
} from '@partials'

type Props = {}

const VolunteerRequests: NextPageWithLayout = (props: Props) => {
    const navBar = useNavbar()

    const [modal, setModal] = useState<ReactElement | null>(null)

    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState<AppointmentTypeFilterType>(
        {} as AppointmentTypeFilterType
    )
    const { isLoading, data, isError } = AdminApi.Volunteer.useList({
        search: `${JSON.stringify(filter)
            .replaceAll('{', '')
            .replaceAll('}', '')
            .replaceAll('"', '')
            .trim()}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const [volunteerRead, volunteerReadResult] =
        AdminApi.Volunteer.useVolunteerRead()

    useEffect(() => {
        volunteerRead()
    }, [])

    useEffect(() => {
        navBar.setTitle('Volunteer Request')

        return () => {
            navBar.setTitle('')
        }
    }, [])

    const tabs: TabProps[] = [
        {
            label: 'Pending',
            href: {
                pathname: 'volunteer-requests',
                query: { tab: 'pending', page: 1, pageSize: 50 },
            },
            element: <PendingRequests />,
        },
        {
            label: 'Approved',
            href: {
                pathname: 'volunteer-requests',
                query: { tab: 'approved', page: 1, pageSize: 50 },
            },
            element: <ApprovedRequests />,
        },
        // {
        //     label: 'Cancelled',
        //     href: {
        //         pathname: 'volunteer-requests',
        //         query: { tab: 'cancelled', page: 1, pageSize: 50 },
        //     },
        //     element: <CancelledVolunteerRequests />,
        // },
        {
            label: 'Rejected',
            href: {
                pathname: 'volunteer-requests',
                query: { tab: 'rejected', page: 1, pageSize: 50 },
            },
            element: <RejectedVolunteerRequests />,
        },
    ]

    return (
        <div className="">
            {modal}
            <div className="flex flex-col gap-y-4 mb-32">
                <Filter<AppointmentTypeFilterType>
                    component={AppointmentTypeFilters}
                    initialValues={filter}
                    setFilterAction={setFilterAction}
                    setFilter={setFilter}
                />

                <TabNavigation tabs={tabs}>
                    {({ header, element }: any) => {
                        return (
                            <div>
                                <div>{header}</div>
                                <div className="p-4">{element}</div>
                            </div>
                        )
                    }}
                </TabNavigation>
            </div>
        </div>
    )
}
VolunteerRequests.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}
export default VolunteerRequests
