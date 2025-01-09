import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'

import { FaTrash } from 'react-icons/fa'

export const SubmitDocModal = ({
    onCancel,
    signerUser,
    documentId,
    customFieldsData,
}: {
    signerUser: number
    documentId: number
    onCancel: () => void
    customFieldsData: any
}) => {
    const { notification } = useNotification()
    const [submitDoc, submitDocResult] = CommonApi.ESign.addCustomFieldData()

    const onConfirmUClicked = async (eSign: any) => {
        const res: any = await submitDoc({
            documentId,
            tabsResponse: customFieldsData
                ?.filter((data: any) => data?.isCustom && data?.fieldValue)
                ?.map((tab: any) => ({
                    tab: tab?.id,
                    data: tab?.fieldValue,
                })),
            userId: signerUser,
        })
        if (res?.data) {
            notification.success({
                title: `Document Submitted`,
                description: `Document Submitted Successfully!`,
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={submitDocResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to Submit Document. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={String(documentId)}
                actionObject={documentId}
                loading={submitDocResult.isLoading}
            />
        </>
    )
}
