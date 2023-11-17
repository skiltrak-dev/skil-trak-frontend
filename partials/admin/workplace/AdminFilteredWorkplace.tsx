// components
import {
    EmptyData,
    LoadingAnimation,
    PageSize,
    Pagination,
    TechnicalError,
} from '@components'
import { PageHeading } from '@components/headings'

// queries
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
            <PageHeading
                title={'Filtered Workplaces'}
                subtitle={'List of Filtered Workplaces'}
            />
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
            {workplace.data?.data?.length > 7 && (
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
