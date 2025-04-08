import { useState, useEffect } from 'react'
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

export const AllRequestedWorkplace = () => {
    const router = useRouter()

    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(30)

    const subAdminWorkplace = AdminApi.Workplace.useRequestedWorkplace(
        {
            search: '',
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        {
            refetchOnMountOrArgChange: true,
        }
    )

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
                        title={'No Workplace Request'}
                        description={'No Workplace Request were found'}
                    />
                )
            )}
            {subAdminWorkplace.data?.data &&
                subAdminWorkplace.data?.data?.length > 7 && (
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
