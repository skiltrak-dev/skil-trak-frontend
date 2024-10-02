// import React, { ReactElement, useEffect, useState } from 'react'
// import { AdminSubadminFilter, NextPageWithLayout, UserStatus } from '@types'
// import { SubAdminLayout } from '@layouts'
// import { SubAdminApi } from '@queries'
// import {
//     FilterHodCoordinators,
//     HodCoordinatorsList,
//     HodCoordinatorsListProvider,
// } from '@partials/sub-admin/hodCoordinators'
// import { useRouter } from 'next/router'
// import { checkFilteredDataLength } from '@utils'
// import {
//     Filter,
//     SetDetaultQueryFilteres,
//     SubAdminFilters,
//     TableSkeleton,
//     TechnicalError,
// } from '@components'

// const filterKeys = ['name', 'email', 'status', 'courseId']
// const CoordinatorsList: NextPageWithLayout = () => {
//     const [itemPerPage, setItemPerPage] = useState(50)
//     const [page, setPage] = useState(1)

//     const [filterAction, setFilterAction] = useState(null)
//     const [filter, setFilter] = useState<AdminSubadminFilter>(
//         {} as AdminSubadminFilter
//     )
//     const router = useRouter()
//     const { data, isLoading, isError, isFetching, isSuccess } =
//         SubAdminApi.SubAdmin.useHodCoordinatorsList({
//             search: `${JSON.stringify(filter)
//                 .replaceAll('{', '')
//                 .replaceAll('}', '')
//                 .replaceAll('"', '')
//                 .trim()}`,
//             skip: itemPerPage * page - itemPerPage,
//             limit: itemPerPage,
//         })

//     const filteredDataLength = checkFilteredDataLength(filter)

//     useEffect(() => {
//         setPage(Number(router.query?.page || 1))
//         setItemPerPage(Number(router.query?.pageSize || 50))
//     }, [router])

//     return (

//     )
// }

// CoordinatorsList.getLayout = (page: ReactElement) => {
//     return (
//         <SubAdminLayout pageTitle={{ title: 'Coordinators List' }}>
//             <HodCoordinatorsListProvider>{page}</HodCoordinatorsListProvider>
//         </SubAdminLayout>
//     )
// }
// export default CoordinatorsList

import React, { ReactElement, useEffect } from 'react'
import { AdminSubadminFilter, NextPageWithLayout } from '@types'
import { SubAdminLayout } from '@layouts'
import {
    FilterHodCoordinators,
    HodCoordinatorsList,
    HodCoordinatorsListProvider,
    useHodCoordinatorsList,
} from '@partials/sub-admin/hodCoordinators'
import { useRouter } from 'next/router'
import {
    Filter,
    HodCoordinatorsFilters,
    SetDetaultQueryFilteres,
    SubAdminFilters,
    TableSkeleton,
    TechnicalError,
} from '@components'

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
                    <div className="flex justify-end mb-2">{filterAction}</div>
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
