import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'

import { FaTrash } from 'react-icons/fa'

export const DeleteIndustryCheckModal = ({
    industryCheck,
    onCancel,
}: {
    industryCheck: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [remove, removeResult] = AdminApi.IndustryChecks.removeIndustryCheck()

    const onConfirmClicked = async (industryCheck: any) => {
        const res: any = await remove(industryCheck?.id)
        if (res?.data) {
            notification.error({
                title: `Industry Check Deleted`,
                description: `Industry check "${industryCheck?.name}" has been deleted.`,
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
                description={`You are about to delete "${industryCheck?.name}". Do you wish to continue?`}
                onConfirm={onConfirmClicked}
                onCancel={onCancel}
                input
                inputKey={industryCheck?.name}
                actionObject={industryCheck}
                loading={removeResult.isLoading}
            />
        </>
    )
}
