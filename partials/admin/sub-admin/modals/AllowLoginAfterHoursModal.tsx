import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { SubAdmin } from '@types'
import { useEffect } from 'react'
import { MdAdminPanelSettings } from 'react-icons/md'

export const AllowLoginAfterHoursModal = ({
    subAdmin,
    onCancel,
}: {
    subAdmin: SubAdmin
    onCancel: Function
}) => {
    const { notification } = useNotification()
    const [canLogin, canLoginResult] = CommonApi.AllowLogin.useAllowAsLogin()
    const onConfirmClicked = async (subAdmin: SubAdmin) => {
        await canLogin(subAdmin?.user?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `subAdmin Allowed As Admin`,
                    description: `subAdmin "${
                        subAdmin?.user?.name
                    }" login access has been ${
                        subAdmin?.user?.after_hours_access
                            ? 'removed'
                            : 'provided'
                    }.`,
                })
                onCancel()
            }
        })
    }

    return (
        <>
            <ShowErrorNotifications result={canLoginResult} />
            <ActionModal
                Icon={MdAdminPanelSettings}
                variant="error"
                title="Are you sure!"
                description={`You are about to allow <em>"${subAdmin?.user?.name}"</em> as login. Do you wish to continue?`}
                onConfirm={onConfirmClicked}
                onCancel={onCancel}
                input
                inputKey={subAdmin?.user?.email}
                actionObject={subAdmin}
                loading={canLoginResult?.isLoading}
            />
        </>
    )
}
