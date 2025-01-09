import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { SubAdmin } from '@types'
import { useEffect } from 'react'
import { MdOutlineAssignmentReturn } from 'react-icons/md'

export const AssignAutoWorkplaceModal = ({
    subAdmin,
    onCancel,
}: {
    subAdmin: SubAdmin
    onCancel: () => void
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    // const { onBlock, changeStatusResult } = useChangeStatus()
    const [autoAssignWorkplace, resultAutoAssignWorkplace] =
        AdminApi.SubAdmins.useToggleAutoAssignWorkplace()
    const onConfirmClicked = async (subAdmin: SubAdmin) => {
        await autoAssignWorkplace(subAdmin?.id)
    }

    useEffect(() => {
        if (resultAutoAssignWorkplace?.isSuccess) {
            alert.error({
                title: `subAdmin Allowed to Auto Assign Workplace`,
                description: `subAdmin "${subAdmin?.user?.name}" has been Allowed to Auto Assign Workplace`,
            })
            onCancel()
        }
        if (resultAutoAssignWorkplace?.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for allowing subAdmin to Auto Assign Workplace was failed`,
            })
        }
    }, [resultAutoAssignWorkplace])

    return (
        <ActionModal
            Icon={MdOutlineAssignmentReturn}
            variant="error"
            title="Are you sure!"
            description={`You are about to allow <em>"${subAdmin?.user?.name}"</em> to Auto Assign Workplace. Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={subAdmin?.user?.email}
            actionObject={subAdmin}
            loading={resultAutoAssignWorkplace?.isLoading}
        />
    )
}
