import { useEffect } from 'react'
import { ActionModal } from './ActionModal'

// components
import { ShowErrorNotifications } from '@components'

// query
import { SubAdminApi } from '@queries'
import { HiCheckBadge } from 'react-icons/hi2'

// hooks
import { useNotification } from '@hooks'

export const AddWPTodoModal = ({
    onCancel,
    workplaceId,
    coordinatorUserId,
}: {
    workplaceId: number
    onCancel: () => void
    coordinatorUserId: number
}) => {
    const { notification } = useNotification()

    const [addToTodo, addToTodoResult] = SubAdminApi.Todo.createWorkplaceTodo()

    const onConfirm = async () => {
        const res: any = await addToTodo({
            workplaceId: Number(workplaceId),
            userId: coordinatorUserId,
        })

        if (res?.data) {
            notification.success({
                title: 'Workplace Sent to TODO',
                description: 'Workplace Sent to TODO Successfully',
            })
            onCancel()
        }
    }

    return (
        <div>
            <ShowErrorNotifications result={addToTodoResult} />
            <ActionModal
                Icon={HiCheckBadge}
                variant={'primary'}
                title={'Are you sure'}
                subtitle={'You want this workplace into TODO'}
                onCancel={onCancel}
                onConfirm={() => {
                    onConfirm()
                }}
                loading={addToTodoResult?.isLoading}
            />
        </div>
    )
}
