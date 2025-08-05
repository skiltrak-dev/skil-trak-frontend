import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { SubAdminApi } from '@queries'
import moment from 'moment'

import { HiCheckBadge } from 'react-icons/hi2'

export const RemoveAllTodosModal = ({ onCancel }: { onCancel: () => void }) => {
    const { notification } = useNotification()
    const [remove, removeResult] = SubAdminApi.Todo.removeAllTodos()

    const onConfirmUClicked = async (job: any) => {
        const res: any = await remove()
        if (res?.data) {
            notification.success({
                title: `Removed Changed`,
                description: `Removed Successfully.`,
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={removeResult} />
            <ActionModal
                Icon={HiCheckBadge}
                variant="success"
                title="Are you sure!"
                description={`You are about to Remove. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                actionObject={{}}
                loading={removeResult.isLoading}
            />
        </>
    )
}
