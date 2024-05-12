import {
    ActionButton,
    AssessmentCourse,
    Card,
    DownloadableFile,
    LoadingAnimation,
    NoData,
    Typography,
} from '@components'
import { useEffect, useState } from 'react'

import { useContextBar } from '@hooks'
import { AdminApi } from '@queries'
import { AddAssessmentToolCB } from './AddAssessmentToolCB'

export const AssessmentTool = ({ rto, actions, setAssessmentView }: any) => {
    const [courses, setCourses] = useState<any | null>(null)
    const contextBar = useContextBar()
    // const [archiveAssessmentTool, archiveAssessmentToolResult] =
    //     AdminApi.Rtos.useArchiveAssessmentTools()
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(
        null
    )

    useEffect(() => {
        setCourses(rto?.data?.courses)
    }, [rto])

    const getAssessmentTools = AdminApi.Rtos.useRtoAssessmentTools(
        {
            rto: Number(rto?.data?.id),
            course: Number(selectedCourseId),
            status: 'approved',
        },
        { skip: !selectedCourseId }
    )

    useEffect(() => {
        setSelectedCourseId(rto?.data?.courses[0]?.id)
    }, [rto])

    const onAddAssessment = () => {
        contextBar.setTitle('Add Assessment')
        contextBar.setContent(
            <AddAssessmentToolCB
                assessment={rto?.data}
                edit={false}
                rtoUser={rto?.data?.user}
            />
        )
        contextBar.show()
    }

    return (
        <Card noPadding>
            <div className="flex">
                <div className="w-[25%] border-r">
                    <div className={`p-3.5`}>
                        <Typography variant="label" color="text-black">
                            Select a Folder
                        </Typography>
                    </div>
                    {rto?.isLoading ? (
                        <LoadingAnimation size={85} />
                    ) : courses && courses?.length > 0 ? (
                        <>
                            {courses?.map((course: any) => (
                                <AssessmentCourse
                                    code={course?.code}
                                    name={course?.title}
                                    id={course.id}
                                    onClick={() =>
                                        setSelectedCourseId(course.id)
                                    }
                                    selectedCourseId={selectedCourseId}
                                />
                            ))}

                            {/* <AssessmentCourse
                                code={'-'}
                                name={'Miscellaneous'}
                                id={0}
                                onClick={() => setSelectedCourseId(-1)}
                                selectedCourseId={selectedCourseId}
                            /> */}
                        </>
                    ) : (
                        <></>
                    )}
                </div>
                <div className="w-[75%]">
                    <div className="flex justify-end gap-x-2.5 py-1.5 px-4">
                        <ActionButton
                            variant={'success'}
                            rounded
                            onClick={() => {
                                onAddAssessment()
                            }}
                            simple
                        >
                            Add Assessment
                        </ActionButton>
                        <ActionButton
                            variant={'info'}
                            rounded
                            onClick={() => {
                                setAssessmentView('archived')
                            }}
                            simple
                        >
                            View Archived
                        </ActionButton>
                    </div>

                    <div className={`border-b border-t p-4`}>
                        <div className="flex justify-between">
                            <Typography variant="label" color="text-black">
                                Description
                            </Typography>
                        </div>
                    </div>
                    <div className="p-2 min-h-[260px]">
                        {getAssessmentTools?.isLoading ||
                        getAssessmentTools?.isFetching ? (
                            <LoadingAnimation size={80} />
                        ) : getAssessmentTools?.data &&
                          getAssessmentTools?.data?.length > 0 ? (
                            getAssessmentTools?.data?.map((assessment: any) => (
                                <DownloadableFile
                                    actions={() => actions(assessment)}
                                    key={assessment?.id}
                                    name={assessment?.title}
                                    archivedView={false}
                                />
                            ))
                        ) : (
                            <NoData text={'No Assessment tools were found'} />
                        )}
                    </div>
                </div>
            </div>
        </Card>
    )
}
