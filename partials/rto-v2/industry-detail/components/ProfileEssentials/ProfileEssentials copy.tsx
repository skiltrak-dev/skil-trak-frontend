import {
    Building,
    Calendar,
    CheckCircle,
    Clock,
    ExternalLink,
    FileText,
    Globe,
    Mail,
    MapPin,
    Phone,
    Shield,
    User,
    Users,
} from 'lucide-react'
import { useState } from 'react'
import { Select, Button } from '@components'
import { OptionType } from '@types'

const premiumFeatures = [
    {
        name: 'Priority Consultation',
        enabled: true,
        description: '24/7 dedicated support',
    },
    {
        name: 'Legal Support',
        enabled: true,
        description: 'Compliance assistance',
    },
    {
        name: 'Exclusive Webinars',
        enabled: true,
        description: 'Monthly training sessions',
    },
    {
        name: 'Simulation Tools',
        enabled: false,
        description: 'Virtual training environment',
    },
    {
        name: 'Job Ads Priority',
        enabled: true,
        description: 'Featured listings',
    },
    {
        name: 'Volunteer Network',
        enabled: false,
        description: 'Community connections',
    },
]

const timeSlotOptions: OptionType[] = [
    { label: 'Morning (9:00 AM - 12:00 PM)', value: 'morning' },
    { label: 'Afternoon (1:00 PM - 5:00 PM)', value: 'afternoon' },
    { label: 'All Day (9:00 AM - 5:00 PM)', value: 'allday' },
]

const interviewerOptions: OptionType[] = [
    { label: 'Sarah Johnson - Senior Manager', value: 'sarah' },
    { label: 'Michael Chen - HR Director', value: 'michael' },
    { label: 'Emma Williams - Recruitment Lead', value: 'emma' },
    { label: 'Any Available Supervisor', value: 'any' },
]

