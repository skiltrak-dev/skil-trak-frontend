import React from 'react'

import { TechnicalError, LoadingAnimation, EmptyData } from '@components'
import { WorkplaceRequest } from './components'
import { WorkplaceRequest as StudentProvidedWorkplace } from './studentProvidedComponents'

// query
import { useGetSubAdminWorkplacesQuery } from '@queries'

export const AllWorkplaces = () => {
    const subAdminWorkplace = useGetSubAdminWorkplacesQuery()
    return (
        <div>
            {subAdminWorkplace.isError && <TechnicalError />}
            {subAdminWorkplace.isLoading && subAdminWorkplace.isFetching ? (
                <LoadingAnimation height={'h-96'} />
            ) : subAdminWorkplace.data && subAdminWorkplace.data.length > 0 ? (
                <div className="flex flex-col gap-y-4">
                    {subAdminWorkplace?.data?.map((workplace: any) => {
                        if (
                            workplace?.studentProvidedWorkplace ||
                            workplace?.byExistingAbn
                        ) {
                            return (
                                <StudentProvidedWorkplace
                                    key={workplace.id}
                                    workplace={workplace}
                                />
                            )
                        }
                        return (
                            <WorkplaceRequest
                                key={workplace.id}
                                workplace={workplace}
                            />
                        )
                    })}
                </div>
            ) : (
                !subAdminWorkplace.isError && (
                    <EmptyData
                        title={'No Workplace request yet'}
                        description={'No workplace request were found'}
                    />
                )
            )}
        </div>
    )
}
