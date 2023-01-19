// components
import { TechnicalError, LoadingAnimation, EmptyData } from '@components'

// queries
import { AdminApi } from '@queries'
import { AdminWorkplaceRequest } from './components'

export const AllStudentProvidedWorkplace = () => {
    const subAdminWorkplace = AdminApi.Workplace.useStudentProvidedWorkplace()
    return (
        <div className="p-4">
            {subAdminWorkplace.isError && <TechnicalError />}
            {subAdminWorkplace.isLoading && subAdminWorkplace.isFetching ? (
                <LoadingAnimation />
            ) : subAdminWorkplace.data && subAdminWorkplace.data.length > 0 ? (
                <div className="flex flex-col gap-y-2">
                    {subAdminWorkplace?.data?.map((workplace: any) => (
                        <AdminWorkplaceRequest
                            key={workplace?.id}
                            workplace={workplace}
                        />
                    ))}
                </div>
            ) : (
                !subAdminWorkplace.isError && (
                    <EmptyData
                        title={'No Provided Workplace Request'}
                        description={'No Provided Workplace Request were found'}
                    />
                )
            )}
        </div>
    )
}
