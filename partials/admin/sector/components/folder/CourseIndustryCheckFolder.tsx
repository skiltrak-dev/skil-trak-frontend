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
import { CourseIndustryCheckForm } from '../../form'
import { CourseFolder } from './CourseFolder'

const getIndustryCheckFolders = (folders: Folder[] | undefined): Folder[] => {
    if (!folders) return []
    return folders.filter((folder: Folder) => folder?.isIndustryCheck === true)
}

export const CourseIndustryCheckFolder = ({
    course,
    category,
    folders,
}: {
    folders: any
    category: FolderCategoryEnum
    course?: Course | undefined | null
}) => {
    const { notification } = useNotification()
    const [create, setCreate] = useState(false)
    const [addFolder, addFolderResult] = AdminApi.Folders.useCreate()

    const [addAssessmentEvidence, addAssessmentEvidenceResult] =
        AdminApi.Folders.useAssessMentEvidence()

    const [addCourseIndustryCheck, addCourseIndustryCheckResult] =
        AdminApi.IndustryChecks.addCourseIndustryCheck()

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

    const onSubmit = async (values: any) => {
        const res: any = await addCourseIndustryCheck({
            courseId: Number(course?.id),
            defaultDocumentId: Number(values?.defaultDocument),
        })
        if (res?.data) {
            notification.success({
                title: 'Folder Added',
                description: 'A new folder added to course',
            })
            onFormCancel()
        }
    }

    const onFormCancel = () => setCreate(false)

    const industryCheckFolders = getIndustryCheckFolders(folders)

    return (
        <>
            <ShowErrorNotifications result={addFolderResult} />
            <ShowErrorNotifications result={addAssessmentEvidenceResult} />
            <ShowErrorNotifications result={addCourseIndustryCheckResult} />
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
                    <CourseIndustryCheckForm
                        onSubmit={onSubmit}
                        onCancel={onFormCancel}
                    />
                )}

                <>
                    {!create &&
                        (folders && folders.length ? (
                            <div>
                                {industryCheckFolders.length > 0 && (
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
                                )}
                            </div>
                        ) : (
                            <NoData text="No Folder Here" />
                        ))}
                </>
            </div>
        </>
    )
}
