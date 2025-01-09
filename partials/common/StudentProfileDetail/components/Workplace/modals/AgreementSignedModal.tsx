import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { SubAdminApi } from '@queries'

import { FaTrash } from 'react-icons/fa'
import { HiCheckBadge } from 'react-icons/hi2'

export const AgreementSignedModal = ({
    workplaceId,
    onCancel,
}: {
    workplaceId: number
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [changeStatus, changeStatusResult] =
        SubAdminApi.Workplace.useChangeStatustoSigned()

    const onConfirmUClicked = async () => {
        await changeStatus(Number(workplaceId)).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `Status Changed`,
                    description: `Workplace Status changed Successfully.`,
                })
                onCancel()
            }
        })
    }

    return (
        <>
            <ShowErrorNotifications result={changeStatusResult} />
            <ActionModal
                Icon={HiCheckBadge}
                variant="success"
                title="Are you sure!"
                description={`You are about to change the workplace status to signed. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={String(workplaceId)}
                actionObject={workplaceId}
                loading={changeStatusResult.isLoading}
            />
        </>
    )
}
