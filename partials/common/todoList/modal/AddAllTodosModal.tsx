import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { SubAdminApi } from '@queries'
import moment from 'moment'

import { HiCheckBadge } from 'react-icons/hi2'

export const AddAllTodosModal = ({ onCancel }: { onCancel: () => void }) => {
    const { notification } = useNotification()
    const [add, addResult] = SubAdminApi.Todo.addAllNewTodos()

    const onConfirmUClicked = async (job: any) => {
        const res: any = await add()
        if (res?.data) {
            notification.success({
                title: `Added`,
                description: `Added Successfully.`,
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={addResult} />
            <ActionModal
                Icon={HiCheckBadge}
                variant="success"
                title="Are you sure!"
                description={`You are about to Add. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                actionObject={{}}
                loading={addResult.isLoading}
            />
        </>
    )
}
