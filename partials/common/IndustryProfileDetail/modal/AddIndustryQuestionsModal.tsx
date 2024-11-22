import { Modal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { industryQuestions } from '@partials/admin/industry/components'
import { AdminApi } from '@queries'
import { Industry } from '@types'
import { useForm } from 'react-hook-form'
import { AddIndustryQuestionForm } from '../forms'
import { getSectors } from '@utils'
import { useEffect } from 'react'
import { IndustryQuestionsEnum } from '@partials/admin/industry/enum'

export const AddIndustryQuestionsModal = ({
    industry,
    onCancel,
}: {
    industry: Industry
    onCancel: () => void
}) => {
    const sectors = getSectors(industry?.courses)
    console.log({ sectors })
    const [saveQuestions, saveQuestionsResult] =
        AdminApi.Industries.saveIndustryQuestions()

    const { notification } = useNotification()

    const methods = useForm({
        mode: 'all',
    })

    useEffect(() => {
        const sectorsKeys = Object.keys(sectors)
        if (sectorsKeys && sectorsKeys?.length > 0) {
            methods.setValue(
                IndustryQuestionsEnum.SECTOR,
                sectorsKeys?.join(', ')
            )
        }
    }, [sectors])

    const onSubmit = (values: any) => {
        let questions: {
            [key: string]: string
        }[] = []
        Object.entries(industryQuestions).forEach(([key, value]: any) => {
            questions.push({
                question: value,
                answer: values?.[key],
            })
        })
        saveQuestions({ id: industry?.id, questions }).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `Industry Approved`,
                    description: `Industry "${industry?.user?.name}" has been accepted.`,
                })
                onCancel()
            }
        })
    }
    return (
        <div>
            <ShowErrorNotifications result={saveQuestionsResult} />
            <Modal
                title="Provide Answers"
                subtitle="This industry is already registered but some essential details are missing. To ensure proper functioning and collaboration, please provide the following information."
                onConfirmClick={methods.handleSubmit(onSubmit)}
                onCancelClick={onCancel}
                loading={saveQuestionsResult.isLoading}
            >
                <div className="w-full px-3 lg:max-w-[950px] max-h-[80vh] lg:max-h-[70vh] overflow-auto custom-scrollbar">
                    <AddIndustryQuestionForm methods={methods} />
                </div>
            </Modal>
        </div>
    )
}
