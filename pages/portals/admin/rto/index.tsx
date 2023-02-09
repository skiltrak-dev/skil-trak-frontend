import { ReactElement, useEffect, useState } from 'react'

import {
    Card,
    Filter,
    LoadingAnimation,
    TabNavigation,
    TabProps,
    RtoFilters,
} from '@components'
import { useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import {
    ApprovedRto,
    ArchivedRto,
    BlockedRto,
    FilteredRto,
    PendingRto,
    RejectedRto,
} from '@partials'
import { AdminApi } from '@queries'
import { NextPageWithLayout, UserStatus } from '@types'
import { checkFilteredDataLength } from '@utils'

const RtoList: NextPageWithLayout = () => {
    const navBar = useNavbar()

    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})
    const filteredRtos = AdminApi.Rtos.useListQuery({
        search: `${JSON.stringify(filter)
            .replaceAll('{', '')
            .replaceAll('}', '')
            .replaceAll('"', '')
            .trim()}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })
    const count = AdminApi.Rtos.useCountQuery()

    useEffect(() => {
        navBar.setTitle('RTO')
    }, [])

    const tabs: TabProps[] = [
        {
            label: 'Pending',
            href: { pathname: 'rto', query: { tab: UserStatus.Pending } },
            badge: {
                text: count?.data?.pending,
                loading: count?.isLoading,
            },
            element: <PendingRto />,
        },
        {
            label: 'Approved',
            href: { pathname: 'rto', query: { tab: UserStatus.Approved } },
            badge: {
                text: count?.data?.approved,
                loading: count?.isLoading,
            },
            element: <ApprovedRto />,
        },
        {
            label: 'Rejected',
            href: { pathname: 'rto', query: { tab: UserStatus.Rejected } },
            badge: {
                text: count?.data?.rejected,
                loading: count?.isLoading,
            },
            element: <RejectedRto />,
        },
        {
            label: 'Blocked',
            href: { pathname: 'rto', query: { tab: UserStatus.Blocked } },
            badge: {
                text: count?.data?.blocked,
                loading: count?.isLoading,
            },
            element: <BlockedRto />,
        },
        {
            label: 'Archived',
            href: { pathname: 'rto', query: { tab: UserStatus.Archived } },
            badge: {
                text: count?.data?.archived,
                loading: count?.isLoading,
            },
            element: <ArchivedRto />,
        },
    ]

    const filteredDataLength = checkFilteredDataLength(filter)

    return (
        <div>
            <div className="px-4">
                <div className="flex justify-end mb-2">{filterAction}</div>
                <Filter
                    component={RtoFilters}
                    initialValues={{}}
                    setFilterAction={setFilterAction}
                    setFilter={setFilter}
                />
            </div>
            {filteredDataLength && filteredRtos.isSuccess ? (
                <FilteredRto
                    setPage={setPage}
                    itemPerPage={itemPerPage}
                    rto={filteredRtos}
                    setItemPerPage={setItemPerPage}
                />
            ) : null}
            {!filteredDataLength && (
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
            )}
        </div>
    )
}

RtoList.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default RtoList
