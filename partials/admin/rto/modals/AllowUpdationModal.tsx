import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { Rto } from '@types'
import { HiCheckBadge } from 'react-icons/hi2'

export const AllowUpdationModal = ({
    rto,
    onCancel,
}: {
    rto: Rto | undefined | null
    onCancel: Function
}) => {
    const { notification } = useNotification()
    const [allowUpdation, allowUpdationResult] =
        AdminApi.Rtos.useAllowUpdation()

    const onConfirmUClicked = async (rto: Rto) => {
        allowUpdation(rto?.id).then((res: any) => {
            if (res?.data) {
                rto?.allowUpdate
                    ? notification.message({
                          title: `Revoked`,
                          description: `Revoked permission to update the timestamp.`,
                      })
                    : notification.success({
                          title: 'Granted',
                          description:
                              'Granted permission to update the timestamp.',
                      })
                onCancel()
            }
        })
    }

    return (
        <>
            <ShowErrorNotifications result={allowUpdationResult} />
            <ActionModal
                Icon={HiCheckBadge}
                variant="success"
                title="Are you sure!"
                description={`You are about to allow updation <em>"${rto?.user?.name}"<em>. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={rto?.user?.email}
                actionObject={rto}
                loading={allowUpdationResult.isLoading}
            />
        </>
    )
}
