import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { SubAdminApi } from '@queries'

import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const RemoveIndustryModal = ({
    industry,
    onCancel,
    studentId,
}: {
    industry: any
    studentId: number
    onCancel: Function
}) => {
    const { notification } = useNotification()
    const [remove, removeResult] =
        SubAdminApi.Workplace.removeAppliedIndustryFromWorkplace()

    const onConfirmUClicked = async (industry: any) => {
        const res: any = await remove({
            workplaceIndustryId: industry?.id,
            studentId,
        })

        if (res?.data) {
            notification.error({
                title: `Student Deleted`,
                description: `Student "${industry?.industry?.user?.name}" has been deleted.`,
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
                description={`You are about to delete "${industry?.industry?.user?.name}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={industry?.industry?.user?.email}
                actionObject={industry}
                loading={removeResult.isLoading}
            />
        </>
    )
}
