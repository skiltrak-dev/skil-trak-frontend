import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { SubAdminApi } from '@queries'

import { StudentProvidedWpAppRequest, UserStatus } from '@types'
import { FaTrash } from 'react-icons/fa'

export const StdProvidedWpApprovalReqRejected = ({
    request,
    onCancel,
}: {
    onCancel: () => void
    request: StudentProvidedWpAppRequest
}) => {
    const { notification } = useNotification()
    const [changeStatus, changeStatusResult] =
        SubAdminApi.Industry.changeWPProvidedStatus()

    const onConfirmUClicked = async () => {
        const res: any = await changeStatus({
            id: Number(request?.id),
            status: UserStatus.Rejected,
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
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to change Status <b>"${request?.industry?.user?.name}"</b>. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                actionObject={request?.student}
                inputKey={request?.student?.user?.name}
                loading={changeStatusResult.isLoading}
            />
        </>
    )
}
