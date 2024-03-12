import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { useEffect } from 'react'
import { MdDelete } from 'react-icons/md'

import { AdminApi } from '@queries'

export const DeleteProfileModal = ({
    profile,
    onCancel,
}: {
    profile: any
    onCancel: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [onChangeStatus, changeStatusResult] =
        AdminApi.TalentPool.useDeleteTalentPoolProfile()

    const onConfirmClicked = async (profile: any) => {
        await onChangeStatus(profile?.id)
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.error({
                title: `profile Delete`,
                description: `profile ${profile?.student?.user?.name} has been deleted.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for deleting profile was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={MdDelete}
            variant="error"
            title="Are you sure!"
            description={`You are about to delete <em>"${profile?.student?.user?.name}"</em>. Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={profile?.student?.user?.email}
            actionObject={profile}
            loading={changeStatusResult.isLoading}
        />
    )
}
