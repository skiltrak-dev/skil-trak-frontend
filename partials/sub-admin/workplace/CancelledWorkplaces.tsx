import React, { useEffect, useState } from 'react'

import {
    TechnicalError,
    LoadingAnimation,
    EmptyData,
    PageSize,
    Pagination,
} from '@components'
import { WorkplaceRequest } from './components'

// query
import { useGetCancelledWorkplacesQuery } from '@queries'
import { useRouter } from 'next/router'

export const CancelledWorkplaces = () => {
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(30)

    const router = useRouter()

    const subAdminWorkplace = useGetCancelledWorkplacesQuery(
        {
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        { refetchOnMountOrArgChange: true }
    )

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 30))
    }, [router])
    return (
        <div>
            <div className="flex items-center justify-between">
                <PageSize
                    itemPerPage={itemPerPage}
                    setItemPerPage={setItemPerPage}
                    records={subAdminWorkplace.data?.data?.length}
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
                        title={'No Cancelled Workplace yet'}
                        description={'No Cancelled workplace were found'}
                    />
                )
            )}

            {subAdminWorkplace.data?.data?.length > 6 && (
                <div className="flex items-center justify-between py-7">
                    <PageSize
                        itemPerPage={itemPerPage}
                        setItemPerPage={setItemPerPage}
                        records={subAdminWorkplace.data?.data?.length}
                    />
                    <Pagination
                        pagination={subAdminWorkplace?.data?.pagination}
                        setPage={setPage}
                    />
                </div>
            )}
        </div>
    )
}
