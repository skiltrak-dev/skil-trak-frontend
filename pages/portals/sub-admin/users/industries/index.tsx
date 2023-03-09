import { ReactElement, useEffect, useState } from 'react'
//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

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
    FavoriteIndustries,
    FilteredIndustry,
} from '@partials/sub-admin/indestries'
import { checkFilteredDataLength } from '@utils'
//query
import { useGetSubAdminIndustriesQuery } from '@queries'

type Props = {}
const filterKeys = ['name', 'email', 'phone', 'abn', 'courseId']
const Industries: NextPageWithLayout = (props: Props) => {
    const { setContent } = useContextBar()
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
    useEffect(() => {
        setContent(
            <>
                <Button variant={'dark'} text={'My Schedule'} />
                <SidebarCalendar />
                <RtoContextBarData />
            </>
        )
    }, [setContent])

    const tabs: TabProps[] = [
        {
            label: 'All',
            href: { pathname: 'industries', query: { tab: 'all' } },
            element: <AllIndustries />,
        },
        {
            label: 'Favourite Industries',
            href: { pathname: 'industries', query: { tab: 'favorite' } },
            element: <FavoriteIndustries />,
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
