import { ReactElement, useEffect, useState } from 'react'

import {
    TabNavigation,
    TabProps,
    Button,
    Filter,
    SubAdminFilters,
    LoadingAnimation,
    TechnicalError,
} from '@components'
import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import {
    ArchivedSubAdmin,
    ActiveSubAdmin,
    FilteredSubAdmins,
} from '@partials/admin/sub-admin'
import { AdminApi } from '@queries'
import { NextPageWithLayout, UserStatus } from '@types'
import { useRouter } from 'next/router'
import { checkFilteredDataLength, getFilterQuery } from '@utils'
import { AddSubAdminCB } from '@partials/admin/sub-admin/contextBar'

const filterKeys = ['name', 'email', 'status', 'courseId']

const SubAdminList: NextPageWithLayout = () => {
    const router = useRouter()

    const navBar = useNavbar()
    const contextBar = useContextBar()

    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})

    useEffect(() => {
        const query = getFilterQuery({ router, filterKeys })
        setFilter(query)
    }, [router])

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
                text: data?.approved,
                loading: isLoading,
            },
            element: <ActiveSubAdmin />,
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
            <div className="px-4">
                <div className="flex justify-end mb-2">{filterAction}</div>
                <Filter
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
