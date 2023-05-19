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

import { AdminApi } from '@queries'
import { useRouter } from 'next/router'
import { MdDelete } from 'react-icons/md'
import { useNotification } from '@hooks'

export const ArchivedAssessmentTool = ({ rto, setAssessmentView }: any) => {
    const [selectedTool, setSelectedTool] = useState<number>(-1)

    const { notification } = useNotification()

    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(
        null
    )
    const [remove, removeResult] = AdminApi.Rtos.useRemoveAssessmentTools()

    const [archiveAssessmentTool, archiveAssessmentToolResult] =
        AdminApi.Rtos.useArchiveAssessmentTools()
    const getAssessmentTools = AdminApi.Rtos.useRtoAssessmentTools(
        {
            rto: Number(rto?.data?.id),
            course: Number(selectedCourseId),
            status: 'archived',
        },
        { skip: !selectedCourseId }
    )

    useEffect(() => {
        setSelectedCourseId(rto?.data?.courses[0]?.id)
    }, [rto])

    useEffect(() => {
        if (removeResult.isSuccess) {
            notification.error({
                title: 'Assessment Tool Deleted',
                description: 'Assessment Tool Deleted Successfully',
            })
        }
    }, [removeResult])

    const actions = (assessment: any) => {
        return (
            <div className="flex items-center gap-x-2 ">
                <a href={assessment?.file} target="blank" rel="noreferrer">
                    <Typography variant="tableCell" color="text-blue-600">
                        Download
                    </Typography>
                </a>

                <div
                    className="cursor-pointer"
                    onClick={() => {
                        archiveAssessmentTool(assessment?.id)
                    }}
                >
                    <Typography variant="tableCell" color="text-[#7081A0]">
                        Un Archive
                    </Typography>
                </div>
                <ActionButton
                    Icon={MdDelete}
                    loading={
                        removeResult.isLoading &&
                        selectedTool === assessment?.id
                    }
                    onClick={() => {
                        setSelectedTool(assessment?.id)
                        remove(assessment?.id)
                    }}
                    variant={'error'}
                    simple
                ></ActionButton>
            </div>
        )
    }

    return (
        <Card noPadding>
            <div className="flex">
                <div className="w-[25%] border-r">
                    <div className={`p-3.5`}>
                        <Typography variant="label" color="text-black">
                            Select a Course
                        </Typography>
                    </div>
                    {rto?.isError && (
                        <NoData
                            text={
                                'There is some Network issue, Check your network'
                            }
                        />
                    )}
                    {rto?.isLoading ? (
                        <LoadingAnimation size={85} />
                    ) : rto?.data?.courses && rto?.data?.courses?.length > 0 ? (
                        rto?.data?.courses?.map((course: any) => (
                            <AssessmentCourse
                                code={course?.code}
                                name={course?.title}
                                id={course.id}
                                onClick={() => setSelectedCourseId(course.id)}
                                selectedCourseId={selectedCourseId}
                            />
                        ))
                    ) : (
                        !rto?.isError && (
                            <NoData text={'No Courses were Found'} />
                        )
                    )}
                </div>
                <div className="w-[75%]">
                    <div className="flex justify-end gap-x-2.5 py-1.5 px-4">
                        <ActionButton
                            variant={'success'}
                            rounded
                            onClick={() => {}}
                            simple
                        >
                            Add Assessment
                        </ActionButton>
                        <ActionButton
                            variant={'info'}
                            rounded
                            onClick={() => {
                                setAssessmentView('assessments')
                            }}
                            simple
                        >
                            View UnArchived
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
                        {getAssessmentTools.isError && (
                            <NoData
                                text={
                                    'There is some Network issue, Check your network'
                                }
                            />
                        )}
                        {getAssessmentTools?.isLoading ? (
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
                            !getAssessmentTools.isError && (
                                <NoData
                                    text={'No Assessment tools were found'}
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
        </Card>
    )
}
