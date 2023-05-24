import { useEffect, useState } from 'react'
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
import { AdminWorkplaceRequest } from './components'
import { useRouter } from 'next/router'

export const UnAssignedRequest = () => {
    const router = useRouter()

    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(30)

    const subAdminWorkplace = AdminApi.Workplace.useUnAssignedWorkplace({
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 30))
    }, [router])

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
                        title={'No Un-Assigned Workplace Request'}
                        description={
                            'No Un-Assigned Workplace Request were found'
                        }
                    />
                )
            )}
        </div>
    )
}
