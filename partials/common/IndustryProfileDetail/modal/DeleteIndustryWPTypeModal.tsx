import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'

import { FaTrash } from 'react-icons/fa'

export const DeleteIndustryWPTypeModal = ({
    onCancel,
    industryUserId,
}: {
    onCancel: () => void
    industryUserId: number
}) => {
    const { notification } = useNotification()

    const [remove, removeResult] = CommonApi.Industries.removeIndustryWPType()

    const onConfirmUClicked = async (industryUserId: number) => {
        const res: any = await remove(industryUserId)

        if (res?.data) {
            notification.error({
                title: `Wp Type Deleted`,
                description: `Wp Type has been deleted.`,
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={removeResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to delete Industry Type. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                actionObject={industryUserId}
                loading={removeResult.isLoading}
            />
        </>
    )
}
