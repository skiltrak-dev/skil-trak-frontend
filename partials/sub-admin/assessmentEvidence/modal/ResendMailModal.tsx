import { CommonApi } from '@queries'
import { useNotification } from '@hooks'
import { ActionModal, ShowErrorNotifications } from '@components'

import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'
import { EsignDocumentStatus } from '@utils'

export const ResendMailModal = ({
    onCancel,
    signerId,
    documentId,
}: {
    documentId: number
    signerId: number
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [resend, resendResult] = CommonApi.ESign.useResendEmailToUser()

    const onConfirmUClicked = async (eSign: any) => {
        await resend({
            documentId,
            userId: signerId,
        }).then((res: any) => {
            if (res?.data) {
                notification.error({
                    title: `Email Resent`,
                    description: `Email Sent to User!.`,
                })
                onCancel()
            }
        })
    }

    return (
        <>
            <ShowErrorNotifications result={resendResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to resend email to user. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={String(signerId)}
                actionObject={signerId}
                loading={resendResult.isLoading}
            />
        </>
    )
}
