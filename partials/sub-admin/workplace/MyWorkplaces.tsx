import { TechnicalError, LoadingAnimation, EmptyData } from '@components'
import { WorkplaceRequest } from './components'

// query
import { useGetMyStudentsWorkplacesQuery } from '@queries'

export const MyWorkplaces = () => {
    const subAdminWorkplace = useGetMyStudentsWorkplacesQuery()
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
                !subAdminWorkplace.isError && (
                    <EmptyData
                        title={'No Assigned Workplace'}
                        description={'You have not assigned any workplace'}
                    />
                )
            )}
        </div>
    )
}
