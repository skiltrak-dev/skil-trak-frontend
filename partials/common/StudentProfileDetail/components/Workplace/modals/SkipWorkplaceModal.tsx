import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { SubAdminApi, useCancelWorkplaceStatusMutation } from '@queries'

import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const SkipWorkplaceModal = ({
    wpReqApproval,
    onCancel,
}: {
    wpReqApproval: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [skipWorkplace, skipWorkplaceResult] =
        SubAdminApi.Student.skipWorkplace()

    const onConfirmUClicked = async (id: number) => {
        const res: any = await skipWorkplace(
            wpReqApproval?.workplaceRequest?.id
        )

        if (res?.data) {
            notification.warning({
                title: `Workplace Industry Skipped`,
                description: `Workplace Industry Skipped Successfully!`,
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={skipWorkplaceResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to skip workplace. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={String(wpReqApproval?.id)}
                actionObject={wpReqApproval}
                loading={skipWorkplaceResult.isLoading}
            />
        </>
    )
}
