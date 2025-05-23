import { AdminApi } from '@queries'
import { useNotification } from '@hooks'

import { HiCheckBadge } from 'react-icons/hi2'
import { ActionModal, ShowErrorNotifications } from '@components'

export const ToggleDuplicateModal = ({
    invoice,
    onCancel,
}: {
    invoice: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [duplicationToggle, duplicationToggleResult] =
        AdminApi.Invoice.markDuplicateToggle()

    const onConfirmUClicked = async () => {
        const res: any = await duplicationToggle(invoice?.id)

        if (res?.data) {
            notification.success({
                title: `Duplication Status Changed`,
                description: `Duplication Status Changed Successfully.`,
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={duplicationToggleResult} />
            <ActionModal
                Icon={HiCheckBadge}
                variant="success"
                title="Are you sure!"
                description={`You are about to change duplication status. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={''}
                actionObject={{}}
                loading={duplicationToggleResult.isLoading}
            />
        </>
    )
}
