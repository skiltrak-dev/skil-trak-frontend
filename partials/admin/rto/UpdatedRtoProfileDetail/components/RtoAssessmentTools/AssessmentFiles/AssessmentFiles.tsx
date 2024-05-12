import React, { useState } from 'react'
import { AdminApi } from '@queries'
import { AssessmentToolsType, Course, User } from '@types'
import { useContextBar } from '@hooks'
import {
    ActionButton,
    Button,
    LoadingAnimation,
    NoData,
    Typography,
} from '@components'
import { AddAssessmentToolCB } from '@partials/admin/rto/components/AddAssessmentToolCB'
import { useRouter } from 'next/router'
import { AssessmentFileCard } from './AssessmentFileCard'

enum AssessmentToolFileType {
    Approved = 'approved',
    Archived = 'archived',
}

export const AssessmentFiles = ({
    rtoUser,
    selectedCourse,
}: {
    rtoUser: User
    selectedCourse: Course
}) => {
    const [fileType, setFileType] = useState<AssessmentToolFileType>(
        AssessmentToolFileType.Approved
    )
    const contextBar = useContextBar()
    const router = useRouter()

    const getAssessmentTools = AdminApi.Rtos.useRtoAssessmentTools(
        {
            rto: Number(router?.query?.id),
            course: Number(selectedCourse?.id),
            status: fileType,
        },
        { skip: !selectedCourse || !router?.query?.id }
    )

    const onAddAssessment = () => {
        contextBar.setTitle('Add Assessment')
        contextBar.setContent(
            <AddAssessmentToolCB rtoUser={rtoUser} edit={false} />
        )
        contextBar.show(false)
    }

    return (
        <div className="h-full">
            <div className="px-5 py-4 border-b border-secondary-dark flex justify-between items-center">
                <div>
                    <Typography variant="small" medium>
                        {selectedCourse?.code}
                    </Typography>
                    <Typography variant="xxs">
                        {selectedCourse?.title}
                    </Typography>
                </div>
                <Button
                    text="Add Assessment"
                    variant="info"
                    onClick={() => {
                        onAddAssessment()
                    }}
                />
            </div>

            {/*  */}
            <div className="px-5 py-2 flex justify-between items-center">
                <Typography variant="label">Files</Typography>
                <ActionButton
                    variant={
                        fileType === AssessmentToolFileType.Approved
                            ? 'info'
                            : 'warning'
                    }
                    simple
                    onClick={() => {
                        setFileType((file: AssessmentToolFileType) =>
                            file === AssessmentToolFileType.Approved
                                ? AssessmentToolFileType.Archived
                                : AssessmentToolFileType.Approved
                        )
                    }}
                >
                    {fileType === AssessmentToolFileType.Approved
                        ? 'VIEW ARCHIVED'
                        : 'VIEW ACTIVE'}
                </ActionButton>
            </div>

            {/*  */}
            <div className="px-5 h-56">
                {getAssessmentTools?.isLoading ||
                getAssessmentTools?.isFetching ? (
                    <LoadingAnimation size={80} />
                ) : getAssessmentTools?.data &&
                  getAssessmentTools?.data?.length > 0 ? (
                    <div className="flex flex-col gap-y-3.5 h-full overflow-auto custom-scrollbar">
                        {getAssessmentTools?.data?.map(
                            (assessmentTool: AssessmentToolsType) => (
                                <AssessmentFileCard
                                    key={assessmentTool?.id}
                                    assessmentTool={assessmentTool}
                                    isArchived={
                                        fileType ===
                                        AssessmentToolFileType.Archived
                                    }
                                    rtoUser={rtoUser}
                                />
                            )
                        )}
                    </div>
                ) : (
                    <NoData text={'No Assessment tools were found'} />
                )}
            </div>
        </div>
    )
}
