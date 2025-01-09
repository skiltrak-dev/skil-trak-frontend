import { ActionModal, ShowErrorNotifications } from '@components'
import { useAlert, useNotification } from '@hooks'
import { adminApi } from '@queries'

import { AppointmentType, Rto, Sector } from '@types'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const FaqDeleteModal = ({
    faq,
    onCancel,
    removeField,
    index,
}: {
    faq: any
    removeField?: any
    index?: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [remove, removeResult] = adminApi.useRemoveFaqMutation()

    const onConfirmUClicked = async (faq: any) => {
        await removeField(index)
        await remove(Number(faq.id))
    }

    useEffect(() => {
        if (removeResult.isSuccess) {
            notification.error({
                title: `FAQ Deleted`,
                description: `FAQ ${faq?.question} has been deleted.`,
            })
            onCancel()
        }
    }, [removeResult])

    return (
        <>
            <ShowErrorNotifications result={removeResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to delete ${faq?.question}. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={faq?.question}
                actionObject={faq}
                loading={removeResult.isLoading}
            />
        </>
    )
}
