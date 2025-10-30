import { useFormContext } from 'react-hook-form'
import { Select, TextArea, TextInput } from '@components'
import { UrgencyLevel } from '../enum'

export const MessageForm = () => {
    const formMethod = useFormContext()

    const [urgencyLevel, message] = formMethod.watch([
        'urgencyLevel',
        'message',
    ])

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

    const getStatusMessage = () => {
        switch (urgencyLevel) {
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

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Select
                        required
                        onlyValue
                        name="urgencyLevel"
                        options={urgencyOptions}
                        label={'Urgency Level'}
                        placeholder={'Urgency Level'}
                        helpText={getStatusMessage()}
                    />
                </div>

                <div className="space-y-2">
                    <TextInput
                        name="senderName"
                        label={'Sender Name'}
                        placeholder={'Sender Name'}
                        required
                        helpText="Your name will appear on the notification"
                    />
                </div>
            </div>

            <TextInput
                name="title"
                label={'Title'}
                placeholder={'Title'}
                required
            />

            <div className="space-y-2">
                <TextArea
                    rows={5}
                    required
                    name="message"
                    label={'Message Content'}
                    placeholder="Describe the critical actions required. Be specific about deadlines, tasks, and any important details RTOs need to know..."
                    recomendedText="Be clear and concise to ensure RTOs understand the actions required"
                    textInfo={
                        <p
                            className={`${
                                message?.length > 500
                                    ? 'text-orange-600'
                                    : 'text-gray-500'
                            }`}
                        >
                            {message?.length} characters
                        </p>
                    }
                />
            </div>
        </div>
    )
}
