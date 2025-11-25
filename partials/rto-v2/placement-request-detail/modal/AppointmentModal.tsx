import { useState } from 'react'
import { GlobalModal } from '@components/Modal/GlobalModal'
import { Button } from '@components'
import { TextInput } from '@components/inputs/TextInput'
import { Select } from '@components/inputs/Select'
import { TextArea } from '@components/inputs/TextArea'
import { Typography } from '@components/Typography'
import {
    CalendarCheck,
    Calendar,
    Clock,
    MapPin,
    Video,
    Phone,
    Building2,
    MessageSquare,
    CheckCircle2,
} from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'

interface AppointmentModalProps {
    open: boolean
    onClose: () => void
    appointmentDate: string
    onAppointmentDateChange: (date: string) => void
    onConfirm: () => void
}

export function AppointmentModal({
    open,
    onClose,
    appointmentDate,
    onAppointmentDateChange,
    onConfirm,
}: AppointmentModalProps) {
    const methods = useForm()
    const [appointmentType, setAppointmentType] = useState('in-person')
    const [appointmentTime, setAppointmentTime] = useState('')
    const [appointmentNote, setAppointmentNote] = useState('')
    const [appointmentDuration, setAppointmentDuration] = useState('60')

    const appointmentTypes = [
        { label: 'In-Person Meeting', value: 'in-person' },
        { label: 'Video Call', value: 'video' },
        { label: 'Phone Call', value: 'phone' },
        { label: 'Site Tour', value: 'site-tour' },
    ]

    const durations = [
        { label: '15 minutes', value: '15' },
        { label: '30 minutes', value: '30' },
        { label: '45 minutes', value: '45' },
        { label: '1 hour', value: '60' },
        { label: '1.5 hours', value: '90' },
        { label: '2 hours', value: '120' },
        { label: '3 hours', value: '180' },
    ]

    if (!open) return null

    return (
        <GlobalModal onCancel={onClose} className="max-w-[550px]">
            <FormProvider {...methods}>
                <div className="p-6">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 text-primaryNew text-xl font-semibold mb-2">
                            <CalendarCheck className="h-5 w-5" />
                            <Typography variant="h3">
                                Book Appointment
                            </Typography>
                        </div>
                        <Typography variant="small" className="text-gray-600">
                            Schedule an appointment between the student and
                            industry contact person
                        </Typography>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Building2 className="h-4 w-4 text-primaryNew" />
                                <Typography variant="label">
                                    Appointment Type *
                                </Typography>
                            </div>
                            <Select
                                name="appointmentType"
                                options={appointmentTypes}
                                value={appointmentType}
                                onChange={(val: any) => setAppointmentType(val)}
                                placeholder="Select appointment type"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="h-4 w-4 text-primaryNew" />
                                    <Typography variant="label">
                                        Date *
                                    </Typography>
                                </div>
                                <TextInput
                                    name="appointmentDate"
                                    type="date"
                                    value={appointmentDate}
                                    onChange={(e: any) =>
                                        onAppointmentDateChange(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock className="h-4 w-4 text-primaryNew" />
                                    <Typography variant="label">
                                        Time *
                                    </Typography>
                                </div>
                                <TextInput
                                    name="appointmentTime"
                                    type="time"
                                    value={appointmentTime}
                                    onChange={(e: any) =>
                                        setAppointmentTime(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Clock className="h-4 w-4 text-primaryNew" />
                                <Typography variant="label">
                                    Duration *
                                </Typography>
                            </div>
                            <Select
                                name="appointmentDuration"
                                options={durations}
                                value={appointmentDuration}
                                onChange={(val: any) =>
                                    setAppointmentDuration(val)
                                }
                                placeholder="Select duration"
                            />
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <MessageSquare className="h-4 w-4 text-primaryNew" />
                                <Typography variant="label">
                                    Note (Optional)
                                </Typography>
                            </div>
                            <TextArea
                                name="appointmentNote"
                                placeholder="Add any additional details or instructions for the appointment..."
                                rows={3}
                                value={appointmentNote}
                                onChange={(e: any) =>
                                    setAppointmentNote(e.target.value)
                                }
                            />
                        </div>

                        {(appointmentType === 'in-person' ||
                            appointmentType === 'site-tour') && (
                            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-sm text-blue-900 font-medium mb-1 flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    Location
                                </p>
                                <p className="text-sm text-blue-700">
                                    St Vincent's Hospital, Fitzroy
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                        <Button
                            variant="secondary"
                            onClick={onClose}
                            text="Cancel"
                        />
                        <Button
                            variant="primaryNew"
                            onClick={onConfirm}
                            disabled={!appointmentDate || !appointmentTime}
                            Icon={CheckCircle2}
                            text="Confirm Appointment"
                        />
                    </div>
                </div>
            </FormProvider>
        </GlobalModal>
    )
}
