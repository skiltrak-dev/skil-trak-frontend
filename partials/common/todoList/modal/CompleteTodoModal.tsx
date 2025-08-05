import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { SubAdminApi } from '@queries'
import moment from 'moment'

import { HiCheckBadge } from 'react-icons/hi2'

export const CompleteTodoModal = ({
    todo,
    text,
    onCancel,
}: {
    todo: any
    text: string
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [updateStatus, updateStatusResult] =
        SubAdminApi.Todo.updateTodoStatus()

    const onConfirmUClicked = async (job: any) => {
        const res: any = await updateStatus({
            id: Number(job.id),
            status: 'completed',
            date: moment(new Date()).format('YYYY-MM-DD'),
        })
        if (res?.data) {
            notification.success({
                title: `Status Changed`,
                description: `Status for "${text}" Changed Successfully.`,
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
                description={`You are about to complete "${text}". Do you wish to continue?`}
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
