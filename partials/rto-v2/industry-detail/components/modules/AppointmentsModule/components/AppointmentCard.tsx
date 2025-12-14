import {
    Calendar,
    Clock,
    MapPin,
    File,
    Edit2,
    MoreVertical,
} from 'lucide-react'
import type { Appointment } from './types'
import { getTypeIcon, getTypeLabel } from './utils'

interface AppointmentCardProps {
    appointment: Appointment
    onClick: () => void
}

export function AppointmentCard({
    appointment,
    onClick,
}: AppointmentCardProps) {
    const TypeIcon = getTypeIcon(appointment.type)
    const isUpcoming = appointment.status === 'upcoming'

    return (
        <div
            className="group relative bg-gradient-to-br from-white to-[#F8FAFB] rounded-xl border border-[#E2E8F0] p-4 hover:shadow-lg hover:border-[#8B5CF6]/30 transition-all cursor-pointer"
            onClick={onClick}
        >
            {/* Status Indicator */}
            <div
                className={`absolute top-0 left-0 w-1 h-full rounded-l-xl ${
                    isUpcoming
                        ? 'bg-gradient-to-b from-[#8B5CF6] to-[#7C3AED]'
                        : 'bg-gradient-to-b from-[#10B981] to-[#059669]'
                }`}
            />

            <div className="ml-3 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                    {/* Icon */}
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md"
                        style={{
                            background: `linear-gradient(135deg, ${appointment.color}, ${appointment.color}dd)`,
                        }}
                    >
                        <TypeIcon className="w-5 h-5 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2 mb-1">
                            <h4 className="font-semibold text-[#1A2332] text-sm">
                                {appointment.title}
                            </h4>
                            <span
                                className={`px-2 py-0.5 rounded-full text-[9px] font-semibold flex-shrink-0 ${
                                    isUpcoming
                                        ? 'bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20'
                                        : 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20'
                                }`}
                            >
                                {getTypeLabel(appointment.type)}
                            </span>
                        </div>

                        <p className="text-xs text-[#64748B] mb-2 line-clamp-1">
                            {appointment.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-[10px] text-[#64748B]">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>{appointment.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{appointment.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span className="truncate max-w-[150px]">
                                    {appointment.location}
                                </span>
                            </div>
                            {appointment.attachments > 0 && (
                                <div className="flex items-center gap-1 text-[#8B5CF6]">
                                    <File className="w-3 h-3" />
                                    <span>{appointment.attachments} files</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        className="p-1.5 hover:bg-[#F8FAFB] rounded-lg transition-colors"
                        onClick={(e) => {
                            e.stopPropagation()
                            // Handle edit
                        }}
                    >
                        <Edit2 className="w-3.5 h-3.5 text-[#64748B]" />
                    </button>
                    <button
                        className="p-1.5 hover:bg-[#F8FAFB] rounded-lg transition-colors"
                        onClick={(e) => {
                            e.stopPropagation()
                            // Handle more actions
                        }}
                    >
                        <MoreVertical className="w-3.5 h-3.5 text-[#64748B]" />
                    </button>
                </div>
            </div>
        </div>
    )
}
