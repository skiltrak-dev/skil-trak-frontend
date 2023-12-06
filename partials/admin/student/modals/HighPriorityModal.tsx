import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Student } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { useChangeStatus } from '../hooks'
import { CommonApi } from '@queries'
import { MdPriorityHigh } from 'react-icons/md'

export const HighPriorityModal = ({
    item,
    onCancel,
    setRefetchStudents,
}: {
    item: Student
    onCancel: Function
    setRefetchStudents?: any
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [makeAsHighPriority, makeAsHighPriorityResult] =
        CommonApi.StudentAssessmentFiles.useMakeAsHighPriority()

    const onConfirmClicked = async (item: Student) => {
        await makeAsHighPriority(item?.id)
    }
    // useEffect(() => {
    //     if (makeAsHighPriorityResult.isSuccess) {
    //         setRefetchStudents(true)
    //     }
    // }, [makeAsHighPriorityResult])
    useEffect(() => {
        if (makeAsHighPriorityResult.isSuccess) {
            notification.error({
                title: `Student Make As High Priority`,
                description: `Student "${item.user.name}" has been Marked As High Priority.`,
            })
            onCancel()
        }
        if (makeAsHighPriorityResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for marking as high priority Student was failed`,
            })
        }
    }, [makeAsHighPriorityResult])

    return (
        <ActionModal
            Icon={MdPriorityHigh}
            variant="error"
            title="Are you sure!"
            description={`${
                item?.isHighPriority
                    ? `You are about to remove make as high priority <em>'${item?.user?.name}'</em>. Do you wish to continue?`
                    : `You are about to make as high priority <em>'${item?.user?.name}'</em>. Do you wish to continue?`
            } `}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={item.user.email}
            actionObject={item}
            loading={makeAsHighPriorityResult.isLoading}
        />
    )
}