export function ProfileEssentials() {
    const [interviewAvailability, setInterviewAvailability] = useState('weekly')
    const [selectedDays, setSelectedDays] = useState<string[]>([
        'Monday',
        'Wednesday',
        'Friday',
    ])
    const [dayTimeSlots, setDayTimeSlots] = useState<Record<string, string>>({
        Monday: 'morning',
        Wednesday: 'afternoon',
        Friday: 'morning',
    })
    const [selectedDates, setSelectedDates] = useState<number[]>([
        5, 12, 19, 26,
    ])
    const [monthlyTimeSlot, setMonthlyTimeSlot] = useState('morning')
    const [selectedSpecificDates, setSelectedSpecificDates] = useState<
        string[]
    >(['2024-12-15', '2024-12-22', '2025-01-10'])
    const [specificDateTimeSlots, setSpecificDateTimeSlots] = useState<
        Record<string, string>
    >({
        '2024-12-15': 'morning',
        '2024-12-22': 'afternoon',
        '2025-01-10': 'morning',
    })
    const [timeSlot, setTimeSlot] = useState('morning')
    const [interviewer, setInterviewer] = useState('sarah')
    const [viewingMonth, setViewingMonth] = useState(new Date().getMonth())
    const [viewingYear, setViewingYear] = useState(new Date().getFullYear())
    const [showContactInfo, setShowContactInfo] = useState(false)
    const [premiumFeaturesState, setPremiumFeaturesState] =
        useState(premiumFeatures)

    const weekDays = [
        { short: 'Mon', full: 'Monday' },
        { short: 'Tue', full: 'Tuesday' },
        { short: 'Wed', full: 'Wednesday' },
        { short: 'Thu', full: 'Thursday' },
        { short: 'Fri', full: 'Friday' },
        { short: 'Sat', full: 'Saturday' },
        { short: 'Sun', full: 'Sunday' },
    ]

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]

    const toggleDay = (day: string) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter((d) => d !== day))
            // Remove time slot for this day
            const newTimeSlots = { ...dayTimeSlots }
            delete newTimeSlots[day]
            setDayTimeSlots(newTimeSlots)
        } else {
            setSelectedDays([...selectedDays, day])
            // Add default time slot for this day
            setDayTimeSlots({ ...dayTimeSlots, [day]: 'morning' })
        }
    }

    const updateDayTimeSlot = (day: string, timeSlot: string) => {
        setDayTimeSlots({ ...dayTimeSlots, [day]: timeSlot })
    }

    const getTimeSlotLabel = (slot: string) => {
        switch (slot) {
            case 'morning':
                return 'Morning (9:00 AM - 12:00 PM)'
            case 'afternoon':
                return 'Afternoon (1:00 PM - 5:00 PM)'
            case 'allday':
                return 'All Day (9:00 AM - 5:00 PM)'
            default:
                return slot
        }
    }

    const toggleDate = (date: number) => {
        if (selectedDates.includes(date)) {
            setSelectedDates(selectedDates.filter((d) => d !== date))
        } else {
            setSelectedDates([...selectedDates, date])
        }
    }

    const toggleSpecificDate = (dateStr: string) => {
        if (selectedSpecificDates.includes(dateStr)) {
            setSelectedSpecificDates(
                selectedSpecificDates.filter((d) => d !== dateStr)
            )
            // Remove time slot for this date
            const newTimeSlots = { ...specificDateTimeSlots }
            delete newTimeSlots[dateStr]
            setSpecificDateTimeSlots(newTimeSlots)
        } else {
            setSelectedSpecificDates([...selectedSpecificDates, dateStr])
            // Add default time slot for this date
            setSpecificDateTimeSlots({
                ...specificDateTimeSlots,
                [dateStr]: 'morning',
            })
        }
    }

    const togglePremiumFeature = (index: number) => {
        const updatedFeatures = [...premiumFeaturesState]
        updatedFeatures[index] = {
            ...updatedFeatures[index],
            enabled: !updatedFeatures[index].enabled,
        }
        setPremiumFeaturesState(updatedFeatures)
    }

    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (month: number, year: number) => {
        return new Date(year, month, 1).getDay()
    }

    const isDateSelected = (day: number) => {
        const dateStr = `${viewingYear}-${String(viewingMonth + 1).padStart(
            2,
            '0'
        )}-${String(day).padStart(2, '0')}`
        return selectedSpecificDates.includes(dateStr)
    }

    const navigateMonth = (direction: number) => {
        let newMonth = viewingMonth + direction
        let newYear = viewingYear

        if (newMonth > 11) {
            newMonth = 0
            newYear++
        } else if (newMonth < 0) {
            newMonth = 11
            newYear--
        }

        setViewingMonth(newMonth)
        setViewingYear(newYear)
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-[#E2E8F0] overflow-hidden">
            <div className="bg-gradient-to-r from-[#044866] to-[#0D5468] px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center shadow-xl">
                        <Building className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-white font-bold">
                            Profile Essentials
                        </h2>
                        <p className="text-white/80 text-xs">
                            Core information and settings
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 px-4 py-4">
                {/* Left Column */}
                <div className="space-y-3 flex flex-col h-full">
                    {/* Basic Details */}
                    <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] hover:shadow-md transition-all flex-1">
                        <div className="p-2.5">
                            <div className="flex items-center justify-between mb-1.5">
                                <h3 className="text-[#1A2332] flex items-center gap-1 text-xs">
                                    <div className="w-4 h-4 bg-[#044866]/10 rounded-lg flex items-center justify-center">
                                        <Building className="w-2.5 h-2.5 text-[#044866]" />
                                    </div>
                                    Basic Details
                                </h3>
                                <Button
                                    variant="secondary"
                                    className="text-[#044866] hover:text-[#0D5468] transition-colors w-auto h-auto p-0 w-6 h-6"
                                >
                                    <ExternalLink className="w-2.5 h-2.5" />
                                </Button>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex items-start gap-1 p-1 rounded-lg hover:bg-[#F8FAFB] transition-colors">
                                    <div className="w-5 h-5 bg-[#E8F4F8] rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FileText className="w-2.5 h-2.5 text-[#044866]" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[#64748B] text-[9px] mb-0">
                                            ABN
                                        </p>
                                        <p className="text-[#1A2332] text-[10px] font-medium">
                                            12 345 678 901
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-1 p-1 rounded-lg hover:bg-[#F8FAFB] transition-colors">
                                    <div className="w-5 h-5 bg-[#E8F4F8] rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Building className="w-2.5 h-2.5 text-[#044866]" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[#64748B] text-[9px] mb-0">
                                            Industry
                                        </p>
                                        <p className="text-[#1A2332] text-[10px] font-medium">
                                            Technology & IT Services
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-1 p-1 rounded-lg hover:bg-[#F8FAFB] transition-colors">
                                    <div className="w-5 h-5 bg-[#E8F4F8] rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Users className="w-2.5 h-2.5 text-[#044866]" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[#64748B] text-[9px] mb-0">
                                            Employees
                                        </p>
                                        <p className="text-[#1A2332] text-[10px] font-medium">
                                            50-100
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Toggle Contact Information Button */}
                        <Button
                            onClick={() => setShowContactInfo(!showContactInfo)}
                            variant="secondary"
                            className="w-full px-2.5 py-1.5 border-t border-[#E2E8F0] text-[9px] font-medium text-[#044866] hover:bg-[#F8FAFB] transition-all flex items-center justify-center gap-1 h-auto rounded-none"
                        >
                            <Phone className="w-2.5 h-2.5" />
                            {showContactInfo
                                ? 'Hide Contact Information'
                                : 'Show Contact Information'}
                            <span
                                className={`text-[10px] transition-transform ${
                                    showContactInfo ? 'rotate-180' : ''
                                }`}
                            >
                                ▼
                            </span>
                        </Button>

                        {/* Contact Information - Collapsible */}
                        {showContactInfo && (
                            <div className="px-2.5 pb-2.5 pt-1.5 border-t border-[#E2E8F0] bg-[#F8FAFB]/50">
                                <div className="space-y-1.5">
                                    <div className="flex items-start gap-1 p-1 rounded-lg bg-white hover:bg-[#E8F4F8] transition-colors">
                                        <div className="w-5 h-5 bg-[#E8F4F8] rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-2.5 h-2.5 text-[#044866]" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[#64748B] text-[9px] mb-0">
                                                Phone
                                            </p>
                                            <p className="text-[#1A2332] text-[10px] font-medium">
                                                +61 2 9876 5432
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-1 p-1 rounded-lg bg-white hover:bg-[#E8F4F8] transition-colors">
                                        <div className="w-5 h-5 bg-[#E8F4F8] rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-2.5 h-2.5 text-[#044866]" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[#64748B] text-[9px] mb-0">
                                                Email
                                            </p>
                                            <p className="text-[#1A2332] text-[10px] font-medium">
                                                contact@techcorp.com.au
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-1 p-1 rounded-lg bg-white hover:bg-[#E8F4F8] transition-colors">
                                        <div className="w-5 h-5 bg-[#E8F4F8] rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Globe className="w-2.5 h-2.5 text-[#044866]" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[#64748B] text-[9px] mb-0">
                                                Website
                                            </p>
                                            <p className="text-[#044866] text-[10px] font-medium hover:underline cursor-pointer">
                                                www.techcorp.com.au
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-1 p-1 rounded-lg bg-white hover:bg-[#E8F4F8] transition-colors">
                                        <div className="w-5 h-5 bg-[#E8F4F8] rounded-lg flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-2.5 h-2.5 text-[#044866]" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[#64748B] text-[9px] mb-0">
                                                Address
                                            </p>
                                            <p className="text-[#1A2332] text-[10px] font-medium">
                                                123 Tech Street, Sydney NSW 2000
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Student Interview Availability */}
                    <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden hover:shadow-md transition-all">
                        <div className="bg-gradient-to-r from-[#044866] to-[#0D5468] p-2.5 flex items-center justify-between">
                            <h3 className="text-white flex items-center gap-1.5 text-xs font-medium">
                                <Calendar className="w-3 h-3" />
                                Interview Availability
                            </h3>
                            <div className="flex items-center gap-1 bg-white/20 px-1.5 py-0.5 rounded-full">
                                <div className="w-1 h-1 bg-[#10B981] rounded-full animate-pulse"></div>
                                <span className="text-[9px] text-white font-medium">
                                    Active
                                </span>
                            </div>
                        </div>

                        <div className="p-2.5 space-y-2.5">
                            {/* Schedule Type Selector */}
                            <div className="flex gap-1 p-0.5 bg-[#F8FAFB] rounded-lg">
                                <Button
                                    onClick={() =>
                                        setInterviewAvailability('weekly')
                                    }
                                    variant="secondary"
                                    className={`flex-1 py-1 rounded-md text-[9px] font-medium transition-all h-auto ${
                                        interviewAvailability === 'weekly'
                                            ? 'bg-[#044866] text-white shadow-sm hover:bg-[#044866] hover:text-white'
                                            : 'text-[#64748B] hover:text-[#044866] hover:bg-transparent'
                                    }`}
                                >
                                    Weekly
                                </Button>
                                <Button
                                    onClick={() =>
                                        setInterviewAvailability('monthly')
                                    }
                                    variant="secondary"
                                    className={`flex-1 py-1 rounded-md text-[9px] font-medium transition-all h-auto ${
                                        interviewAvailability === 'monthly'
                                            ? 'bg-[#044866] text-white shadow-sm hover:bg-[#044866] hover:text-white'
                                            : 'text-[#64748B] hover:text-[#044866] hover:bg-transparent'
                                    }`}
                                >
                                    Monthly
                                </Button>
                                <Button
                                    onClick={() =>
                                        setInterviewAvailability('specific')
                                    }
                                    variant="secondary"
                                    className={`flex-1 py-1 rounded-md text-[9px] font-medium transition-all h-auto ${
                                        interviewAvailability === 'specific'
                                            ? 'bg-[#044866] text-white shadow-sm hover:bg-[#044866] hover:text-white'
                                            : 'text-[#64748B] hover:text-[#044866] hover:bg-transparent'
                                    }`}
                                >
                                    Specific
                                </Button>
                            </div>

                            {/* Weekly Settings */}
                            {interviewAvailability === 'weekly' && (
                                <div className="space-y-2.5 bg-[#F8FAFB] rounded-lg p-2.5">
                                    <div>
                                        <label className="text-[#1A2332] text-[9px] font-medium mb-1.5 block">
                                            Select Days
                                        </label>
                                        <div className="grid grid-cols-7 gap-1">
                                            {weekDays.map((day) => (
                                                <Button
                                                    key={day.full}
                                                    onClick={() =>
                                                        toggleDay(day.full)
                                                    }
                                                    variant="secondary"
                                                    className={`h-7 rounded-lg text-[8px] font-medium transition-all flex flex-col items-center justify-center p-0 ${
                                                        selectedDays.includes(
                                                            day.full
                                                        )
                                                            ? 'bg-gradient-to-br from-[#044866] to-[#0D5468] text-white shadow-md hover:bg-gradient-to-br hover:from-[#044866] hover:to-[#0D5468]'
                                                            : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#044866]/40 hover:shadow-sm hover:bg-white'
                                                    }`}
                                                    title={day.full}
                                                >
                                                    <span className="text-[7px] opacity-70">
                                                        {day.short.charAt(0)}
                                                    </span>
                                                    <span>
                                                        {day.short.substring(
                                                            0,
                                                            2
                                                        )}
                                                    </span>
                                                </Button>
                                            ))}
                                        </div>
                                        {selectedDays.length > 0 && (
                                            <div className="mt-1.5 flex items-center gap-1">
                                                <CheckCircle
                                                    className="w-2.5 h-2.5 text-[#044866]"
                                                    fill="currentColor"
                                                />
                                                <p className="text-[8px] text-[#044866] font-medium">
                                                    {selectedDays.length} day
                                                    {selectedDays.length !== 1
                                                        ? 's'
                                                        : ''}{' '}
                                                    selected
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Individual Time Preferences for Each Day */}
                                    {selectedDays.length > 0 && (
                                        <div className="space-y-1.5">
                                            <label className="text-[#1A2332] text-[9px] font-medium block flex items-center gap-1">
                                                <Clock className="w-2.5 h-2.5 text-[#044866]" />
                                                Time Preferences
                                            </label>
                                            {selectedDays.map((day) => (
                                                <div
                                                    key={day}
                                                    className="flex items-center gap-1.5 p-1.5 bg-white rounded-lg border border-[#E2E8F0]"
                                                >
                                                    <div className="flex-shrink-0 w-12 h-6 bg-gradient-to-br from-[#044866] to-[#0D5468] rounded-md flex items-center justify-center">
                                                        <span className="text-[8px] text-white font-medium">
                                                            {weekDays
                                                                .find(
                                                                    (d) =>
                                                                        d.full ===
                                                                        day
                                                                )
                                                                ?.short.substring(
                                                                    0,
                                                                    3
                                                                )}
                                                        </span>
                                                    </div>
                                                    <Select
                                                        name={`dayTimeSlot-${day}`}
                                                        options={
                                                            timeSlotOptions
                                                        }
                                                        value={
                                                            dayTimeSlots[day] ||
                                                            'morning'
                                                        }
                                                        onChange={(
                                                            option: any
                                                        ) =>
                                                            updateDayTimeSlot(
                                                                day,
                                                                option.value
                                                            )
                                                        }
                                                        className="flex-1 px-2 py-1 text-[8px]"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Monthly Settings */}
                            {interviewAvailability === 'monthly' && (
                                <div className="bg-[#F8FAFB] rounded-lg p-3 space-y-2.5">
                                    <label className="text-[#1A2332] text-[10px] font-medium mb-2 block">
                                        Select Dates of the Month
                                    </label>
                                    <div className="grid grid-cols-7 gap-1">
                                        {Array.from(
                                            { length: 31 },
                                            (_, i) => i + 1
                                        ).map((date) => (
                                            <Button
                                                key={date}
                                                onClick={() => toggleDate(date)}
                                                variant="secondary"
                                                className={`h-7 rounded-lg text-[9px] font-medium transition-all flex items-center justify-center p-0 ${
                                                    selectedDates.includes(date)
                                                        ? 'bg-gradient-to-br from-[#044866] to-[#0D5468] text-white shadow-md hover:bg-gradient-to-br hover:from-[#044866] hover:to-[#0D5468]'
                                                        : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#044866]/40 hover:shadow-sm hover:bg-white'
                                                }`}
                                            >
                                                {date}
                                            </Button>
                                        ))}
                                    </div>
                                    {selectedDates.length > 0 && (
                                        <div>
                                            <div className="flex items-center gap-1 mb-2">
                                                <CheckCircle
                                                    className="w-3 h-3 text-[#044866]"
                                                    fill="currentColor"
                                                />
                                                <p className="text-[9px] text-[#044866] font-medium">
                                                    {selectedDates.length} date
                                                    {selectedDates.length !== 1
                                                        ? 's'
                                                        : ''}{' '}
                                                    selected
                                                </p>
                                            </div>

                                            {/* Time Slot Selector for Monthly */}
                                            <div className="pt-2 border-t border-[#E2E8F0]">
                                                <label className="text-[#1A2332] text-[9px] font-medium mb-1.5 block flex items-center gap-1">
                                                    <Clock className="w-2.5 h-2.5 text-[#044866]" />
                                                    Default Time for Selected
                                                    Dates
                                                </label>
                                                <Select
                                                    name="monthlyTimeSlot"
                                                    options={timeSlotOptions}
                                                    value={monthlyTimeSlot}
                                                    onChange={(option: any) =>
                                                        setMonthlyTimeSlot(
                                                            option.value
                                                        )
                                                    }
                                                    className="w-full px-2.5 py-1.5 text-[9px]"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Specific Dates - Year Calendar */}
                            {interviewAvailability === 'specific' && (
                                <div className="bg-[#F8FAFB] rounded-lg p-3 space-y-2">
                                    {/* Calendar Header */}
                                    <div className="flex items-center justify-between mb-2">
                                        <Button
                                            onClick={() => navigateMonth(-1)}
                                            variant="secondary"
                                            className="w-6 h-6 rounded-md bg-white border border-[#E2E8F0] hover:bg-[#044866] hover:text-white transition-all flex items-center justify-center p-0"
                                        >
                                            <span className="text-xs">
                                                &lt;
                                            </span>
                                        </Button>
                                        <h4 className="text-[10px] font-medium text-[#1A2332]">
                                            {months[viewingMonth]} {viewingYear}
                                        </h4>
                                        <Button
                                            onClick={() => navigateMonth(1)}
                                            variant="secondary"
                                            className="w-6 h-6 rounded-md bg-white border border-[#E2E8F0] hover:bg-[#044866] hover:text-white transition-all flex items-center justify-center p-0"
                                        >
                                            <span className="text-xs">
                                                &gt;
                                            </span>
                                        </Button>
                                    </div>

                                    {/* Calendar Grid */}
                                    <div>
                                        {/* Day Labels */}
                                        <div className="grid grid-cols-7 gap-1 mb-1">
                                            {[
                                                'S',
                                                'M',
                                                'T',
                                                'W',
                                                'T',
                                                'F',
                                                'S',
                                            ].map((day, i) => (
                                                <div
                                                    key={i}
                                                    className="h-5 flex items-center justify-center text-[8px] font-medium text-[#64748B]"
                                                >
                                                    {day}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Date Grid */}
                                        <div className="grid grid-cols-7 gap-1">
                                            {/* Empty cells for days before month starts */}
                                            {Array.from({
                                                length: getFirstDayOfMonth(
                                                    viewingMonth,
                                                    viewingYear
                                                ),
                                            }).map((_, i) => (
                                                <div
                                                    key={`empty-${i}`}
                                                    className="h-7"
                                                ></div>
                                            ))}

                                            {/* Actual days */}
                                            {Array.from(
                                                {
                                                    length: getDaysInMonth(
                                                        viewingMonth,
                                                        viewingYear
                                                    ),
                                                },
                                                (_, i) => i + 1
                                            ).map((day) => {
                                                const dateStr = `${viewingYear}-${String(
                                                    viewingMonth + 1
                                                ).padStart(2, '0')}-${String(
                                                    day
                                                ).padStart(2, '0')}`
                                                const selected =
                                                    isDateSelected(day)

                                                return (
                                                    <Button
                                                        key={day}
                                                        onClick={() =>
                                                            toggleSpecificDate(
                                                                dateStr
                                                            )
                                                        }
                                                        variant="secondary"
                                                        className={`h-7 rounded-lg text-[9px] font-medium transition-all flex items-center justify-center p-0 ${
                                                            selected
                                                                ? 'bg-gradient-to-br from-[#044866] to-[#0D5468] text-white shadow-md hover:bg-gradient-to-br hover:from-[#044866] hover:to-[#0D5468]'
                                                                : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#044866]/40 hover:shadow-sm hover:bg-white'
                                                        }`}
                                                    >
                                                        {day}
                                                    </Button>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    {selectedSpecificDates.length > 0 && (
                                        <div className="pt-2 border-t border-[#E2E8F0] space-y-2">
                                            <div className="flex items-center gap-1 mb-1.5">
                                                <CheckCircle
                                                    className="w-3 h-3 text-[#044866]"
                                                    fill="currentColor"
                                                />
                                                <p className="text-[9px] text-[#044866] font-medium">
                                                    {
                                                        selectedSpecificDates.length
                                                    }{' '}
                                                    date
                                                    {selectedSpecificDates.length !==
                                                    1
                                                        ? 's'
                                                        : ''}{' '}
                                                    selected
                                                </p>
                                            </div>
                                            <div className="flex flex-wrap gap-1 mb-2">
                                                {selectedSpecificDates
                                                    .slice(0, 3)
                                                    .map((date, i) => (
                                                        <span
                                                            key={i}
                                                            className="text-[8px] px-1.5 py-0.5 bg-[#044866]/10 text-[#044866] rounded-md font-medium"
                                                        >
                                                            {new Date(
                                                                date
                                                            ).toLocaleDateString(
                                                                'en-AU',
                                                                {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                }
                                                            )}
                                                        </span>
                                                    ))}
                                                {selectedSpecificDates.length >
                                                    3 && (
                                                    <span className="text-[8px] px-1.5 py-0.5 bg-[#F7A619]/10 text-[#F7A619] rounded-md font-medium">
                                                        +
                                                        {selectedSpecificDates.length -
                                                            3}{' '}
                                                        more
                                                    </span>
                                                )}
                                            </div>

                                            {/* Time Preferences for Specific Dates */}
                                            <div>
                                                <label className="text-[#1A2332] text-[9px] font-medium mb-1.5 block flex items-center gap-1">
                                                    <Clock className="w-2.5 h-2.5 text-[#044866]" />
                                                    Time Preferences
                                                </label>
                                                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                                                    {selectedSpecificDates.map(
                                                        (dateStr) => (
                                                            <div
                                                                key={dateStr}
                                                                className="flex items-center gap-1.5 p-1.5 bg-white rounded-lg border border-[#E2E8F0]"
                                                            >
                                                                <div className="flex-shrink-0 w-14 h-6 bg-gradient-to-br from-[#044866] to-[#0D5468] rounded-md flex items-center justify-center">
                                                                    <span className="text-[8px] text-white font-medium">
                                                                        {new Date(
                                                                            dateStr
                                                                        ).toLocaleDateString(
                                                                            'en-AU',
                                                                            {
                                                                                month: 'short',
                                                                                day: 'numeric',
                                                                            }
                                                                        )}
                                                                    </span>
                                                                </div>
                                                                <Select
                                                                    name={`specificTimeSlot-${dateStr}`}
                                                                    options={
                                                                        timeSlotOptions
                                                                    }
                                                                    value={
                                                                        specificDateTimeSlots[
                                                                            dateStr
                                                                        ] ||
                                                                        'morning'
                                                                    }
                                                                    onChange={(
                                                                        option: any
                                                                    ) =>
                                                                        setSpecificDateTimeSlots(
                                                                            {
                                                                                ...specificDateTimeSlots,
                                                                                [dateStr]:
                                                                                    option.value,
                                                                            }
                                                                        )
                                                                    }
                                                                    className="flex-1 px-2 py-1 text-[8px]"
                                                                />
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Interviewer Selection */}
                            <div className="pt-1.5 border-t border-[#E2E8F0]">
                                <label className="text-[#1A2332] text-[9px] font-medium mb-1.5 block flex items-center gap-1">
                                    <User className="w-2.5 h-2.5 text-[#044866]" />
                                    Interview Conducted By
                                </label>
                                <Select
                                    name="interviewer"
                                    options={interviewerOptions}
                                    value={interviewer}
                                    onChange={(option: any) =>
                                        setInterviewer(option.value)
                                    }
                                    className="w-full px-2.5 py-1.5 text-[9px]"
                                />
                            </div>

                            {/* Info Banner */}
                            <div className="flex items-start gap-1.5 p-2 bg-gradient-to-r from-[#10B981]/10 to-[#10B981]/5 rounded-lg border border-[#10B981]/20">
                                <div className="w-3 h-3 bg-[#10B981] rounded-full flex items-center justify-center flex-shrink-0">
                                    <CheckCircle
                                        className="w-2 h-2 text-white"
                                        fill="currentColor"
                                    />
                                </div>
                                <p className="text-[#044866] text-[9px] leading-relaxed">
                                    <span className="font-medium">
                                        Ready for bookings!
                                    </span>{' '}
                                    Students can now schedule interviews based
                                    on your availability settings.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3 flex flex-col h-full">
                    {/* Assigned SkilTrak Agent */}
                    <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-3 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-[#1A2332] flex items-center gap-1.5 text-sm">
                                <div className="w-5 h-5 bg-[#044866]/10 rounded-lg flex items-center justify-center">
                                    <User className="w-3 h-3 text-[#044866]" />
                                </div>
                                Assigned SkilTrak Agent
                            </h3>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#044866] to-[#0D5468] rounded-lg flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-[#1A2332] text-xs font-medium">
                                    Sarah Johnson
                                </p>
                                <p className="text-[#64748B] text-[10px]">
                                    Senior Account Manager
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Premium Features */}
                    <div className="bg-gradient-to-br from-[#044866] to-[#0D5468] rounded-xl shadow-lg p-3 flex-1">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-white flex items-center gap-1.5 text-sm">
                                <div className="w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center">
                                    <Shield className="w-3 h-3 text-white" />
                                </div>
                                Premium Features
                            </h3>
                            <span className="text-[10px] text-white bg-white/20 px-2 py-0.5 rounded-full">
                                Premium
                            </span>
                        </div>

                        <div className="space-y-2">
                            {premiumFeaturesState.map((feature, index) => (
                                <Button
                                    key={index}
                                    onClick={() => togglePremiumFeature(index)}
                                    variant="secondary"
                                    className="w-full flex items-start gap-2 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer h-auto justify-start"
                                >
                                    <CheckCircle
                                        className={`w-4 h-4 flex-shrink-0 mt-0.5 transition-all duration-300 ${
                                            feature.enabled
                                                ? 'text-[#10B981]'
                                                : 'text-white/30'
                                        }`}
                                        fill={
                                            feature.enabled
                                                ? 'currentColor'
                                                : 'none'
                                        }
                                    />
                                    <div className="flex-1 text-left">
                                        <p
                                            className={`text-xs font-medium transition-colors ${
                                                feature.enabled
                                                    ? 'text-white'
                                                    : 'text-white/50'
                                            }`}
                                        >
                                            {feature.name}
                                        </p>
                                        <p
                                            className={`text-[10px] transition-colors ${
                                                feature.enabled
                                                    ? 'text-white/80'
                                                    : 'text-white/40'
                                            }`}
                                        >
                                            {feature.description}
                                        </p>
                                    </div>
                                </Button>
                            ))}
                        </div>

                        <Button
                            variant="secondary"
                            className="mt-3 w-full py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-medium transition-all border border-white/30 h-auto"
                        >
                            Manage Features
                        </Button>
                    </div>
                </div>
            </div>

            {/* Additional Information Section - REMOVED - Now accessible via Contact & Bio button in Header */}
        </div>
    )
}
