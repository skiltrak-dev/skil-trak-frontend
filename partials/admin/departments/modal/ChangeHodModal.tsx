import React, { useEffect } from 'react'
import { AdminApi } from '@queries'
import { SubAdmin } from '@types'
import { useAlert, useNotification } from '@hooks'
import { ActionModal } from '@components'
import { FaUserShield } from 'react-icons/fa6'

export const ChangeHodModal = ({
    item,
    onCancel,
}: {
    item: any
    onCancel: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [toggleHod, toggleHodResult] = AdminApi.Department.useChangeHod()

    const onConfirmClicked = async (item: SubAdmin) => {
        await toggleHod(item?.id)
    }
    useEffect(() => {
        if (toggleHodResult.isSuccess) {
            alert.success({
                title: `Request change HOD`,
                description: `"${item?.subadmin?.user?.name}" has been changed from HOD.`,
            })
            onCancel()
        }
        if (toggleHodResult.isError) {
            notification.error({
                title: 'Request Mark As HOD',
                description: `Your request for change hod was failed`,
            })
        }
    }, [toggleHodResult])

    return (
        <ActionModal
            Icon={FaUserShield}
            variant="error"
            title="Are you sure!"
            description={`You are about to change HOD <em>"${item?.subadmin?.user?.name}"<em>. Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={item?.subadmin?.user?.email}
            actionObject={item}
            loading={toggleHodResult.isLoading}
        />
    )
}
