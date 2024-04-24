import { GlobalModal, ShowErrorNotifications, Typography } from '@components'
import { useNotification } from '@hooks'
import { CommonApi, useStartPlacementMutation } from '@queries'
import { Course } from '@types'
import Image from 'next/image'
import { MdCancel } from 'react-icons/md'
import { AddCoordinatorFeedbackForm } from '../forms'

export const feedbackQuestions = {
    professionalism:
        'Does the student demonstrate professionalism and courtesy in their interactions?',
    commitments:
        'Is the student punctual and reliable in meeting deadlines and commitments?',
    industrypartners:
        'Does the student communicate effectively and promptly with coordinators and industry partners?',
    guidelines:
        'Does the student follow instructions and guidelines provided by coordinators and industry partners?',
    clarification:
        'Is the student proactive in seeking assistance or clarification when needed?',
    skills: 'Does the student demonstrate adaptability and willingness to learn new tasks and skills?',
    behaviour:
        "Are there any specific areas where the student's behaviour or general process could be improved?",
    feedback: 'How would you rate the student out of 5 stars?',
}

export const AddFeedbackModal = ({
    course,
    id,
    student,
    agreementSigned,
    onCancel,
    wpId,
    industryId,
}: {
    wpId: number
    industryId: number
    course: Course
    id: any
    student: any
    onCancel: any
    agreementSigned: any
}) => {
    const { notification } = useNotification()

    const [addFeedback, addFeedbackResult] =
        CommonApi.Feedback.useStudentFeedback()
    const [startPlacement, startPlacementResult] = useStartPlacementMutation()

    const onHandleSubmit = (values: any) => {
        let questions: { question: string; answer: string }[] = []
        Object.entries(feedbackQuestions).forEach(([key, value]: any) =>
            questions.push({
                question: value,
                answer: values[key],
            })
        )
        addFeedback({
            rating: Number(values?.feedback),
            course: course?.id,
            questions,
            student: student?.id,
            workplaceRequest: wpId,
            industry: industryId,
        }).then((res: any) => {
            if (res?.data) {
                startPlacement(id).then((placementRes: any) => {
                    if (placementRes?.data) {
                        notification.success({
                            title: 'Feedback Added!',
                            description: 'Feedback Added Successfully!',
                        })
                        onCancel()
                    }
                })
            }
        })
    }
    return (
        <GlobalModal>
            <ShowErrorNotifications result={addFeedbackResult} />
            <div className="relative lg:min-w-[800px] max-w-6xl px-10 py-7">
                {onCancel && (
                    <MdCancel
                        onClick={onCancel}
                        className="absolute top-5 right-5 transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                    />
                )}
                <div className="flex flex-col gap-y-5 items-center">
                    <Image
                        src={'/images/feedback/feedback.png'}
                        alt={''}
                        width={0}
                        height={0}
                        sizes={'100vh 100vw'}
                        className="w-16  h-16"
                    />
                    <Typography variant="label" center>
                        Your input regarding the student's behaviour and general
                        process is highly appreciated. Kindly provide your
                        feedback by answering the following questions with "Yes"
                        or "No" responses:
                    </Typography>
                </div>

                <AddCoordinatorFeedbackForm
                    onSubmit={onHandleSubmit}
                    result={
                        addFeedbackResult?.isLoading
                            ? addFeedbackResult
                            : startPlacementResult
                    }
                />
            </div>
        </GlobalModal>
    )
}
