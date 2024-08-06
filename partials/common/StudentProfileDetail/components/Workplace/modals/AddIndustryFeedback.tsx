import Image from 'next/image'
import { Course } from '@types'
import { CommonApi } from '@queries'
import { useNotification } from '@hooks'
import { MdCancel } from 'react-icons/md'
import { StudentFeedbackType } from '../enum'
import { AddIndustryFeedbackForm } from '../forms'
import { GlobalModal, Typography } from '@components'

export const industryFeedbackQuestions = {
    conducive:
        'Was the overall atmosphere and environment of the workplace conducive to learning?',
    demonstrate:
        'Did the student demonstrate punctuality and reliability in their attendance?',
    supervisors:
        'Did the student effectively communicate and interact with colleagues, supervisors, and clients/customers?',
    willingness:
        'Did the student demonstrate initiative, adaptability, and willingness to learn new tasks and skills?',
    protocols:
        'Did the student follow workplace protocols, safety procedures, and instructions?',
    professionalism:
        'Did the student exhibit professionalism, respect, and ethical behaviour throughout their placement?',
    performance:
        "Were there specific strengths or areas of improvement observed in the student's performance?",
    feedback:
        'Was the student adequately supported and guided by supervisors and colleagues?',
    difficulties:
        'Were there any significant challenges or difficulties encountered while working with the student?',
    rating: 'How would you rate the student out of 5 stars?',
}

export const AddIndustryFeedback = ({
    course,
    id,
    student,
    onCancel,
    workplaceId,
    industryId,
}: {
    industryId: number
    workplaceId: number
    course: Course
    id: any
    student: any
    onCancel: any
}) => {
    const { notification } = useNotification()

    const [addFeedback, addFeedbackResult] =
        CommonApi.Feedback.useStudentFeedback()

    const onHandleSubmit = (values: any) => {
        let questions: { question: string; answer: string }[] = []
        Object.entries(industryFeedbackQuestions).forEach(([key, value]: any) =>
            questions.push({
                question: value,
                answer: values[key],
            })
        )
        addFeedback({
            industry: industryId,
            workplaceRequest: workplaceId,
            rating: Number(values?.rating),
            course: course?.id,
            questions,
            student: student?.id,
            type: StudentFeedbackType.INDUSTRY_FEEDBACK,
        }).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: 'Feedback Added!',
                    description: 'Feedback Added Successfully!',
                })
                onCancel()
            }
        })
    }
    return (
        <GlobalModal>
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

                <AddIndustryFeedbackForm
                    onSubmit={onHandleSubmit}
                    result={addFeedbackResult}
                />
            </div>
        </GlobalModal>
    )
}
