import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { Rto } from '@types'
import { HiCheckBadge } from 'react-icons/hi2'
import { IoWarningOutline } from 'react-icons/io5'

export const ReleaseLogbookPermissionModal = ({
    rto,
    onCancel,
}: {
    rto: Rto
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [releaseLogbook, releaseLogbookResult] =
        AdminApi.Rtos.autoReleaseLogbook()

    const onConfirmClicked = async (item: Rto) => {
        const res: any = await releaseLogbook(item?.id)
        if (res?.data) {
            notification.success({
                title: `Release Logbook Status Changed`,
                description: `Release Logbook Status Changed Successfully`,
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={releaseLogbookResult} />
            <ActionModal
                Icon={HiCheckBadge}
                variant="success"
                title="Are you sure!"
                description={`You are about to change release loogbook status for <em>"${rto?.user?.name}"<em>. Do you wish to continue?`}
                onConfirm={onConfirmClicked}
                onCancel={onCancel}
                input
                inputKey={rto?.user?.email}
                actionObject={rto}
                loading={releaseLogbookResult.isLoading}
            />
        </>
    )
}
