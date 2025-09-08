import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { SubAdminApi } from '@queries'

import { FaCheckCircle } from 'react-icons/fa'

export const WpConfirmCapacity = ({
    wpReqApproval,
    onCancel,
}: {
    wpReqApproval: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [confirmWpCapacity, confirmWpCapacityResult] =
        SubAdminApi.Student.confirmWpCapacity()

    const onConfirmUClicked = async (wpReqApproval: any) => {
        const res: any = await confirmWpCapacity(Number(wpReqApproval.id))
        if (res?.data) {
            notification.success({
                title: `Capacity Confirmed`,
                description: `Capacity Confirmed Successfully.`,
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={confirmWpCapacityResult} />
            <ActionModal
                Icon={FaCheckCircle}
                variant="success"
                title="Are you sure!"
                description={`You are about to confirm wp capacity. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={wpReqApproval.id}
                actionObject={wpReqApproval}
                loading={confirmWpCapacityResult.isLoading}
            />
        </>
    )
}
