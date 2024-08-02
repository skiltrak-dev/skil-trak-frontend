import { SubAdmin } from '@types'
import { AdminApi } from '@queries'
import { useNotification } from '@hooks'
import { MdAdminPanelSettings } from 'react-icons/md'
import { ActionModal, ShowErrorNotifications } from '@components'

export const AllowPlacementModal = ({
    subAdmin,
    onCancel,
}: {
    subAdmin: SubAdmin
    onCancel: Function
}) => {
    const { notification } = useNotification()
    const [allowPlacement, allowPlacementResult] =
        AdminApi.SubAdmins.useToggleSubadminPlacement()

    const onConfirmClicked = async (subAdmin: SubAdmin) => {
        await allowPlacement(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: subAdmin?.removeOnPlacementStart
                        ? `subAdmin Placement Removed`
                        : 'subAdmin Placement Accessed',
                    description: subAdmin?.removeOnPlacementStart
                        ? `subAdmin Placement Removed`
                        : 'subAdmin Placement Accessed',
                })
                onCancel()
            }
        })
    }

    return (
        <>
            <ShowErrorNotifications result={allowPlacementResult} />
            <ActionModal
                Icon={MdAdminPanelSettings}
                variant="error"
                title="Are you sure!"
                description={`You are about to allow <em>"${subAdmin?.user?.name}"</em> as Placement. Do you wish to continue?`}
                onConfirm={onConfirmClicked}
                onCancel={onCancel}
                input
                inputKey={subAdmin?.user?.email}
                actionObject={subAdmin}
                loading={allowPlacementResult?.isLoading}
            />
        </>
    )
}
