import React from 'react'

import { TechnicalError, LoadingAnimation, EmptyData } from '@components'
import { WorkplaceRequest } from './components'

// query
import { useGetSubAdminWorkplacesQuery } from '@queries'

export const AllWorkplaces = () => {
    const subAdminWorkplace = useGetSubAdminWorkplacesQuery()
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
