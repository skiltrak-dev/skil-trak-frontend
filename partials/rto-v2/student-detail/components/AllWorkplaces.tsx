import {
    Building2,
    MapPin,
    User,
    Phone,
    Clock,
    Calendar,
    TrendingUp,
    Award,
    Mail,
    CheckCircle2,
    AlertCircle,
    XCircle,
    Hourglass,
} from 'lucide-react'
import { Button, Badge } from '@components'
import { Progressbar } from '@partials/rto-v2/components/Progressbar'

interface Workplace {
    id: number
    name: string
    location: string
    address: string
    status: 'active' | 'completed' | 'pending' | 'withdrawn'
    type: string
    supervisor: string
    supervisorRole: string
    phone: string
    email: string
    startDate: string
    endDate?: string
    hoursCompleted?: number
    hoursRequired?: number
    requestDate?: string
    requestStatus?: string
}

export function AllWorkplaces() {
    const workplaces: Workplace[] = [
        {
            id: 1,
            name: 'Hale Foundation',
            location: 'Marangaroo, WA',
            address: '16 Sarre Place, Marangaroo WA 6064',
            status: 'active',
            type: 'Aged Care & Disability Support',
            supervisor: 'Sarah Mitchell',
            supervisorRole: 'Senior Care Coordinator',
            phone: '+61 3 9876 5444',
            email: 's.mitchell@halefoundation.org.au',
            startDate: 'Sep 15, 2025',
            hoursCompleted: 145,
            hoursRequired: 240,
        },
        {
            id: 2,
            name: 'BrightCare Community Services',
            location: 'Perth, WA',
            address: '45 Murray Street, Perth WA 6000',
            status: 'completed',
            type: 'Community Support Services',
            supervisor: 'James Peterson',
            supervisorRole: 'Program Manager',
            phone: '+61 8 9234 5678',
            email: 'j.peterson@brightcare.org.au',
            startDate: 'Jul 1, 2025',
            endDate: 'Sep 10, 2025',
            hoursCompleted: 120,
            hoursRequired: 120,
        },
        {
            id: 3,
            name: 'Sunrise Disability Services',
            location: 'Joondalup, WA',
            address: '88 Grand Boulevard, Joondalup WA 6027',
            status: 'pending',
            type: 'Disability Support & Recreation',
            supervisor: 'Emma Wilson',
            supervisorRole: 'Operations Manager',
            phone: '+61 8 9405 3322',
            email: 'e.wilson@sunriseds.org.au',
            requestDate: 'Nov 10, 2025',
            requestStatus: 'Awaiting approval',
            hoursRequired: 100,
            startDate: '', // required dummy to fix linter error
        },
        {
            id: 4,
            name: 'Care Connect WA',
            location: 'Fremantle, WA',
            address: '22 High Street, Fremantle WA 6160',
            status: 'withdrawn',
            type: 'In-Home Care Services',
            supervisor: 'Michael Brown',
            supervisorRole: 'Clinical Supervisor',
            phone: '+61 8 9336 7788',
            email: 'm.brown@careconnectwa.org.au',
            requestDate: 'Oct 5, 2025',
            endDate: 'Oct 20, 2025',
            startDate: '', // required dummy to fix linter error
        },
    ]

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return (
                    <Badge
                        variant="success"
                        text="Active Placement"
                        Icon={CheckCircle2}
                        className="gap-[1.35px] border border-emerald-300"
                        size="xs"
                    />
                )
            case 'completed':
                return (
                    <Badge
                        variant="info"
                        text="Completed"
                        Icon={CheckCircle2}
                        className="gap-[1.35px] border border-blue-300"
                        size="xs"
                    />
                )
            case 'pending':
                return (
                    <Badge
                        variant="warning"
                        text="Pending Approval"
                        Icon={Hourglass}
                        className="gap-[1.35px] border border-amber-300"
                        size="xs"
                    />
                )
            case 'withdrawn':
                return (
                    <Badge
                        variant="muted"
                        text="Withdrawn"
                        Icon={XCircle}
                        className="gap-[1.35px] border border-slate-300"
                        size="xs"
                    />
                )
            default:
                return null
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active':
                return 'from-emerald-500 to-emerald-600'
            case 'completed':
                return 'from-blue-500 to-blue-600'
            case 'pending':
                return 'from-amber-500 to-amber-600'
            case 'withdrawn':
                return 'from-slate-400 to-slate-500'
            default:
                return 'from-[#044866] to-[#0D5468]'
        }
    }

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-xl p-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#044866] to-[#0D5468] flex items-center justify-center shadow-lg shadow-[#044866]/30">
                            <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-slate-900 flex items-center gap-2">
                                All Workplaces
                                <Badge
                                    variant="primaryNew"
                                    text={`${workplaces.length} Total`}
                                    className="text-[10.8px] border border-[#044866]/20"
                                    size="xs"
                                />
                            </h3>
                            <p className="text-sm text-slate-500 mt-0.5">
                                Complete overview of all workplace placements
                                and requests
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="primaryNew"
                        className="bg-gradient-to-r from-[#044866] to-[#0D5468] hover:from-[#0D5468] hover:to-[#044866] text-white shadow-lg shadow-[#044866]/30 px-[11.9px] py-[1.8px] text-[9.9px]"
                        text="+ Request New Placement"
                    />
                </div>
            </div>

            {/* Statistics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-lg p-4 hover:shadow-xl transition-all">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                            <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-slate-500 text-sm">Active</p>
                            <p className="text-slate-900 text-xl">1</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-lg p-4 hover:shadow-xl transition-all">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                            <Award className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-slate-500 text-sm">Completed</p>
                            <p className="text-slate-900 text-xl">1</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-lg p-4 hover:shadow-xl transition-all">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
                            <Hourglass className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-slate-500 text-sm">Pending</p>
                            <p className="text-slate-900 text-xl">1</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-lg p-4 hover:shadow-xl transition-all">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#F7A619] to-[#F7A619]/80 flex items-center justify-center shadow-lg">
                            <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-slate-500 text-sm">
                                Total Hours
                            </p>
                            <p className="text-slate-900 text-xl">265</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Workplace Cards */}
            <div className="space-y-4">
                {workplaces.map((workplace) => (
                    <div
                        key={workplace.id}
                        className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-lg hover:shadow-2xl transition-all overflow-hidden"
                    >
                        {/* Header Banner */}
                        <div
                            className={`bg-gradient-to-r ${getStatusIcon(
                                workplace.status
                            )} px-5 py-3 flex items-center justify-between`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <Building2 className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-white">
                                        {workplace.name}
                                    </h4>
                                    <p className="text-white/80 text-sm">
                                        {workplace.location}
                                    </p>
                                </div>
                            </div>
                            {getStatusBadge(workplace.status)}
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            {/* Key Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-[#044866]/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-4 h-4 text-[#044866]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 mb-0.5">
                                            Address
                                        </p>
                                        <p className="text-sm text-slate-900">
                                            {workplace.address}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-[#0D5468]/10 flex items-center justify-center flex-shrink-0">
                                        <Award className="w-4 h-4 text-[#0D5468]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 mb-0.5">
                                            Service Type
                                        </p>
                                        <p className="text-sm text-slate-900">
                                            {workplace.type}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-[#F7A619]/10 flex items-center justify-center flex-shrink-0">
                                        <Calendar className="w-4 h-4 text-[#F7A619]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 mb-0.5">
                                            {workplace.status === 'pending'
                                                ? 'Requested'
                                                : 'Period'}
                                        </p>
                                        <p className="text-sm text-slate-900">
                                            {workplace.requestDate ||
                                                workplace.startDate}
                                            {workplace.endDate &&
                                                ` - ${workplace.endDate}`}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Supervisor Info */}
                            <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-xl p-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#044866] to-[#0D5468] flex items-center justify-center text-white shadow-lg">
                                        {workplace.supervisor
                                            .split(' ')
                                            .map((n) => n[0])
                                            .join('')}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-slate-900 mb-0.5">
                                            {workplace.supervisor}
                                        </p>
                                        <p className="text-xs text-slate-600">
                                            {workplace.supervisorRole}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <a
                                            href={`tel:${workplace.phone}`}
                                            className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:border-[#044866] hover:bg-[#044866]/5 transition-all"
                                        >
                                            <Phone className="w-3.5 h-3.5 text-[#044866]" />
                                        </a>
                                        <a
                                            href={`mailto:${workplace.email}`}
                                            className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:border-[#044866] hover:bg-[#044866]/5 transition-all"
                                        >
                                            <Mail className="w-3.5 h-3.5 text-[#044866]" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Bar for Active/Completed */}
                            {(workplace.status === 'active' ||
                                workplace.status === 'completed') &&
                                workplace.hoursCompleted &&
                                workplace.hoursRequired && (
                                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-sm text-slate-700">
                                                Hours Progress
                                            </p>
                                            <p className="text-sm text-slate-900">
                                                {workplace.hoursCompleted} /{' '}
                                                {workplace.hoursRequired} hours
                                            </p>
                                        </div>
                                        <Progressbar
                                            value={
                                                (workplace.hoursCompleted /
                                                    workplace.hoursRequired) *
                                                100
                                            }
                                            variant={
                                                workplace.status === 'active'
                                                    ? 'success'
                                                    : 'info'
                                            }
                                            size="sm"
                                            className="h-[7.2px]"
                                        />
                                        <p className="text-xs text-slate-500 mt-2">
                                            {workplace.status === 'active'
                                                ? `${
                                                      workplace.hoursRequired -
                                                      workplace.hoursCompleted
                                                  } hours remaining`
                                                : 'Placement completed successfully'}
                                        </p>
                                    </div>
                                )}

                            {/* Pending Status Info */}
                            {workplace.status === 'pending' &&
                                workplace.requestStatus && (
                                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                                        <div className="flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4 text-amber-600" />
                                            <p className="text-sm text-amber-900">
                                                <span className="font-medium">
                                                    Status:
                                                </span>{' '}
                                                {workplace.requestStatus}
                                            </p>
                                        </div>
                                        <p className="text-xs text-amber-700 mt-2">
                                            Requires {workplace.hoursRequired}{' '}
                                            hours of placement
                                        </p>
                                    </div>
                                )}

                            {/* Actions */}
                            <div className="flex items-center gap-2 mt-4">
                                <Button
                                    variant="secondary"
                                    outline
                                    className="flex-1 border-slate-300 hover:border-[#044866] hover:text-[#044866] hover:bg-[#044866]/5 px-[7.2px] py-[1.8px] text-[9.9px]"
                                    text="View Details"
                                />
                                {workplace.status === 'active' && (
                                    <Button
                                        variant="primaryNew"
                                        className="flex-1 bg-gradient-to-r from-[#044866] to-[#0D5468] hover:from-[#0D5468] hover:to-[#044866] text-white px-[7.2px] py-[1.8px] text-[9.9px]"
                                        text="Log Hours"
                                    />
                                )}
                                {workplace.status === 'pending' && (
                                    <Button
                                        className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-[7.2px] py-[1.8px] text-[9.9px]"
                                        text="Check Status"
                                    />
                                )}
                                {workplace.status === 'completed' && (
                                    <Button
                                        variant="info"
                                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-[7.2px] py-[1.8px] text-[9.9px]"
                                        text="View Certificate"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
