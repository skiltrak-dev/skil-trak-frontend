import { EmptyData, LoadingAnimation, Modal, TechnicalError } from '@components'
import { WorkplaceQuestionCard } from '@partials/common/workplace'
import { AdminApi } from '@queries'
import React from 'react'

export const ViewIndustryAnswersModal = ({
    onCancel,
    industryId,
}: {
    industryId: number
    onCancel: () => void
}) => {
    const industryQuestions = AdminApi.Industries.useIndustryQuestions(
        industryId,
        {
            skip: !industryId,
        }
    )
    return (
        <Modal
            subtitle="View Industry"
            onCancelClick={onCancel}
            title="View Industry Answers"
            showActions={false}
        >
            <div className="h-[75vh] lg:h-[65vh] overflow-auto custom-scrollbar max-w-5xl">
                {industryQuestions.isError ? <TechnicalError /> : null}
                {industryQuestions?.isLoading ? (
                    <LoadingAnimation />
                ) : industryQuestions?.data &&
                  industryQuestions?.data?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {industryQuestions?.data?.map(
                            (question: any, i: number) => (
                                <div className="flex flex-col h-full">
                                    <WorkplaceQuestionCard
                                        title={question?.question}
                                        data={question}
                                        showOnlyAnswer
                                        index={i}
                                        height="lg:h-auto lg:min-h-28"
                                    />
                                </div>
                            )
                        )}
                    </div>
                ) : industryQuestions.isSuccess ? (
                    <EmptyData />
                ) : null}
            </div>
        </Modal>
    )
}
