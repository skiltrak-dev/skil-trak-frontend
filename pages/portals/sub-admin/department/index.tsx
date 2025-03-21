import {
    Filter,
    HodCoordinatorsFilters,
    SetDetaultQueryFilteres,
    TableSkeleton,
    TechnicalError,
} from '@components'
import { SubAdminLayout } from '@layouts'
import {
    FilterHodCoordinators,
    HodCoordinatorsList,
    HodCoordinatorsListProvider,
    useHodCoordinatorsList,
} from '@partials/sub-admin/hodCoordinators'
import { AdminSubadminFilter, NextPageWithLayout } from '@types'
import Link from 'next/link'
import { ReactElement } from 'react'

const filterKeys = ['name', 'email', 'courseId']

const CoordinatorsListContent = () => {
    const {
        filter,
        setFilter,
        setPage,
        setItemPerPage,
        data,
        itemPerPage,
        filterAction,
        setFilterAction,
        filteredDataLength,
        modal,
    } = useHodCoordinatorsList()

    return (
        <>
            {modal}
            <div className="mb-5">
                <SetDetaultQueryFilteres<AdminSubadminFilter>
                    filterKeys={filterKeys}
                    setFilter={setFilter}
                />
                <div className="px-4">
                    <div className="flex justify-end gap-x-4 mb-2 items-center">
                        <div>
                            <Link
                                href={
                                    '/portals/sub-admin/department/kpis-by-dept'
                                }
                                className="text-link text-sm bg-blue-100 px-4 py-2 rounded-md"
                            >
                                KPIS
                            </Link>
                        </div>
                        <div>
                            <Link
                                href={
                                    '/portals/sub-admin/department/students?tab=all-students'
                                }
                                className="text-link text-sm bg-blue-100 px-4 py-2 rounded-md"
                            >
                                Department Students
                            </Link>
                        </div>
                        <div>
                            <Link
                                href={
                                    '/portals/sub-admin/tasks/industry-listing?tab=department'
                                }
                                className="text-green-500 text-sm bg-green-100 px-4 py-2 rounded-md"
                            >
                                Department Industries
                            </Link>
                        </div>
                        <div>
                            <Link
                                href={
                                    '/portals/sub-admin/department/course-request'
                                }
                                className="text-orange-500 text-sm bg-orange-100 px-4 py-2 rounded-md"
                            >
                                Course Requests
                            </Link>
                        </div>
                        {filterAction}
                    </div>
                    <Filter<AdminSubadminFilter>
                        component={HodCoordinatorsFilters}
                        initialValues={filter}
                        setFilterAction={setFilterAction}
                        setFilter={setFilter}
                        filterKeys={filterKeys}
                    />
                </div>
            </div>

            {filteredDataLength && data.isError && <TechnicalError />}
            {filteredDataLength ? (
                data.isLoading ? (
                    <TableSkeleton arrayLength={8} />
                ) : (
                    data.isSuccess && (
                        <FilterHodCoordinators
                            setPage={setPage}
                            itemPerPage={itemPerPage}
                            subAdmin={data}
                            setItemPerPage={setItemPerPage}
                        />
                    )
                )
            ) : null}
            {!filteredDataLength && <HodCoordinatorsList />}
        </>
    )
}

const CoordinatorsList: NextPageWithLayout = () => {
    return (
        <HodCoordinatorsListProvider>
            <CoordinatorsListContent />
        </HodCoordinatorsListProvider>
    )
}

CoordinatorsList.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'Coordinators List' }}>
            {page}
        </SubAdminLayout>
    )
}

export default CoordinatorsList
