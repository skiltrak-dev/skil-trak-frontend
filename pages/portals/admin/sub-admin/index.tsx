import { ReactElement, useEffect, useState } from 'react'

import {
    TabNavigation,
    TabProps,
    Button,
    Filter,
    SubAdminFilters,
} from '@components'
import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import {
    ArchivedSubAdmin,
    ActiveSubAdmin,
    FilteredSubAdmins,
} from '@partials/admin/sub-admin'
import { AdminApi } from '@queries'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { checkFilteredDataLength } from '@utils'
import { AddSubAdminCB } from '@partials/admin/sub-admin/contextBar'

const SubAdminList: NextPageWithLayout = () => {
    const router = useRouter()
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})
    const filteredSubAdmins = AdminApi.SubAdmins.useListQuery({
        search: `status:approved,${JSON.stringify(filter)
            .replaceAll('{', '')
            .replaceAll('}', '')
            .replaceAll('"', '')
            .trim()}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })
    const { isLoading, data } = AdminApi.SubAdmins.useCountQuery()

    useEffect(() => {
        navBar.setTitle('Sub-Admins')
        contextBar.hide()
        // contextBar.setContent(<UserProfile />)
    }, [])

    useEffect(() => {
        navBar.setTitle('Sub-Admins')
        contextBar.hide()
    }, [])

    const tabs: TabProps[] = [
        {
            label: 'Active',
            href: { pathname: 'sub-admin', query: { tab: 'active' } },
            badge: {
                text: data?.approved,
                loading: isLoading,
            },
            element: <ActiveSubAdmin />,
        },
        {
            label: 'Archived',
            href: { pathname: 'sub-admin', query: { tab: 'archived' } },
            badge: {
                text: data?.archived,
                loading: isLoading,
            },
            element: <ArchivedSubAdmin />,
        },
    ]

    const onAddSubAdmin = () => {
        contextBar.setTitle('Add SubAdmin')
        contextBar.setContent(<AddSubAdminCB />)
        contextBar.show()
    }

    const filteredDataLength = checkFilteredDataLength(filter)

    return (
        <div>
            <div className="px-4">
                <div className="flex justify-end mb-2">{filterAction}</div>
                <Filter
                    component={SubAdminFilters}
                    initialValues={{}}
                    setFilterAction={setFilterAction}
                    setFilter={setFilter}
                />
            </div>
            {filteredDataLength && filteredSubAdmins.isSuccess ? (
                <FilteredSubAdmins
                    setPage={setPage}
                    itemPerPage={itemPerPage}
                    subAdmin={filteredSubAdmins}
                    setItemPerPage={setItemPerPage}
                />
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
