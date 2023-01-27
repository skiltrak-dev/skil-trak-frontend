// components
import {
    TechnicalError,
    LoadingAnimation,
    EmptyData,
    Pagination,
    PageSize,
} from '@components'

// queries
import { AdminApi } from '@queries'
import { AdminWorkplaceRequest } from './components'

export const AdminFilteredWorkplace = ({
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
        <div className="p-4">
            <div className="flex items-center justify-between">
                <PageSize
                    itemPerPage={itemPerPage}
                    setItemPerPage={setItemPerPage}
                />
                <Pagination
                    pagination={workplace?.data?.pagination}
                    setPage={setPage}
                />
            </div>
            {workplace.isError && <TechnicalError />}
            {workplace.isLoading && workplace.isFetching ? (
                <LoadingAnimation />
            ) : workplace.data?.data && workplace.data?.data?.length > 0 ? (
                <div className="flex flex-col gap-y-2">
                    {workplace?.data?.data?.map((workplace: any) => (
                        <AdminWorkplaceRequest
                            key={workplace?.id}
                            workplace={workplace}
                        />
                    ))}
                </div>
            ) : (
                !workplace.isError && (
                    <EmptyData
                        title={'No Search result'}
                        description={'No Search result were found'}
                    />
                )
            )}
        </div>
    )
}
