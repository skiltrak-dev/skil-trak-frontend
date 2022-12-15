import { TechnicalError, LoadingAnimation, EmptyData } from '@components'
import { WorkplaceRequest } from './studentProvidedComponents'

// query
import { useGetAddedByStudentsWorkplacesQuery } from '@queries'

export const StudentAddedWorkplaces = () => {
    const subAdminWorkplace = useGetAddedByStudentsWorkplacesQuery()
    return (
        <div>
            {subAdminWorkplace.isError && <TechnicalError />}
            {subAdminWorkplace.isLoading && subAdminWorkplace.isFetching ? (
                <LoadingAnimation />
            ) : subAdminWorkplace.data && subAdminWorkplace.data.length > 0 ? (
                <div className="flex flex-col gap-y-4">
                    {subAdminWorkplace?.data?.map((workplace: any) => (
                        <WorkplaceRequest
                            key={workplace.id}
                            workplace={workplace}
                        />
                    ))}
                </div>
            ) : (
                !subAdminWorkplace.isError && <EmptyData />
            )}
        </div>
    )
}
