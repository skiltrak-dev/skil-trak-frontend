import {
    Button,
    Select,
    ShowErrorNotifications,
    TextArea,
    TextInput,
} from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@hooks'
import { UrgencyLevel } from '@partials/admin/rto/message-center/enum'
import { RtoV2Api } from '@queries'
import { Industry } from '@types'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'

export const IndustryInfoMessageForm = ({
    industry,
    onCancel,
}: {
    industry: Industry
    onCancel: () => void
}) => {
    const [industryInfoMessage, industryInfoMessageResult] =
        RtoV2Api.Industries.industryInfoMessage()

    const { notification } = useNotification()

    const urgencyOptions = [
        {
            value: UrgencyLevel.URGENT,
            label: 'Urgent - Critical Action Required',
        },
        {
            value: UrgencyLevel.HIGH,
            label: 'High - Important',
        },
        {
            value: UrgencyLevel.MEDIUM,
            label: 'Medium - Moderate Priority',
        },
        {
            value: UrgencyLevel.LOW,
            label: 'Low - Informational',
        },
    ]

    const getStatusMessage = (level: string) => {
        switch (level) {
            case UrgencyLevel.URGENT:
                return 'Requires immediate attention'
            case UrgencyLevel.HIGH:
                return 'Should be addressed soon'
            case UrgencyLevel.MEDIUM:
                return 'Normal priority message'
            case UrgencyLevel.LOW:
                return 'For information only'
            default:
                return ''
        }
    }

    const validationSchema = Yup.object({
        urgencyLevel: Yup.string()
            .oneOf(Object.values(UrgencyLevel), 'Invalid urgency level')
            .required('Urgency level is required'),

        senderName: Yup.string()
            .min(2, 'Sender name must be at least 2 characters')
            .max(100, 'Sender name must not exceed 100 characters')
            .required('Sender name is required'),

        expiryDate: Yup.string().required('Expiry Date is required'),

        message: Yup.string()
            .min(10, 'Message must be at least 10 characters')
            .max(1000, 'Message must not exceed 1000 characters')
            .required('Message is required'),

        title: Yup.string().required('Title is required'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const [urgencyLevel, message] = methods.watch(['urgencyLevel', 'message'])

    const onSubmit = async (values: any) => {
        const result: any = await industryInfoMessage({
            ...values,
            industry: industry.id,
        })
        if (result.data) {
            notification.success({
                title: 'Info Message Sent',
                description: 'Info Message Sent Successfully',
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={industryInfoMessageResult} />
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Select
                                required
                                onlyValue
                                name="urgencyLevel"
                                options={urgencyOptions}
                                label={'Urgency Level'}
                                placeholder={'Urgency Level'}
                                helpText={getStatusMessage(urgencyLevel)}
                            />

                            <TextInput
                                name="senderName"
                                label={'Sender Name'}
                                placeholder={'Sender Name'}
                                required
                                helpText="Your name will appear on the notification"
                            />
                        </div>

                        <TextInput
                            name="title"
                            label={'Title'}
                            placeholder={'Title'}
                            required
                        />

                        <TextInput
                            name="expiryDate"
                            label={'Expiry Date'}
                            placeholder={'Expiry Date'}
                            required
                            type="date"
                        />

                        <div className="space-y-2">
                            <TextArea
                                rows={5}
                                required
                                name="message"
                                label={'Message Content'}
                                placeholder="Describe the critical actions required. Be specific about deadlines, tasks, and any important details industries need to know..."
                                recomendedText="Be clear and concise to ensure industries understand the actions required"
                                textInfo={
                                    <p
                                        className={`${message?.length > 500
                                                ? 'text-orange-600'
                                                : 'text-gray-500'
                                            } text-xs`}
                                    >
                                        {message?.length || 0} characters
                                    </p>
                                }
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button
                                variant="primaryNew"
                                submit
                                loading={industryInfoMessageResult.isLoading}
                                disabled={industryInfoMessageResult.isLoading}
                            >
                                Send Info Message
                            </Button>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}
