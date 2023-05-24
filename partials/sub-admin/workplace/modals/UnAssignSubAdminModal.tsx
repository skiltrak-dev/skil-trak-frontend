import { ActionModal, ShowErrorNotifications } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Student, SubAdmin } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { useChangeStatus } from '../hooks'
import { SubAdminApi } from '@queries'

export const UnAssignSubAdminModal = ({
    workplaceId,
    subadmin,
    onCancel,
    setChangeCoordinator,
}: {
    workplaceId: number
    subadmin: SubAdmin
    onCancel: Function
    setChangeCoordinator?: any
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()

    const [usAssignSubadmin, unAssignSubadminResult] =
        SubAdminApi.Workplace.useUsAssignSubAdminMutation()

    const onUnAssignSubadmin = () => {
        usAssignSubadmin(workplaceId)
    }

    useEffect(() => {
        if (unAssignSubadminResult.isSuccess) {
            notification.error({
                title: `SubAdmin Un Assigned`,
                description: `SubAdmin Un Assigned Successfully`,
            })
            onCancel()
            setChangeCoordinator(false)
        }
    }, [unAssignSubadminResult])

    return (
        <>
            <ShowErrorNotifications result={unAssignSubadminResult} />
            <ActionModal
                Icon={FaBan}
                variant="error"
                title="Are you sure!"
                description={`You are about to Un Assign <em>"${subadmin?.user?.name}"</em>. Do you wish to continue?`}
                onConfirm={onUnAssignSubadmin}
                onCancel={onCancel}
                input
                inputKey={subadmin?.user?.email}
                actionObject={subadmin}
                loading={unAssignSubadminResult.isLoading}
            />
        </>
    )
}
