import { AdminLayout, SubAdminLayout } from '@layouts'
import {
    ActiveIndustries,
    AddIndustry,
    DoNotDisturbIndustries,
    FindWorkplaces,
    IsContactedIndustries,
    IsPartneredIndustries,
    SearchLocation,
} from '@partials/common'
import { FindWorkplaceFilter, NextPageWithLayout } from '@types'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import {
    Filter,
    FindWorkplaceFilters,
    LoadingAnimation,
    SetDetaultQueryFilteres,
    TabNavigation,
    TabProps,
    TechnicalError,
} from '@components'
import { AdminApi, commonApi } from '@queries'
import { checkFilteredDataLength } from '@utils'
import { FilteredSearchIndustries } from '@partials/common/FindWorkplaces/FilteredSearchIndustries'
import { useContextBar } from '@hooks'
type Props = {}
const filterKeys = ['businessName', 'address', 'sector', 'email', 'phone']
const IndustryListing: NextPageWithLayout = (props: Props) => {
    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const contextBar = useContextBar()
    const [filter, setFilter] = useState<FindWorkplaceFilter>(
        {} as FindWorkplaceFilter
    )
    const [industryData, setIndustryData] = useState<any>(null)

    // const { isLoading, data, isError } = commonApi.useFindIndustriesCountQuery()
    const filteredIndustries = commonApi.useGetAllFindWorkplacesQuery({
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
                pathname: 'industry-listing',
                query: { tab: 'all', page: 1, pageSize: 50 },
            },
            element: <ActiveIndustries onSetIndustryData={onSetIndustryData} />,
        },
    ]
    const filteredDataLength = checkFilteredDataLength(filter)

    useEffect(() => {
        contextBar.setContent(<AddIndustry industryData={industryData} />)
        contextBar.show(false)

        return () => {
            contextBar.setContent(null)
            contextBar.hide()
        }
    }, [])
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
                                        {/* <Button
                                            text={'Add Sub Admin'}
                                            variant={'primary'}
                                            onClick={onAddSubAdmin}
                                        /> */}
                                    </div>
                                </div>
                                <div className="p-4">{element}</div>
                            </div>
                        )
                    }}
                </TabNavigation>
            )}
            {/* <SearchLocation /> */}
        </div>
    )
}
IndustryListing.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}
export default IndustryListing
