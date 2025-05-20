import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { SubAdminApi } from '@queries'

import { RemovePartnerRequest } from '@types'
import { FaTrash } from 'react-icons/fa'
import { IndustryRequestRemovalStatus } from '../enum'

export const ApprovePartnerIndustryApprovalList = ({
    request,
    onCancel,
}: {
    onCancel: () => void
    request: RemovePartnerRequest
}) => {
    const { notification } = useNotification()
    const [changeStatus, changeStatusResult] =
        SubAdminApi.Industry.updatePartnerRemovalReq()

    const onConfirmUClicked = async () => {
        const res: any = await changeStatus({
            id: Number(request?.id),
            status: IndustryRequestRemovalStatus.APPROVED,
        })
        if (res?.data) {
            notification.success({
                title: 'Approval Status Changed',
                description: 'Approval Status Changed Successfully!',
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={changeStatusResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to change Status "${request?.industry?.user?.name}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={request?.industry?.user?.name}
                actionObject={request?.industry}
                loading={changeStatusResult.isLoading}
            />
        </>
    )
}
