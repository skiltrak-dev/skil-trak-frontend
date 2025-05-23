import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { RtoApi } from '@queries'
import { FaTrash } from 'react-icons/fa'
import { WpAppRequEnum } from '../enum'
import { RtoApprovalWorkplaceRequest } from '@types'

export const ApproveWpApprovalRequest = ({
    wpAppReq,
    onCancel,
}: {
    wpAppReq: RtoApprovalWorkplaceRequest
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [changeStatus, changeStatusResult] =
        RtoApi.Workplace.wpAppReqChangeStatus()

    const onConfirmUClicked = async () => {
        const res: any = await changeStatus({
            id: Number(wpAppReq?.id),
            status: WpAppRequEnum.APPROVED,
        })

        if (res?.data) {
            notification.success({
                title: 'Status Changed',
                description: 'Status Changed Successfully!',
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={changeStatusResult} />
            <ActionModal
                input
                Icon={FaTrash}
                variant="error"
                onCancel={onCancel}
                title="Are you sure!"
                actionObject={wpAppReq}
                inputKey={wpAppReq?.industry?.user?.name}
                onConfirm={onConfirmUClicked}
                loading={changeStatusResult.isLoading}
                description={`You are about to approve "${wpAppReq?.industry?.user?.name}". Do you wish to continue?`}
            />
        </>
    )
}
