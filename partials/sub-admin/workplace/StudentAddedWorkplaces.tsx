import {
    TechnicalError,
    LoadingAnimation,
    EmptyData,
    PageSize,
    Pagination,
} from '@components'
import { WorkplaceRequest } from './studentProvidedComponents'

// query
import { useGetAddedByStudentsWorkplacesQuery } from '@queries'
import { useState } from 'react'

export const StudentAddedWorkplaces = () => {
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(30)

    const subAdminWorkplace = useGetAddedByStudentsWorkplacesQuery(
        {
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        { refetchOnMountOrArgChange: true }
    )
    return (
        <div>
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
                <div className="flex flex-col gap-y-4">
                    {subAdminWorkplace.data?.data?.map((workplace: any) => (
                        <WorkplaceRequest
                            key={workplace.id}
                            workplace={workplace}
                        />
                    ))}
                </div>
            ) : (
                !subAdminWorkplace.isError && (
                    <EmptyData
                        title={'No Student Added Workplace request'}
                        description={
                            'No Student Added Workplace request were found'
                        }
                    />
                )
            )}
        </div>
    )
}
