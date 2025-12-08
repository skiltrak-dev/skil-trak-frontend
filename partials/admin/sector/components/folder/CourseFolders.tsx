import {
    ActionButton,
    Badge,
    NoData,
    ShowErrorNotifications,
} from '@components'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { AddFolderFormType, Course, Folder, FolderCategoryEnum } from '@types'
import { useEffect, useState } from 'react'
import { CourseFolderForm } from '../../form'
import { CourseFolder } from './CourseFolder'
// Utility functions for filtering folders
const getRegularFolders = (folders: Folder[] | undefined): Folder[] => {
    if (!folders) return []
    return folders.filter((folder: Folder) => !folder?.isIndustryCheck)
}

const getIndustryCheckFolders = (folders: Folder[] | undefined): Folder[] => {
    if (!folders) return []
    return folders.filter((folder: Folder) => folder?.isIndustryCheck === true)
}

export const CourseFolders = ({
    course,
    category,
    folders,
}: {
    course?: Course | undefined | null
    folders: any
    category: FolderCategoryEnum
}) => {
    const { notification } = useNotification()
    const [create, setCreate] = useState(false)
    const [addFolder, addFolderResult] = AdminApi.Folders.useCreate()

    const [addAssessmentEvidence, addAssessmentEvidenceResult] =
        AdminApi.Folders.useAssessMentEvidence()

    const getFoldersTitle = () => {
        switch (category) {
            case FolderCategoryEnum.IndustryCheck:
                return 'Industry Check'
            case FolderCategoryEnum.AssessmentEvidence:
                return 'Assessment Evidence'
        }
    }

    useEffect(() => {
        if (addFolderResult.isSuccess) {
            notification.success({
                title: 'Folder Added',
                description: 'A new folder added to course',
            })

            onFormCancel()
        }
    }, [addFolderResult])

    useEffect(() => {
        if (addAssessmentEvidenceResult.isSuccess) {
            notification.success({
                title: 'Folder Added',
                description: 'A new folder added to course',
            })

            onFormCancel()
        }
    }, [addAssessmentEvidenceResult])

    const onSubmit = async (values: AddFolderFormType) => {
        category === FolderCategoryEnum.IndustryCheck
            ? await addFolder({
                  ...values,
                  course: Number(course?.id),
              })
            : addAssessmentEvidence({
                  ...values,
                  course: Number(course?.id),
              })
    }

    const onFormCancel = () => setCreate(false)

    // Filter folders using utility functions
    const regularFolders = getRegularFolders(folders)
    const industryCheckFolders = getIndustryCheckFolders(folders)

    return (
        <>
            <ShowErrorNotifications result={addFolderResult} />
            <ShowErrorNotifications result={addAssessmentEvidenceResult} />
            <div className="pt-2">
                <div className="flex justify-between items-center">
                    <p className="text-xs">
                        <span className="text-gray-600 font-semibold">
                            {folders?.length || 0}
                        </span>{' '}
                        -{' '}
                        <span className="text-gray-500 font-medium">
                            {getFoldersTitle()} Folders
                        </span>
                    </p>

                    <ActionButton
                        variant="info"
                        simple
                        onClick={() => setCreate(true)}
                    >
                        + Add Folder
                    </ActionButton>
                </div>

                {create && (
                    <CourseFolderForm
                        onSubmit={onSubmit}
                        onCancel={onFormCancel}
                    />
                )}

                <>
                    {!create &&
                        (folders && folders.length ? (
                            <div>
                                {regularFolders.length > 0 && (
                                    <div>
                                        <Badge text="Folders" />
                                        {regularFolders.map((f: Folder) => (
                                            <CourseFolder
                                                folder={f}
                                                key={f.id}
                                                course={course!!}
                                                category={category}
                                                result={
                                                    addAssessmentEvidenceResult
                                                }
                                            />
                                        ))}
                                    </div>
                                )}
                                {/* {industryCheckFolders.length > 0 && (
                                    <div>
                                        <Badge text="Industry Checks" />
                                        {industryCheckFolders.map(
                                            (f: Folder) => (
                                                <CourseFolder
                                                    folder={f}
                                                    key={f.id}
                                                    course={course!!}
                                                    category={category}
                                                    result={
                                                        addAssessmentEvidenceResult
                                                    }
                                                />
                                            )
                                        )}
                                    </div>
                                )} */}
                            </div>
                        ) : (
                            <NoData text="No Folder Here" />
                        ))}
                </>
            </div>
        </>
    )
}
