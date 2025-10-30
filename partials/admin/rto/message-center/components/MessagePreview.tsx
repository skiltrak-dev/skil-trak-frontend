import { Badge, Button, Card, InitialAvatar } from '@components'
import { AdminApi } from '@queries'
import { Send } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { getRecipientCount, getRecipientNames, getUrgencyColor } from '../utils'

export function MessagePreview() {
    const formData = useFormContext()

    const { data: rtosList } = AdminApi.RtoMessageCenter.getRtosList({})

    const [urgencyLevel, senderName, message, rtoIds, type] = formData.watch([
        'urgencyLevel',
        'senderName',
        'message',
        'rtoIds',
        'type',
    ])

    const recipientNames = getRecipientNames(type, rtoIds, rtosList)
    const recipientCounts = getRecipientCount(
        type,
        rtosList?.length || 0,
        rtoIds?.length
    )

    return (
        <Card
            noPadding
            className="sticky top-6 border-2 border-gray-200 shadow-lg"
        >
            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-b-2 border-blue-100">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                        3
                    </div>
                    <div>
                        <div className="text-base">Preview & Send</div>
                        <div className="mt-0.5">Review before sending</div>
                    </div>
                </div>
            </div>
            <div className="space-y-4 px-4 py-6">
                {/* Preview of the notification as it will appear */}
                <div>
                    <p className="text-xs text-gray-600 mb-2 px-1">
                        RTO Dashboard Preview:
                    </p>
                    <div className="border-2 border-gray-300 rounded-xl overflow-hidden bg-white shadow-md">
                        <div className="p-4 space-y-3">
                            {urgencyLevel ? (
                                <Badge
                                    className={`${getUrgencyColor(
                                        urgencyLevel
                                    )} px-3 py-1`}
                                    text={urgencyLevel}
                                />
                            ) : (
                                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                            )}

                            <div className="flex items-center gap-3">
                                {senderName && (
                                    <InitialAvatar name={senderName} />
                                )}

                                <div>
                                    <div className="text-sm text-gray-900">
                                        {senderName || 'Admin Name'}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Just now
                                    </div>
                                </div>
                            </div>

                            <p className="text-sm text-gray-700 leading-relaxed min-h-[60px]">
                                {message ||
                                    'Your message content will appear here...'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Send button and recipient info */}
                <div className="space-y-3 pt-3 border-t-2 border-gray-100">
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="text-xs text-gray-600 mb-2">
                            Message Summary:
                        </div>
                        <div className="space-y-1.5 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">
                                    Sending to:
                                </span>
                                <span
                                    className="text-gray-900 truncate ml-2 max-w-[150px]"
                                    title={recipientNames}
                                >
                                    {recipientNames}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">
                                    Total recipients:
                                </span>
                                <span className="text-blue-700 font-medium">
                                    {recipientCounts} RTO
                                    {recipientCounts !== 1 ? 's' : ''}
                                </span>
                            </div>
                        </div>
                    </div>

                    <Button
                        fullWidth
                        variant="info"
                        submit
                        disabled={formData?.formState?.isSubmitting}
                        loading={formData?.formState?.isSubmitting}
                    >
                        <Send className="w-4 h-4 mr-2" />
                        Send to {recipientCounts} RTO
                        {recipientCounts !== 1 ? 's' : ''}
                    </Button>
                </div>
            </div>
        </Card>
    )
}
