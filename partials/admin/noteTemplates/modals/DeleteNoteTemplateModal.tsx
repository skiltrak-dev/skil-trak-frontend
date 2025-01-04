import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'

import { FaTrash } from 'react-icons/fa'

export const DeleteNoteTemplateModal = ({
    noteTemplate,
    onCancel,
}: {
    noteTemplate: any
    onCancel: Function
}) => {
    const { notification } = useNotification()
    const [remove, removeResult] = AdminApi.NotesTemplates.removeNoteTemplate()

    const onConfirmClicked = async (noteTemplate: any) => {
        const res: any = await remove(noteTemplate?.id)
        if (res?.data) {
            notification.error({
                title: `Note Template Deleted`,
                description: `Note Template "${noteTemplate?.name}" has been deleted.`,
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={removeResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to delete "${noteTemplate?.name}". Do you wish to continue?`}
                onConfirm={onConfirmClicked}
                onCancel={onCancel}
                input
                actionObject={noteTemplate}
                loading={removeResult.isLoading}
            />
        </>
    )
}
