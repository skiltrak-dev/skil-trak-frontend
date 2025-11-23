import {
    Ticket,
    AlertCircle,
    CheckCircle,
    Clock,
    MessageSquare,
    Plus,
    Filter,
    Search,
    Sparkles,
    TrendingUp,
} from 'lucide-react'
import { Button, Badge } from '@components'

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

const getStatusBadge = (status: string) => {
    switch (status) {
        case 'open':
            return (
                <Badge
                    text="Open"
                    Icon={AlertCircle}
                    className="bg-red-100 text-red-700 border border-red-200"
                />
            )
        case 'in-progress':
            return (
                <Badge
                    text="In Progress"
                    Icon={Clock}
                    className="bg-blue-100 text-blue-700 border border-blue-200"
                />
            )
        case 'resolved':
            return (
                <Badge
                    text="Resolved"
                    Icon={CheckCircle}
                    className="bg-emerald-100 text-emerald-700 border border-emerald-200"
                />
            )
        default:
            return <Badge outline text="Unknown" />
    }
}

const getPriorityBadge = (priority: string) => {
    switch (priority) {
        case 'high':
            return (
                <Badge
                    text="High Priority"
                    className="bg-[#F7A619] text-white shadow-sm"
                />
            )
        case 'medium':
            return (
                <Badge
                    outline
                    text="Medium"
                    className="border-yellow-300 text-yellow-700"
                />
            )
        case 'low':
            return (
                <Badge
                    outline
                    text="Low"
                    className="border-slate-300 text-slate-600"
                />
            )
        default:
            return <Badge outline text="Unknown" />
    }
}

