import { Send, FileSignature, CheckCircle, Eye } from 'lucide-react'
import { motion } from 'framer-motion'
import { ESignature } from './types'

interface ESignatureTimelineProps {
    eSignature: ESignature
}

export function ESignatureTimeline({ eSignature }: ESignatureTimelineProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
        >
            <div className="mt-3 bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-sm">
                <div className="space-y-3">
                    {/* Sent Status */}
                    <div className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-md ${
                                    eSignature.sentDate
                                        ? 'bg-gradient-to-br from-[#10B981] to-[#059669] text-white'
                                        : 'bg-[#E2E8F0] text-[#94A3B8]'
                                }`}
                            >
                                <Send className="w-4 h-4" />
                            </motion.div>
                            {eSignature.status !== 'sent' && (
                                <div className="w-0.5 h-6 bg-[#E2E8F0]"></div>
                            )}
                        </div>
                        <div className="flex-1 pt-0.5">
                            <div className="flex items-center justify-between mb-0.5">
                                <span className="text-xs font-bold text-[#1A2332]">
                                    Sent
                                </span>
                                {eSignature.sentDate && (
                                    <span className="text-[10px] text-[#64748B]">
                                        {new Date(
                                            eSignature.sentDate
                                        ).toLocaleDateString('en-AU', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </span>
                                )}
                            </div>
                            {eSignature.sentBy && (
                                <p className="text-xs text-[#64748B]">
                                    {eSignature.sentBy}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Signed Status */}
                    {eSignature.sentDate && (
                        <div className="flex items-start gap-3">
                            <div className="flex flex-col items-center">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-md ${
                                        eSignature.status === 'signed' ||
                                        eSignature.status === 'approved'
                                            ? 'bg-gradient-to-br from-[#10B981] to-[#059669] text-white'
                                            : 'bg-[#E2E8F0] text-[#94A3B8]'
                                    }`}
                                >
                                    <FileSignature className="w-4 h-4" />
                                </motion.div>
                                {(eSignature.status === 'signed' ||
                                    eSignature.status === 'approved') && (
                                    <div className="w-0.5 h-6 bg-[#E2E8F0]"></div>
                                )}
                            </div>
                            <div className="flex-1 pt-0.5">
                                <div className="flex items-center justify-between mb-0.5">
                                    <span className="text-xs font-bold text-[#1A2332]">
                                        Signed
                                    </span>
                                    {eSignature.signedDate && (
                                        <span className="text-[10px] text-[#64748B]">
                                            {new Date(
                                                eSignature.signedDate
                                            ).toLocaleDateString('en-AU', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    )}
                                </div>
                                {eSignature.signedBy && (
                                    <p className="text-xs text-[#64748B]">
                                        {eSignature.signedBy}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Approved Status */}
                    {eSignature.status === 'approved' && (
                        <div className="flex items-start gap-3">
                            <div className="flex flex-col items-center">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
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
                                    {eSignature.approvedDate && (
                                        <span className="text-[10px] text-[#64748B]">
                                            {new Date(
                                                eSignature.approvedDate
                                            ).toLocaleDateString('en-AU', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    )}
                                </div>
                                {eSignature.approvedBy && (
                                    <p className="text-xs text-[#64748B] mb-2">
                                        {eSignature.approvedBy}
                                    </p>
                                )}
                                {eSignature.documentUrl && (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
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
    )
}
