import React from 'react'
import { SubAdminApi } from '@queries'
import { ActionModal, ShowErrorNotifications } from '@components'
import { IoWarningOutline } from 'react-icons/io5'
import { User } from '@types'
import { useNotification } from '@hooks'

export const MailPasswordModal = ({
    user,
    onCancel,
}: {
    user: User
    onCancel: () => void
}) => {
    const { notification } = useNotification()

    const [mailPassword, mailPasswordResult] =
        SubAdminApi.Student.useMailPassword()

    const onConfirmClicked = async (user: User) => {
        await mailPassword(user?.email).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: 'Password Sent',
                    description: 'Password Sent Successfully!',
                })
                onCancel()
            }
        })
    }
    return (
        <>
            <ShowErrorNotifications result={mailPasswordResult} />
            <ActionModal
                Icon={IoWarningOutline}
                variant="primary"
                title="Are you sure!"
                description={`You are about to send mail to student <em>"${user?.name}"<em>. Do you wish to continue?`}
                onConfirm={onConfirmClicked}
                onCancel={onCancel}
                input
                inputKey={user?.email}
                actionObject={user}
                loading={mailPasswordResult.isLoading}
            />
        </>
    )
}
