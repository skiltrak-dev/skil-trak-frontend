import { ReactElement, useEffect, useState } from 'react'

import {
    Button,
    Filter,
    LoadingAnimation,
    SetDetaultQueryFilteres,
    SubAdminFilters,
    TabNavigation,
    TabProps,
    TechnicalError,
} from '@components'
import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import {
    ActiveRTOSubAdmin,
    ActiveSubAdmin,
    ArchivedSubAdmin,
    BlockedSubAdmin,
    FilteredSubAdmins,
} from '@partials/admin/sub-admin'
import { AddSubAdminCB } from '@partials/admin/sub-admin/contextBar'
import { AdminApi } from '@queries'
import { AdminSubadminFilter, NextPageWithLayout, UserStatus } from '@types'
import { checkFilteredDataLength } from '@utils'

const filterKeys = ['name', 'email', 'status', 'courseId']

const SubAdminList: NextPageWithLayout = () => {
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState<AdminSubadminFilter>(
        {} as AdminSubadminFilter
    )

    const filteredSubAdmins = AdminApi.SubAdmins.useListQuery({
        search: `${JSON.stringify(filter)
            .replaceAll('{', '')
            .replaceAll('}', '')
            .replaceAll('"', '')
            .trim()}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })
    const { isLoading, data } = AdminApi.SubAdmins.useCountQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    })

    useEffect(() => {
        navBar.setTitle('Sub-Admins')
    }, [])

    useEffect(() => {
        navBar.setTitle('Sub-Admins')
    }, [])

    const tabs: TabProps[] = [
        {
            label: 'Active',
            href: {
                pathname: 'sub-admin',
                query: { tab: 'active', page: 1, pageSize: 50 },
            },
            badge: {
                text: data?.admin_approved,
                loading: isLoading,
            },
            element: <ActiveSubAdmin />,
        },
        {
            label: 'Active RTO SubAdmin',
            href: {
                pathname: 'sub-admin',
                query: { tab: 'active-rto', page: 1, pageSize: 50 },
            },
            badge: {
                text: data?.rto_approved,
                loading: isLoading,
            },
            element: <ActiveRTOSubAdmin />,
        },
        {
            label: 'Blocked',
            href: {
                pathname: 'sub-admin',
                query: { tab: UserStatus.Blocked, page: 1, pageSize: 50 },
            },
            badge: {
                text: data?.blocked,
                loading: isLoading,
            },
            element: <BlockedSubAdmin />,
        },
        {
            label: 'Archived',
            href: {
                pathname: 'sub-admin',
                query: { tab: UserStatus.Archived, page: 1, pageSize: 50 },
            },
            badge: {
                text: data?.archived,
                loading: isLoading,
            },
            element: <ArchivedSubAdmin />,
        },
    ]

    const onAddSubAdmin = () => {
        contextBar.show()
        contextBar.setTitle('Add SubAdmin')
        contextBar.setContent(<AddSubAdminCB />)
    }

    const filteredDataLength = checkFilteredDataLength(filter)

    return (
        <div>
            <SetDetaultQueryFilteres<AdminSubadminFilter>
                filterKeys={filterKeys}
                setFilter={setFilter}
            />
            <div className="px-4">
                <div className="flex justify-end mb-2">{filterAction}</div>
                <Filter<AdminSubadminFilter>
                    component={SubAdminFilters}
                    initialValues={filter}
                    setFilterAction={setFilterAction}
                    setFilter={setFilter}
                    filterKeys={filterKeys}
                />
            </div>

            {filteredDataLength && filteredSubAdmins.isError && (
                <TechnicalError />
            )}
            {filteredDataLength ? (
                filteredSubAdmins.isLoading ? (
                    <LoadingAnimation />
                ) : (
                    filteredSubAdmins.isSuccess && (
                        <FilteredSubAdmins
                            setPage={setPage}
                            itemPerPage={itemPerPage}
                            subAdmin={filteredSubAdmins}
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
                                <div className="flex items-end justify-between">
                                    <div className="flex-grow">{header}</div>
                                    <div className="px-6">
                                        <Button
                                            text={'Add Sub Admin'}
                                            variant={'primary'}
                                            onClick={onAddSubAdmin}
                                        />
                                    </div>
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

SubAdminList.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default SubAdminList
