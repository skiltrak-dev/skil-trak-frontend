import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { SubAdminApi } from '@queries'

import { HiCheckBadge } from 'react-icons/hi2'

export const CompleteTodoModal = ({
    todo,
    onCancel,
}: {
    todo: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [updateStatus, updateStatusResult] =
        SubAdminApi.Todo.updateTodoStatus()

    const onConfirmUClicked = async (job: any) => {
        const res: any = await updateStatus({
            id: Number(job.id),
            status: 'completed',
        })
        if (res?.data) {
            notification.success({
                title: `Status Changed`,
                description: `Status for "${todo?.student?.user?.name}" Changed Successfully.`,
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={updateStatusResult} />
            <ActionModal
                Icon={HiCheckBadge}
                variant="success"
                title="Are you sure!"
                description={`You are about to complete "${todo?.student?.user?.name}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={todo?.title}
                actionObject={todo}
                loading={updateStatusResult.isLoading}
            />
        </>
    )
}
