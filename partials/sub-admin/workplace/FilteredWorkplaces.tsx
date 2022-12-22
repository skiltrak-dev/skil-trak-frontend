import React from 'react'

import { TechnicalError, LoadingAnimation, EmptyData } from '@components'
import { WorkplaceRequest } from './components'
import { WorkplaceRequest as StudentProvidedWorkplace } from './studentProvidedComponents'

export const FilteredWorkplaces = ({ workplace }: { workplace: any }) => {
    return (
        <div className="mt-5">
            {workplace.data && workplace.data?.data?.length > 0 ? (
                <div className="flex flex-col gap-y-4">
                    {workplace?.data?.data?.map((workplace: any) => {
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
                !workplace.isError && <EmptyData />
            )}
        </div>
    )
}
