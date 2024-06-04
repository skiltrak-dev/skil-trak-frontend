import { LoadingAnimation, Typography } from '@components'
import { CommonApi } from '@queries'
import { AssessmentEvidenceFolder, Folder, Student } from '@types'
import React, { useCallback } from 'react'
import { AgreementInitiate } from './AgreementInitiate'

export const InitiateSign = ({
    folder,
    student,
    courseId,
    eSignDocument,
}: {
    folder: AssessmentEvidenceFolder
    student: Student
    eSignDocument: any
    courseId: number | undefined
}) => {
    const getTemplate = CommonApi.ESign.useESignTemplateDetail(
        {
            folder: Number(folder?.id),
            userId: student?.rto?.user?.id,
        },
        {
            skip: !folder || !student,
            refetchOnMountOrArgChange: true,
        }
    )

    const onEsignRefetch = useCallback(() => {
        eSignDocument.refetch()
    }, [])

    return (
        <div>
            {getTemplate.isLoading || eSignDocument.isLoading ? (
                <div className="flex flex-col justify-center items-center gap-y-2">
                    <LoadingAnimation size={50} />
                    <Typography variant="label">
                        Assessment Files Loading
                    </Typography>
                </div>
            ) : eSignDocument?.data && eSignDocument?.data?.length > 0 ? (
                <div className="bg-success-light px-4 py-1.5 rounded">
                    <Typography variant="label">Sign Initiated</Typography>
                </div>
            ) : getTemplate.isSuccess &&
              getTemplate?.data &&
              getTemplate?.data?.length > 0 ? (
                <AgreementInitiate
                    courseId={courseId}
                    folder={folder}
                    onEsignRefetch={() => {
                        onEsignRefetch()
                    }}
                    rto={student?.rto}
                />
            ) : null}
        </div>
    )
}
