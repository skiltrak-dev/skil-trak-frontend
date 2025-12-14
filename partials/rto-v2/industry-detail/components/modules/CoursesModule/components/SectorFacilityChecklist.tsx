import { motion } from 'framer-motion'
import {
    CheckCircle,
    ChevronDown,
    Eye,
    FileSignature,
    Send,
} from 'lucide-react'
import { useState } from 'react'

export const SectorFacilityChecklist = ({ sector }: { sector: any }) => {
    const [showDetail, setshowDetail] = useState(false)
    return (
        <>
            {' '}
            {sector.eSignature && (
                <motion.button
                    onClick={(e) => {
                        e.stopPropagation()
                        setshowDetail(!showDetail)
                    }}
                    whileHover={{
                        scale: 1.02,
                    }}
                    whileTap={{
                        scale: 0.98,
                    }}
                    className={`px-3 py-2 rounded-lg flex items-center gap-2 shadow-sm border transition-all ${
                        sector.eSignature.status === 'approved'
                            ? 'bg-gradient-to-br from-white to-[#ECFDF5] border-[#D1FAE5] hover:shadow-md'
                            : sector.eSignature.status === 'signed'
                            ? 'bg-gradient-to-br from-white to-[#EFF6FF] border-[#DBEAFE] hover:shadow-md'
                            : 'bg-gradient-to-br from-white to-[#FFFBEB] border-[#FEF3C7] hover:shadow-md'
                    }`}
                >
                    <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center ${
                            sector.eSignature.status === 'approved'
                                ? 'bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0] shadow-sm'
                                : sector.eSignature.status === 'signed'
                                ? 'bg-gradient-to-br from-[#DBEAFE] to-[#BAE6FD] shadow-sm'
                                : 'bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] shadow-sm'
                        }`}
                    >
                        <FileSignature
                            className={`w-3.5 h-3.5 ${
                                sector.eSignature.status === 'approved'
                                    ? 'text-[#065F46]'
                                    : sector.eSignature.status === 'signed'
                                    ? 'text-[#1E40AF]'
                                    : 'text-[#F7A619]'
                            }`}
                        />
                    </div>
                    <div className="flex-1 text-left">
                        <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-[10px] font-bold text-[#1A2332]">
                                Facility Checklist E-Signature
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px] text-[#64748B]">
                            <span
                                className={`font-semibold ${
                                    sector.eSignature.status === 'approved'
                                        ? 'text-[#065F46]'
                                        : sector.eSignature.status === 'signed'
                                        ? 'text-[#1E40AF]'
                                        : 'text-[#F7A619]'
                                }`}
                            >
                                {sector.eSignature.status === 'approved'
                                    ? 'Approved'
                                    : sector.eSignature.status === 'signed'
                                    ? 'Signed'
                                    : 'Pending'}
                            </span>
                            <span className="w-0.5 h-0.5 rounded-full bg-[#CBD5E1]"></span>
                            <span>
                                {sector.eSignature.status === 'approved' &&
                                sector.eSignature.approvedDate
                                    ? new Date(
                                          sector.eSignature.approvedDate
                                      ).toLocaleDateString('en-AU', {
                                          day: '2-digit',
                                          month: 'short',
                                          year: 'numeric',
                                      })
                                    : sector.eSignature.status === 'signed' &&
                                      sector.eSignature.signedDate
                                    ? new Date(
                                          sector.eSignature.signedDate
                                      ).toLocaleDateString('en-AU', {
                                          day: '2-digit',
                                          month: 'short',
                                          year: 'numeric',
                                      })
                                    : sector.eSignature.sentDate
                                    ? new Date(
                                          sector.eSignature.sentDate
                                      ).toLocaleDateString('en-AU', {
                                          day: '2-digit',
                                          month: 'short',
                                          year: 'numeric',
                                      })
                                    : ''}
                            </span>
                        </div>
                        {(sector.eSignature.approvedBy ||
                            sector.eSignature.signedBy) && (
                            <p className="text-[9px] text-[#64748B] mt-0.5 font-medium">
                                {sector.eSignature.approvedBy ||
                                    sector.eSignature.signedBy}
                            </p>
                        )}
                    </div>
                    <ChevronDown
                        className={`w-3.5 h-3.5 text-[#64748B] transition-transform duration-200 ${
                            showDetail ? 'rotate-180' : ''
                        }`}
                    />
                </motion.button>
            )}
            {/*  */}
            <div className="col-span-4">
                {showDetail && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: -10,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.3,
                        }}
                        className="overflow-hidden"
                    >
                        <div className="mt-3 bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-sm">
                            <div className="space-y-3">
                                {/* Sent Status */}
                                <div className="flex items-start gap-3">
                                    <div className="flex flex-col items-center">
                                        <motion.div
                                            whileHover={{
                                                scale: 1.1,
                                            }}
                                            className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-md ${
                                                sector.eSignature.sentDate
                                                    ? 'bg-gradient-to-br from-[#10B981] to-[#059669] text-white'
                                                    : 'bg-[#E2E8F0] text-[#94A3B8]'
                                            }`}
                                        >
                                            <Send className="w-4 h-4" />
                                        </motion.div>
                                        {sector.eSignature.status !==
                                            'sent' && (
                                            <div className="w-0.5 h-6 bg-[#E2E8F0]"></div>
                                        )}
                                    </div>
                                    <div className="flex-1 pt-0.5">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <span className="text-xs font-bold text-[#1A2332]">
                                                Sent
                                            </span>
                                            {sector.eSignature.sentDate && (
                                                <span className="text-[10px] text-[#64748B]">
                                                    {new Date(
                                                        sector.eSignature.sentDate
                                                    ).toLocaleDateString(
                                                        'en-AU',
                                                        {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            year: 'numeric',
                                                        }
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                        {sector.eSignature.sentBy && (
                                            <p className="text-xs text-[#64748B]">
                                                {sector.eSignature.sentBy}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Signed Status */}
                                {sector.eSignature.sentDate && (
                                    <div className="flex items-start gap-3">
                                        <div className="flex flex-col items-center">
                                            <motion.div
                                                whileHover={{
                                                    scale: 1.1,
                                                }}
                                                className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-md ${
                                                    sector.eSignature.status ===
                                                        'signed' ||
                                                    sector.eSignature.status ===
                                                        'approved'
                                                        ? 'bg-gradient-to-br from-[#10B981] to-[#059669] text-white'
                                                        : 'bg-[#E2E8F0] text-[#94A3B8]'
                                                }`}
                                            >
                                                <FileSignature className="w-4 h-4" />
                                            </motion.div>
                                            {(sector.eSignature.status ===
                                                'signed' ||
                                                sector.eSignature.status ===
                                                    'approved') && (
                                                <div className="w-0.5 h-6 bg-[#E2E8F0]"></div>
                                            )}
                                        </div>
                                        <div className="flex-1 pt-0.5">
                                            <div className="flex items-center justify-between mb-0.5">
                                                <span className="text-xs font-bold text-[#1A2332]">
                                                    Signed
                                                </span>
                                                {sector.eSignature
                                                    .signedDate && (
                                                    <span className="text-[10px] text-[#64748B]">
                                                        {new Date(
                                                            sector.eSignature.signedDate
                                                        ).toLocaleDateString(
                                                            'en-AU',
                                                            {
                                                                day: '2-digit',
                                                                month: 'short',
                                                                year: 'numeric',
                                                            }
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                            {sector.eSignature.signedBy && (
                                                <p className="text-xs text-[#64748B]">
                                                    {sector.eSignature.signedBy}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Approved Status */}
                                {sector.eSignature.status === 'approved' && (
                                    <div className="flex items-start gap-3">
                                        <div className="flex flex-col items-center">
                                            <motion.div
                                                whileHover={{
                                                    scale: 1.1,
                                                }}
                                                className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#10B981] to-[#059669] text-white flex items-center justify-center shadow-md"
                                            >
                                                <CheckCircle
                                                    className="w-4 h-4"
                                                    fill="currentColor"
                                                />
                                            </motion.div>
                                        </div>
                                        <div className="flex-1 pt-0.5">
                                            <div className="flex items-center justify-between mb-0.5">
                                                <span className="text-xs font-bold text-[#10B981]">
                                                    Approved
                                                </span>
                                                {sector.eSignature
                                                    .approvedDate && (
                                                    <span className="text-[10px] text-[#64748B]">
                                                        {new Date(
                                                            sector.eSignature.approvedDate
                                                        ).toLocaleDateString(
                                                            'en-AU',
                                                            {
                                                                day: '2-digit',
                                                                month: 'short',
                                                                year: 'numeric',
                                                            }
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                            {sector.eSignature.approvedBy && (
                                                <p className="text-xs text-[#64748B] mb-2">
                                                    {
                                                        sector.eSignature
                                                            .approvedBy
                                                    }
                                                </p>
                                            )}
                                            {sector.eSignature.documentUrl && (
                                                <motion.button
                                                    whileHover={{
                                                        scale: 1.02,
                                                    }}
                                                    whileTap={{
                                                        scale: 0.98,
                                                    }}
                                                    className="mt-1 px-3 py-1.5 bg-gradient-to-br from-[#10B981] to-[#059669] text-white rounded-lg text-xs font-medium hover:shadow-lg transition-all flex items-center gap-2"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                    View Approved Document
                                                </motion.button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </>
    )
}
