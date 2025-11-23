import {
    FileText,
    Building2,
    Calendar,
    User,
    CheckCircle,
    Clock,
    AlertCircle,
    ArrowRight,
    ChevronRight,
    X,
    MapPin,
    Phone,
    Mail,
} from 'lucide-react'
import { Button, Badge } from '@components'
import { useState } from 'react'

const placementRequests = [
    {
        id: 'PR-2025-089',
        workplace: 'Hale Foundation',
        location: 'Marangaroo, WA',
        requestDate: 'Nov 4, 2025',
        status: 'in-progress',
        progress: 75,
        workflowStage: 'Placement Started',
        nextAction: 'Complete workplace orientation',
        dueDate: 'Nov 25, 2025',
        supervisor: 'Sarah Mitchell',
        supervisorEmail: 's.mitchell@halefoundation.org.au',
        supervisorPhone: '+61 3 9876 5444',
        type: 'Primary Placement',
        hours: '240 hours',
        priority: 'high',
        description:
            'Primary placement for Certificate III Individual Support focusing on aged care and disability support services.',
        completedSteps: [
            'Student Added',
            'Request Generated',
            'RTO Approval',
            'Workplace Confirmed',
            'Agreement Signed',
            'Orientation Scheduled',
        ],
        pendingSteps: ['Complete Orientation', 'Begin Placement Hours'],
    },
    {
        id: 'PR-2025-091',
        workplace: 'Community Care Services',
        location: 'Perth, WA',
        requestDate: 'Nov 10, 2025',
        status: 'pending',
        progress: 30,
        workflowStage: 'Waiting for RTO',
        nextAction: 'Awaiting RTO approval',
        dueDate: 'Nov 30, 2025',
        supervisor: 'TBD',
        supervisorEmail: 'N/A',
        supervisorPhone: 'N/A',
        type: 'Secondary Placement',
        hours: '120 hours',
        priority: 'medium',
        description:
            'Secondary placement for additional support hours in community care environment.',
        completedSteps: [
            'Student Added',
            'Request Generated',
            'Initial Review',
        ],
        pendingSteps: [
            'RTO Approval',
            'Workplace Confirmation',
            'Supervisor Assignment',
            'Agreement Process',
        ],
    },
]

const getStatusConfig = (status: string) => {
    switch (status) {
        case 'in-progress':
            return {
                color: 'bg-blue-500',
                bgColor: 'bg-blue-50',
                borderColor: 'border-blue-200',
                textColor: 'text-blue-700',
                icon: Clock,
                label: 'In Progress',
            }
        case 'pending':
            return {
                color: 'bg-yellow-500',
                bgColor: 'bg-yellow-50',
                borderColor: 'border-yellow-200',
                textColor: 'text-yellow-700',
                icon: AlertCircle,
                label: 'Pending',
            }
        case 'approved':
            return {
                color: 'bg-emerald-500',
                bgColor: 'bg-emerald-50',
                borderColor: 'border-emerald-200',
                textColor: 'text-emerald-700',
                icon: CheckCircle,
                label: 'Approved',
            }
        default:
            return {
                color: 'bg-slate-500',
                bgColor: 'bg-slate-50',
                borderColor: 'border-slate-200',
                textColor: 'text-slate-700',
                icon: Clock,
                label: 'Unknown',
            }
    }
}

