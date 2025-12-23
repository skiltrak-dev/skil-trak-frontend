import { motion, AnimatePresence } from 'framer-motion'
import {
    X,
    UserCheck,
    Mail,
    Phone,
    Briefcase,
    Award,
    Calendar,
} from 'lucide-react'
import { Supervisor } from '../types'

interface SupervisorsModalProps {
    isOpen: boolean
    onClose: () => void
    supervisors: Supervisor[]
    sectorName: string
}

export function SupervisorsModal({
    isOpen,
    onClose,
    supervisors,
    sectorName,
}: SupervisorsModalProps) {
    if (!isOpen) return null

    return (
        <AnimatePresence>
            <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                role="dialog"
                aria-modal="true"
                aria-labelledby="supervisors-modal-title"
            >
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    aria-hidden="true"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                >
                    {/* Header */}
                    <div className="relative bg-gradient-to-br from-[#044866] to-[#0D5468] px-6 py-5">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                        <div className="relative flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                                        <UserCheck className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2
                                            id="supervisors-modal-title"
                                            className="text-xl font-bold text-white"
                                        >
                                            Supervisors
                                        </h2>
                                        <p className="text-sm text-white/80 mt-0.5">
                                            {sectorName}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all"
                                aria-label="Close dialog"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Supervisor Count */}
                        <div className="relative mt-4 flex items-center gap-2">
                            <div className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                                <p className="text-xs text-white/90 font-semibold">
                                    {supervisors.length}{' '}
                                    {supervisors.length === 1
                                        ? 'Supervisor'
                                        : 'Supervisors'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {supervisors.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#E8F4F8] to-[#F8FAFB] flex items-center justify-center mb-4">
                                    <UserCheck className="w-10 h-10 text-[#64748B]" />
                                </div>
                                <p className="text-base font-semibold text-[#1A2332] mb-1">
                                    No Supervisors Added
                                </p>
                                <p className="text-sm text-[#64748B]">
                                    There are no supervisors assigned to this
                                    sector yet.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {supervisors.map((supervisor, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-gradient-to-br from-[#FAFBFC] to-white rounded-xl p-5 border-2 border-[#E2E8F0] hover:border-[#044866]/30 hover:shadow-xl transition-all duration-300"
                                    >
                                        {/* Supervisor Header */}
                                        <div className="flex items-start gap-3 mb-4">
                                            {/* Avatar */}
                                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#044866] to-[#0D5468] flex items-center justify-center shadow-lg flex-shrink-0">
                                                <span className="text-white font-bold text-lg">
                                                    {supervisor.name
                                                        .split(' ')
                                                        .map((n) => n[0])
                                                        .join('')
                                                        .toUpperCase()}
                                                </span>
                                            </div>

                                            {/* Name & Title */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-[#1A2332] mb-0.5 truncate">
                                                    {supervisor.name}
                                                </h3>
                                                <p className="text-xs text-[#044866] font-semibold mb-1">
                                                    {supervisor.title}
                                                </p>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="px-2 py-0.5 bg-gradient-to-r from-[#E8F4F8] to-[#F8FAFB] rounded-full border border-[#E2E8F0]">
                                                        <p className="text-[9px] text-[#64748B] font-medium">
                                                            {supervisor.role}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 mb-4 border border-[#E2E8F0]">
                                            <p className="text-xs text-[#64748B] leading-relaxed">
                                                {supervisor.description}
                                            </p>
                                        </div>

                                        {/* Experience */}
                                        <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-gradient-to-br from-[#10B981]/10 to-transparent rounded-lg border border-[#10B981]/20">
                                            <Award className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="text-[9px] text-[#64748B] uppercase tracking-wide font-semibold">
                                                    Experience
                                                </p>
                                                <p className="text-xs font-bold text-[#059669]">
                                                    {supervisor.experience}{' '}
                                                    {supervisor.experience === 1
                                                        ? 'Year'
                                                        : 'Years'}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Contact Information */}
                                        <div className="space-y-2">
                                            {/* Email */}
                                            <div className="flex items-start gap-2 group">
                                                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#E8F4F8] to-[#F8FAFB] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                                    <Mail className="w-3.5 h-3.5 text-[#044866]" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[9px] text-[#64748B] uppercase tracking-wide font-semibold mb-0.5">
                                                        Email
                                                    </p>
                                                    <a
                                                        href={`mailto:${supervisor.email}`}
                                                        className="text-xs text-[#044866] hover:text-[#0D5468] font-medium truncate block hover:underline transition-colors"
                                                    >
                                                        {supervisor.email}
                                                    </a>
                                                </div>
                                            </div>

                                            {/* Phone */}
                                            <div className="flex items-start gap-2 group">
                                                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#E8F4F8] to-[#F8FAFB] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                                    <Phone className="w-3.5 h-3.5 text-[#044866]" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[9px] text-[#64748B] uppercase tracking-wide font-semibold mb-0.5">
                                                        Phone
                                                    </p>
                                                    <a
                                                        href={`tel:${supervisor.phone}`}
                                                        className="text-xs text-[#044866] hover:text-[#0D5468] font-medium hover:underline transition-colors"
                                                    >
                                                        {supervisor.phone}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-[#E2E8F0] bg-gradient-to-br from-[#FAFBFC] to-white px-6 py-4">
                        <div className="flex items-center justify-between">
                            <p className="text-xs text-[#64748B]">
                                {supervisors.length > 0
                                    ? `Managing ${
                                          supervisors.length
                                      } supervisor${
                                          supervisors.length === 1 ? '' : 's'
                                      } for this sector`
                                    : 'No supervisors assigned yet'}
                            </p>
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-gradient-to-br from-[#044866] to-[#0D5468] text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}
