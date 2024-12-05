import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'

import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteInsuranceTypeModal = ({
    onCancel,
    insuranceType,
}: {
    insuranceType: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [remove, removeResult] = AdminApi.Insurance.removeInsuranceType()

    const onConfirmUClicked = async (type: any) => {
        const res: any = await remove(Number(type?.id))

        if (res?.data) {
            notification.error({
                title: `Insurance Type Deleted`,
                description: `Insurance Type "${type?.title}" has been deleted.`,
            })
            onCancel()
        }
    }

    useEffect(() => {}, [removeResult])

    return (
        <>
            <ShowErrorNotifications result={removeResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to delete "${insuranceType?.title}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={insuranceType?.title}
                actionObject={insuranceType}
                loading={removeResult.isLoading}
            />
        </>
    )
}
