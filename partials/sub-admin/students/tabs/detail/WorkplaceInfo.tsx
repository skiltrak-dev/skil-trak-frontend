import { EmptyData, LoadingAnimation, TechnicalError } from '@components'
// import { WorkplaceRequest } from '@partials/sub-admin/workplace/studentProvidedComponents'
import { WorkplaceRequest } from '@partials/sub-admin/workplace/components'
import { WorkplaceRequest as StudentProvidedWorkplace } from '@partials/sub-admin/workplace/studentProvidedComponents'
import { useGetSubAdminStudentWorkplaceDetailQuery } from '@queries'
import { useEffect } from 'react'

export const WorkplaceInfo = ({ studentId }: { studentId: number }) => {
    const studentWorkplace = useGetSubAdminStudentWorkplaceDetailQuery(
        studentId,
        {
            skip: !studentId,
        }
    )

    return (
        <div className="mt-8">
            {studentWorkplace.isError && <TechnicalError />}
            {studentWorkplace.isLoading && studentWorkplace.isFetching ? (
                <LoadingAnimation height={'h-96'} />
            ) : studentWorkplace?.data && studentWorkplace?.data.length > 0 ? (
                <div className="flex flex-col gap-y-4">
                    {studentWorkplace?.data?.map((workplace: any) => {
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
                !studentWorkplace.isError && (
                    <EmptyData
                        title={'No Workplace request yet'}
                        description={'No workplace request were found'}
                    />
                )
            )}
        </div>
    )
}
