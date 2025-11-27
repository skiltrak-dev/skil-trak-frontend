import {
    AlertCircle,
    AlertTriangle,
    Bell,
    Calendar,
    CheckCircle,
    CheckSquare,
    Clock,
    Edit,
    FileText,
    MapPin,
    Navigation,
    Plus,
    Shield,
    TrendingUp,
    Users,
    XCircle,
} from 'lucide-react'

import { Badge, Button } from '@components'
import { Progressbar } from '@partials/rto-v2/components'
import { useState } from 'react'

interface ScheduleProps {
    selectedCourseId: string
}

export function Schedule({ selectedCourseId }: ScheduleProps) {
    const [showCreateSchedule, setShowCreateSchedule] = useState(false)
    const [scheduleType, setScheduleType] = useState<'fixed' | 'flexible'>(
        'fixed'
    )
    const [showEditShift, setShowEditShift] = useState(false)
    const [selectedShift, setSelectedShift] = useState<any>(null)
    const [showTaskDialog, setShowTaskDialog] = useState(false)
    const [showWorkplaceLog, setShowWorkplaceLog] = useState(false)
    const [showFullCalendar, setShowFullCalendar] = useState(false)
    const [showTrackHours, setShowTrackHours] = useState(false)
    const [showNotificationSettings, setShowNotificationSettings] =
        useState(false)
    const [multipleWorkplaces, setMultipleWorkplaces] = useState(false)
    const [workplace1Hours, setWorkplace1Hours] = useState(0)
    const [workplace2Hours, setWorkplace2Hours] = useState(0)

    // Course-specific configuration
    const courseConfig = {
        CHC33021: {
            courseName: 'Certificate III in Individual Support',
            requiredShifts: 48,
            shiftDuration: 4, // hours
            totalRequiredHours: 192, // 48 × 4
            workplace: {
                name: 'Hale Foundation',
                status: 'Agreement Signed',
                address: '123 Care Street, Marangaroo, WA 6064',
                supervisor: 'Sarah Mitchell',
                phone: '(08) 9345 6789',
            },
            workplace2: {
                name: 'Community Care Plus',
                status: 'Agreement Signed',
                address: '456 Support Ave, Balcatta, WA 6021',
                supervisor: 'Michael Brown',
                phone: '(08) 9456 7890',
            },
            studentStatus: {
                industryAssigned: true,
                workplaceAgreementSigned: true,
                programMatch: true,
                portalExpiryDate: '2025-12-31',
                geolocationEnabled: true,
            },
        },
        CHC52021: {
            courseName: 'Diploma of Community Services',
            requiredShifts: 60,
            shiftDuration: 5,
            totalRequiredHours: 300,
            workplace: {
                name: 'BrightCare Community Services',
                status: 'Agreement Signed',
                address: '456 Community Ave, Perth, WA 6000',
                supervisor: 'James Peterson',
                phone: '(08) 9123 4567',
            },
            workplace2: {
                name: 'Hope Community Hub',
                status: 'Agreement Signed',
                address: '789 Wellness St, Fremantle, WA 6160',
                supervisor: 'Lisa Anderson',
                phone: '(08) 9234 5678',
            },
            studentStatus: {
                industryAssigned: true,
                workplaceAgreementSigned: true,
                programMatch: true,
                portalExpiryDate: '2025-12-31',
                geolocationEnabled: false,
            },
        },
        CHC43015: {
            courseName: 'Certificate IV in Ageing Support',
            requiredShifts: 52,
            shiftDuration: 4,
            totalRequiredHours: 208,
            workplace: {
                name: 'Sunrise Disability Services',
                status: 'Agreement Signed',
                address: '789 Care Lane, Joondalup, WA 6027',
                supervisor: 'Emma Wilson',
                phone: '(08) 9876 5432',
            },
            workplace2: {
                name: 'Golden Years Aged Care',
                status: 'Agreement Signed',
                address: '321 Senior Blvd, Rockingham, WA 6168',
                supervisor: 'David Thompson',
                phone: '(08) 9567 8901',
            },
            studentStatus: {
                industryAssigned: true,
                workplaceAgreementSigned: true,
                programMatch: true,
                portalExpiryDate: '2025-12-31',
                geolocationEnabled: true,
            },
        },
    }

    const config =
        courseConfig[selectedCourseId as keyof typeof courseConfig] ||
        courseConfig.CHC33021

    // Sample schedule data
    const thisWeekShifts = [
        {
            id: 1,
            date: 'Monday, Nov 25',
            dateShort: '2025-11-25',
            startTime: '08:00 AM',
            endTime: '12:00 PM',
            hours: config.shiftDuration,
            workplace: config.workplace.name,
            location: config.workplace.address,
            supervisor: config.workplace.supervisor,
            type: 'Direct Client Care',
            status: 'confirmed',
            checkedIn: true,
            checkedOut: false,
            geolocationValid: true,
            tasksCompleted: false,
        },
        {
            id: 2,
            date: 'Tuesday, Nov 26',
            dateShort: '2025-11-26',
            startTime: '09:00 AM',
            endTime: '01:00 PM',
            hours: config.shiftDuration,
            workplace: config.workplace.name,
            location: config.workplace.address,
            supervisor: config.workplace.supervisor,
            type: 'Group Activities',
            status: 'confirmed',
            checkedIn: false,
            checkedOut: false,
            geolocationValid: false,
            tasksCompleted: false,
        },
        {
            id: 3,
            date: 'Wednesday, Nov 27',
            dateShort: '2025-11-27',
            startTime: '08:00 AM',
            endTime: '12:00 PM',
            hours: config.shiftDuration,
            workplace: config.workplace.name,
            location: config.workplace.address,
            supervisor: config.workplace.supervisor,
            type: 'Personal Care',
            status: 'confirmed',
            checkedIn: false,
            checkedOut: false,
            geolocationValid: false,
            tasksCompleted: false,
        },
        {
            id: 4,
            date: 'Friday, Nov 29',
            dateShort: '2025-11-29',
            startTime: '10:00 AM',
            endTime: '02:00 PM',
            hours: config.shiftDuration,
            workplace: config.workplace.name,
            location: config.workplace.address,
            supervisor: config.workplace.supervisor,
            type: 'Community Outing',
            status: 'confirmed',
            checkedIn: false,
            checkedOut: false,
            geolocationValid: false,
            tasksCompleted: false,
        },
        // Workplace 2 shifts
        {
            id: 8,
            date: 'Tuesday, Nov 26',
            dateShort: '2025-11-26',
            startTime: '02:00 PM',
            endTime: '06:00 PM',
            hours: config.shiftDuration,
            workplace: config.workplace2.name,
            location: config.workplace2.address,
            supervisor: config.workplace2.supervisor,
            type: 'Elderly Support',
            status: 'confirmed',
            checkedIn: false,
            checkedOut: false,
            geolocationValid: false,
            tasksCompleted: false,
        },
        {
            id: 9,
            date: 'Thursday, Nov 28',
            dateShort: '2025-11-28',
            startTime: '09:00 AM',
            endTime: '01:00 PM',
            hours: config.shiftDuration,
            workplace: config.workplace2.name,
            location: config.workplace2.address,
            supervisor: config.workplace2.supervisor,
            type: 'Activities Coordination',
            status: 'confirmed',
            checkedIn: false,
            checkedOut: false,
            geolocationValid: false,
            tasksCompleted: false,
        },
    ]

    const nextWeekShifts = [
        {
            id: 5,
            date: 'Monday, Dec 2',
            dateShort: '2025-12-02',
            startTime: '08:00 AM',
            endTime: '12:00 PM',
            hours: config.shiftDuration,
            workplace: config.workplace.name,
            location: config.workplace.address,
            supervisor: config.workplace.supervisor,
            type: 'Direct Client Care',
            status: 'pending',
            checkedIn: false,
            checkedOut: false,
            geolocationValid: false,
            tasksCompleted: false,
        },
        {
            id: 6,
            date: 'Tuesday, Dec 3',
            dateShort: '2025-12-03',
            startTime: '09:00 AM',
            endTime: '01:00 PM',
            hours: config.shiftDuration,
            workplace: config.workplace.name,
            location: config.workplace.address,
            supervisor: config.workplace.supervisor,
            type: 'Administrative',
            status: 'pending',
            checkedIn: false,
            checkedOut: false,
            geolocationValid: false,
            tasksCompleted: false,
        },
        {
            id: 7,
            date: 'Thursday, Dec 5',
            dateShort: '2025-12-05',
            startTime: '08:00 AM',
            endTime: '12:00 PM',
            hours: config.shiftDuration,
            workplace: config.workplace.name,
            location: config.workplace.address,
            supervisor: config.workplace.supervisor,
            type: 'Skills Assessment',
            status: 'pending',
            checkedIn: false,
            checkedOut: false,
            geolocationValid: false,
            tasksCompleted: false,
        },
        // Workplace 2 shifts
        {
            id: 10,
            date: 'Wednesday, Dec 4',
            dateShort: '2025-12-04',
            startTime: '01:00 PM',
            endTime: '05:00 PM',
            hours: config.shiftDuration,
            workplace: config.workplace2.name,
            location: config.workplace2.address,
            supervisor: config.workplace2.supervisor,
            type: 'Resident Activities',
            status: 'pending',
            checkedIn: false,
            checkedOut: false,
            geolocationValid: false,
            tasksCompleted: false,
        },
    ]

    // Calculate hours split between workplaces
    const workplace1Shifts = [...thisWeekShifts, ...nextWeekShifts].filter(
        (s) => s.workplace === config.workplace.name
    )
    const workplace2Shifts = [...thisWeekShifts, ...nextWeekShifts].filter(
        (s) => s.workplace === config.workplace2.name
    )

    const completedShiftsWP1 = 6 // Completed shifts at workplace 1
    const completedShiftsWP2 = 6 // Completed shifts at workplace 2
    const completedShifts = completedShiftsWP1 + completedShiftsWP2
    const totalHoursCompleted = completedShifts * config.shiftDuration
    const totalHoursCompletedWP1 = completedShiftsWP1 * config.shiftDuration
    const totalHoursCompletedWP2 = completedShiftsWP2 * config.shiftDuration
    const totalHoursThisWeek = thisWeekShifts.reduce(
        (sum, shift) => sum + shift.hours,
        0
    )
    const totalHoursNextWeek = nextWeekShifts.reduce(
        (sum, shift) => sum + shift.hours,
        0
    )
    const remainingHours = config.totalRequiredHours - totalHoursCompleted
    const remainingShifts = config.requiredShifts - completedShifts
    const progressPercentage =
        (totalHoursCompleted / config.totalRequiredHours) * 100

    // Validation checks
    const validationChecks = [
        {
            id: 1,
            label: 'Industry Assigned',
            passed: config.studentStatus.industryAssigned,
            required: true,
        },
        {
            id: 2,
            label: 'Workplace Agreement Signed',
            passed: config.studentStatus.workplaceAgreementSigned,
            required: true,
        },
        {
            id: 3,
            label: 'Program Match',
            passed: config.studentStatus.programMatch,
            required: true,
        },
        {
            id: 4,
            label: 'Portal Expiry Valid',
            passed:
                new Date(config.studentStatus.portalExpiryDate) > new Date(),
            required: true,
        },
        {
            id: 5,
            label: 'Minimum 2 Shifts/Week',
            passed: thisWeekShifts.length >= 2,
            required: true,
        },
        {
            id: 6,
            label: 'Geolocation Enabled',
            passed: config.studentStatus.geolocationEnabled,
            required: false,
        },
    ]

    const allRequiredChecksPassed = validationChecks
        .filter((check) => check.required)
        .every((check) => check.passed)

    return (
        <div className="space-y-4">
            {/* Header with Course Info */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-200/50 p-5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#044866] to-[#0D5468] flex items-center justify-center shadow-lg shadow-[#044866]/30">
                            <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-slate-900">
                                Placement Schedule
                            </h3>
                            <p className="text-sm text-slate-600 mt-0.5">
                                {config.courseName}
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={() => setShowCreateSchedule(true)}
                        className="bg-gradient-to-r from-[#044866] to-[#0D5468] hover:from-[#0D5468] hover:to-[#044866] text-white shadow-lg shadow-[#044866]/30"
                        disabled={!allRequiredChecksPassed}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Schedule
                    </Button>
                </div>

                {/* Course Requirements */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
                    <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-3 border border-blue-100">
                        <p className="text-xs text-slate-600 mb-1">
                            Required Shifts
                        </p>
                        <p className="text-slate-900">
                            {config.requiredShifts} shifts
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-3 border border-purple-100">
                        <p className="text-xs text-slate-600 mb-1">
                            Shift Duration
                        </p>
                        <p className="text-slate-900">
                            {config.shiftDuration} hours each
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl p-3 border border-amber-100">
                        <p className="text-xs text-slate-600 mb-1">
                            Total Required Hours
                        </p>
                        <p className="text-slate-900">
                            {config.totalRequiredHours} hours
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl p-3 border border-emerald-100">
                        <p className="text-xs text-slate-600 mb-1">
                            Min Shifts/Week
                        </p>
                        <p className="text-slate-900">2 shifts minimum</p>
                    </div>
                </div>

                {/* Validation Checks */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex items-center gap-2 mb-3">
                        <Shield className="w-4 h-4 text-[#044866]" />
                        <h4 className="text-sm text-slate-900">
                            Schedule Creation Requirements
                        </h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {validationChecks.map((check) => (
                            <div
                                key={check.id}
                                className="flex items-center gap-2"
                            >
                                {check.passed ? (
                                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                ) : (
                                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                                )}
                                <span
                                    className={`text-xs ${
                                        check.passed
                                            ? 'text-slate-700'
                                            : 'text-red-700'
                                    }`}
                                >
                                    {check.label}
                                    {!check.required && (
                                        <span className="text-slate-400 ml-1">
                                            (Optional)
                                        </span>
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>
                    {!allRequiredChecksPassed && (
                        <div className="mt-3 flex items-start gap-2 p-2 bg-red-50 rounded-lg border border-red-200">
                            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-red-700">
                                You must meet all required conditions before
                                creating a schedule.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Assigned Workplaces with Progress */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-200/50 p-5">
                <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-[#044866]" />
                    <h4 className="text-slate-900">Assigned Workplaces</h4>
                    <Badge
                        text={`2 Workplaces`}
                        className="bg-blue-100 text-blue-700 border-blue-200"
                    ></Badge>
                </div>

                {/* Workplace 1 with Progress */}
                <div className="mb-4 p-4 bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-200">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-sm">
                            1
                        </div>
                        <h5 className="text-slate-900">
                            {config.workplace.name}
                        </h5>
                        <Badge
                            Icon={CheckCircle}
                            text={config.workplace.status}
                            className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs"
                        ></Badge>
                    </div>

                    {/* Workplace 1 Progress */}
                    <div className="mb-3 p-3 bg-white/70 rounded-lg border border-emerald-200">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-emerald-600" />
                            <p className="text-sm text-slate-900">
                                Placement Progress
                            </p>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-3">
                            <div className="text-center">
                                <p className="text-xl text-emerald-700">
                                    {completedShiftsWP1}
                                </p>
                                <p className="text-xs text-slate-600">
                                    Shifts Done
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-xl text-emerald-700">
                                    {totalHoursCompletedWP1}h
                                </p>
                                <p className="text-xs text-slate-600">
                                    Hours Done
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-xl text-amber-600">
                                    {config.totalRequiredHours / 2 -
                                        totalHoursCompletedWP1}
                                    h
                                </p>
                                <p className="text-xs text-slate-600">
                                    Remaining
                                </p>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-slate-600">
                                    Progress
                                </span>
                                <span className="text-xs text-slate-900">
                                    {(
                                        (totalHoursCompletedWP1 /
                                            (config.totalRequiredHours / 2)) *
                                        100
                                    ).toFixed(1)}
                                    %
                                </span>
                            </div>
                            <Progressbar
                                value={
                                    (totalHoursCompletedWP1 /
                                        (config.totalRequiredHours / 2)) *
                                    100
                                }
                                className="h-2"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                            <p className="text-xs text-slate-600">Location</p>
                            <p className="text-slate-900">
                                {config.workplace.address}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-600">Supervisor</p>
                            <p className="text-slate-900">
                                {config.workplace.supervisor}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-600">Contact</p>
                            <p className="text-slate-900">
                                {config.workplace.phone}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-600">
                                Allocated Hours
                            </p>
                            <p className="text-slate-900">
                                {config.totalRequiredHours / 2} hours
                            </p>
                        </div>
                    </div>
                </div>

                {/* Workplace 2 with Progress */}
                <div className="p-4 bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-200">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center text-sm">
                            2
                        </div>
                        <h5 className="text-slate-900">
                            {config.workplace2.name}
                        </h5>
                        <Badge
                            Icon={CheckCircle}
                            text={config.workplace2.status}
                            className="bg-purple-100 text-purple-700 border-purple-200 text-xs"
                        ></Badge>
                    </div>

                    {/* Workplace 2 Progress */}
                    <div className="mb-3 p-3 bg-white/70 rounded-lg border border-purple-200">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-purple-600" />
                            <p className="text-sm text-slate-900">
                                Placement Progress
                            </p>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-3">
                            <div className="text-center">
                                <p className="text-xl text-purple-700">
                                    {completedShiftsWP2}
                                </p>
                                <p className="text-xs text-slate-600">
                                    Shifts Done
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-xl text-purple-700">
                                    {totalHoursCompletedWP2}h
                                </p>
                                <p className="text-xs text-slate-600">
                                    Hours Done
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-xl text-amber-600">
                                    {config.totalRequiredHours / 2 -
                                        totalHoursCompletedWP2}
                                    h
                                </p>
                                <p className="text-xs text-slate-600">
                                    Remaining
                                </p>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-slate-600">
                                    Progress
                                </span>
                                <span className="text-xs text-slate-900">
                                    {(
                                        (totalHoursCompletedWP2 /
                                            (config.totalRequiredHours / 2)) *
                                        100
                                    ).toFixed(1)}
                                    %
                                </span>
                            </div>
                            <Progressbar
                                value={
                                    (totalHoursCompletedWP2 /
                                        (config.totalRequiredHours / 2)) *
                                    100
                                }
                                className="h-2"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                            <p className="text-xs text-slate-600">Location</p>
                            <p className="text-slate-900">
                                {config.workplace2.address}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-600">Supervisor</p>
                            <p className="text-slate-900">
                                {config.workplace2.supervisor}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-600">Contact</p>
                            <p className="text-slate-900">
                                {config.workplace2.phone}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-600">
                                Allocated Hours
                            </p>
                            <p className="text-slate-900">
                                {config.totalRequiredHours / 2} hours
                            </p>
                        </div>
                    </div>
                </div>

                {/* Total Summary */}
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-slate-700">
                            Total Placement Progress:
                        </span>
                        <span className="text-slate-900">
                            {totalHoursCompleted} / {config.totalRequiredHours}{' '}
                            hours ({progressPercentage.toFixed(1)}%)
                        </span>
                    </div>
                    <Progressbar value={progressPercentage} className="h-2.5" />
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-lg p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-600">This Week</p>
                            <p className="text-xl text-slate-900">
                                {totalHoursThisWeek} hours
                            </p>
                            <p className="text-xs text-slate-500">
                                {thisWeekShifts.length} shifts
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-lg p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                            <AlertCircle className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-600">
                                Pending Confirm
                            </p>
                            <p className="text-xl text-slate-900">
                                {nextWeekShifts.length} shifts
                            </p>
                            <p className="text-xs text-slate-500">
                                {totalHoursNextWeek} hours
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-lg p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                            <Navigation className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-600">
                                Geolocation
                            </p>
                            <p className="text-xl text-slate-900">
                                {config.studentStatus.geolocationEnabled
                                    ? 'Enabled'
                                    : 'Disabled'}
                            </p>
                            <p className="text-xs text-slate-500">
                                GPS Tracking
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* This Week's Schedule */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="bg-gradient-to-r from-[#044866] to-[#0D5468] px-5 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-white">This Week's Schedule</h4>
                            <p className="text-white/80 text-sm mt-0.5">
                                Nov 25 - Nov 29, 2025
                            </p>
                        </div>
                        <Badge
                            text={`${thisWeekShifts.length} Shifts • ${totalHoursThisWeek} Hours`}
                            className="bg-white/20 text-white border-white/30"
                        ></Badge>
                    </div>
                </div>

                <div className="p-5 space-y-3">
                    {thisWeekShifts.map((shift) => (
                        <div
                            key={shift.id}
                            className="flex items-center justify-between p-4 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 hover:border-[#044866]/30 hover:shadow-md transition-all"
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex flex-col items-center justify-center text-white shadow-lg">
                                    <p className="text-xs opacity-90">
                                        {shift.date
                                            .split(',')[0]
                                            .substring(0, 3)}
                                    </p>
                                    <p className="text-xl">
                                        {shift.date.split(' ')[2]}
                                    </p>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h5 className="text-slate-900">
                                            {shift.type}
                                        </h5>
                                        <Badge
                                            Icon={CheckCircle}
                                            text={'Confirmed'}
                                            className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs"
                                        ></Badge>
                                        {config.studentStatus
                                            .geolocationEnabled && (
                                            <>
                                                {shift.checkedIn && (
                                                    <Badge
                                                        Icon={Navigation}
                                                        text={'Checked In'}
                                                        className="bg-blue-100 text-blue-700 border-blue-200 text-xs"
                                                    ></Badge>
                                                )}
                                                {shift.checkedOut && (
                                                    <Badge
                                                        Icon={Navigation}
                                                        text={'Checked Out'}
                                                        className="bg-purple-100 text-purple-700 border-purple-200 text-xs"
                                                    ></Badge>
                                                )}
                                            </>
                                        )}
                                        {!shift.tasksCompleted &&
                                            shift.checkedOut && (
                                                <Badge
                                                    Icon={AlertCircle}
                                                    text={'Tasks Pending'}
                                                    className="bg-amber-100 text-amber-700 border-amber-200 text-xs"
                                                ></Badge>
                                            )}
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-1">
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" />
                                            {shift.startTime} - {shift.endTime}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {shift.workplace}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Users className="w-3.5 h-3.5" />
                                            {shift.supervisor}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500">
                                        Duration: {shift.hours} hours (Fixed by
                                        course)
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {config.studentStatus.geolocationEnabled &&
                                    !shift.checkedIn && (
                                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                            <Navigation className="w-3.5 h-3.5 mr-1" />
                                            Check In
                                        </Button>
                                    )}
                                {shift.checkedIn && !shift.checkedOut && (
                                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                                        <Navigation className="w-3.5 h-3.5 mr-1" />
                                        Check Out
                                    </Button>
                                )}
                                {shift.checkedOut && !shift.tasksCompleted && (
                                    <Button
                                        className="bg-amber-600 hover:bg-amber-700 text-white"
                                        onClick={() => {
                                            setSelectedShift(shift)
                                            setShowTaskDialog(true)
                                        }}
                                    >
                                        <CheckSquare className="w-3.5 h-3.5 mr-1" />
                                        Complete Tasks
                                    </Button>
                                )}
                                <Button
                                    variant="action"
                                    className="border-slate-300 hover:border-[#044866] hover:text-[#044866]"
                                    onClick={() => {
                                        setSelectedShift(shift)
                                        setShowEditShift(true)
                                    }}
                                >
                                    <Edit className="w-3.5 h-3.5 mr-1" />
                                    Edit
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Next Week's Schedule (Pending) */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-white">
                                Next Week - Pending Confirmation
                            </h4>
                            <p className="text-white/80 text-sm mt-0.5">
                                Dec 2 - Dec 6, 2025
                            </p>
                        </div>
                        <Badge
                            text={`${nextWeekShifts.length} Shifts •{' '}
                            ${totalHoursNextWeek} Hours`}
                            className="bg-white/20 text-white border-white/30"
                        ></Badge>
                    </div>
                </div>

                <div className="p-5 space-y-3">
                    {nextWeekShifts.map((shift) => (
                        <div
                            key={shift.id}
                            className="flex items-center justify-between p-4 bg-gradient-to-br from-amber-50 to-white rounded-xl border border-amber-200 hover:border-amber-300 hover:shadow-md transition-all"
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex flex-col items-center justify-center text-white shadow-lg">
                                    <p className="text-xs opacity-90">
                                        {shift.date
                                            .split(',')[0]
                                            .substring(0, 3)}
                                    </p>
                                    <p className="text-xl">
                                        {shift.date.split(' ')[2]}
                                    </p>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h5 className="text-slate-900">
                                            {shift.type}
                                        </h5>
                                        <Badge
                                            Icon={AlertCircle}
                                            text={'Needs Confirmation'}
                                            className="bg-amber-100 text-amber-700 border-amber-200 text-xs"
                                        />
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-1">
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" />
                                            {shift.startTime} - {shift.endTime}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {shift.workplace}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Users className="w-3.5 h-3.5" />
                                            {shift.supervisor}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500">
                                        Duration: {shift.hours} hours (Fixed by
                                        course)
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Confirm
                                </Button>
                                <Button
                                    variant="action"
                                    className="border-slate-300 hover:border-[#044866] hover:text-[#044866]"
                                    onClick={() => {
                                        setSelectedShift(shift)
                                        setShowEditShift(true)
                                    }}
                                >
                                    <Edit className="w-3.5 h-3.5 mr-1" />
                                    Reschedule
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button
                    variant="action"
                    className="h-auto py-4 flex-col gap-2 border-slate-300 hover:border-[#044866] hover:bg-[#044866]/5"
                    onClick={() => setShowWorkplaceLog(true)}
                >
                    <FileText className="w-5 h-5 text-[#044866]" />
                    <span className="text-slate-900">Submit Workplace Log</span>
                </Button>
                <Button
                    variant="action"
                    className="h-auto py-4 flex-col gap-2 border-slate-300 hover:border-[#044866] hover:bg-[#044866]/5"
                    onClick={() => setShowFullCalendar(true)}
                >
                    <Calendar className="w-5 h-5 text-[#044866]" />
                    <span className="text-slate-900">View Full Calendar</span>
                </Button>
                <Button
                    variant="action"
                    className="h-auto py-4 flex-col gap-2 border-slate-300 hover:border-[#044866] hover:bg-[#044866]/5"
                    onClick={() => setShowTrackHours(true)}
                >
                    <Clock className="w-5 h-5 text-[#044866]" />
                    <span className="text-slate-900">Track Hours</span>
                </Button>
                <Button
                    variant="action"
                    className="h-auto py-4 flex-col gap-2 border-slate-300 hover:border-[#044866] hover:bg-[#044866]/5"
                    onClick={() => setShowNotificationSettings(true)}
                >
                    <Bell className="w-5 h-5 text-[#044866]" />
                    <span className="text-slate-900">
                        Notification Settings
                    </span>
                </Button>
            </div>
        </div>
    )
}
