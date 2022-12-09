// components
import { Button, Checkbox, Typography, Card, NoData } from '@components'

import { AssessmentCourseCard, AssessmentFolderCard } from './components'
import { AssessmentFolderDetailX } from './AssessmentFolderDetailX'

// query
import {
    useGetAssessmentsCoursesQuery,
    useGetAssessmentsFoldersQuery,
} from '@queries'
import { LoadingAnimation } from '@components/LoadingAnimation'
import { useEffect, useState } from 'react'

type Props = {}

export const AssessmentsEvidence = (props: Props) => {
    const [selectedCourseId, setSelectedCourseId] = useState(null)
    const [selectedFolder, setSelectedFolder] = useState<any | null>(null)

    // query
    const assessmentsCourses: any = useGetAssessmentsCoursesQuery()
    const assessmentsFolders: any = useGetAssessmentsFoldersQuery(
        selectedCourseId,
        {
            skip: !selectedCourseId,
        }
    )

    useEffect(() => {
        if (assessmentsCourses.isSuccess) {
            setSelectedCourseId(
                selectedCourseId || assessmentsCourses?.data[0]?.id
            )
        }
    }, [assessmentsCourses])

    useEffect(() => {
        if (assessmentsFolders.isSuccess) {
            setSelectedFolder(assessmentsFolders?.data[0])
        }
    }, [assessmentsFolders])

    return (
        <div>
            <div className="mb-3">
                {assessmentsCourses.isLoading ? (
                    <LoadingAnimation />
                ) : (
                    <>
                        <div className="mb-3 grid grid-cols-3 gap-x-2">
                            {assessmentsCourses?.data?.map((course: any) => (
                                <AssessmentCourseCard
                                    key={course.id}
                                    id={course.id}
                                    code={course.code}
                                    title={course.title}
                                    isActive={course.isActive}
                                    coordinator={course?.subadmin[0]?.user.name}
                                    selectedCourseId={selectedCourseId}
                                    onClick={() => {
                                        setSelectedCourseId(course.id)
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className="flex">
                <div className="w-[33%]">
                    <div className="flex items-center gap-x-1 mb-1">
                        <Typography variant="label" color="text-black">
                            Assessment Submission -
                        </Typography>
                        <Typography variant="muted" color="text-gray-500">
                            Submission #1
                        </Typography>
                    </div>
                    <div className="bg-white border-r min-h-[400px]">
                        {assessmentsFolders.isLoading ? (
                            <LoadingAnimation />
                        ) : (
                            assessmentsFolders.isSuccess && (
                                <>
                                    <div className="p-2 bg-white border-b border-gray-200">
                                        <Typography
                                            variant={'xs'}
                                            color={'text-gray-500'}
                                        >
                                            Submission For
                                        </Typography>
                                        <Typography variant={'label'}>
                                            {
                                                assessmentsFolders?.data[0]
                                                    ?.course?.title
                                            }
                                        </Typography>
                                    </div>
                                    {assessmentsFolders?.data &&
                                    assessmentsFolders?.data?.length > 0 ? (
                                        assessmentsFolders?.data?.map(
                                            (folder: any) => (
                                                <AssessmentFolderCard
                                                    key={folder.id}
                                                    id={folder.id}
                                                    name={folder.name}
                                                    isActive={folder.isActive}
                                                    selectedFolderId={
                                                        selectedFolder?.id
                                                    }
                                                    negativeComment={
                                                        folder.negativeComment
                                                    }
                                                    positiveComment={
                                                        folder.positiveComment
                                                    }
                                                    onClick={() => {
                                                        setSelectedFolder(
                                                            folder
                                                        )
                                                    }}
                                                />
                                            )
                                        )
                                    ) : (
                                        <NoData
                                            text={'No Folders Were Found'}
                                        />
                                    )}
                                </>
                            )
                        )}
                    </div>
                </div>
                <div className="w-[67%] h-full">
                    <AssessmentFolderDetailX
                        fileUpload
                        folder={selectedFolder}
                    />
                </div>
            </div>

            <div className="flex items-center gap-x-2 mt-10">
                <div>
                    <Button text="SUBMIT" submit />
                </div>
                <div className="flex items-center gap-x-2">
                    <Checkbox
                        name="notifyCoordinator"
                        label="Notify Coordinator"
                    />
                    <Checkbox
                        name="notifyCoordinator"
                        label="Notify Coordinator"
                    />
                </div>
            </div>

            <div className="my-2">
                <Typography variant="muted" color="text-neutral-500">
                    *You will be able to submit assessment request after you
                    upload at least one attachment to each folder mentioned
                    above.
                </Typography>
            </div>
        </div>
    )
}
