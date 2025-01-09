import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { SubAdminApi } from '@queries'

import { Industry, Student } from '@types'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const RemoveWorkplaceAppliedIndustryModal = ({
    industry,
    onCancel,
    studentId,
}: {
    industry: any
    studentId: number
    onCancel: () => void
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [remove, removeResult] =
        SubAdminApi.Workplace.removeAppliedIndustryFromWorkplace()

    const onConfirmUClicked = async (industry: any) => {
        await remove({ workplaceIndustryId: industry?.id, studentId })
    }

    useEffect(() => {
        if (removeResult.isSuccess) {
            alert.error({
                title: `Student Deleted`,
                description: `Student "${industry?.industry?.user?.name}" has been deleted.`,
            })
            onCancel()
        }
        if (removeResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for deleting Student was failed`,
            })
        }
    }, [removeResult])

    return (
        <ActionModal
            Icon={FaTrash}
            variant="error"
            title="Are you sure!"
            description={`You are about to delete "${industry?.industry?.user?.name}". Do you wish to continue?`}
            onConfirm={onConfirmUClicked}
            onCancel={onCancel}
            input
            inputKey={industry?.industry?.user?.email}
            actionObject={industry}
            loading={removeResult.isLoading}
        />
    )
}
