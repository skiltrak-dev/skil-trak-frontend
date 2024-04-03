import { Modal } from '@components'
import { WorkplaceQuestionCard } from '@partials/common/workplace'
import React from 'react'
import { WorkplaceQuestionType } from 'redux/queryTypes'

export const ViewQuestionsModal = ({
    questions,
    onCancel,
}: {
    questions: WorkplaceQuestionType[]
    onCancel: () => void
}) => {
    return (
        <Modal
            title="View Answers"
            subtitle="View Workplace Answers"
            showActions={false}
            onCancelClick={onCancel}
        >
            <div className="max-w-5xl max-h-[70vh] custom-scrollbar overflow-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    {questions?.map(
                        (data: WorkplaceQuestionType, i: number) => (
                            <div>
                                <WorkplaceQuestionCard
                                    title={data?.question}
                                    data={data}
                                    showOnlyAnswer
                                    index={i}
                                />
                            </div>
                        )
                    )}
                </div>
            </div>
        </Modal>
    )
}
