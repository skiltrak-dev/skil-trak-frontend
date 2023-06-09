import React from 'react'

import {
    TechnicalError,
    LoadingAnimation,
    EmptyData,
    PageSize,
    Pagination,
} from '@components'
import { WorkplaceRequest } from './components'
import { WorkplaceRequest as StudentProvidedWorkplace } from './studentProvidedComponents'

export const FilteredWorkplaces = ({
    setPage,
    workplace,
    setItemPerPage,
    itemPerPage,
}: {
    setPage: any
    workplace: any
    itemPerPage: number
    setItemPerPage: any
}) => {
    return (
        <div className="mt-5">
            <div className="flex items-center justify-between">
                <PageSize
                    itemPerPage={itemPerPage}
                    setItemPerPage={setItemPerPage}
                    records={workplace.data?.data?.length}
                />
                <Pagination
                    pagination={workplace?.data?.pagination}
                    setPage={setPage}
                />
            </div>
            {workplace.data && workplace.data?.data?.length > 0 ? (
                <div className="flex flex-col gap-y-4">
                    {workplace?.data?.data?.map((workplace: any) => {
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
                !workplace.isError && (
                    <EmptyData
                        title={'No Workplace request in your search'}
                        description={
                            'No workplace request were found in your search'
                        }
                    />
                )
            )}
            {workplace.data?.data?.length > 6 && (
                <div className="flex items-center justify-between py-7">
                    <PageSize
                        itemPerPage={itemPerPage}
                        setItemPerPage={setItemPerPage}
                        records={workplace.data?.data?.length}
                    />
                    <Pagination
                        pagination={workplace?.data?.pagination}
                        setPage={setPage}
                    />
                </div>
            )}
        </div>
    )
}
