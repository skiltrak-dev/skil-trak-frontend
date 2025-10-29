import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { RtoApi } from '@queries'
import { RtoApprovalWorkplaceRequest } from '@types'
import { MdCheck } from 'react-icons/md'
import { WpAppRequEnum } from '../enum'
import { HiCheckBadge } from 'react-icons/hi2'

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
                Icon={HiCheckBadge}
                variant="success"
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
