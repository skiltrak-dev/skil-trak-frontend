import { AdminApi } from '@queries'
import { useNotification } from '@hooks'

import { HiCheckBadge } from 'react-icons/hi2'
import { ActionModal, ShowErrorNotifications } from '@components'

export const ConfirmPaymentModal = ({
    invoice,
    onCancel,
}: {
    invoice: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [confirmPayment, confirmPaymentResult] =
        AdminApi.Invoice.confirmPayment()

    const onConfirmUClicked = async (invoice: any) => {
        const res: any = await confirmPayment(Number(invoice?.id))

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
                description={`You are about to confirm "${invoice?.student?.user?.name}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={invoice?.title}
                actionObject={invoice}
                loading={confirmPaymentResult.isLoading}
            />
        </>
    )
}
