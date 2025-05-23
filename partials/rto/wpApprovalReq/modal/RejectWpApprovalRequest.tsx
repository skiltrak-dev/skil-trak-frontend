import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { RtoApi } from '@queries'
import { RtoApprovalWorkplaceRequest } from '@types'
import { FaTrash } from 'react-icons/fa'
import { WpAppRequEnum } from '../enum'

export const RejectWpApprovalRequest = ({
    wpAppReq,
    onCancel,
}: {
    wpAppReq: RtoApprovalWorkplaceRequest
    onCancel: () => void
}) => {
    const { notification } = useNotification()

    const [changeStatus, changeStatusResult] =
        RtoApi.Workplace.wpAppReqChangeStatus()

    const onConfirmUClicked = async (job: any) => {
        const res: any = await changeStatus({
            id: Number(wpAppReq?.id),
            status: WpAppRequEnum.REJECTED,
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
                description={`if you block this industry ${wpAppReq?.industry?.user?.name}, remember none of your student will be assigned to this industry in future against this particular sector. Do you wish to continue?`}
            />
        </>
    )
}
