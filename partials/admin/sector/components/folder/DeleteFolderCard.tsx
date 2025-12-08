import React from 'react'
import { Folder } from '@types'
import { AdminApi } from '@queries'
import { useNotification } from '@hooks'
import { ActionButton, ShowErrorNotifications } from '@components'
import { FaTrash } from 'react-icons/fa'

export const DeleteFolderCard = ({
    folder,
    setDeleting,
}: {
    folder: Folder
    setDeleting: () => void
}) => {
    const [deleteAssessment, deleteAssessmentResult] =
        AdminApi.Folders.useRemoveAssessment()

    const { notification } = useNotification()

    const onDelete = async () => {
        const res: any = await deleteAssessment(Number(folder.id))
        if (res?.data) {
            notification.info({
                title: 'Assessment Evidence Deleted',
                description: 'A Assessment Evidence deleted from course',
            })
            setDeleting()
        }
    }
    return (
        <>
            <ShowErrorNotifications result={deleteAssessmentResult} />
            <div className="absolute top-0 left-0 flex flex-col w-full h-full backdrop-blur-sm bg-white/60 px-2 py-2">
                <div className="flex items-center gap-x-2 mb-4">
                    <div className="bg-red-500 w-6 h-6 rounded-lg flex items-center justify-center text-white">
                        <FaTrash />
                    </div>
                    <p className="font-medium text-sm">
                        Delete '{folder.name}' Folder!
                    </p>
                </div>
                <div className="flex gap-x-2">
                    <ActionButton
                        variant="error"
                        onClick={() => {
                            onDelete()
                        }}
                        loading={deleteAssessmentResult.isLoading}
                        disabled={deleteAssessmentResult.isLoading}
                    >
                        Yes
                    </ActionButton>
                    <ActionButton simple onClick={() => setDeleting()}>
                        Cancel
                    </ActionButton>
                </div>
            </div>
        </>
    )
}
