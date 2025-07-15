import {
    EmptyData,
    Filter,
    NoData,
    SetDetaultQueryFilteres,
    SubAdminFilters,
    TableSkeleton,
    TechnicalError,
    Typography,
} from '@components'
import { AdminLayout } from '@layouts'
import { AdminSubadminFilter, NextPageWithLayout } from '@types'
import { ReactElement } from 'react'

import {
    DepartmentCoordinatorsList,
    DepartmentCoordinatorsListProvider,
    DepartmentDetailProvider,
    DeptSkeleton,
    FilterDepartmentCoordinators,
    HodProfileDetail,
    SectorAndCoursesList,
    useDepartmentDetailContext,
} from '@partials/admin/departments'
import { DepartmentMap } from '@partials/admin/departments/map'

const filterKeys = ['name', 'email', 'status', 'courseId']

const DepartmentDetail: NextPageWithLayout = () => {
    const {
        departmentDetail,
        coordinatorsList,
        deptCourses,
        hodDetails,
        sectorsOptions,
        groupedCourses,
        filter,
        setFilter,
        filterAction,
        setFilterAction,
        itemPerPage,
        setItemPerPage,
        page,
        setPage,
        filteredDataLength,
    } = useDepartmentDetailContext()

    return (
        <div className="mx-5 my-8">
            <div className="mb-5">
                <Typography variant="h4">
                    Dept of {departmentDetail?.data?.name}
                </Typography>
            </div>

            {departmentDetail.isError ? <TechnicalError /> : null}
            {departmentDetail.isLoading ? (
                <DeptSkeleton />
            ) : departmentDetail?.data ? (
                <HodProfileDetail
                    subadmin={hodDetails}
                    deptEmail={departmentDetail?.data?.email}
                    deptName={departmentDetail?.data?.name}
                    canViewCourseRequests={
                        departmentDetail?.data?.canViewCourseRequests
                    }
                />
            ) : departmentDetail.isSuccess ? (
                <EmptyData description="No Department Detail were found!" />
            ) : null}

            <div className="mt-10 mb-4 flex items-center justify-between w-full">
                <Typography variant="title" bold>
                    Coordinators
                </Typography>

                <div className="">
                    <SetDetaultQueryFilteres<AdminSubadminFilter>
                        filterKeys={filterKeys}
                        setFilter={setFilter}
                    />
                    <div className="px-4">
                        <div className="flex justify-end mb-2">
                            {filterAction}
                        </div>
                        <Filter<AdminSubadminFilter>
                            component={SubAdminFilters}
                            initialValues={filter}
                            setFilterAction={setFilterAction}
                            setFilter={setFilter}
                            filterKeys={filterKeys}
                        />
                    </div>
                </div>
            </div>

            {filteredDataLength && coordinatorsList.isError && (
                <TechnicalError />
            )}
            {filteredDataLength ? (
                coordinatorsList.isLoading ? (
                    <TableSkeleton
                        arrayLength={coordinatorsList?.data?.data?.length}
                    />
                ) : (
                    coordinatorsList.isSuccess && (
                        <FilterDepartmentCoordinators
                            setPage={setPage}
                            itemPerPage={itemPerPage}
                            subAdmin={coordinatorsList?.data}
                            setItemPerPage={setItemPerPage}
                        />
                    )
                )
            ) : null}
            {!filteredDataLength && <DepartmentCoordinatorsList />}

            <div className="flex gap-x-5">
                <div className="w-1/3">
                    {deptCourses?.data?.length ? (
                        <SectorAndCoursesList courses={deptCourses?.data} />
                    ) : (
                        <div className="w-full">
                            <NoData text={'No Courses Found'} />
                        </div>
                    )}
                </div>
                <div className="w-2/3">
                    <DepartmentMap sectorsOptions={sectorsOptions} />
                </div>
            </div>
        </div>
    )
}

DepartmentDetail.getLayout = (page: ReactElement) => {
    return (
        <AdminLayout>
            <DepartmentDetailProvider>
                <DepartmentCoordinatorsListProvider>
                    {page}
                </DepartmentCoordinatorsListProvider>
            </DepartmentDetailProvider>
        </AdminLayout>
    )
}

export default DepartmentDetail
