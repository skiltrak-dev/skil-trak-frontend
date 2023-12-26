import { SubAdminApi } from '@queries'
import { useNotification } from '@hooks'
import { ActionModal, ShowErrorNotifications } from '@components'

import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'
import { EsignDocumentStatus } from '@utils'

export const CancelInitiateSign = ({
    eSign,
    onCancel,
}: {
    eSign: any
    onCancel: Function
}) => {
    const { notification } = useNotification()
    const [cancel, cancelResult] = SubAdminApi.eSign.useCancelESign()

    const onConfirmUClicked = async (eSign: any) => {
        await cancel({
            id: Number(eSign?.id),
            status: EsignDocumentStatus.CANCELLED,
        })
    }

    useEffect(() => {
        if (cancelResult.isSuccess) {
            notification.error({
                title: `Document Cancelled`,
                description: `Document "${eSign?.template?.name}" has been cancelled.`,
            })
            onCancel()
        }
    }, [cancelResult])

    return (
        <>
            <ShowErrorNotifications result={cancelResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to Cancel "${eSign?.template?.name}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={eSign?.template?.name}
                actionObject={eSign}
                loading={cancelResult.isLoading}
            />
        </>
    )
}
