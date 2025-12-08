import {
    Button,
    EmptyData,
    LoadingAnimation,
    TechnicalError,
    TextInput,
} from '@components'
import { CommonApi } from '@queries'
import { Student } from '@types'
import { Filter, Plus, Search, Sparkles, Ticket } from 'lucide-react'
import { useRouter } from 'next/router'
import { TicketCard } from './cards'
import { TicketCounts, TicketFooter } from './components'
import { useCallback, useState } from 'react'
import { debounce } from 'lodash'

const tickets = [
    {
        id: 'TKT-1247',
        title: 'Unable to access workplace safety module',
        category: 'Technical Support',
        priority: 'high',
        status: 'open',
        created: 'Nov 18, 2025',
        updated: 'Nov 18, 2025',
        assignedTo: 'IT Support Team',
        description:
            "I'm getting an error when trying to access the workplace safety training module. The page loads but shows 'Access Denied'.",
        responses: 2,
        lastResponse: '2 hours ago',
    },
    {
        id: 'TKT-1234',
        title: 'Request for additional placement hours',
        category: 'Placement Request',
        priority: 'medium',
        status: 'in-progress',
        created: 'Nov 15, 2025',
        updated: 'Nov 17, 2025',
        assignedTo: 'Daniel - Coordinator',
        description:
            'I would like to request additional placement hours to complete my certificate requirements before the end date.',
        responses: 5,
        lastResponse: '1 day ago',
    },
    {
        id: 'TKT-1221',
        title: 'Certificate issuance timeline',
        category: 'Administrative',
        priority: 'low',
        status: 'resolved',
        created: 'Nov 10, 2025',
        updated: 'Nov 12, 2025',
        assignedTo: 'Admin Team',
        description:
            'Query about the expected timeline for certificate issuance after course completion.',
        responses: 3,
        lastResponse: '1 week ago',
    },
    {
        id: 'TKT-1198',
        title: 'Workplace supervisor contact update',
        category: 'Administrative',
        priority: 'medium',
        status: 'resolved',
        created: 'Nov 5, 2025',
        updated: 'Nov 8, 2025',
        assignedTo: 'Daniel - Coordinator',
        description:
            'Need to update workplace supervisor contact information as Sarah Mitchell has been assigned.',
        responses: 4,
        lastResponse: '2 weeks ago',
    },
]

export const Tickets = ({ student }: { student: Student }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const tickets = CommonApi.Tickets.useStudentTicketsList(
        { id: student?.id, search: `subject:${searchQuery}` },
        {
            skip: !student?.id,
        }
    )

    const router = useRouter()
    const onAddTicket = () => {
        router.push(
            `/portals/rto/students-and-placements/tickets/add-ticket?student=${student?.id}`
        )
    }

    const delayedSearch = useCallback(
        debounce((value: string) => setSearchQuery(value), 700),
        []
    )
    return (
        <div className="space-y-3">
            {/* Stats Overview */}
            <TicketCounts studentId={student.id} />

            {/* Action Bar */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-xl p-3">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#044866] to-[#0D5468] flex items-center justify-center shadow-lg shadow-[#044866]/20">
                            <Ticket className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-slate-900 text-sm flex items-center gap-2">
                                Support Tickets
                                <Sparkles className="w-5 h-5 text-[#F7A619]" />
                            </h3>
                            <p className="text-xs text-slate-600 mt-1">
                                Manage your support requests and queries
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-72">
                            <TextInput
                                name="search"
                                placeholder="Search Tickets by name"
                                onChange={(e: any) =>
                                    delayedSearch(e.target.value)
                                }
                                showError={false}
                            />
                        </div>

                        <Button
                            onClick={onAddTicket}
                            className="flex-shrink-0 bg-gradient-to-r from-[#044866] to-[#0D5468] hover:from-[#0D5468] hover:to-[#044866] shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            New Ticket
                        </Button>
                    </div>
                </div>
            </div>

            {/* Tickets List */}
            {tickets?.isError ? (
                <TechnicalError
                    height={'50vh'}
                    description={false}
                    imageUrl={'/images/icons/common/ticketError.png'}
                />
            ) : null}
            {tickets?.isLoading ? (
                <LoadingAnimation height={'50vh'} />
            ) : tickets?.data?.data &&
              tickets?.data?.data?.length > 0 &&
              tickets?.isSuccess ? (
                tickets?.data?.data?.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                ))
            ) : (
                tickets?.isSuccess && <EmptyData height={'50vh'} />
            )}

            {/* Create New Ticket Section */}
            <TicketFooter studentId={student?.id} />
        </div>
    )
}
