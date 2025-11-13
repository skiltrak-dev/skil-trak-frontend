import { ReactElement, useEffect, useState } from 'react'

import {
    Button,
    EmptyData,
    Filter,
    LoadingAnimation,
    RtoFilters,
    SetDetaultQueryFilteres,
    TabNavigation,
    TabProps,
    TechnicalError,
    useIsRestricted,
} from '@components'
import { UserRoles } from '@constants'
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
import { AdminApi, SubAdminApi } from '@queries'
import { NextPageWithLayout, RTOFilterType, UserStatus } from '@types'
import { checkFilteredDataLength, getUserCredentials } from '@utils'
import { useRouter } from 'next/router'

const filterKeys = ['name', 'email', 'code', 'status', 'courseId']

const RtoList: NextPageWithLayout = () => {
    const canAccess = useIsRestricted('canViewRtoList')

    const navBar = useNavbar()

    const router = useRouter()

    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState<RTOFilterType>({} as RTOFilterType)

    const role = getUserCredentials()?.role

    useEffect(() => {
        navBar.setTitle('RTO')
    }, [])

    const filteredRtos = AdminApi.Rtos.useListQuery(
        {
            search: `${JSON.stringify(filter)
                .replaceAll('{', '')
                .replaceAll('}', '')
                .replaceAll('"', '')
                .trim()}`,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        {
            refetchOnMountOrArgChange: true,
        }
    )
    const count = AdminApi.Rtos.useCountQuery()

    const tabs: TabProps[] = [
        {
            label: 'Pending',
            href: {
                pathname: 'rto',
                query: { tab: UserStatus.Pending, page: 1, pageSize: 50 },
            },
            badge: {
                text: count?.data?.pending,
                loading: count?.isLoading,
            },
            element: <PendingRto />,
        },
        {
            label: 'Approved',
            href: {
                pathname: 'rto',
                query: { tab: UserStatus.Approved, page: 1, pageSize: 50 },
            },
            badge: {
                text: count?.data?.approved,
                loading: count?.isLoading,
            },
            element: <ApprovedRto />,
        },
        {
            label: 'Rejected',
            href: {
                pathname: 'rto',
                query: { tab: UserStatus.Rejected, page: 1, pageSize: 50 },
            },
            badge: {
                text: count?.data?.rejected,
                loading: count?.isLoading,
            },
            element: <RejectedRto />,
        },
        {
            label: 'Blocked',
            href: {
                pathname: 'rto',
                query: { tab: UserStatus.Blocked, page: 1, pageSize: 50 },
            },
            badge: {
                text: count?.data?.blocked,
                loading: count?.isLoading,
            },
            element: <BlockedRto />,
        },
        {
            label: 'Archived',
            href: {
                pathname: 'rto',
                query: { tab: UserStatus.Archived, page: 1, pageSize: 50 },
            },
            badge: {
                text: count?.data?.archived,
                loading: count?.isLoading,
            },
            element: <ArchivedRto />,
        },
    ]

    const filteredDataLength = checkFilteredDataLength(filter)

    if (!canAccess) {
        return (
            <>
                <EmptyData
                    title={'No RTOS in your Search!'}
                    description={'No RTOS in your Search yet'}
                    height={'50vh'}
                />
            </>
        )
    }

    return (
        <div>
            <SetDetaultQueryFilteres<RTOFilterType>
                filterKeys={filterKeys}
                setFilter={setFilter}
            />
            <div className="px-4">
                <div className="flex items-center justify-end gap-x-2 mb-2">
                    <Button
                        text="Message Center"
                        onClick={() =>
                            router.push(
                                '/portals/admin/rto/message-center?tab=active'
                            )
                        }
                        outline
                        variant="info"
                    />
                    {filterAction}
                </div>
                <Filter<RTOFilterType>
                    component={RtoFilters}
                    initialValues={filter}
                    setFilterAction={setFilterAction}
                    setFilter={setFilter}
                    filterKeys={filterKeys}
                />
            </div>
            {filteredDataLength && filteredRtos.isError && <TechnicalError />}
            {filteredDataLength ? (
                filteredRtos?.isLoading ? (
                    <LoadingAnimation />
                ) : (
                    filteredRtos.isSuccess && (
                        <FilteredRto
                            setPage={setPage}
                            itemPerPage={itemPerPage}
                            rto={filteredRtos}
                            setItemPerPage={setItemPerPage}
                        />
                    )
                )
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
