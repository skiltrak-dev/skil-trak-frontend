import { EmptyData, NoData, Typography } from '@components'
import { WorkplaceQuestionCard } from '@partials/common/workplace'
import React from 'react'

export const ViewIndustryReviewAnswers = ({ industryQuestions }: any) => {
    return (
        <>
            <div className="mb-4">
                <Typography variant="title" center>
                    Industry Answers
                </Typography>
            </div>
            <div className="h-[75vh] lg:h-[65vh] min-w-60 overflow-auto custom-scrollbar max-w-5xl">
                {industryQuestions && industryQuestions?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {industryQuestions?.map((question: any, i: number) => (
                            <div className="flex flex-col h-full">
                                <WorkplaceQuestionCard
                                    title={question?.question}
                                    data={question}
                                    showOnlyAnswer
                                    index={i}
                                    height="lg:h-auto lg:min-h-28"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <NoData text="No Data Found" />
                )}
            </div>
        </>
    )
}
