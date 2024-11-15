import { Badge, LoadingAnimation, NoData, Typography } from '@components'
import React from 'react'
import { SubAdminApi } from '@queries'
import {
    workplaceQuestions,
    workplaceQuestionsKeys,
} from '@partials/common/workplace'
import { WorkplaceQuestionType } from 'redux/queryTypes'

export const StudentInterviewDetail = ({
    workplaceId,
}: {
    workplaceId: number
}) => {
    const workplaceAnswers = SubAdminApi.Workplace.useStudentWorkplaceAnswers(
        workplaceId,
        {
            skip: !workplaceId,
        }
    )
    return (
        <div className="px-4 py-6 h-full overflow-auto custom-scrollbar">
            <div>
                <Typography center semibold>
                    Student Interview Details
                </Typography>
                <Typography center variant="small" normal>
                    Please review the important interview details before
                    applying for the student.
                </Typography>
            </div>

            {/*  */}
            <div>
                {workplaceAnswers.isError ? (
                    <NoData text="There is some technical issue, try refresh the page!" />
                ) : null}
                {workplaceAnswers.isLoading ? (
                    <LoadingAnimation size={60} height="h-full" />
                ) : workplaceAnswers?.data &&
                  workplaceAnswers?.data?.length > 0 ? (
                    <div className="max-w-5xl h- custom-scrollbar overflow-auto pb-2">
                        <div className="grid grid-cols-1  gap-x-6 gap-y-2.5">
                            {workplaceAnswers?.data?.map(
                                (data: WorkplaceQuestionType, i: number) => {
                                    if (
                                        data?.question ===
                                        workplaceQuestions[
                                            workplaceQuestionsKeys.suburb
                                        ]
                                    ) {
                                        const suburb = JSON.parse(data?.answer)
                                        return (
                                            <div className="border border-[#6B728030] rounded-md px-2 py-2.5">
                                                <Typography
                                                    variant="xxs"
                                                    color={'text-[#374151]'}
                                                    medium
                                                >
                                                    {data?.question}
                                                </Typography>
                                                <div className="flex items-center gap-x-1">
                                                    {Object.entries(
                                                        suburb
                                                    )?.map(
                                                        ([key, value]: any) => (
                                                            <div className="flex items-center gap-x-1">
                                                                <Typography
                                                                    variant={
                                                                        'xxs'
                                                                    }
                                                                    capitalize
                                                                >
                                                                    {key}:
                                                                </Typography>
                                                                <Badge
                                                                    text={value}
                                                                    variant={
                                                                        'success'
                                                                    }
                                                                />
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    }
                                    if (
                                        data?.question ===
                                        workplaceQuestions[
                                            workplaceQuestionsKeys
                                                .supervisorMeeting
                                        ]
                                    ) {
                                        const supervisorMeeting = JSON.parse(
                                            data?.answer
                                        )
                                        const meeting = {
                                            supervisorMeetingDate1: 'Option 1',
                                            supervisorMeetingDate2: 'Option 2',
                                        }

                                        return (
                                            <div className="flex flex-col gap-y-1 border border-[#6B728030] rounded-md px-2 py-2.5">
                                                <Typography
                                                    variant="xxs"
                                                    color={'text-[#374151]'}
                                                    medium
                                                >
                                                    {data?.question}
                                                </Typography>
                                                <div className="flex items-center gap-x-2">
                                                    {Object.entries(
                                                        supervisorMeeting
                                                    )?.map(
                                                        ([key, value]: any) => (
                                                            <div className="flex flex-col gap-y-1 gap-x-1">
                                                                <Typography
                                                                    variant={
                                                                        'xxs'
                                                                    }
                                                                    capitalize
                                                                >
                                                                    {
                                                                        meeting[
                                                                            key as keyof typeof meeting
                                                                        ]
                                                                    }
                                                                </Typography>

                                                                <div className="bg-[#128C7E1A] py-1 px-2 rounded-md">
                                                                    <Typography
                                                                        variant={
                                                                            'xxs'
                                                                        }
                                                                        color="text-[#128C7E]"
                                                                        capitalize
                                                                    >
                                                                        {value}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    }
                                    if (
                                        data?.question ===
                                        workplaceQuestions[
                                            workplaceQuestionsKeys.possession
                                        ]
                                    ) {
                                        return (
                                            <div className="flex flex-col gap-y-1 border border-[#6B728030] rounded-md px-2 py-2.5">
                                                <Typography
                                                    variant="xxs"
                                                    color={'text-[#374151]'}
                                                    medium
                                                >
                                                    {data?.question}
                                                </Typography>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    {data?.answer
                                                        ?.split(',')
                                                        ?.map(
                                                            (
                                                                possession: any
                                                            ) => (
                                                                <div className="bg-[#128C7E1A] py-1 px-2 rounded-md">
                                                                    <Typography
                                                                        variant={
                                                                            'xxs'
                                                                        }
                                                                        color="text-[#128C7E]"
                                                                        capitalize
                                                                    >
                                                                        <span className="whitespace-pre">
                                                                            {
                                                                                possession
                                                                            }
                                                                        </span>
                                                                    </Typography>
                                                                </div>
                                                            )
                                                        )}
                                                </div>
                                            </div>
                                        )
                                    }
                                    return (
                                        <div className="flex flex-col gap-y-1.5 border border-[#6B728030] rounded-md px-2.5 py-2">
                                            <Typography
                                                variant="xxs"
                                                color={'text-[#374151]'}
                                                medium
                                            >
                                                {data?.question}
                                            </Typography>
                                            <div className="flex items-center gap-x-1">
                                                <Typography
                                                    variant="xxs"
                                                    color={'text-[#24556D]'}
                                                >
                                                    Answer:
                                                </Typography>
                                                <Typography
                                                    variant="xxs"
                                                    color={'text-[#128C7E]'}
                                                >
                                                    {data?.answer}
                                                </Typography>
                                            </div>
                                        </div>
                                    )
                                }
                            )}
                        </div>
                    </div>
                ) : workplaceAnswers.isSuccess ? (
                    <NoData text="There is no Answers Provided availability!" />
                ) : null}
            </div>
        </div>
    )
}
