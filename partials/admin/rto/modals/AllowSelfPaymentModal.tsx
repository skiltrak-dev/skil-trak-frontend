import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { Rto } from '@types'
import { MdAdminPanelSettings, MdIncompleteCircle } from 'react-icons/md'

export const AllowSelfPaymentModal = ({
    rto,
    onCancel,
}: {
    rto: Rto
    onCancel: () => void
}) => {
    const { notification } = useNotification()

    const [allowAutoUpdate, allowAutoUpdateResult] =
        AdminApi.Rtos.useAllowSelfPayment()

    const onConfirmClicked = async (rto: Rto) => {
        await allowAutoUpdate(rto?.id).then((res: any) => {
            if (res?.data) {
                notification?.[rto?.allowStudentSelfPayment ? 'error' : 'success']({
                    title: rto?.allowStudentSelfPayment
                        ? 'Removed Self Payment'
                        : `Allowed Self Payment`,
                    description: rto?.allowStudentSelfPayment
                        ? 'Removed Self Payment'
                        : `Allowed Self Payment`,
                })
                onCancel()
            }
        })
    }

    return (
        <>
            <ShowErrorNotifications result={allowAutoUpdateResult} />
            <ActionModal
                Icon={MdIncompleteCircle}
                variant="success"
                title="Are you sure!"
                description={`You are about to ${
                    rto?.allowStudentSelfPayment ? 'remove' : 'allow'
                } <em>"${
                    rto?.user?.name
                }"</em> self payment. Do you wish to continue?`}
                onConfirm={onConfirmClicked}
                onCancel={onCancel}
                input
                inputKey={rto?.user?.email}
                actionObject={rto}
                loading={allowAutoUpdateResult?.isLoading}
            />
        </>
    )
}
