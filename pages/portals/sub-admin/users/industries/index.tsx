import { ReactElement, useEffect, useState } from 'react'
//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout, UserStatus } from '@types'

//components
import {
    Button,
    Filter,
    LoadingAnimation,
    RtoContextBarData,
    SidebarCalendar,
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
    PendingIndustries,
    RejectedIndustries,
} from '@partials/sub-admin/Industries'
import { checkFilteredDataLength } from '@utils'
//query
import {
    useGetSubAdminIndustriesQuery,
    useGetSubadminIndustriesCountQuery,
} from '@queries'

type Props = {}
const filterKeys = ['name', 'email', 'phone', 'address', 'abn', 'courseId']
const Industries: NextPageWithLayout = (props: Props) => {
    const { setContent, hide, show } = useContextBar()
    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})

    const filteredIndustries = useGetSubAdminIndustriesQuery({
        search: `${JSON.stringify(filter)
            .replaceAll('{', '')
            .replaceAll('}', '')
            .replaceAll('"', '')
            .trim()}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const count = useGetSubadminIndustriesCountQuery()
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

    const tabs: TabProps[] = [
        {
            label: 'Pending',
            href: {
                pathname: 'industries',
                query: { tab: UserStatus.Pending },
            },
            element: <PendingIndustries />,
            badge: {
                text: count.data?.pending,
                loading: count.isLoading,
            },
        },
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
            label: 'Favourite Industries',
            href: { pathname: 'industries', query: { tab: 'favorite' } },
            element: <FavoriteIndustries />,
            badge: {
                text: count.data?.favorite,
                loading: count.isLoading,
            },
        },
        {
            label: 'Rejected',
            href: {
                pathname: 'industries',
                query: { tab: UserStatus.Rejected },
            },
            element: <RejectedIndustries />,
            badge: {
                text: count.data?.rejected,
                loading: count.isLoading,
            },
        },
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
    const filteredDataLength = checkFilteredDataLength(filter)
    return (
        <>
            <div className="px-4">
                <div className="flex justify-end mb-2">{filterAction}</div>
                <Filter
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
Industries.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'Industries' }}>
            {page}
        </SubAdminLayout>
    )
}

export default Industries
