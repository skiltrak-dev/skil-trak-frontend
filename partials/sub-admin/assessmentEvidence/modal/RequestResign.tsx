import { CommonApi } from '@queries'
import { useNotification } from '@hooks'
import { ActionModal, ShowErrorNotifications } from '@components'

import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'
import { EsignDocumentStatus } from '@utils'

export const RequestResign = ({
    eSign,
    onCancel,
}: {
    eSign: any
    onCancel: Function
}) => {
    const { notification } = useNotification()
    const [requestResign, requestResignResult] =
        CommonApi.ESign.requestResignForESign()

    const onConfirmUClicked = async (eSign: any) => {
        await requestResign({
            document: eSign?.document,
            userId: eSign?.user?.id,
        })
    }

    useEffect(() => {
        if (requestResignResult.isSuccess) {
            notification.error({
                title: `Document Resigned Requested`,
                description: `Document "${eSign?.template?.name}" requested for resigned.`,
            })
            onCancel()
        }
    }, [requestResignResult])

    return (
        <>
            <ShowErrorNotifications result={requestResignResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to Request Resign "${eSign?.template?.name}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={eSign?.template?.name}
                actionObject={eSign}
                loading={requestResignResult.isLoading}
            />
        </>
    )
}
