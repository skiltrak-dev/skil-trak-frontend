import {
    X,
    Calendar,
    Clock,
    MapPin,
    User,
    FileText,
    Edit2,
    Trash2,
} from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@components/ui/dialog'
import { Button, Badge } from '@components'
import type { Appointment } from './types'
import { getTypeIcon, getTypeLabel } from './utils'

interface AppointmentDetailsModalProps {
    appointment: Appointment | null
    isOpen: boolean
    onClose: () => void
}

export function AppointmentDetailsModal({
    appointment,
    isOpen,
    onClose,
}: AppointmentDetailsModalProps) {
    if (!appointment) return null

    const TypeIcon = getTypeIcon(appointment.type)
    const isUpcoming = appointment.status === 'upcoming'

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <div className="flex items-start justify-between">
                        <DialogTitle className="flex items-center gap-3">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                                style={{
                                    background: `linear-gradient(135deg, ${appointment.color}, ${appointment.color}dd)`,
                                }}
                            >
                                <TypeIcon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[#1A2332]">
                                        {appointment.title}
                                    </span>
                                    <Badge
                                        variant={'info'}
                                        className={`${
                                            isUpcoming
                                                ? 'bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20'
                                                : 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20'
                                        } hover:bg-opacity-20`}
                                    >
                                        {getTypeLabel(appointment.type)}
                                    </Badge>
                                </div>
                                <Badge
                                    variant={'info'}
                                    className={`text-[10px] ${
                                        isUpcoming
                                            ? 'bg-[#8B5CF6]/5 text-[#8B5CF6]'
                                            : 'bg-[#10B981]/5 text-[#10B981]'
                                    }`}
                                >
                                    {isUpcoming ? 'Upcoming' : 'Completed'}
                                </Badge>
                            </div>
                        </DialogTitle>
                    </div>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Description */}
                    <div>
                        <h4 className="text-sm font-semibold text-[#1A2332] mb-2">
                            Description
                        </h4>
                        <p className="text-sm text-[#64748B]">
                            {appointment.description}
                        </p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs text-[#64748B]">
                                <Calendar className="w-4 h-4 text-[#8B5CF6]" />
                                <span className="font-medium">Date</span>
                            </div>
                            <p className="text-sm text-[#1A2332] font-medium ml-6">
                                {appointment.date}
                            </p>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs text-[#64748B]">
                                <Clock className="w-4 h-4 text-[#8B5CF6]" />
                                <span className="font-medium">Time</span>
                            </div>
                            <p className="text-sm text-[#1A2332] font-medium ml-6">
                                {appointment.time}
                            </p>
                        </div>

                        <div className="space-y-1 col-span-2">
                            <div className="flex items-center gap-2 text-xs text-[#64748B]">
                                <MapPin className="w-4 h-4 text-[#8B5CF6]" />
                                <span className="font-medium">Location</span>
                            </div>
                            <p className="text-sm text-[#1A2332] font-medium ml-6">
                                {appointment.location}
                            </p>
                        </div>
                    </div>

                    {/* Attendees */}
                    <div>
                        <div className="flex items-center gap-2 text-xs text-[#64748B] mb-2">
                            <User className="w-4 h-4 text-[#8B5CF6]" />
                            <span className="font-medium">Attendees</span>
                        </div>
                        <div className="flex flex-wrap gap-2 ml-6">
                            {appointment.attendees.map((attendee, index) => (
                                <Badge
                                    key={index}
                                    variant="primaryNew"
                                    outline
                                    className="bg-[#F8FAFB] border-[#E2E8F0] text-[#1A2332]"
                                >
                                    {attendee}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Attachments */}
                    {appointment.attachments > 0 && (
                        <div>
                            <div className="flex items-center gap-2 text-xs text-[#64748B] mb-2">
                                <FileText className="w-4 h-4 text-[#8B5CF6]" />
                                <span className="font-medium">Attachments</span>
                            </div>
                            <p className="text-sm text-[#1A2332] ml-6">
                                {appointment.attachments} file
                                {appointment.attachments > 1 ? 's' : ''}{' '}
                                attached
                            </p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#E2E8F0]">
                        <Button
                            variant="error"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                        </Button>
                        <div className="flex gap-2">
                            <Button variant="secondary" onClick={onClose}>
                                Close
                            </Button>
                            <Button className="bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] text-white hover:shadow-lg transition-all">
                                <Edit2 className="w-4 h-4 mr-2" />
                                Edit Appointment
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
