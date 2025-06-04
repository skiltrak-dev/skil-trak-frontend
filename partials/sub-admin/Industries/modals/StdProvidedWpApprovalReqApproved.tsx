import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { SubAdminApi } from '@queries'

import { StudentProvidedWpAppRequest, UserStatus } from '@types'
import { FaTrash } from 'react-icons/fa'

export const StdProvidedWpApprovalReqApproved = ({
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
            status: UserStatus.Approved,
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
                input
                Icon={FaTrash}
                variant="error"
                onCancel={onCancel}
                title="Are you sure!"
                onConfirm={onConfirmUClicked}
                actionObject={request?.student}
                loading={changeStatusResult.isLoading}
                inputKey={request?.student?.user?.name}
                description={`You are about to change Status <b>"${request?.industry?.user?.name}"</b>. Do you wish to continue?`}
            />
        </>
    )
}
