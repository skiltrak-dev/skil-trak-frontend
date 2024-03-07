import { ReactElement, useEffect, useState } from 'react'

import {
    Filter,
    IndustryFilters,
    LoadingAnimation,
    SetDetaultQueryFilteres,
    TabNavigation,
    TabProps,
    TechnicalError,
} from '@components'
import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { AdminIndustryFormFilter, NextPageWithLayout, UserStatus } from '@types'

import {
    ApprovedIndustry,
    ArchivedIndustry,
    BlockedIndustry,
    FilteredIndustry,
    PendingIndustry,
    RejectedIndustry,
    SnoozedIndustry,
} from '@partials/admin/industry'
import { AdminApi } from '@queries'
import { QueryType, checkFilteredDataLength, getFilterQuery } from '@utils'
import { useRouter } from 'next/router'

const filterKeys = [
    'name',
    'email',
    'status',
    'phone',
    'address',
    'courseId',
    'sectorId',
    'industryId',
    'suburb',
    'state',
    'isPartner',
    'isHiring',
]

const removeFilterKeysToUrl: any = []

const IndustryList: NextPageWithLayout = () => {
    const router = useRouter()

    const navBar = useNavbar()
    const contextBar = useContextBar()

    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState<AdminIndustryFormFilter>(
        {} as AdminIndustryFormFilter
    )

    const filteredIndustries = AdminApi.Industries.useListQuery({
        search: `${JSON.stringify(filter)
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
    }, [])

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const tabs: TabProps[] = [
        {
            label: 'Pending',
            href: {
                pathname: 'industry',
                query: { tab: UserStatus.Pending, page: 1, pageSize: 50 },
            },
            badge: {
                text: data?.pending,
                loading: isLoading,
            },
            element: <PendingIndustry />,
        },
        {
            label: 'Approved',
            href: {
                pathname: 'industry',
                query: { tab: UserStatus.Approved, page: 1, pageSize: 50 },
            },
            badge: {
                text: data?.approved,
                loading: isLoading,
            },
            element: <ApprovedIndustry />,
        },
        {
            label: 'Snoozed',
            href: {
                pathname: 'industry',
                query: { tab: 'snoozed', page: 1, pageSize: 50 },
            },
            badge: {
                text: data?.snoozed,
                loading: isLoading,
            },
            element: <SnoozedIndustry />,
        },
        {
            label: 'Rejected',
            href: {
                pathname: 'industry',
                query: { tab: UserStatus.Rejected, page: 1, pageSize: 50 },
            },
            badge: {
                text: data?.rejected,
                loading: isLoading,
            },
            element: <RejectedIndustry />,
        },
        {
            label: 'Blocked',
            href: {
                pathname: 'industry',
                query: { tab: UserStatus.Blocked, page: 1, pageSize: 50 },
            },
            badge: {
                text: data?.blocked,
                loading: isLoading,
            },
            element: <BlockedIndustry />,
        },
        {
            label: 'Archived',
            href: {
                pathname: 'industry',
                query: { tab: UserStatus.Archived, page: 1, pageSize: 50 },
            },
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
            <SetDetaultQueryFilteres<AdminIndustryFormFilter>
                filterKeys={filterKeys}
                setFilter={setFilter}
            />
            <div className="px-4">
                <div className="flex justify-end mb-2">{filterAction}</div>
                <Filter<AdminIndustryFormFilter>
                    component={IndustryFilters}
                    initialValues={filter}
                    setFilterAction={setFilterAction}
                    setFilter={(e: any) => {
                        setPage(Number(1))
                        setFilter(e)
                    }}
                    filterKeys={filterKeys}
                    removeFilterKeysToUrl={removeFilterKeysToUrl}
                />
            </div>
            {filteredDataLength && filteredIndustries.isError && (
                <TechnicalError />
            )}
            {filteredDataLength ? (
                filteredIndustries.isLoading ? (
                    <LoadingAnimation />
                ) : (
                    filteredIndustries.isSuccess && (
                        <FilteredIndustry
                            setPage={setPage}
                            itemPerPage={itemPerPage}
                            industry={filteredIndustries}
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

IndustryList.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default IndustryList
