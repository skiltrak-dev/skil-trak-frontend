import { EmptyData, LoadingAnimation } from '@components'
import { WorkplaceQuestionCard } from '@partials/common'
import { StudentFeedbackType } from '@partials/common/StudentProfileDetail/components'
import { CommonApi } from '@queries'
import { WorkplaceQuestionType } from 'redux/queryTypes'

export const CoordinatorFeedback = () => {
    const feedback = CommonApi.Feedback.useStudentFeedbackList({
        type: StudentFeedbackType.COORDINATOR_FEEDBACK,
    })
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-4">
            {feedback.isLoading ? (
                <LoadingAnimation />
            ) : feedback?.data && feedback?.data?.length > 0 ? (
                feedback?.data?.map((fb: any) =>
                    fb?.questions?.map(
                        (data: WorkplaceQuestionType, i: number) => (
                            <div>
                                <WorkplaceQuestionCard
                                    title={data?.question}
                                    index={i}
                                    data={data}
                                    showOnlyAnswer
                                />
                            </div>
                        )
                    )
                )
            ) : (
                <EmptyData description="No Feedback was found!" />
            )}
        </div>
    )
}
