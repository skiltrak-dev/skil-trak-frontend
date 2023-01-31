import React, { useState } from 'react'

import {
    TechnicalError,
    LoadingAnimation,
    EmptyData,
    PageSize,
    Pagination,
} from '@components'
import { WorkplaceRequest } from './components'
import { WorkplaceRequest as StudentProvidedWorkplace } from './studentProvidedComponents'

// query
import { useGetSubAdminWorkplacesQuery } from '@queries'

export const AllWorkplaces = () => {
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(30)

    const subAdminWorkplace = useGetSubAdminWorkplacesQuery({
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })
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
                <LoadingAnimation height={'h-96'} />
            ) : subAdminWorkplace?.data?.data &&
              subAdminWorkplace?.data?.data.length > 0 ? (
                <div className="flex flex-col gap-y-4">
                    {subAdminWorkplace?.data?.data?.map((workplace: any) => {
                        if (
                            workplace?.studentProvidedWorkplace ||
                            workplace?.byExistingAbn
                        ) {
                            return (
                                <StudentProvidedWorkplace
                                    key={workplace.id}
                                    workplace={workplace}
                                />
                            )
                        }
                        return (
                            <WorkplaceRequest
                                key={workplace.id}
                                workplace={workplace}
                            />
                        )
                    })}
                </div>
            ) : (
                !subAdminWorkplace.isError && (
                    <EmptyData
                        title={'No Workplace request yet'}
                        description={'No workplace request were found'}
                    />
                )
            )}
        </div>
    )
}
