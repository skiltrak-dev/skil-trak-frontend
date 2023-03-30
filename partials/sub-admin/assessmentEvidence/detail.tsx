import { Button, PageTitle } from '@components'
import React, { useState } from 'react'
import { ActiveAssessmentDetail } from './ActiveAssessmentDetail'
import { ArchivedAssessmentDetail } from './ArchivedAssessmentDetail'

export const Detail = ({
    studentId,
    studentUserId,
}: {
    studentId: string | string[] | undefined
    studentUserId: string | string[] | undefined
}) => {
    const [isArchivedView, setIsArchivedView] = useState<boolean>(false)

    return (
        <div>
            <div className="flex justify-between items-center">
                <PageTitle
                    title="Assessment Evidence Detail"
                    backTitle="Assessment"
                />
                <Button
                    variant={isArchivedView ? 'primary' : 'info'}
                    text={
                        isArchivedView
                            ? 'View Active Assessment'
                            : 'View Archive Assessment'
                    }
                    onClick={() => {
                        setIsArchivedView(!isArchivedView)
                    }}
                />
            </div>

            {isArchivedView ? (
                <ArchivedAssessmentDetail
                    studentId={studentId}
                    studentUserId={studentUserId}
                />
            ) : (
                <ActiveAssessmentDetail
                    studentId={studentId}
                    studentUserId={studentUserId}
                />
            )}
        </div>
    )
}
