import {
    CheckCircle,
    Clock,
    Circle,
    Pause,
    XCircle,
    AlertTriangle,
    Calendar,
} from 'lucide-react'
import { WorkflowStep } from './types'

interface StudentDetailsProps {
    workflow: WorkflowStep[]
}

export function StudentDetails({ workflow }: StudentDetailsProps) {
    return (
        <div className="border-t border-[#E2E8F0] bg-gradient-to-br from-[#F8FAFB] to-[#FFFFFF] p-3">
            <h4 className="text-xs font-bold text-[#1A2332] mb-2 flex items-center gap-1.5">
                <div className="w-0.5 h-3 bg-gradient-to-b from-[#044866] to-[#0D5468] rounded-full" />
                Placement Workflow Progress
            </h4>

            {/* Workflow Steps */}
            <div className="space-y-2">
                {workflow.map((step, index) => (
                    <div
                        key={index}
                        className="relative flex items-start gap-2"
                    >
                        {/* Connector Line */}
                        {index < workflow.length - 1 && (
                            <div className="absolute left-[9px] top-5 w-0.5 h-4 bg-[#E2E8F0]" />
                        )}

                        {/* Status Icon */}
                        <div
                            className={`w-5 h-5 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0 transition-all duration-300 ${
                                step.status === 'completed'
                                    ? 'bg-gradient-to-br from-[#10B981] to-[#059669]'
                                    : step.status === 'in-progress'
                                    ? 'bg-gradient-to-br from-[#F7A619] to-[#EA580C] animate-pulse'
                                    : 'bg-gradient-to-br from-[#F8FAFB] to-[#E2E8F0]'
                            }`}
                        >
                            {step.status === 'completed' ? (
                                <CheckCircle className="w-3 h-3 text-white" />
                            ) : step.status === 'in-progress' ? (
                                <Clock className="w-3 h-3 text-white" />
                            ) : (
                                <Circle className="w-3 h-3 text-[#94A3B8]" />
                            )}
                        </div>

                        {/* Step Info */}
                        <div className="flex-1 pt-0.5">
                            <div className="flex items-start justify-between mb-0.5">
                                <h5
                                    className={`text-[10px] font-medium ${
                                        step.status === 'completed'
                                            ? 'text-[#1A2332]'
                                            : step.status === 'in-progress'
                                            ? 'text-[#B45309]'
                                            : 'text-[#94A3B8]'
                                    }`}
                                >
                                    {step.name}
                                </h5>
                                {step.date && (
                                    <span className="text-[9px] text-[#64748B] bg-white px-1.5 py-0.5 rounded border border-[#E2E8F0]">
                                        {step.date}
                                    </span>
                                )}
                            </div>
                            {step.status === 'in-progress' && (
                                <p className="text-[9px] text-[#92400E] bg-[#FEF3C7] px-1.5 py-0.5 rounded inline-block border border-[#F7A619]/20">
                                    ⚡ Currently in progress
                                </p>
                            )}
                            {step.status === 'pending' && (
                                <p className="text-[9px] text-[#64748B]">
                                    Pending previous step completion
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-3 pt-3 border-t border-[#E2E8F0]">
                <p className="text-[9px] font-medium text-[#64748B] mb-2 uppercase tracking-wide">
                    Quick Actions Available:
                </p>
                <div className="flex items-center gap-1 flex-wrap">
                    <button className="px-2 py-1 bg-white hover:bg-[#F8FAFB] border border-[#E2E8F0] text-[#64748B] rounded-md text-[10px] font-medium transition-all duration-300 flex items-center gap-1">
                        <Pause className="w-2.5 h-2.5" />
                        On Hold
                    </button>
                    <button className="px-2 py-1 bg-white hover:bg-[#FEE2E2] border border-[#E2E8F0] hover:border-[#DC2626]/20 text-[#DC2626] rounded-md text-[10px] font-medium transition-all duration-300 flex items-center gap-1">
                        <XCircle className="w-2.5 h-2.5" />
                        Cancelled
                    </button>
                    <button className="px-2 py-1 bg-white hover:bg-[#FEE2E2] border border-[#E2E8F0] hover:border-[#DC2626]/20 text-[#DC2626] rounded-md text-[10px] font-medium transition-all duration-300 flex items-center gap-1">
                        <AlertTriangle className="w-2.5 h-2.5" />
                        Terminated
                    </button>
                    <button className="px-2 py-1 bg-gradient-to-br from-[#044866] to-[#0D5468] hover:shadow-lg text-white rounded-md text-[10px] font-medium transition-all duration-300 flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5" />
                        Extension
                    </button>
                </div>
            </div>
        </div>
    )
}
