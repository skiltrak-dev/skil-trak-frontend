import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { SubAdminApi } from '@queries'

import { FaEnvelope } from 'react-icons/fa'

export const WpConfirmCapacityThroughtEmailModal = ({
    wpReqApproval,
    onCancel,
    courseId,
}: {
    courseId: number
    wpReqApproval: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [confirmCapacityViaEmail, confirmCapacityViaEmailResult] =
        SubAdminApi.Student.confirmCapacityViaEmail()

    const onConfirmUClicked = async (wpReqApproval: any) => {
        const res: any = await confirmCapacityViaEmail({
            courseId,
            wpApprovalId: Number(wpReqApproval.id),
        })
        if (res?.data) {
            notification.success({
                title: `Capacity Email Sent`,
                description: `Capacity Email Sent Successfully.`,
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={confirmCapacityViaEmailResult} />
            <ActionModal
                Icon={FaEnvelope}
                variant="success"
                title="Are you sure!"
                description={`You are about to send email to industry to confirm the capacity. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={wpReqApproval.id}
                actionObject={wpReqApproval}
                loading={confirmCapacityViaEmailResult.isLoading}
            />
        </>
    )
}