export function PlacementRequest() {
    const [selectedRequest, setSelectedRequest] = useState<string | null>(null)

    const selectedRequestData = placementRequests.find(
        (r) => r.id === selectedRequest
    )

    return (
        <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Compact Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <h3 className="text-slate-900">Placement Requests</h3>
                <Button variant="action" className="text-xs py-1.5 px-3">
                    <FileText className="w-3 h-3 mr-1" />
                    New Request
                </Button>
            </div>

            {/* Compact Requests List */}
            {!selectedRequest && (
                <div className="p-3.5 max-h-[196px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                    <div className="space-y-2.5">
                        {placementRequests.map((request, index) => {
                            const statusConfig = getStatusConfig(request.status)
                            const StatusIcon = statusConfig.icon
                            const isActive = request.status === 'in-progress'
                            const isDimmed = !isActive

                            return (
                                <div
                                    key={request.id}
                                    onClick={() =>
                                        setSelectedRequest(request.id)
                                    }
                                    className={`group relative flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                                        isActive
                                            ? 'border-[#044866] bg-gradient-to-br from-[#044866]/5 via-white to-[#044866]/5 shadow-lg shadow-[#044866]/20 ring-2 ring-[#044866]/20'
                                            : 'border-slate-200/50 hover:border-[#044866] bg-gradient-to-br from-slate-50/50 to-slate-100/30 hover:shadow-lg opacity-50 hover:opacity-100'
                                    }`}
                                >
                                    {/* Active Indicator */}
                                    {isActive && (
                                        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-0.5 h-11 bg-gradient-to-b from-[#F7A619] via-[#F7A619] to-[#F7A619]/50 rounded-r-full shadow-lg shadow-[#F7A619]/50"></div>
                                    )}

                                    {/* Number */}
                                    <div
                                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs flex-shrink-0 group-hover:scale-105 transition-transform shadow-md ${
                                            isActive
                                                ? 'bg-gradient-to-br from-[#F7A619] to-[#F7A619]/80 shadow-[#F7A619]/30'
                                                : 'bg-gradient-to-br from-slate-400 to-slate-500 shadow-slate-400/20'
                                        }`}
                                    >
                                        {index + 1}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span
                                                className={`text-[11px] ${
                                                    isActive
                                                        ? 'text-slate-900'
                                                        : 'text-slate-600'
                                                }`}
                                            >
                                                {request.workplace}
                                            </span>
                                            <Badge
                                                variant="secondary"
                                                outline
                                                text={request.id}
                                                size="xs"
                                                className="!h-4 !text-[10px]"
                                            />
                                            {isActive && (
                                                <Badge
                                                    variant="warning"
                                                    text="⚡ Active"
                                                    size="xs"
                                                    className="!h-4 !text-[9px] animate-pulse"
                                                />
                                            )}
                                        </div>

                                        {/* Workflow Stage Badge - Prominent */}
                                        <div className="mb-1.5">
                                            <Badge
                                                variant={
                                                    isActive
                                                        ? 'primaryNew'
                                                        : 'secondary'
                                                }
                                                text={request.workflowStage}
                                                Icon={Clock}
                                                size="xs"
                                                className="!h-5"
                                            />
                                        </div>

                                        <div
                                            className={`flex items-center gap-2 text-[10px] ${
                                                isActive
                                                    ? 'text-slate-600'
                                                    : 'text-slate-500'
                                            }`}
                                        >
                                            <span className="flex items-center gap-0.5">
                                                <MapPin className="w-2.5 h-2.5" />
                                                {request.location}
                                            </span>
                                            <span>•</span>
                                            <span>{request.type}</span>
                                            <span>•</span>
                                            <span>{request.hours}</span>
                                        </div>
                                    </div>

                                    {/* Progress Circle */}
                                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                                        <div className="relative w-8 h-8">
                                            <svg className="w-8 h-8 transform -rotate-90">
                                                <circle
                                                    cx="16"
                                                    cy="16"
                                                    r="14"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    fill="none"
                                                    className="text-slate-200"
                                                />
                                                <circle
                                                    cx="16"
                                                    cy="16"
                                                    r="14"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    fill="none"
                                                    strokeDasharray={`${
                                                        2 * Math.PI * 14
                                                    }`}
                                                    strokeDashoffset={`${
                                                        2 *
                                                        Math.PI *
                                                        14 *
                                                        (1 -
                                                            request.progress /
                                                                100)
                                                    }`}
                                                    className={
                                                        isActive
                                                            ? 'text-[#F7A619]'
                                                            : 'text-slate-400'
                                                    }
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span
                                                    className={`text-[9px] ${
                                                        isActive
                                                            ? 'text-slate-900'
                                                            : 'text-slate-600'
                                                    }`}
                                                >
                                                    {request.progress}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <ChevronRight
                                        className={`w-4 h-4 group-hover:translate-x-1 flex-shrink-0 transition-all ${
                                            isActive
                                                ? 'text-[#044866]'
                                                : 'text-slate-400 group-hover:text-[#044866]'
                                        }`}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Detailed Request View */}
            {selectedRequest && selectedRequestData && (
                <div className="p-4">
                    <Button
                        outline
                        variant="secondary"
                        onClick={() => setSelectedRequest(null)}
                        className="mb-4 text-xs"
                    >
                        <ChevronRight className="w-3 h-3 mr-1 rotate-180" />
                        Back
                    </Button>

                    <div className="space-y-4">
                        {/* Header */}
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h4 className="text-slate-900">
                                            {selectedRequestData.workplace}
                                        </h4>
                                        <Badge
                                            variant="secondary"
                                            outline
                                            text={selectedRequestData.id}
                                            size="xs"
                                        />
                                    </div>
                                    <p className="text-sm text-slate-600 mb-3">
                                        {selectedRequestData.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {(() => {
                                            const statusConfig =
                                                getStatusConfig(
                                                    selectedRequestData.status
                                                )
                                            const StatusIcon = statusConfig.icon
                                            return (
                                                <Badge
                                                    variant={
                                                        selectedRequestData.status ===
                                                        'in-progress'
                                                            ? 'info'
                                                            : selectedRequestData.status ===
                                                              'pending'
                                                            ? 'warning'
                                                            : 'success'
                                                    }
                                                    text={statusConfig.label}
                                                    Icon={StatusIcon}
                                                    size="xs"
                                                />
                                            )
                                        })()}
                                        {selectedRequestData.priority ===
                                            'high' && (
                                            <Badge
                                                variant="warning"
                                                text="High Priority"
                                                size="xs"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">
                                        {selectedRequestData.nextAction}
                                    </span>
                                    <span className="text-primaryNew font-medium">
                                        {selectedRequestData.progress}%
                                    </span>
                                </div>
                                <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                                    <div
                                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-primaryNew to-primaryNew rounded-full transition-all duration-500"
                                        style={{
                                            width: `${selectedRequestData.progress}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-3 text-sm">
                                <Calendar className="w-4 h-4 text-[#044866]" />
                                <div>
                                    <p className="text-xs text-slate-500">
                                        Requested
                                    </p>
                                    <p className="text-slate-900">
                                        {selectedRequestData.requestDate}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-3 text-sm">
                                <Clock className="w-4 h-4 text-[#F7A619]" />
                                <div>
                                    <p className="text-xs text-slate-500">
                                        Due Date
                                    </p>
                                    <p className="text-slate-900">
                                        {selectedRequestData.dueDate}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-3 text-sm">
                                <MapPin className="w-4 h-4 text-[#0D5468]" />
                                <div>
                                    <p className="text-xs text-slate-500">
                                        Location
                                    </p>
                                    <p className="text-slate-900">
                                        {selectedRequestData.location}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-3 text-sm">
                                <FileText className="w-4 h-4 text-purple-600" />
                                <div>
                                    <p className="text-xs text-slate-500">
                                        Hours
                                    </p>
                                    <p className="text-slate-900">
                                        {selectedRequestData.hours}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Supervisor */}
                        {selectedRequestData.supervisor !== 'TBD' && (
                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                                <p className="text-sm text-slate-900 mb-3 font-medium">
                                    Supervisor: {selectedRequestData.supervisor}
                                </p>
                                <div className="flex flex-col gap-2 text-sm">
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Mail className="w-3 h-3" />
                                        {selectedRequestData.supervisorEmail}
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Phone className="w-3 h-3" />
                                        {selectedRequestData.supervisorPhone}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Steps */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                                <p className="text-xs text-slate-900 mb-2 font-medium">
                                    Completed (
                                    {selectedRequestData.completedSteps.length})
                                </p>
                                <div className="space-y-1">
                                    {selectedRequestData.completedSteps
                                        .slice(0, 3)
                                        .map((step, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-2 text-xs text-slate-600"
                                            >
                                                <CheckCircle className="w-3 h-3 text-emerald-600" />
                                                {step}
                                            </div>
                                        ))}
                                </div>
                            </div>

                            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                                <p className="text-xs text-slate-900 mb-2 font-medium">
                                    Pending (
                                    {selectedRequestData.pendingSteps.length})
                                </p>
                                <div className="space-y-1">
                                    {selectedRequestData.pendingSteps
                                        .slice(0, 3)
                                        .map((step, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-2 text-xs text-slate-600"
                                            >
                                                <Clock className="w-3 h-3 text-blue-600" />
                                                {step}
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                            <Button
                                variant="primaryNew"
                                text="Continue"
                                Icon={ArrowRight}
                            />
                            <Button
                                variant="primaryNew"
                                outline
                                text="Contact"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
