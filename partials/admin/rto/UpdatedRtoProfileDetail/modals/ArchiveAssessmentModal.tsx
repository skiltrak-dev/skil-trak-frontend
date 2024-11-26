import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { AdminApi, useRemoveJobMutation } from '@queries'

import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'
import { IoIosWarning } from 'react-icons/io'

export const ArchiveAssessmentModal = ({
    onCancel,
    assessment,
}: {
    assessment: any
    onCancel: Function
}) => {
    const { notification } = useNotification()
    const [archiveAssessmentTool, archiveAssessmentToolResult] =
        AdminApi.Rtos.useArchiveAssessmentTools()

    const onConfirmUClicked = async (assessment: any) => {
        const res: any = await archiveAssessmentTool(Number(assessment?.id))
        if (res?.data) {
            notification.warning({
                title: `Assessmnet Archived`,
                description: `Assessmnet "${assessment?.title}" has been ${
                    assessment?.status === 'archived'
                        ? 'Un-Archived'
                        : 'Archived'
                }.`,
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={archiveAssessmentToolResult} />
            <ActionModal
                Icon={IoIosWarning}
                variant="primary"
                title="Are you sure!"
                description={`You are about to ${
                    assessment?.status === 'archived'
                        ? 'Un-Archived'
                        : 'Archived'
                } "${assessment?.title}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={assessment?.title}
                actionObject={assessment}
                loading={archiveAssessmentToolResult.isLoading}
            />
        </>
    )
}
