import { AdminLayout } from '@layouts'
import {
    Call,
    CallDetailModal,
    CallList,
    CallStatus,
    DashboardStats,
    TicketModal,
} from '@partials/common'
import { mockCalls } from '@partials/common/call-management/data'
import { ReactElement, useState } from 'react'

const CallManagementPage = () => {
    const [selectedStatuses, setSelectedStatuses] = useState<CallStatus[]>([])
    const [selectedCall, setSelectedCall] = useState<Call | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [calls, setCalls] = useState<Call[]>(mockCalls)
    const [activeStatusPage, setActiveStatusPage] = useState<
        CallStatus | 'all'
    >('all')
    const [ticketModalCall, setTicketModalCall] = useState<Call | null>(null)

    // Filter calls based on active status page and search
    const filteredCalls = calls.filter((call) => {
        const matchesStatusPage =
            activeStatusPage === 'all' || call.status === activeStatusPage
        const matchesSearch =
            searchQuery === '' ||
            call.studentName
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            call.agentName.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesStatusPage && matchesSearch
    })

    const handleStatusUpdate = (callId: string, newStatus: CallStatus) => {
        setCalls((prevCalls) =>
            prevCalls.map((call) =>
                call.id === callId ? { ...call, status: newStatus } : call
            )
        )
        // Update selected call if it's the one being modified
        if (selectedCall?.id === callId) {
            setSelectedCall((prev) =>
                prev ? { ...prev, status: newStatus } : null
            )
        }
    }

    const handleMarkCompleted = (callId: string) => {
        setCalls((prevCalls) =>
            prevCalls.map((call) =>
                call.id === callId
                    ? { ...call, isCompleted: !call.isCompleted }
                    : call
            )
        )
    }

    const handleCreateTicket = (callId: string) => {
        const call = calls.find((c) => c.id === callId)
        if (call) {
            setTicketModalCall(call)
        }
    }

    const handleTicketSubmit = (ticketData: any) => {
        if (ticketModalCall) {
            setCalls((prevCalls) =>
                prevCalls.map((call) =>
                    call.id === ticketModalCall.id
                        ? { ...call, hasTicket: true }
                        : call
                )
            )
            // In a real application, this would send the ticket data to an API
            console.log('Ticket created:', {
                callId: ticketModalCall.id,
                student: ticketModalCall.studentName,
                ...ticketData,
            })
        }
    }

    // Calculate call counts for tabs
    const callCounts = {
        all: calls.length,
        open: calls.filter((c) => c.status === 'open').length,
        completed: calls.filter((c) => c.status === 'completed').length,
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-[1400px] mx-auto px-6 py-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-gray-900 mb-1">Call Management</h1>
                    <p className="text-gray-600">
                        Track and manage student and industry placement calls
                    </p>
                </div>

                <DashboardStats
                    calls={calls}
                    // activeStatusPage={activeStatusPage}
                    // onStatusPageChange={setActiveStatusPage}
                />

                {/* <FilterBar
                    selectedStatuses={selectedStatuses}
                    onStatusChange={setSelectedStatuses}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    totalCalls={calls.length}
                    filteredCount={filteredCalls.length}
                    activeStatusPage={activeStatusPage}
                /> */}

                {/* Call List */}
                {/* <CallList
                    calls={filteredCalls}
                    onCallSelect={setSelectedCall}
                    onMarkCompleted={handleMarkCompleted}
                    onCreateTicket={handleCreateTicket}
                /> */}

                {/* {selectedCall && (
                    <CallDetailModal
                        call={selectedCall}
                        onClose={() => setSelectedCall(null)}
                    />
                )}

                {ticketModalCall && (
                    <TicketModal
                        call={ticketModalCall}
                        onClose={() => setTicketModalCall(null)}
                        onCreateTicket={handleTicketSubmit}
                    />
                )} */}
            </div>
        </div>
    )
}

CallManagementPage.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default CallManagementPage
