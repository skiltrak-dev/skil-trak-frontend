import { AdminLayout } from '@layouts'
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
import { ReactElement, useState } from 'react'
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
type Props = {}
const filterKeys = ['businessName', 'address', 'sector', 'email', 'phone']
const SearchWorkplaces: NextPageWithLayout = (props: Props) => {
    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState<FindWorkplaceFilter>(
        {} as FindWorkplaceFilter
    )
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
    const tabs: TabProps[] = [
        {
            label: 'All',
            href: {
                pathname: 'search-workplaces',
                query: { tab: 'all', page: 1, pageSize: 50 },
            },
            // badge: {
            //     text: data?.all,
            //     loading: false,
            // },
            element: <ActiveIndustries />,
        },
        // {
        //     label: 'Is Partnered',
        //     href: {
        //         pathname: 'search-workplaces',
        //         query: { tab: 'isPartner', page: 1, pageSize: 50 },
        //     },
        //     badge: {
        //         text: data?.isPartner,
        //         loading: false,
        //     },
        //     element: <IsPartneredIndustries />,
        // },
        // {
        //     label: 'Is Contacted',
        //     href: {
        //         pathname: 'search-workplaces',
        //         query: { tab: 'isContacted', page: 1, pageSize: 50 },
        //     },
        //     badge: {
        //         text: data?.isContacted,
        //         loading: false,
        //     },
        //     element: <IsContactedIndustries />,
        // },
        // {
        //     label: 'Do Not Disturb',
        //     href: {
        //         pathname: 'search-workplaces',
        //         query: { tab: 'do-not-disturb', page: 1, pageSize: 50 },
        //     },
        //     badge: {
        //         text: data?.doNotDisturb,
        //         loading: false,
        //     },
        //     element: <DoNotDisturbIndustries />,
        // },
    ]
    const filteredDataLength = checkFilteredDataLength(filter)
    return (
        <div>
            <AddIndustry />
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
SearchWorkplaces.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}
export default SearchWorkplaces
