import { Badge, Button, LoadingAnimation, NoData } from '@components'
import {
    AlertCircle,
    ArrowRight,
    Calendar,
    CheckCircle,
    ChevronRight,
    Clock,
    FileText,
    Mail,
    MapPin,
    Phone,
} from 'lucide-react'
import { useState } from 'react'
import { useCourseSelection } from '../hooks'
import { Student } from '@types'
import { RtoV2Api } from '@queries'
import { useSelector } from 'react-redux'
import { WorkplaceSmallCard } from '../card'
import { WorkplaceInfoDetails } from './WorkplaceInfoDetails'

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

export function PlacementRequest({
    studentWorkplaces,
}: {
    studentWorkplaces: any
}) {
    const { selectedWorkplace } = useSelector((state: any) => state.student)

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Compact Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <h3 className="text-slate-900">Placement Requests</h3>
                {/* <Button variant="action" className="text-xs py-1.5 px-3">
                    <FileText className="w-3 h-3 mr-1" />
                    New Request
                </Button> */}
            </div>

            {studentWorkplaces?.isError ? (
                <NoData text="There is some technical issue!" isError />
            ) : null}

            {studentWorkplaces?.isLoading ? (
                <LoadingAnimation size={65} />
            ) : studentWorkplaces?.data &&
              studentWorkplaces?.data?.length > 0 &&
              studentWorkplaces?.isSuccess ? (
                <>
                    {/* Compact Requests List */}
                    {!selectedWorkplace && (
                        <div className="p-3.5 max-h-[196px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                            <div className="space-y-2.5">
                                {studentWorkplaces?.data?.map(
                                    (request: any, index: number) => {
                                        const statusConfig = getStatusConfig(
                                            request?.currentStatus ?? ''
                                        )
                                        const StatusIcon = statusConfig.icon
                                        const isActive =
                                            request.status === 'in-progress'
                                        const isDimmed = !isActive

                                        return (
                                            <WorkplaceSmallCard
                                                index={index}
                                                key={request?.id}
                                                request={request}
                                            />
                                        )
                                    }
                                )}
                            </div>
                        </div>
                    )}

                    {/* Detailed Request View */}
                    {selectedWorkplace && (
                        <WorkplaceInfoDetails
                            selectedWorkplace={selectedWorkplace}
                        />
                    )}
                </>
            ) : studentWorkplaces?.isSuccess ? (
                <NoData text="No placement request found!" />
            ) : null}
        </div>
    )
}
