import { LoadingAnimation, Typography } from '@components'
import { CommonApi } from '@queries'
import { AssessmentEvidenceDetailType, Folder, Student } from '@types'
import React, { useCallback } from 'react'
import { AgreementInitiate } from '../../../../../../sub-admin/assessmentEvidence/components/AgreementInitiate'
import { ViewInitiatedSign } from '../../../../../../sub-admin/assessmentEvidence/components/ViewInitiatedSign'
import { useWorkplace } from '@hooks'

export const InitiateSign = ({
    folder,
    student,
    courseId,
    eSignDocument,
}: {
    folder: AssessmentEvidenceDetailType | null
    student: Student
    eSignDocument: any
    courseId: number | undefined
}) => {
    const { workplaceRto } = useWorkplace()

    const getTemplate = CommonApi.ESign.useESignTemplateDetail(
        {
            folder: Number(folder?.id),
            userId: Number(workplaceRto?.user?.id),
        },
        {
            skip: !folder || !workplaceRto,
            refetchOnMountOrArgChange: 30,
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
                <ViewInitiatedSign
                    document={eSignDocument?.data}
                    courseId={Number(courseId)}
                    folder={folder}
                    rto={student?.rto}
                    onEsignRefetch={() => {
                        onEsignRefetch()
                    }}
                />
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
