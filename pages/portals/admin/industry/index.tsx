import { ReactElement, useEffect, useState } from 'react'

import {
    Card,
    Filter,
    IndustryFilters,
    LoadingAnimation,
    TabNavigation,
    TabProps,
} from '@components'
import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import {
    ApprovedIndustry,
    ArchivedIndustry,
    BlockedIndustry,
    FilteredIndustry,
    PendingIndustry,
    RejectedIndustry,
} from '@partials/admin/industry'
import { AdminApi } from '@queries'
import { checkFilteredDataLength } from '@utils'

const IndustryList: NextPageWithLayout = () => {
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})
    const filteredIndustries = AdminApi.Industries.useListQuery({
        search: `status:approved,${JSON.stringify(filter)
            .replaceAll('{', '')
            .replaceAll('}', '')
            .replaceAll('"', '')
            .trim()}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })
    const { isLoading, data } = AdminApi.Industries.useCount()

    useEffect(() => {
        navBar.setTitle('Industries')
        contextBar.hide()
        // contextBar.setContent(<UserProfile />)
    }, [])

    const tabs: TabProps[] = [
        {
            label: 'Pending',
            href: { pathname: 'industry', query: { tab: 'pending' } },
            badge: {
                text: data?.pending,
                loading: isLoading,
            },
            element: <PendingIndustry />,
        },
        {
            label: 'Approved',
            href: { pathname: 'industry', query: { tab: 'approved' } },
            badge: {
                text: data?.approved,
                loading: isLoading,
            },
            element: <ApprovedIndustry />,
        },
        {
            label: 'Rejected',
            href: { pathname: 'industry', query: { tab: 'rejected' } },
            badge: {
                text: data?.rejected,
                loading: isLoading,
            },
            element: <RejectedIndustry />,
        },
        {
            label: 'Blocked',
            href: { pathname: 'industry', query: { tab: 'blocked' } },
            badge: {
                text: data?.blocked,
                loading: isLoading,
            },
            element: <BlockedIndustry />,
        },
        {
            label: 'Archived',
            href: { pathname: 'industry', query: { tab: 'archived' } },
            badge: {
                text: data?.archived,
                loading: isLoading,
            },
            element: <ArchivedIndustry />,
        },
    ]

    const filteredDataLength = checkFilteredDataLength(filter)

    return (
        <div>
            <div className="px-4">
                <div className="flex justify-end mb-2">{filterAction}</div>
                <Filter
                    component={IndustryFilters}
                    initialValues={{}}
                    setFilterAction={setFilterAction}
                    setFilter={setFilter}
                />
            </div>
            {filteredDataLength && filteredIndustries.isSuccess ? (
                <FilteredIndustry
                    setPage={setPage}
                    itemPerPage={itemPerPage}
                    industry={filteredIndustries}
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

IndustryList.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default IndustryList
