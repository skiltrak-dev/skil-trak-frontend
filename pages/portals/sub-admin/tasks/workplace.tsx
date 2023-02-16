import { ReactElement, useState } from 'react'

import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import {
    Card,
    Filter,
    LoadingAnimation,
    TabNavigation,
    TabProps,
    WorkplaceFilters,
} from '@components'

// query
import { useGetSubAdminFilteredWorkplacesQuery } from '@queries'

// components
import {
    MyWorkplaces,
    AllWorkplaces,
    CancelledWorkplaces,
    StudentAddedWorkplaces,
    FilteredWorkplaces,
} from '@partials/sub-admin'

type Props = {}

const Workplace: NextPageWithLayout = (props: Props) => {
    const [filterAction, setFilterAction] = useState(null)
    const [filter, setFilter] = useState({})
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(30)

    const filteredWorkplaces = useGetSubAdminFilteredWorkplacesQuery(
        {
            search: `${JSON.stringify(filter)
                .replaceAll('{', '')
                .replaceAll('}', '')
                .replaceAll('"', '')
                .trim()}`,
        },
        { skip: !Object.keys(filter).length }
    )
    const tabs: TabProps[] = [
        {
            label: 'All Requests',
            href: { pathname: 'workplace', query: { tab: 'all' } },
            element: <AllWorkplaces />,
        },
        {
            label: 'My Requests',
            href: { pathname: 'workplace', query: { tab: 'my-workplaces' } },
            element: <MyWorkplaces />,
        },
        {
            label: 'Student Provided Workplace',
            href: { pathname: 'workplace', query: { tab: 'student-added' } },
            element: <StudentAddedWorkplaces />,
        },
        {
            label: 'Cancelled Requests',
            href: { pathname: 'workplace', query: { tab: 'cancelled' } },
            element: <CancelledWorkplaces />,
        },
    ]

    return (
        <>
            <div>
                <div>
                    <div className="flex justify-end mb-2">{filterAction}</div>
                    <Filter
                        component={WorkplaceFilters}
                        initialValues={{}}
                        setFilterAction={setFilterAction}
                        setFilter={setFilter}
                    />
                </div>
                {filteredWorkplaces.isLoading ||
                filteredWorkplaces.isFetching ? (
                    <div className="mt-5">
                        <Card>
                            <LoadingAnimation />
                        </Card>
                    </div>
                ) : Object.keys(filter).length &&
                  filteredWorkplaces.isSuccess ? (
                    <FilteredWorkplaces
                        workplace={filteredWorkplaces}
                        setPage={setPage}
                        setItemPerPage={setItemPerPage}
                        itemPerPage={itemPerPage}
                    />
                ) : (
                    <TabNavigation tabs={tabs}>
                        {({ header, element }: any) => {
                            return (
                                <div>
                                    <div>{header}</div>
                                    <div className="mt-3">{element}</div>
                                </div>
                            )
                        }}
                    </TabNavigation>
                )}
            </div>
        </>
    )
}
Workplace.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'Workplace' }}>
            {page}
        </SubAdminLayout>
    )
}

export default Workplace