export function Tickets() {
    const openTickets = tickets.filter((t) => t.status === 'open').length
    const inProgressTickets = tickets.filter(
        (t) => t.status === 'in-progress'
    ).length
    const resolvedTickets = tickets.filter(
        (t) => t.status === 'resolved'
    ).length

    return (
        <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-lg p-6 hover:shadow-xl hover:border-[#044866]/30 transition-all">
                    <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#044866] to-[#0D5468] flex items-center justify-center shadow-lg shadow-[#044866]/20 group-hover:scale-110 transition-transform">
                            <Ticket className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <p className="text-slate-600 text-sm">
                                Total Tickets
                            </p>
                            <p className="text-3xl text-slate-900">
                                {tickets.length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-lg p-6 hover:shadow-xl hover:border-red-500/30 transition-all">
                    <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/20 group-hover:scale-110 transition-transform">
                            <AlertCircle className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <p className="text-slate-600 text-sm">Open</p>
                            <p className="text-3xl text-slate-900">
                                {openTickets}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-lg p-6 hover:shadow-xl hover:border-blue-500/30 transition-all">
                    <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                            <Clock className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <p className="text-slate-600 text-sm">
                                In Progress
                            </p>
                            <p className="text-3xl text-slate-900">
                                {inProgressTickets}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-lg p-6 hover:shadow-xl hover:border-emerald-500/30 transition-all">
                    <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                            <CheckCircle className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <p className="text-slate-600 text-sm">Resolved</p>
                            <p className="text-3xl text-slate-900">
                                {resolvedTickets}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Bar */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-xl p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#044866] to-[#0D5468] flex items-center justify-center shadow-lg shadow-[#044866]/20">
                            <Ticket className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-slate-900 flex items-center gap-2">
                                Support Tickets
                                <Sparkles className="w-5 h-5 text-[#F7A619]" />
                            </h3>
                            <p className="text-sm text-slate-600 mt-1">
                                Manage your support requests and queries
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            outline
                            variant="secondary"
                            className="border-slate-300 hover:bg-slate-50"
                        >
                            <Search className="w-4 h-4 mr-2" />
                            Search
                        </Button>
                        <Button
                            outline
                            variant="secondary"
                            className="border-slate-300 hover:bg-slate-50"
                        >
                            <Filter className="w-4 h-4 mr-2" />
                            Filter
                        </Button>
                        <Button className="bg-gradient-to-r from-[#044866] to-[#0D5468] hover:from-[#0D5468] hover:to-[#044866] shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                            <Plus className="w-4 h-4 mr-2" />
                            New Ticket
                        </Button>
                    </div>
                </div>
            </div>

            {/* Tickets List */}
            <div className="space-y-4">
                {tickets.map((ticket) => (
                    <div
                        key={ticket.id}
                        className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-lg p-8 hover:shadow-2xl hover:border-[#044866]/30 transition-all"
                    >
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                            <div className="flex-1">
                                <div className="flex items-start gap-4 mb-3">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#044866] to-[#0D5468] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#044866]/20 group-hover:scale-110 transition-transform">
                                        <Ticket className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <h4 className="text-slate-900">
                                                {ticket.title}
                                            </h4>
                                            <Badge
                                                outline
                                                text={ticket.id}
                                                className="text-xs"
                                            />
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2 mb-3">
                                            {getStatusBadge(ticket.status)}
                                            {getPriorityBadge(ticket.priority)}
                                            <Badge
                                                outline
                                                text={ticket.category}
                                                className="border-slate-300"
                                            />
                                        </div>
                                        <p className="text-slate-600 leading-relaxed mb-3">
                                            {ticket.description}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                                            <span>
                                                Created: {ticket.created}
                                            </span>
                                            <span>•</span>
                                            <span>
                                                Updated: {ticket.updated}
                                            </span>
                                            <span>•</span>
                                            <span>
                                                Assigned to: {ticket.assignedTo}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:text-right space-y-2 bg-slate-50 rounded-xl p-4 border border-slate-200">
                                <div className="flex lg:flex-col items-center lg:items-end gap-2">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <MessageSquare className="w-4 h-4" />
                                        <span>
                                            {ticket.responses} responses
                                        </span>
                                    </div>
                                    <span className="text-xs text-slate-500">
                                        Last: {ticket.lastResponse}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Ticket Actions */}
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200">
                            <Button
                                outline
                                variant="primaryNew"
                                className="text-[#044866] border-[#044866]/30 hover:bg-[#044866]/10"
                            >
                                <MessageSquare className="w-4 h-4 mr-2" />
                                View Details
                            </Button>
                            {ticket.status !== 'resolved' && (
                                <Button
                                    outline
                                    variant="secondary"
                                    className="text-slate-700 border-slate-300 hover:bg-slate-50"
                                >
                                    Add Response
                                </Button>
                            )}
                            {ticket.status === 'open' && (
                                <Button
                                    outline
                                    variant="info"
                                    className="text-blue-600 border-blue-300 hover:bg-blue-50"
                                >
                                    Mark In Progress
                                </Button>
                            )}
                            {ticket.status === 'in-progress' && (
                                <Button
                                    outline
                                    variant="success"
                                    className="text-emerald-600 border-emerald-300 hover:bg-emerald-50"
                                >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Mark Resolved
                                </Button>
                            )}
                        </div>

                        {/* Response Preview (for open/in-progress tickets) */}
                        {ticket.status !== 'resolved' &&
                            ticket.responses > 0 && (
                                <div className="mt-4 pt-4 border-t border-slate-200">
                                    <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-5 border border-slate-200">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#044866] to-[#0D5468] flex items-center justify-center text-white text-sm flex-shrink-0 shadow-lg shadow-[#044866]/20">
                                                {ticket.assignedTo.charAt(0)}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-slate-900 mb-1">
                                                    {ticket.assignedTo}
                                                </p>
                                                <p className="text-sm text-slate-600">
                                                    {ticket.id === 'TKT-1247' &&
                                                        "I've escalated this to our technical team. They're investigating the access issue and should have it resolved within 24 hours. I'll keep you updated."}
                                                    {ticket.id === 'TKT-1234' &&
                                                        "I've reviewed your request and it looks feasible. Let's schedule a call this week to discuss the additional hours and coordinate with your workplace supervisor."}
                                                </p>
                                                <p className="text-xs text-slate-500 mt-2">
                                                    {ticket.lastResponse}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>
                ))}
            </div>

            {/* Create New Ticket Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#044866]/5 via-[#0D5468]/5 to-transparent rounded-2xl border border-[#044866]/20 p-8 shadow-lg">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#044866]/10 to-transparent rounded-full blur-3xl"></div>
                <div className="relative">
                    <h4 className="text-slate-900 mb-3 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#F7A619]" />
                        Need Help?
                    </h4>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        Create a new support ticket and our team will get back
                        to you as soon as possible. For urgent matters, please
                        contact your coordinator directly.
                    </p>
                    <Button className="bg-gradient-to-r from-[#044866] to-[#0D5468] hover:from-[#0D5468] hover:to-[#044866] shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                        <Plus className="w-4 h-4 mr-2" />
                        Create New Ticket
                    </Button>
                </div>
            </div>
        </div>
    )
}
