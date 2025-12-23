import { Supervisor } from '@types'
import { motion } from 'framer-motion'
import { Clock, Award, Phone, Mail, Edit2, CheckCircle } from 'lucide-react'

interface SupervisorCardProps {
    supervisor: Supervisor
    index: number
}

export function SupervisorCard({ supervisor, index }: SupervisorCardProps) {
    return (
        <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -2 }}
            className="bg-white rounded-lg p-2 border border-[#E2E8F0] hover:border-[#044866]/30 hover:shadow-lg transition-all duration-300 group"
        >
            <div className="flex items-start gap-2">
                {/* Premium Avatar */}
                <div className="relative flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#044866] to-[#0D5468] rounded-lg flex items-center justify-center text-white shadow-md">
                        <span className="text-[10px] font-bold">
                            {supervisor.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                        </span>
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#10B981] rounded-full border border-white flex items-center justify-center shadow-sm">
                        <CheckCircle className="w-2 h-2 text-white" />
                    </div>
                </div>

                {/* Supervisor Details */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex-1 min-w-0">
                            <h5 className="font-bold text-[#1A2332] mb-0.5 text-[11px]">
                                {supervisor.name}
                            </h5>
                            <p className="text-[10px] text-[#64748B] mb-1">
                                {supervisor.role}
                            </p>

                            {/* Experience Badge */}
                            <div className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-gradient-to-br from-[#E8F4F8] to-[#D1E7F0] rounded-md">
                                <Clock className="w-2.5 h-2.5 text-[#044866]" />
                                <span className="text-[9px] font-medium text-[#044866]">
                                    {supervisor.experience} years experience
                                </span>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-1.5 py-0.5 text-[9px] font-medium text-[#044866] hover:bg-[#E8F4F8] rounded-md transition-all opacity-0 group-hover:opacity-100 flex items-center gap-0.5"
                        >
                            <Edit2 className="w-2.5 h-2.5" />
                            Edit
                        </motion.button>
                    </div>

                    {/* Qualifications - Premium Card */}
                    <div className="bg-gradient-to-br from-[#F8FAFB] to-[#E8F4F8] rounded-md p-1.5 mb-1 border border-[#E2E8F0]/50">
                        <div className="flex items-center gap-1 mb-0.5">
                            <Award className="w-2.5 h-2.5 text-[#044866]" />
                            <span className="text-[8px] font-bold text-[#044866] uppercase tracking-wide">
                                Qualifications
                            </span>
                        </div>
                        <p className="text-[10px] text-[#1A2332] leading-relaxed">
                            {supervisor.title}
                        </p>
                    </div>

                    {/* Description */}
                    <p className="text-[10px] text-[#64748B] leading-relaxed mb-1.5">
                        {supervisor.description}
                    </p>

                    {/* Contact Information - Enhanced */}
                    <div className="flex items-center gap-2 pt-1.5 border-t border-[#E2E8F0]">
                        <a
                            href={`tel:${supervisor.phone}`}
                            className="flex items-center gap-1 text-[10px] text-[#64748B] hover:text-[#044866] transition-all group/contact"
                        >
                            <div className="w-5 h-5 rounded-md bg-[#F8FAFB] group-hover/contact:bg-[#E8F4F8] flex items-center justify-center transition-all">
                                <Phone className="w-2.5 h-2.5" />
                            </div>
                            <span className="hidden lg:inline text-[9px]">
                                {supervisor.phone}
                            </span>
                        </a>
                        <a
                            href={`mailto:${supervisor.email}`}
                            className="flex items-center gap-1 text-[10px] text-[#64748B] hover:text-[#044866] transition-all group/contact flex-1 min-w-0"
                        >
                            <div className="w-5 h-5 rounded-md bg-[#F8FAFB] group-hover/contact:bg-[#E8F4F8] flex items-center justify-center transition-all flex-shrink-0">
                                <Mail className="w-2.5 h-2.5" />
                            </div>
                            <span className="truncate hidden lg:inline text-[9px]">
                                {supervisor.email}
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
