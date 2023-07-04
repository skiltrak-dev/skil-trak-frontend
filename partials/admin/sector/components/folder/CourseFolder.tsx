import { ActionButton, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { AddFolderFormType, Course, Folder, FolderCategoryEnum } from '@types'
import { useEffect, useState } from 'react'
import { FaFolder, FaTrash } from 'react-icons/fa'
import { CourseFolderForm } from '../../form'

export const CourseFolder = ({
    folder,
    course,
    category,
    result,
}: {
    folder: Folder
    course: Course
    category: any
    result: any
}) => {
    const { notification } = useNotification()

    const [edit, setEdit] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const getFolderType = () => {
        switch (folder.type) {
            case 'docs':
                return 'Documents'
            case 'images':
                return 'Images'
            case 'videos':
                return 'Videos'
        }
    }

    const [update, updateResult] = AdminApi.Folders.useUpdate()
    const [updateAssessment, updateAssessmentResult] =
        AdminApi.Folders.useAssessMentUpdate()
    const onSubmit = async (values: AddFolderFormType) => {
        edit
            ? await updateAssessment({
                  id: Number(folder.id),
                  ...values,
                  course: course?.id,
              })
            : await update({
                  id: Number(folder.id),
                  ...values,
                  course: course?.id,
              })
    }

    const [deleteFolder, deleteResult] = AdminApi.Folders.useRemove()
    const [deleteAssessment, deleteAssessmentResult] =
        AdminApi.Folders.useRemoveAssessment()

    const onDelete = async () => {
        category === FolderCategoryEnum.IndustryCheck
            ? await deleteFolder(Number(folder.id))
            : await deleteAssessment(Number(folder.id))
    }

    const onCancel = () => {
        setEdit(false)
    }

    useEffect(() => {
        if (updateResult.isSuccess) {
            notification.info({
                title: 'Folder Update',
                description: 'A folder updated in course',
            })

            onCancel()
        }
    }, [updateResult])

    useEffect(() => {
        if (updateAssessmentResult.isSuccess) {
            notification.info({
                title: 'Assessment Folder Update',
                description: 'A Assessment folder updated in course',
            })

            onCancel()
        }
    }, [updateAssessmentResult])

    useEffect(() => {
        if (deleteResult.isSuccess) {
            notification.info({
                title: 'Folder Deleted',
                description: 'A folder deleted from course',
            })

            onCancel()
        } else if (deleteResult.isError) {
            notification.error({
                title: 'Folder Delete Failed',
                description: 'An error occurred while deleting folder',
            })
        }
    }, [deleteResult])

    useEffect(() => {
        if (deleteAssessmentResult.isSuccess) {
            notification.info({
                title: 'Assessment Evidence Deleted',
                description: 'A Assessment Evidence deleted from course',
            })

            onCancel()
        } else if (deleteAssessmentResult.isError) {
            notification.error({
                title: 'Assessment Evidence Delete Failed',
                description:
                    'An error occurred while deleting Assessment Evidence',
            })
        }
    }, [deleteAssessmentResult])

    return (
        <>
            <ShowErrorNotifications result={updateResult} />
            <ShowErrorNotifications result={updateAssessmentResult} />
            <div className="border-b pb-4">
                {edit ? (
                    <CourseFolderForm
                        onSubmit={onSubmit}
                        edit
                        initialValues={folder}
                        onCancel={onCancel}
                        result={edit ? updateAssessmentResult : updateResult}
                    />
                ) : (
                    <div className="relative">
                        {deleting && (
                            <div className="absolute top-0 left-0 flex flex-col w-full h-full backdrop-blur-sm bg-white/50 px-2 py-2">
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
                                    >
                                        Yes
                                    </ActionButton>
                                    <ActionButton
                                        simple
                                        onClick={() => setDeleting(false)}
                                    >
                                        Cancel
                                    </ActionButton>
                                </div>
                            </div>
                        )}
                        <div>
                            <div className="flex justify-between">
                                <div className="flex gap-x-2 items-center">
                                    <span className="text-indigo-500">
                                        <FaFolder />
                                    </span>
                                    <p className="text-sm font-medium">
                                        {folder.name}
                                    </p>
                                    <span className="text-xs text-gray-500">
                                        {'('}
                                        {folder.capacity}
                                        {')'}
                                    </span>
                                </div>

                                <div>
                                    <ActionButton
                                        variant="info"
                                        simple
                                        onClick={() => setEdit(true)}
                                    >
                                        Edit
                                    </ActionButton>
                                    <ActionButton
                                        variant="error"
                                        simple
                                        onClick={() => setDeleting(true)}
                                    >
                                        Delete
                                    </ActionButton>
                                </div>
                            </div>

                            <p className="text-xs text-gray-600">
                                {getFolderType()}
                            </p>

                            <div className="mt-2">
                                <p className="text-[11px] text-gray-500">
                                    Description:
                                </p>
                                <p className="text-xs text-gray-700 font-medium">
                                    {folder.description}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
