import { ReactElement, useEffect, useState } from 'react'

import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import {
    AdminWorkplaceFilters,
    Card,
    Filter,
    TabNavigation,
    TabProps,
} from '@components'

// query
import { AdminApi } from '@queries'

// components
import { EmptyData, LoadingAnimation, TechnicalError } from '@components'
import { useNavbar } from '@hooks'
import {
    AdminFilteredWorkplace,
    AllRequestedWorkplace,
    AllStudentProvidedWorkplace,
    AssignedRequest,
    UnAssignedRequest,
} from '@partials'

type Props = {}

const Workplace: NextPageWithLayout = (props: Props) => {
    const [filterAction, setFilterAction] = useState(null)
    const [filter, setFilter] = useState({})
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(50)
    const navBar = useNavbar()

    useEffect(() => {
        navBar.setTitle('Workplace Request')
    }, [])

    const filteredWorkplaces = AdminApi.Workplace.useFilteredWorkplaces(
        {
            search: `${JSON.stringify(filter)
                .replaceAll('{', '')
                .replaceAll('}', '')
                .replaceAll('"', '')
                .trim()}`,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        { skip: !Object.keys(filter).length }
    )

    const tabs: TabProps[] = [
        {
            label: 'All Student Provided Workplace',
            href: {
                pathname: 'workplaces',
                query: { tab: 'all-student-provided-workplace' },
            },
            element: <AllStudentProvidedWorkplace />,
        },
        {
            label: 'All Requested Workplace',
            href: {
                pathname: 'workplaces',
                query: { tab: 'all-requested-workplace' },
            },
            element: <AllRequestedWorkplace />,
        },
        {
            label: 'Assigned Request',
            href: {
                pathname: 'workplaces',
                query: { tab: 'assigned-request' },
            },
            element: <AssignedRequest />,
        },
        {
            label: 'Un Assigned Request',
            href: {
                pathname: 'workplaces',
                query: { tab: 'un-assigned-request' },
            },
            element: <UnAssignedRequest />,
        },
    ]

    return (
        <div className="p-3">
            <div>
                <div className="flex justify-end mb-2">{filterAction}</div>
                <Filter
                    component={AdminWorkplaceFilters}
                    initialValues={{}}
                    setFilterAction={setFilterAction}
                    setFilter={setFilter}
                />
            </div>
            {filteredWorkplaces.isLoading || filteredWorkplaces.isFetching ? (
                <div className="mt-5">
                    <Card>
                        <LoadingAnimation />
                    </Card>
                </div>
            ) : Object.keys(filter).length && filteredWorkplaces.isSuccess ? (
                <AdminFilteredWorkplace
                    setPage={setPage}
                    setItemPerPage={setItemPerPage}
                    workplace={filteredWorkplaces}
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
    )
}
Workplace.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default Workplace
