//Layouts
import { SubadminIndustryFilter, UserStatus } from '@types'

//components
import {
    Filter,
    LoadingAnimation,
    SetDetaultQueryFilteres,
    SubAdminIndustryFilter,
    TabNavigation,
    TabProps,
    TechnicalError,
} from '@components'
// queries
import { useContextBar } from '@hooks'

import {
    AllIndustries,
    ArchivedIndustries,
    BlockedIndustries,
    FavoriteIndustries,
    FilteredIndustry,
    RejectedIndustries,
    SnoozedIndustrySubAdmin,
} from '@partials/sub-admin/Industries'
import { checkFilteredDataLength } from '@utils'
//query
import {
    SubAdminApi,
    useGetSubAdminIndustriesQuery,
    useGetSubadminIndustriesCountQuery,
} from '@queries'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { PendingIndustries } from '@partials/common'

type Props = {}
const filterKeys = [
    'name',
    'email',
    'phone',
    'address',
    'suburb',
    'state',
    'abn',
    'courseId',
    'isHiring',
    'isPartner',
]
export const SubadminIndustries = () => {
    const { setContent, hide, show } = useContextBar()
    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState<SubadminIndustryFilter>(
        {} as SubadminIndustryFilter
    )

    const router = useRouter()

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const filteredIndustries = useGetSubAdminIndustriesQuery({
        search: `status:${UserStatus.Approved},${JSON.stringify(filter)
            .replaceAll('{', '')
            .replaceAll('}', '')
            .replaceAll('"', '')
            .trim()}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })
    const profile = SubAdminApi.SubAdmin.useProfile()
    const isHod = profile?.data?.departmentMember?.isHod

    const count = useGetSubadminIndustriesCountQuery()
    const rejectedCount =
        SubAdminApi.Industry.useRejectedDepartmentIndustryCount()
    const pendingCount =
        SubAdminApi.Industry.usePendingDepartmentIndustryCount()

    // useEffect(() => {
    //     setContent(
    //         <>
    //             <Button variant={'dark'} text={'My Schedule'} />
    //             <SidebarCalendar />
    //             <RtoContextBarData />
    //         </>
    //     )
    //     show(true)

    //     return () => {
    //         setContent(null)
    //         hide()
    //     }
    // }, [setContent])

    const tabs: TabProps[] = useMemo(() => {
        const baseTabs = [
            // {
            //     label: 'Pending',
            //     href: {
            //         pathname: 'industries',
            //         query: { tab: UserStatus.Pending },
            //     },
            //     element: <PendingIndustries />,
            //     badge: {
            //         text: count.data?.pending,
            //         loading: count.isLoading,
            //     },
            // },
            {
                label: 'All',
                href: { pathname: 'industries', query: { tab: 'all' } },
                element: <AllIndustries />,
                badge: {
                    text: count.data?.approved,
                    loading: count.isLoading,
                },
            },
            {
                label: 'Snoozed',
                href: { pathname: 'industries', query: { tab: 'snoozed' } },
                element: <SnoozedIndustrySubAdmin />,
                badge: {
                    text: count.data?.snoozed,
                    loading: count.isLoading,
                },
            },
            {
                label: 'Favourite Industries',
                href: { pathname: 'industries', query: { tab: 'favorite' } },
                element: <FavoriteIndustries />,
                badge: {
                    text: count.data?.favorite,
                    loading: count.isLoading,
                },
            },
            // {
            //     label: 'Hiring Industries',
            //     href: { pathname: 'industries', query: { tab: 'hiring' } },
            //     element: <IsHiringIndustries />,
            // },

            {
                label: 'Blocked',
                href: {
                    pathname: 'industries',
                    query: { tab: UserStatus.Blocked },
                },
                element: <BlockedIndustries />,
                badge: {
                    text: count.data?.blocked,
                    loading: count.isLoading,
                },
            },
            {
                label: 'Archived',
                href: {
                    pathname: 'industries',
                    query: { tab: UserStatus.Archived },
                },
                element: <ArchivedIndustries />,
                badge: {
                    text: count.data?.archived,
                    loading: count.isLoading,
                },
            },
        ]
        if (isHod) {
            baseTabs.push({
                label: 'Pending',
                href: {
                    pathname: 'industries',
                    query: { tab: UserStatus.Pending },
                },
                badge: {
                    text: pendingCount?.data,
                    loading: pendingCount.isLoading,
                },
                element: <PendingIndustries />,
            }),
                baseTabs.push({
                    label: 'Rejected',
                    href: {
                        pathname: 'industries',
                        query: { tab: UserStatus.Rejected },
                    },
                    element: <RejectedIndustries />,
                    badge: {
                        text: rejectedCount?.data,
                        loading: rejectedCount.isLoading,
                    },
                })
        }
        return baseTabs
    }, [count, isHod, rejectedCount, pendingCount])

    const filteredDataLength = checkFilteredDataLength(filter)
    return (
        <>
            <SetDetaultQueryFilteres<SubadminIndustryFilter>
                filterKeys={filterKeys}
                setFilter={setFilter}
            />
            <div className="px-4">
                <div className="flex justify-end mb-2">{filterAction}</div>
                <Filter<SubadminIndustryFilter>
                    component={SubAdminIndustryFilter}
                    initialValues={filter}
                    setFilterAction={setFilterAction}
                    setFilter={setFilter}
                    filterKeys={filterKeys}
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
        </>
    )
}
