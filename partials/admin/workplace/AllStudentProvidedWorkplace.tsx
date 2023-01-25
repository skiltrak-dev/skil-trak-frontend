// components
import {
    TechnicalError,
    LoadingAnimation,
    EmptyData,
    PageSize,
    Pagination,
} from '@components'

// queries
import { AdminApi } from '@queries'
import { useState } from 'react'
import { AdminWorkplaceRequest } from './components'

export const AllStudentProvidedWorkplace = () => {
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(50)

    const subAdminWorkplace = AdminApi.Workplace.useStudentProvidedWorkplace({
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })
    return (
        <div className="p-4">
            <div className="flex items-center justify-between">
                <PageSize
                    itemPerPage={itemPerPage}
                    setItemPerPage={setItemPerPage}
                />
                <Pagination
                    pagination={subAdminWorkplace?.data?.pagination}
                    setPage={setPage}
                />
            </div>
            {subAdminWorkplace.isError && <TechnicalError />}
            {subAdminWorkplace.isLoading && subAdminWorkplace.isFetching ? (
                <LoadingAnimation />
            ) : subAdminWorkplace.data?.data &&
              subAdminWorkplace.data?.data?.length > 0 ? (
                <div className="flex flex-col gap-y-2">
                    {subAdminWorkplace?.data?.data?.map((workplace: any) => (
                        <AdminWorkplaceRequest
                            key={workplace?.id}
                            workplace={workplace}
                        />
                    ))}
                </div>
            ) : (
                !subAdminWorkplace.isError && (
                    <EmptyData
                        title={'No Provided Workplace Request'}
                        description={'No Provided Workplace Request were found'}
                    />
                )
            )}
        </div>
    )
}
