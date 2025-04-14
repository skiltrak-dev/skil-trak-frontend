import { AdminApi } from '@queries'
import { useNotification } from '@hooks'

import { HiCheckBadge } from 'react-icons/hi2'
import { ActionModal, ShowErrorNotifications } from '@components'

export const ConfirmAllPaymentModal = ({
    ids,
    onCancel,
}: {
    ids: number[]
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [confirmPayment, confirmPaymentResult] =
        AdminApi.Invoice.confirmAllPayment()

    const onConfirmUClicked = async () => {
        const res: any = await confirmPayment({
            ids,
        })

        if (res?.data) {
            notification.success({
                title: `Payment Confirmed`,
                description: `Payment Confirmed Successfully.`,
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={confirmPaymentResult} />
            <ActionModal
                Icon={HiCheckBadge}
                variant="success"
                title="Are you sure!"
                description={`You are about to confirm all. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={''}
                actionObject={{}}
                loading={confirmPaymentResult.isLoading}
            />
        </>
    )
}
