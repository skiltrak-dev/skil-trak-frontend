import { SubAdmin } from '@types'
import { AdminApi } from '@queries'
import { useNotification } from '@hooks'
import { MdAdminPanelSettings } from 'react-icons/md'
import { ActionModal, ShowErrorNotifications } from '@components'

export const AllowCancelationWPModal = ({
    subAdmin,
    onCancel,
}: {
    subAdmin: SubAdmin
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [allowWpCancelationReq, allowWpCancelationReqResult] =
        AdminApi.SubAdmins.toggleWPCancelationReq()

    const onConfirmClicked = async (subAdmin: SubAdmin) => {
        await allowWpCancelationReq(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: subAdmin?.canCancelWorkPlaceRequest
                        ? `SubAdmin Wp Cancelation Removed`
                        : 'SubAdmin Wp Cancelation Accessed',
                    description: subAdmin?.canCancelWorkPlaceRequest
                        ? `SubAdmin Cancelation Removed`
                        : 'SubAdmin Cancelation Accessed',
                })
                onCancel()
            }
        })
    }

    return (
        <>
            <ShowErrorNotifications result={allowWpCancelationReqResult} />
            <ActionModal
                Icon={MdAdminPanelSettings}
                variant="error"
                title="Are you sure!"
                description={`You are about to ${
                    subAdmin?.canCancelWorkPlaceRequest ? 'remove' : 'allow'
                } <em>"${
                    subAdmin?.user?.name
                }"</em> as Wp Cancelation. Do you wish to continue?`}
                onConfirm={onConfirmClicked}
                onCancel={onCancel}
                input
                inputKey={subAdmin?.user?.email}
                actionObject={subAdmin}
                loading={allowWpCancelationReqResult?.isLoading}
            />
        </>
    )
}
