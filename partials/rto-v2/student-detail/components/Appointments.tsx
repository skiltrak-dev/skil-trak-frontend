import {
    Calendar,
    Clock,
    MapPin,
    User,
    Video,
    Phone,
    Sparkles,
    TrendingUp,
    CheckCircle,
} from 'lucide-react'
import { Button, Badge } from '@components'

export function Appointments() {
    const appointments = [
        {
            id: 1,
            title: 'Workplace Orientation',
            date: 'November 25, 2025',
            time: '10:00 AM - 11:30 AM',
            location: 'Hale Foundation - Marangaroo',
            type: 'In-Person',
            attendees: ['Sarah Mitchell', 'Hema Maya Monger'],
            status: 'upcoming',
        },
        {
            id: 2,
            title: 'Progress Review Meeting',
            date: 'November 28, 2025',
            time: '2:00 PM - 3:00 PM',
            location: 'Online Meeting',
            type: 'Virtual',
            attendees: ['Daniel (Coordinator)', 'Hema Maya Monger'],
            status: 'upcoming',
        },
        {
            id: 3,
            title: 'Skill Assessment Session',
            date: 'December 2, 2025',
            time: '9:00 AM - 12:00 PM',
            location: 'Hale Foundation - Marangaroo',
            type: 'In-Person',
            attendees: ['Sarah Mitchell', 'Hema Maya Monger', 'RTO Assessor'],
            status: 'upcoming',
        },
        {
            id: 4,
            title: 'Initial Placement Meeting',
            date: 'November 15, 2025',
            time: '1:00 PM - 2:00 PM',
            location: 'Hale Foundation - Marangaroo',
            type: 'In-Person',
            attendees: ['Sarah Mitchell', 'Hema Maya Monger'],
            status: 'completed',
        },
    ]

    const upcomingAppointments = appointments.filter(
        (a) => a.status === 'upcoming'
    )
    const completedAppointments = appointments.filter(
        (a) => a.status === 'completed'
    )

    return (
        <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-lg p-6 hover:shadow-xl hover:border-[#044866]/30 transition-all">
                    <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#044866] to-[#0D5468] flex items-center justify-center shadow-lg shadow-[#044866]/20 group-hover:scale-110 transition-transform">
                            <Calendar className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <p className="text-slate-600 text-sm">Total</p>
                            <p className="text-3xl text-slate-900">
                                {appointments.length}
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
                            <p className="text-slate-600 text-sm">Upcoming</p>
                            <p className="text-3xl text-slate-900">
                                {upcomingAppointments.length}
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
                            <p className="text-slate-600 text-sm">Completed</p>
                            <p className="text-3xl text-slate-900">
                                {completedAppointments.length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-lg p-6 hover:shadow-xl hover:border-[#F7A619]/30 transition-all">
                    <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F7A619] to-[#F7A619]/80 flex items-center justify-center shadow-lg shadow-[#F7A619]/20 group-hover:scale-110 transition-transform">
                            <TrendingUp className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <p className="text-slate-600 text-sm">This Week</p>
                            <p className="text-3xl text-slate-900">2</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Header */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-xl p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#044866] to-[#0D5468] flex items-center justify-center shadow-lg shadow-[#044866]/20">
                            <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-slate-900 flex items-center gap-2">
                                Appointments
                                <Sparkles className="w-5 h-5 text-[#F7A619]" />
                            </h3>
                            <p className="text-slate-600 text-sm mt-1">
                                Manage and track student appointments
                            </p>
                        </div>
                    </div>
                    <Button className="bg-gradient-to-r from-[#044866] to-[#0D5468] hover:from-[#0D5468] hover:to-[#044866] shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule New
                    </Button>
                </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-xl p-8 hover:shadow-2xl transition-all">
                <h4 className="text-slate-900 mb-6 flex items-center gap-2">
                    <span>Upcoming Appointments</span>
                    <Badge
                        className="bg-blue-100 text-blue-700"
                        text={upcomingAppointments.length + ''}
                    ></Badge>
                </h4>
                <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                        <div
                            key={appointment.id}
                            className="group relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 rounded-xl border border-slate-200/60 p-6 hover:shadow-xl hover:border-[#044866]/30 transition-all"
                        >
                            {appointment.type === 'Virtual' && (
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#F7A619]/10 to-transparent rounded-full blur-2xl"></div>
                            )}

                            <div className="relative">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <h5 className="text-slate-900">
                                                {appointment.title}
                                            </h5>
                                            <Badge
                                                className={`${
                                                    appointment.type ===
                                                    'Virtual'
                                                        ? 'bg-[#F7A619]/10 text-[#F7A619] border border-[#F7A619]/30'
                                                        : 'bg-[#044866]/10 text-[#044866] border border-[#044866]/30'
                                                }`}
                                                text={appointment.type}
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-3">
                                                <Calendar className="w-5 h-5 text-[#044866] flex-shrink-0" />
                                                <span className="text-sm text-slate-700">
                                                    {appointment.date}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-3">
                                                <Clock className="w-5 h-5 text-[#F7A619] flex-shrink-0" />
                                                <span className="text-sm text-slate-700">
                                                    {appointment.time}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-3">
                                                {appointment.type ===
                                                'Virtual' ? (
                                                    <Video className="w-5 h-5 text-[#F7A619] flex-shrink-0" />
                                                ) : (
                                                    <MapPin className="w-5 h-5 text-[#0D5468] flex-shrink-0" />
                                                )}
                                                <span className="text-sm text-slate-700">
                                                    {appointment.location}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-3">
                                                <User className="w-5 h-5 text-purple-600 flex-shrink-0" />
                                                <span className="text-sm text-slate-700">
                                                    {
                                                        appointment.attendees
                                                            .length
                                                    }{' '}
                                                    Attendees
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 border border-slate-200/60 mb-4">
                                    <p className="text-sm text-slate-600 mb-3">
                                        Attendees:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {appointment.attendees.map(
                                            (attendee, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:border-[#044866] transition-colors"
                                                >
                                                    {attendee}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        outline
                                        className="border-slate-300 hover:bg-slate-50"
                                    >
                                        View Details
                                    </Button>
                                    <Button
                                        outline
                                        className="border-slate-300 hover:bg-slate-50"
                                    >
                                        Reschedule
                                    </Button>
                                    {appointment.type === 'Virtual' && (
                                        <Button className="bg-gradient-to-r from-[#F7A619] to-[#F7A619]/90 hover:from-[#F7A619]/90 hover:to-[#F7A619]/80 shadow-lg hover:shadow-xl hover:scale-105 transition-all ml-auto">
                                            <Video className="w-4 h-4 mr-2" />
                                            Join Meeting
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Completed Appointments */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-xl p-8 hover:shadow-2xl transition-all">
                <h4 className="text-slate-900 mb-6 flex items-center gap-2">
                    <span>Completed Appointments</span>
                    <Badge
                        className="bg-emerald-100 text-emerald-700"
                        text={`${completedAppointments.length}`}
                    />
                </h4>
                <div className="space-y-4">
                    {completedAppointments.map((appointment) => (
                        <div
                            key={appointment.id}
                            className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl border border-slate-200/60 p-6"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <h5 className="text-slate-700 mb-3 flex items-center gap-2">
                                        {appointment.title}
                                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                                    </h5>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                                            <Calendar className="w-4 h-4" />
                                            {appointment.date}
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                                            <Clock className="w-4 h-4" />
                                            {appointment.time}
                                        </div>
                                    </div>
                                </div>
                                <Badge
                                    className="bg-emerald-100 text-emerald-700 border border-emerald-200"
                                    text="✓ Completed"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
