import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { WorkplaceType, WorkplaceTypes } from '@types'

import { FaTrash } from 'react-icons/fa'

export const DeleteRtoWpTypeModal = ({
    wpType,
    onCancel,
}: {
    onCancel: () => void
    wpType: WorkplaceTypes
}) => {
    const { notification } = useNotification()
    const [remove, removeResult] = CommonApi.Rtos.removeRtoWpType()

    const onConfirmUClicked = async (wpType: WorkplaceTypes) => {
        const res: any = await remove(Number(wpType?.id))

        if (res?.data) {
            notification.error({
                title: `Workplace Type Removed`,
                description: `Workplace Type  "${wpType?.workplaceType?.name}" has been Removed.`,
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
                description={`You are about to delete "${wpType?.workplaceType?.name}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={wpType?.workplaceType?.name}
                actionObject={wpType}
                loading={removeResult.isLoading}
            />
        </>
    )
}
