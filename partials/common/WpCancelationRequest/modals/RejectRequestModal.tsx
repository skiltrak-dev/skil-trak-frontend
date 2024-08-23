import { ActionModal, ShowErrorNotifications } from '@components'
import { AdminApi } from '@queries'
import { IoWarningOutline } from 'react-icons/io5'
import { CancelationRequestEnum } from '../enum'
import { useNotification } from '@hooks'
import { FaBan } from 'react-icons/fa'

export const RejectRequestModal = ({
    onCancel,
    wpRequest,
}: {
    wpRequest: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()

    const [changeStatus, changeStatusResult] =
        AdminApi.Workplace.changeStatusCancelationReq()

    const onConfirmClicked = () => {
        changeStatus({
            id: wpRequest?.id,
            status: CancelationRequestEnum.Rejected,
        }).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `Request Rejected`,
                    description: `Request has been rejected successfully.`,
                })
                onCancel()
            }
        })
    }
    return (
        <>
            <ShowErrorNotifications result={changeStatusResult} />
            <ActionModal
                Icon={FaBan}
                variant="error"
                title="Are you sure!"
                description={`You are about to reject <em>"${wpRequest?.workplaceRequest?.student?.user?.name}"<em>. Do you wish to continue?`}
                onConfirm={onConfirmClicked}
                onCancel={onCancel}
                input
                inputKey={wpRequest?.user?.email}
                actionObject={wpRequest}
                loading={changeStatusResult.isLoading}
            />
        </>
    )
}
