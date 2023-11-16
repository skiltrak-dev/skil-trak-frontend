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

export const CancelledRequests = () => {
    const router = useRouter()

    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(30)

    const cancelledWorkplaces = AdminApi.Workplace.cancelledWorkplaces(
        {
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
                    records={cancelledWorkplaces.data?.data?.length}
                />
                <Pagination
                    pagination={cancelledWorkplaces?.data?.pagination}
                    setPage={setPage}
                />
            </div>
            {cancelledWorkplaces.isError && <TechnicalError />}
            {cancelledWorkplaces.isLoading && cancelledWorkplaces.isFetching ? (
                <LoadingAnimation />
            ) : cancelledWorkplaces.data?.data &&
              cancelledWorkplaces.data?.data?.length > 0 ? (
                <div className="flex flex-col gap-y-2">
                    {cancelledWorkplaces?.data?.data?.map((workplace: any) => (
                        <AdminWorkplaceRequest
                            key={workplace?.id}
                            workplace={workplace}
                        />
                    ))}
                </div>
            ) : (
                !cancelledWorkplaces.isError && (
                    <EmptyData
                        title={'No Un-Assigned Workplace Request'}
                        description={
                            'No Un-Assigned Workplace Request were found'
                        }
                    />
                )
            )}
            {cancelledWorkplaces.data?.data &&
                cancelledWorkplaces.data?.data?.length > 7 && (
                    <div className="flex items-center justify-between py-7">
                        <PageSize
                            itemPerPage={itemPerPage}
                            setItemPerPage={setItemPerPage}
                            records={cancelledWorkplaces.data?.data?.length}
                        />
                        <Pagination
                            pagination={cancelledWorkplaces?.data?.pagination}
                            setPage={setPage}
                        />
                    </div>
                )}
        </div>
    )
}
