import {
    Calendar as CalendarIcon,
    Clock,
    MapPin,
    Users,
    ChevronLeft,
    ChevronRight,
    Video,
    AlertCircle,
} from 'lucide-react'
import { Button, Badge } from '@components'
import { useState } from 'react'

const scheduleEvents = [
    {
        id: 1,
        date: 'Nov 19, 2025',
        time: '9:00 AM - 3:00 PM',
        title: 'Workplace Placement - Morning Shift',
        location: 'Hale Foundation, Marangaroo',
        type: 'workplace',
        supervisor: 'Sarah Mitchell',
        status: 'confirmed',
    },
    {
        id: 2,
        date: 'Nov 20, 2025',
        time: '10:00 AM - 11:00 AM',
        title: 'Weekly Check-in with Coordinator',
        location: 'Video Call',
        type: 'meeting',
        supervisor: 'Daniel',
        status: 'confirmed',
    },
    {
        id: 3,
        date: 'Nov 21, 2025',
        time: '9:00 AM - 5:00 PM',
        title: 'Full Day Placement - Client Care',
        location: 'Hale Foundation, Marangaroo',
        type: 'workplace',
        supervisor: 'Sarah Mitchell',
        status: 'confirmed',
    },
    {
        id: 4,
        date: 'Nov 22, 2025',
        time: '2:00 PM - 4:00 PM',
        title: 'Training Session: Communication Skills',
        location: 'ITEC Training Center',
        type: 'training',
        supervisor: 'Training Department',
        status: 'pending',
    },
    {
        id: 5,
        date: 'Nov 24, 2025',
        time: '9:00 AM - 1:00 PM',
        title: 'Workplace Placement - Client Activities',
        location: 'Hale Foundation, Marangaroo',
        type: 'workplace',
        supervisor: 'Sarah Mitchell',
        status: 'confirmed',
    },
    {
        id: 6,
        date: 'Nov 25, 2025',
        time: '3:00 PM - 4:00 PM',
        title: 'Assessment Review Session',
        location: 'Video Call',
        type: 'assessment',
        supervisor: 'Daniel',
        status: 'confirmed',
    },
]

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const calendarDays = [
    { day: 28, month: 'Oct', events: 0 },
    { day: 29, month: 'Oct', events: 0 },
    { day: 30, month: 'Oct', events: 0 },
    { day: 31, month: 'Oct', events: 0 },
    { day: 1, month: 'Nov', events: 0 },
    { day: 2, month: 'Nov', events: 1 },
    { day: 3, month: 'Nov', events: 0 },
    { day: 4, month: 'Nov', events: 2 },
    { day: 5, month: 'Nov', events: 1 },
    { day: 6, month: 'Nov', events: 0 },
    { day: 7, month: 'Nov', events: 1 },
    { day: 8, month: 'Nov', events: 0 },
    { day: 9, month: 'Nov', events: 1 },
    { day: 10, month: 'Nov', events: 0 },
    { day: 11, month: 'Nov', events: 2 },
    { day: 12, month: 'Nov', events: 1 },
    { day: 13, month: 'Nov', events: 0 },
    { day: 14, month: 'Nov', events: 1 },
    { day: 15, month: 'Nov', events: 0 },
    { day: 16, month: 'Nov', events: 1 },
    { day: 17, month: 'Nov', events: 0 },
    { day: 18, month: 'Nov', events: 2 },
    { day: 19, month: 'Nov', events: 3, isToday: true },
    { day: 20, month: 'Nov', events: 2 },
    { day: 21, month: 'Nov', events: 1 },
    { day: 22, month: 'Nov', events: 1 },
    { day: 23, month: 'Nov', events: 0 },
    { day: 24, month: 'Nov', events: 1 },
    { day: 25, month: 'Nov', events: 2 },
    { day: 26, month: 'Nov', events: 0 },
    { day: 27, month: 'Nov', events: 1 },
    { day: 28, month: 'Nov', events: 0 },
    { day: 29, month: 'Nov', events: 0 },
    { day: 30, month: 'Nov', events: 1 },
    { day: 1, month: 'Dec', events: 0 },
]

const getEventColor = (type: string) => {
    switch (type) {
        case 'workplace':
            return 'bg-[#044866] text-white border-[#044866]'
        case 'meeting':
            return 'bg-[#0D5468] text-white border-[#0D5468]'
        case 'training':
            return 'bg-[#F7A619] text-white border-[#F7A619]'
        case 'assessment':
            return 'bg-purple-600 text-white border-purple-600'
        default:
            return 'bg-slate-600 text-white border-slate-600'
    }
}

