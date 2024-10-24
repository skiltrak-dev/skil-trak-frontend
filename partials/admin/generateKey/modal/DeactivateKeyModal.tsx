import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'

import { Rto } from '@types'
import { FaTrash } from 'react-icons/fa'

export const DeactivateKeyModal = ({
    keyData,
    onCancel,
}: {
    keyData: any
    onCancel: Function
}) => {
    console.log({ keykeykey: keyData })
    const { notification } = useNotification()
    const [deactivateKey, deactivateKeyResult] =
        AdminApi.GenerateKey.useDeactivateKey()

    const onConfirmUClicked = async (keyData: any) => {
        const res: any = await deactivateKey(keyData?.id)
        if (res?.data) {
            notification.success({
                title: 'API Deactivated',
                description: `API Deactivated Successfully`,
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={deactivateKeyResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to delete "<strong>${keyData?.user?.name}</strong>" Key. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={keyData?.user?.email}
                actionObject={keyData}
                loading={deactivateKeyResult.isLoading}
            />
        </>
    )
}
