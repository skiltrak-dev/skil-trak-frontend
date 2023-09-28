import {
    Filter,
    FindWorkplaceFilters,
    LoadingAnimation,
    SetDetaultQueryFilteres,
    TabNavigation,
    TabProps,
    TechnicalError,
} from '@components'
import { useContextBar } from '@hooks'
import { AdminLayout } from '@layouts'
import { ActiveIndustries, AddIndustry } from '@partials/common'
import { FilteredSearchIndustries } from '@partials/common/FindWorkplaces/FilteredSearchIndustries'
import { CommonApi } from '@queries'
import { FindWorkplaceFilter, NextPageWithLayout } from '@types'
import { checkFilteredDataLength } from '@utils'
import { ReactElement, useCallback, useEffect, useState } from 'react'

type Props = {}
const filterKeys = ['businessName', 'address', 'sector', 'email', 'phone']
const SearchWorkplaces: NextPageWithLayout = (props: Props) => {
    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const contextBar = useContextBar()
    const [filter, setFilter] = useState<FindWorkplaceFilter>(
        {} as FindWorkplaceFilter
    )
    const [industryData, setIndustryData] = useState<any>(null)

    const filteredIndustries = CommonApi.FindWorkplace.useGetAllFindWorkplaces({
        search: `${JSON.stringify(filter)
            .replaceAll('{', '')
            .replaceAll('}', '')
            .replaceAll('"', '')
            .trim()}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const onSetIndustryData = useCallback((data: any) => {
        setIndustryData(data)
    }, [])

    const tabs: TabProps[] = [
        {
            label: 'All',
            href: {
                pathname: 'search-workplaces',
                query: { tab: 'all', page: 1, pageSize: 50 },
            },

            element: (
                <ActiveIndustries
                    onSetIndustryData={(data: any) => {
                        onSetIndustryData(data)
                    }}
                />
            ),
        },
    ]
    const filteredDataLength = checkFilteredDataLength(filter)

    useEffect(() => {
        contextBar.setContent(
            <AddIndustry
                industryData={industryData}
                onSetIndustryData={() => {
                    onSetIndustryData(null)
                }}
            />
        )
        contextBar.show(false)

        return () => {
            contextBar.setContent(null)
            contextBar.hide()
        }
    }, [industryData])
    return (
        <div>
            <SetDetaultQueryFilteres<FindWorkplaceFilter>
                filterKeys={filterKeys}
                setFilter={setFilter}
            />
            <div className="flex justify-end mt-4 mr-6">{filterAction}</div>
            <Filter<FindWorkplaceFilter>
                component={FindWorkplaceFilters}
                initialValues={filter}
                setFilterAction={setFilterAction}
                setFilter={setFilter}
                filterKeys={filterKeys}
            />
            {filteredDataLength && filteredIndustries.isError && (
                <TechnicalError />
            )}
            {filteredDataLength ? (
                filteredIndustries.isLoading ? (
                    <LoadingAnimation />
                ) : (
                    filteredIndustries.isSuccess && (
                        <FilteredSearchIndustries
                            setPage={setPage}
                            itemPerPage={itemPerPage}
                            subAdmin={filteredIndustries}
                            setItemPerPage={setItemPerPage}
                            onSetIndustryData={(data: any) => {
                                onSetIndustryData(data)
                            }}
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
SearchWorkplaces.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default SearchWorkplaces