export function Schedule() {
    const [currentMonth] = useState('November 2025')

    return (
        <div className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#044866]/10 flex items-center justify-center">
                            <CalendarIcon className="w-6 h-6 text-[#044866]" />
                        </div>
                        <div>
                            <p className="text-slate-600 text-sm">This Week</p>
                            <p className="text-2xl text-slate-900">8 events</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#0D5468]/10 flex items-center justify-center">
                            <Clock className="w-6 h-6 text-[#0D5468]" />
                        </div>
                        <div>
                            <p className="text-slate-600 text-sm">
                                Total Hours
                            </p>
                            <p className="text-2xl text-slate-900">32.5h</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#F7A619]/10 flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-[#F7A619]" />
                        </div>
                        <div>
                            <p className="text-slate-600 text-sm">Placements</p>
                            <p className="text-2xl text-slate-900">5 shifts</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                            <Users className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-slate-600 text-sm">Meetings</p>
                            <p className="text-2xl text-slate-900">3 calls</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar View */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-slate-900">{currentMonth}</h3>
                            <div className="flex gap-2">
                                <Button variant="secondary" outline mini>
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                                <Button variant="secondary" outline mini>
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Calendar Grid */}
                        <div className="space-y-2">
                            {/* Week Days Header */}
                            <div className="grid grid-cols-7 gap-1 mb-2">
                                {weekDays.map((day) => (
                                    <div
                                        key={day}
                                        className="text-center text-xs text-slate-600 py-2"
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Days */}
                            <div className="grid grid-cols-7 gap-1">
                                {calendarDays.map((day, index) => (
                                    <div
                                        key={index}
                                        className={`aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-all cursor-pointer ${
                                            day.isToday
                                                ? 'bg-[#044866] text-white shadow-lg'
                                                : day.month === 'Nov'
                                                ? 'bg-slate-50 hover:bg-slate-100 text-slate-900'
                                                : 'bg-transparent text-slate-400'
                                        }`}
                                    >
                                        <span className="text-xs">
                                            {day.day}
                                        </span>
                                        {day.events > 0 && (
                                            <div className="flex gap-0.5 mt-0.5">
                                                {[
                                                    ...Array(
                                                        Math.min(day.events, 3)
                                                    ),
                                                ].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`w-1 h-1 rounded-full ${
                                                            day.isToday
                                                                ? 'bg-white'
                                                                : 'bg-[#F7A619]'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-200">
                            <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-slate-600">
                                    Today's Events
                                </span>
                                <Badge text="3" variant="primaryNew" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#044866]" />
                                    <span className="text-xs text-slate-600">
                                        9:00 AM - Workplace Shift
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#F7A619]" />
                                    <span className="text-xs text-slate-600">
                                        2:00 PM - Training
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-purple-600" />
                                    <span className="text-xs text-slate-600">
                                        4:00 PM - Check-in
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upcoming Events */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-slate-900">
                                    Upcoming Schedule
                                </h3>
                                <p className="text-sm text-slate-600 mt-1">
                                    Your events for the next 7 days
                                </p>
                            </div>
                            <Button
                                variant="primaryNew"
                                text="Add Event"
                                Icon={CalendarIcon}
                            />
                        </div>

                        <div className="space-y-4">
                            {scheduleEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Badge
                                                    text={
                                                        event.type
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                        event.type.slice(1)
                                                    }
                                                    variant={
                                                        event.type ===
                                                        'workplace'
                                                            ? 'primaryNew'
                                                            : event.type ===
                                                              'meeting'
                                                            ? 'info'
                                                            : event.type ===
                                                              'training'
                                                            ? 'warning'
                                                            : 'secondary'
                                                    }
                                                />
                                                <Badge
                                                    text={
                                                        event.status ===
                                                        'confirmed'
                                                            ? 'Confirmed'
                                                            : 'Pending'
                                                    }
                                                    variant={
                                                        event.status ===
                                                        'confirmed'
                                                            ? 'success'
                                                            : 'warning'
                                                    }
                                                    outline
                                                />
                                            </div>
                                            <h4 className="text-slate-900 mb-2">
                                                {event.title}
                                            </h4>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                    <CalendarIcon className="w-4 h-4" />
                                                    <span>{event.date}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{event.time}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                    {event.location.includes(
                                                        'Video'
                                                    ) ? (
                                                        <Video className="w-4 h-4" />
                                                    ) : (
                                                        <MapPin className="w-4 h-4" />
                                                    )}
                                                    <span>
                                                        {event.location}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                    <Users className="w-4 h-4" />
                                                    <span>
                                                        With {event.supervisor}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 pt-3 border-t border-slate-100">
                                        <Button
                                            variant="primaryNew"
                                            outline
                                            text="View Details"
                                            mini
                                        />
                                        {event.status === 'pending' && (
                                            <Button
                                                variant="info"
                                                outline
                                                text="Confirm"
                                                Icon={AlertCircle}
                                                mini
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
