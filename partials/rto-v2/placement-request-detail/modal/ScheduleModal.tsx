import { GlobalModal } from '@components/Modal/GlobalModal'
import { Button } from '@components'
import { Typography } from '@components/Typography'
import { Calendar, AlertCircle, CheckCircle2, ExternalLink } from 'lucide-react'

interface ScheduleModalProps {
    open: boolean
    onClose: () => void
    startDate: string
    endDate: string
    onStartDateChange: (date: string) => void
    onEndDateChange: (date: string) => void
    onConfirm: () => void
}

export function ScheduleModal({
    open,
    onClose,
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    onConfirm,
}: ScheduleModalProps) {
    if (!open) return null

    return (
        <GlobalModal onCancel={onClose} className="max-w-[600px]">
            <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 text-primaryNew text-xl font-semibold mb-2">
                        <Calendar className="h-5 w-5" />
                        <Typography variant="h3">
                            Confirm Placement Schedule
                        </Typography>
                    </div>
                    <Typography variant="small" className="text-gray-600">
                        Review and confirm the placement schedule from the
                        student's profile
                    </Typography>
                </div>

                {/* Content */}
                <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm text-amber-900 font-medium mb-2">
                                    Schedule Must Be Set in Student Profile
                                </p>
                                <p className="text-sm text-amber-800">
                                    The placement schedule needs to be
                                    configured in the student's profile page.
                                    This includes detailed shift patterns,
                                    working hours, and placement programs.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-sm font-medium text-gray-900">
                                Current Schedule Status
                            </p>
                            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                                Not Configured
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                            No placement schedule has been set for this student
                            yet. Please configure the schedule in the student's
                            profile before proceeding.
                        </p>

                        <Button
                            variant="primaryNew"
                            fullWidth
                            onClick={() => {
                                // This would navigate to the student profile page
                                window.open(
                                    '#/student-profile/schedule',
                                    '_blank'
                                )
                            }}
                            Icon={ExternalLink}
                            text="Go to Student Profile to Set Schedule"
                        />
                    </div>

                    <div className="space-y-3 pt-2">
                        <Typography variant="label" className="text-gray-700">
                            Quick Reference (To be configured in profile)
                        </Typography>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-white border border-gray-200 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">
                                    Start Date
                                </p>
                                <p className="text-sm font-medium text-gray-400">
                                    Not set
                                </p>
                            </div>
                            <div className="p-3 bg-white border border-gray-200 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">
                                    End Date
                                </p>
                                <p className="text-sm font-medium text-gray-400">
                                    Not set
                                </p>
                            </div>
                            <div className="p-3 bg-white border border-gray-200 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">
                                    Total Hours
                                </p>
                                <p className="text-sm font-medium text-gray-400">
                                    Not set
                                </p>
                            </div>
                            <div className="p-3 bg-white border border-gray-200 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">
                                    Shift Pattern
                                </p>
                                <p className="text-sm font-medium text-gray-400">
                                    Not set
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-blue-900">
                            Once the schedule is configured in the student
                            profile, you'll be able to review and confirm it
                            here before starting the placement.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        text="Close"
                    />
                    <Button
                        variant="primaryNew"
                        onClick={onConfirm}
                        disabled
                        Icon={CheckCircle2}
                        text="Confirm Schedule"
                    />
                </div>
            </div>
        </GlobalModal>
    )
}
