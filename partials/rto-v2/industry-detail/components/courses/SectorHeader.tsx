import { motion } from 'framer-motion'
import {
    BookOpen,
    User,
    CheckCircle,
    FileSignature,
    Calendar,
    UserCheck,
    ChevronDown,
    Users,
    Clock,
    TrendingUp,
    Edit2,
    Target,
} from 'lucide-react'

interface ESignature {
    status: string
    sentDate: string
    sentBy: string
    signedDate?: string | null
    signedBy?: string | null
    approvedDate?: string | null
    approvedBy?: string | null
    documentUrl: string
}

interface SectorHeaderProps {
    sector: {
        id: number
        name: string
        icon: string
        color: string
        eSignature?: ESignature
        courses: any[]
        supervisors: any[]
    }
    sectorStudents: number
    sectorCapacity: number
    capacityPercent: number
    duration?: string
    expandedESignatures: number[]
    toggleESignature: (id: number) => void
    startEditingSectorMetrics: (id: number) => void
    isExpanded: boolean
}

export function SectorHeader({
    isExpanded,
    sector,
    sectorStudents,
    sectorCapacity,
    capacityPercent,
    duration,
    expandedESignatures,
    toggleESignature,
    startEditingSectorMetrics,
}: SectorHeaderProps) {
    return (
        <div className="w-full">
            {/* Premium Gradient Background Layer */}
            <div className="relative overflow-hidden rounded-t-lg bg-gradient-to-br from-white via-[#FAFBFC] to-white">
                {/* Animated gradient accent */}
                <div
                    className={`absolute inset-0 bg-gradient-to-r ${sector.color} opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700`}
                ></div>

                {/* Main Content */}
                <div className="relative">
                    {/* Top Section - Icon, Title, Status */}
                    <div className="p-5 pb-4">
                        <div className="flex items-start gap-4">
                            {/* Premium 3D Icon with Glow */}
                            <motion.div
                                whileHover={{ scale: 1.08, rotate: -5 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 400,
                                    damping: 10,
                                }}
                                className="relative flex-shrink-0"
                            >
                                {/* Outer glow - extra blur */}
                                <div
                                    className={`absolute -inset-3 rounded-2xl bg-gradient-to-br ${sector.color} blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-700`}
                                ></div>
                                {/* Middle glow */}
                                <div
                                    className={`absolute -inset-1.5 rounded-xl bg-gradient-to-br ${sector.color} blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500`}
                                ></div>
                                {/* Icon container with shadow */}
                                <div
                                    className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${sector.color} flex items-center justify-center shadow-2xl group-hover:shadow-3xl overflow-hidden transition-all duration-500`}
                                >
                                    {/* Top shine gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent"></div>
                                    {/* Animated shimmer on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                                    {/* Bottom shadow for depth */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                                    {/* Icon with drop shadow */}
                                    <span className="relative z-10 text-3xl filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                                        {sector.icon}
                                    </span>
                                </div>
                            </motion.div>

                            {/* Title & Content Section */}
                            <div className="flex-1 min-w-0 space-y-3.5">
                                {/* Title Row with Approved Badge */}
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-[#1A2332] mb-2 group-hover:text-[#044866] transition-colors leading-tight">
                                            {sector.name}
                                        </h3>

                                        {/* Info Pills - Enhanced */}
                                        <div className="flex items-center gap-2 flex-wrap">
                                            {/* Courses Pill */}
                                            <motion.div
                                                whileHover={{
                                                    scale: 1.05,
                                                    y: -1,
                                                }}
                                                className="px-3 py-1.5 bg-white/90 backdrop-blur-sm border border-[#E2E8F0] rounded-full flex items-center gap-2 shadow-sm hover:shadow-md hover:border-[#044866]/30 transition-all"
                                            >
                                                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#E8F4F8] to-[#D1E7F0] flex items-center justify-center shadow-sm">
                                                    <BookOpen className="w-3 h-3 text-[#044866]" />
                                                </div>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-xs font-bold text-[#1A2332]">
                                                        {sector.courses.length}
                                                    </span>
                                                    <span className="text-xs text-[#64748B]">
                                                        courses
                                                    </span>
                                                </div>
                                            </motion.div>

                                            {/* Supervisors Pill */}
                                            <motion.div
                                                whileHover={{
                                                    scale: 1.05,
                                                    y: -1,
                                                }}
                                                className="px-3 py-1.5 bg-white/90 backdrop-blur-sm border border-[#E2E8F0] rounded-full flex items-center gap-2 shadow-sm hover:shadow-md hover:border-[#F7A619]/30 transition-all"
                                            >
                                                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] flex items-center justify-center shadow-sm">
                                                    <User className="w-3 h-3 text-[#F7A619]" />
                                                </div>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-xs font-bold text-[#1A2332]">
                                                        {
                                                            sector.supervisors
                                                                .length
                                                        }
                                                    </span>
                                                    <span className="text-xs text-[#64748B]">
                                                        supervisors
                                                    </span>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Approved Status Badge - Premium Floating Design */}
                                    {sector.eSignature && (
                                        <motion.div
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`relative px-4 py-2 rounded-2xl flex items-center gap-2.5 shadow-xl transition-all cursor-pointer ${
                                                sector.eSignature.status ===
                                                'approved'
                                                    ? 'bg-gradient-to-br from-[#D1FAE5] via-[#A7F3D0] to-[#D1FAE5] shadow-[#10B981]/30'
                                                    : sector.eSignature
                                                          .status === 'signed'
                                                    ? 'bg-gradient-to-br from-[#DBEAFE] via-[#BAE6FD] to-[#DBEAFE] shadow-[#3B82F6]/30'
                                                    : 'bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FEF3C7] shadow-[#F7A619]/30'
                                            }`}
                                        >
                                            {/* Glow effect */}
                                            <div
                                                className={`absolute inset-0 rounded-2xl blur-xl ${
                                                    sector.eSignature.status ===
                                                    'approved'
                                                        ? 'bg-[#10B981] opacity-20'
                                                        : sector.eSignature
                                                              .status ===
                                                          'signed'
                                                        ? 'bg-[#3B82F6] opacity-20'
                                                        : 'bg-[#F7A619] opacity-20'
                                                }`}
                                            ></div>

                                            {/* Content */}
                                            <div className="relative flex items-center gap-2.5">
                                                <div
                                                    className={`w-6 h-6 rounded-xl flex items-center justify-center shadow-md ${
                                                        sector.eSignature
                                                            .status ===
                                                        'approved'
                                                            ? 'bg-white/70 backdrop-blur-sm'
                                                            : sector.eSignature
                                                                  .status ===
                                                              'signed'
                                                            ? 'bg-white/70 backdrop-blur-sm'
                                                            : 'bg-white/70 backdrop-blur-sm'
                                                    }`}
                                                >
                                                    <CheckCircle
                                                        className={`w-4 h-4 ${
                                                            sector.eSignature
                                                                .status ===
                                                            'approved'
                                                                ? 'text-[#059669]'
                                                                : sector
                                                                      .eSignature
                                                                      .status ===
                                                                  'signed'
                                                                ? 'text-[#2563EB]'
                                                                : 'text-[#EA580C]'
                                                        }`}
                                                        fill="currentColor"
                                                    />
                                                </div>
                                                <span
                                                    className={`text-sm font-bold ${
                                                        sector.eSignature
                                                            .status ===
                                                        'approved'
                                                            ? 'text-[#065F46]'
                                                            : sector.eSignature
                                                                  .status ===
                                                              'signed'
                                                            ? 'text-[#1E40AF]'
                                                            : 'text-[#92400E]'
                                                    }`}
                                                >
                                                    {sector.eSignature
                                                        .status === 'approved'
                                                        ? 'Approved'
                                                        : sector.eSignature
                                                              .status ===
                                                          'signed'
                                                        ? 'Signed'
                                                        : 'Pending'}
                                                </span>
                                            </div>
                                        </motion.div>
                                    )}
                                    <div className="flex items-start">
                                        <motion.div
                                            animate={{
                                                rotate: isExpanded ? 180 : 0,
                                            }}
                                            transition={{ duration: 0.3 }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg ${
                                                isExpanded
                                                    ? 'bg-gradient-to-br from-[#044866] to-[#0D5468] text-white shadow-[#044866]/30'
                                                    : 'bg-white text-[#64748B] group-hover:bg-gradient-to-br group-hover:from-[#F8FAFB] group-hover:to-[#E8F4F8] group-hover:text-[#044866] border border-[#E2E8F0]'
                                            }`}
                                        >
                                            <ChevronDown className="w-5 h-5" />
                                        </motion.div>
                                    </div>
                                </div>

                                {/* E-Signature Card - Apple-Inspired Design */}
                                {sector.eSignature && (
                                    <motion.button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            toggleESignature(sector.id)
                                        }}
                                        whileHover={{ scale: 1.005, y: -1 }}
                                        whileTap={{ scale: 0.995 }}
                                        className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left group/esign relative overflow-hidden ${
                                            sector.eSignature.status ===
                                            'approved'
                                                ? 'bg-gradient-to-br from-white via-[#F0FDF4] to-white border-[#D1FAE5] hover:border-[#10B981] hover:shadow-xl shadow-[#10B981]/5'
                                                : sector.eSignature.status ===
                                                  'signed'
                                                ? 'bg-gradient-to-br from-white via-[#EFF6FF] to-white border-[#DBEAFE] hover:border-[#3B82F6] hover:shadow-xl shadow-[#3B82F6]/5'
                                                : 'bg-gradient-to-br from-white via-[#FFFBEB] to-white border-[#FEF3C7] hover:border-[#F7A619] hover:shadow-xl shadow-[#F7A619]/5'
                                        }`}
                                    >
                                        {/* Subtle gradient overlay */}
                                        <div
                                            className={`absolute inset-0 opacity-0 group-hover/esign:opacity-100 transition-opacity duration-300 ${
                                                sector.eSignature.status ===
                                                'approved'
                                                    ? 'bg-gradient-to-br from-[#ECFDF5]/50 to-transparent'
                                                    : sector.eSignature
                                                          .status === 'signed'
                                                    ? 'bg-gradient-to-br from-[#EFF6FF]/50 to-transparent'
                                                    : 'bg-gradient-to-br from-[#FFFBEB]/50 to-transparent'
                                            }`}
                                        ></div>

                                        <div className="relative flex items-start gap-3.5">
                                            {/* Icon with glassmorphism */}
                                            <div
                                                className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 backdrop-blur-sm ${
                                                    sector.eSignature.status ===
                                                    'approved'
                                                        ? 'bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0]'
                                                        : sector.eSignature
                                                              .status ===
                                                          'signed'
                                                        ? 'bg-gradient-to-br from-[#DBEAFE] to-[#BAE6FD]'
                                                        : 'bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]'
                                                }`}
                                            >
                                                <FileSignature
                                                    className={`w-6 h-6 ${
                                                        sector.eSignature
                                                            .status ===
                                                        'approved'
                                                            ? 'text-[#065F46]'
                                                            : sector.eSignature
                                                                  .status ===
                                                              'signed'
                                                            ? 'text-[#1E40AF]'
                                                            : 'text-[#92400E]'
                                                    }`}
                                                />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h4 className="text-sm font-bold text-[#1A2332]">
                                                        Facility Checklist
                                                        E-Signature
                                                    </h4>
                                                    <div
                                                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-sm ${
                                                            sector.eSignature
                                                                .status ===
                                                            'approved'
                                                                ? 'bg-[#059669] text-white'
                                                                : sector
                                                                      .eSignature
                                                                      .status ===
                                                                  'signed'
                                                                ? 'bg-[#2563EB] text-white'
                                                                : 'bg-[#F7A619] text-white'
                                                        }`}
                                                    >
                                                        {sector.eSignature
                                                            .status ===
                                                        'approved'
                                                            ? 'Approved'
                                                            : sector.eSignature
                                                                  .status ===
                                                              'signed'
                                                            ? 'Signed'
                                                            : 'Pending'}
                                                    </div>
                                                </div>

                                                {/* Date */}
                                                <div className="flex items-center gap-2 mb-2.5">
                                                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/60 backdrop-blur-sm rounded-lg border border-[#E2E8F0]">
                                                        <Calendar className="w-3.5 h-3.5 text-[#64748B]" />
                                                        <span className="text-[11px] font-semibold text-[#1A2332]">
                                                            {sector.eSignature
                                                                .status ===
                                                                'approved' &&
                                                            sector.eSignature
                                                                .approvedDate
                                                                ? new Date(
                                                                      sector.eSignature.approvedDate
                                                                  ).toLocaleDateString(
                                                                      'en-AU',
                                                                      {
                                                                          day: 'numeric',
                                                                          month: 'short',
                                                                          year: 'numeric',
                                                                      }
                                                                  )
                                                                : sector
                                                                      .eSignature
                                                                      .status ===
                                                                      'signed' &&
                                                                  sector
                                                                      .eSignature
                                                                      .signedDate
                                                                ? new Date(
                                                                      sector.eSignature.signedDate
                                                                  ).toLocaleDateString(
                                                                      'en-AU',
                                                                      {
                                                                          day: 'numeric',
                                                                          month: 'short',
                                                                          year: 'numeric',
                                                                      }
                                                                  )
                                                                : sector
                                                                      .eSignature
                                                                      .sentDate
                                                                ? new Date(
                                                                      sector.eSignature.sentDate
                                                                  ).toLocaleDateString(
                                                                      'en-AU',
                                                                      {
                                                                          day: 'numeric',
                                                                          month: 'short',
                                                                          year: 'numeric',
                                                                      }
                                                                  )
                                                                : ''}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Signer */}
                                                {(sector.eSignature
                                                    .approvedBy ||
                                                    sector.eSignature
                                                        .signedBy) && (
                                                    <div className="flex items-center gap-2 px-3 py-2 bg-white/70 backdrop-blur-sm rounded-xl border border-[#E2E8F0] shadow-sm">
                                                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#E2E8F0] to-[#CBD5E1] flex items-center justify-center flex-shrink-0">
                                                            <UserCheck className="w-4 h-4 text-[#64748B]" />
                                                        </div>
                                                        <p className="text-[11px] font-semibold text-[#1A2332] flex-1">
                                                            {sector.eSignature
                                                                .approvedBy ||
                                                                sector
                                                                    .eSignature
                                                                    .signedBy}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Chevron indicator */}
                                            <ChevronDown
                                                className={`w-5 h-5 text-[#64748B] transition-transform duration-300 flex-shrink-0 mt-2 ${
                                                    expandedESignatures.includes(
                                                        sector.id
                                                    )
                                                        ? 'rotate-180'
                                                        : ''
                                                }`}
                                            />
                                        </div>
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Divider with gradient */}
                    <div className="relative h-px bg-gradient-to-r from-transparent via-[#E2E8F0] to-transparent"></div>

                    {/* Premium Metrics Section - Glass Morphism */}
                    <div className="p-5 pt-4 bg-gradient-to-br from-white/80 via-white/50 to-white/80 backdrop-blur-sm">
                        <div className="flex items-center gap-3 flex-wrap">
                            {/* Students Card - Premium */}
                            <motion.button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    startEditingSectorMetrics(sector.id)
                                }}
                                whileHover={{ scale: 1.03, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                className="flex-1 min-w-[140px] relative group/metric overflow-hidden"
                            >
                                {/* Background with gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#E8F4F8] via-[#D1E7F0] to-[#B9D7E5] rounded-2xl"></div>
                                {/* Shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-2xl"></div>
                                {/* Hover glow */}
                                <div className="absolute -inset-1 bg-gradient-to-br from-[#044866] to-[#0D5468] rounded-2xl blur-lg opacity-0 group-hover/metric:opacity-20 transition-opacity duration-300"></div>

                                {/* Content */}
                                <div className="relative p-4 rounded-2xl border-2 border-white/50 shadow-lg group-hover/metric:shadow-xl transition-all">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
                                            <Users className="w-4.5 h-4.5 text-[#044866]" />
                                        </div>
                                        <span className="text-[10px] font-bold text-[#044866] uppercase tracking-wider">
                                            Students
                                        </span>
                                        <Edit2 className="w-3.5 h-3.5 text-[#044866] opacity-0 group-hover/metric:opacity-100 transition-opacity ml-auto" />
                                    </div>
                                    <div className="flex items-baseline gap-1.5">
                                        <span className="text-2xl font-bold text-[#044866]">
                                            {sectorStudents}
                                        </span>
                                        <span className="text-sm text-[#0D5468]/70 font-semibold">
                                            / {sectorCapacity}
                                        </span>
                                    </div>
                                </div>
                            </motion.button>

                            {/* Duration Card - Premium */}
                            {duration && (
                                <motion.button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        startEditingSectorMetrics(sector.id)
                                    }}
                                    whileHover={{ scale: 1.03, y: -2 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="flex-1 min-w-[140px] relative group/metric overflow-hidden"
                                >
                                    {/* Background with gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D] rounded-2xl"></div>
                                    {/* Shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-2xl"></div>
                                    {/* Hover glow */}
                                    <div className="absolute -inset-1 bg-gradient-to-br from-[#F7A619] to-[#EA580C] rounded-2xl blur-lg opacity-0 group-hover/metric:opacity-20 transition-opacity duration-300"></div>

                                    {/* Content */}
                                    <div className="relative p-4 rounded-2xl border-2 border-white/50 shadow-lg group-hover/metric:shadow-xl transition-all">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-8 h-8 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
                                                <Clock className="w-4.5 h-4.5 text-[#F7A619]" />
                                            </div>
                                            <span className="text-[10px] font-bold text-[#92400E] uppercase tracking-wider">
                                                Duration
                                            </span>
                                            <Edit2 className="w-3.5 h-3.5 text-[#92400E] opacity-0 group-hover/metric:opacity-100 transition-opacity ml-auto" />
                                        </div>
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-2xl font-bold text-[#92400E]">
                                                {duration.split(' ')[0]}
                                            </span>
                                            <span className="text-sm text-[#92400E]/70 font-semibold">
                                                {duration.split(' ')[1]}
                                            </span>
                                        </div>
                                    </div>
                                </motion.button>
                            )}

                            {/* Capacity Card - Premium */}
                            <motion.button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    startEditingSectorMetrics(sector.id)
                                }}
                                whileHover={{ scale: 1.03, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                className="flex-1 min-w-[140px] relative group/metric overflow-hidden"
                            >
                                {/* Dynamic background based on capacity */}
                                <div
                                    className={`absolute inset-0 rounded-2xl ${
                                        capacityPercent >= 90
                                            ? 'bg-gradient-to-br from-[#FEE2E2] via-[#FECACA] to-[#FCA5A5]'
                                            : capacityPercent >= 75
                                            ? 'bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D]'
                                            : 'bg-gradient-to-br from-[#D1FAE5] via-[#A7F3D0] to-[#6EE7B7]'
                                    }`}
                                ></div>
                                {/* Shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-2xl"></div>
                                {/* Hover glow */}
                                <div
                                    className={`absolute -inset-1 rounded-2xl blur-lg opacity-0 group-hover/metric:opacity-20 transition-opacity duration-300 ${
                                        capacityPercent >= 90
                                            ? 'bg-gradient-to-br from-[#DC2626] to-[#B91C1C]'
                                            : capacityPercent >= 75
                                            ? 'bg-gradient-to-br from-[#F7A619] to-[#EA580C]'
                                            : 'bg-gradient-to-br from-[#10B981] to-[#059669]'
                                    }`}
                                ></div>

                                {/* Content */}
                                <div className="relative p-4 rounded-2xl border-2 border-white/50 shadow-lg group-hover/metric:shadow-xl transition-all">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
                                            {capacityPercent >= 90 ? (
                                                <TrendingUp
                                                    className={`w-4.5 h-4.5 text-[#DC2626]`}
                                                />
                                            ) : (
                                                <Target
                                                    className={`w-4.5 h-4.5 ${
                                                        capacityPercent >= 75
                                                            ? 'text-[#F7A619]'
                                                            : 'text-[#10B981]'
                                                    }`}
                                                />
                                            )}
                                        </div>
                                        <span
                                            className={`text-[10px] font-bold uppercase tracking-wider ${
                                                capacityPercent >= 90
                                                    ? 'text-[#991B1B]'
                                                    : capacityPercent >= 75
                                                    ? 'text-[#92400E]'
                                                    : 'text-[#065F46]'
                                            }`}
                                        >
                                            Capacity
                                        </span>
                                        <Edit2
                                            className={`w-3.5 h-3.5 opacity-0 group-hover/metric:opacity-100 transition-opacity ml-auto ${
                                                capacityPercent >= 90
                                                    ? 'text-[#991B1B]'
                                                    : capacityPercent >= 75
                                                    ? 'text-[#92400E]'
                                                    : 'text-[#065F46]'
                                            }`}
                                        />
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span
                                            className={`text-2xl font-bold ${
                                                capacityPercent >= 90
                                                    ? 'text-[#991B1B]'
                                                    : capacityPercent >= 75
                                                    ? 'text-[#92400E]'
                                                    : 'text-[#065F46]'
                                            }`}
                                        >
                                            {capacityPercent}%
                                        </span>
                                    </div>
                                </div>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
