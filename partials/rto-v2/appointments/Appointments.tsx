import {
    Ban,
    CalendarDays,
    Calendar as CalendarIcon,
    CheckCircle,
    Clock,
    History,
    Plus,
    RefreshCw,
    Search,
    TrendingUp
} from 'lucide-react'
import { useState } from 'react'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'

import {
    Card,
    Select,
    TextInput
} from '@components'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { ActionRequiredHeader } from '../components'
import { KPIStatCard } from './KpiStatsCard'
import { ScheduleAppointmentModal } from './modals'
import { CancelledAppointments, PastAppointments, UpcomingAppointments } from './tabs'
import { RtoApi } from '@queries'

interface Appointment {
    id: string
    title: string
    description: string
    date: string
    time: string
    duration: string
    type: 'meeting' | 'phone' | 'video' | 'site-visit'
    status: 'confirmed' | 'pending' | 'cancelled' | 'completed'
    participants: string[]
    location?: string
    meetingLink?: string
    category: 'placement' | 'student' | 'industry' | 'admin' | 'training'
    priority: 'high' | 'normal' | 'low'
    notes?: string
}

const mockAppointments: Appointment[] = [
    {
        id: '1',
        title: 'Student Placement Site Visit',
        description:
            'Visit Melbourne Aged Care facility to assess placement suitability for CHC33021 students',
        date: '2025-11-13',
        time: '10:00 AM',
        duration: '2 hours',
        type: 'site-visit',
        status: 'confirmed',
        participants: [
            'Julie Anderson',
            'Sarah Mitchell',
            'Melbourne Aged Care Manager',
        ],
        location: '123 Care Street, Melbourne VIC 3000',
        category: 'placement',
        priority: 'high',
        notes: 'Bring placement agreement documents and facility checklist',
    },
    {
        id: '2',
        title: 'Weekly Team Meeting',
        description:
            'Discuss current student placements and upcoming deadlines',
        date: '2025-11-13',
        time: '2:00 PM',
        duration: '1 hour',
        type: 'video',
        status: 'confirmed',
        participants: [
            'Julie Anderson',
            'Mark Thompson',
            'Emma Chen',
            'Sarah Mitchell',
        ],
        meetingLink: 'https://meet.skiltrak.com/team-weekly',
        category: 'admin',
        priority: 'normal',
    },
    {
        id: '3',
        title: 'Student Progress Review - Emily Watson',
        description: 'Review placement progress and address any concerns',
        date: '2025-11-14',
        time: '11:00 AM',
        duration: '30 minutes',
        type: 'phone',
        status: 'confirmed',
        participants: ['Julie Anderson', 'Emily Watson'],
        category: 'student',
        priority: 'normal',
    },
    {
        id: '4',
        title: 'Industry Partner Consultation',
        description:
            'Discuss new placement opportunities and requirements with industry partner',
        date: '2025-11-14',
        time: '3:00 PM',
        duration: '1 hour',
        type: 'meeting',
        status: 'pending',
        participants: ['Julie Anderson', 'Industry Partner Representative'],
        location: 'SkilTrak Office, Meeting Room 2',
        category: 'industry',
        priority: 'high',
    },
    {
        id: '5',
        title: 'TGA Compliance Audit Preparation',
        description: 'Prepare documentation and review compliance requirements',
        date: '2025-11-15',
        time: '9:00 AM',
        duration: '3 hours',
        type: 'meeting',
        status: 'confirmed',
        participants: ['Julie Anderson', 'Compliance Officer', 'Admin Team'],
        location: 'SkilTrak Office, Conference Room',
        category: 'admin',
        priority: 'high',
        notes: 'Review all course documentation and placement records',
    },
    {
        id: '6',
        title: 'Student Orientation - New Cohort',
        description: 'Welcome and orient new students starting CHC43015',
        date: '2025-11-16',
        time: '10:00 AM',
        duration: '2 hours',
        type: 'meeting',
        status: 'confirmed',
        participants: ['Julie Anderson', 'New Students (8)', 'Training Team'],
        location: 'SkilTrak Training Center',
        category: 'training',
        priority: 'normal',
    },
    {
        id: '7',
        title: 'Placement Agreement Signing',
        description: 'Final placement agreement signing with industry partner',
        date: '2025-11-17',
        time: '2:00 PM',
        duration: '45 minutes',
        type: 'meeting',
        status: 'pending',
        participants: ['Julie Anderson', 'Industry Manager', 'Legal Team'],
        location: 'Industry Partner Office',
        category: 'placement',
        priority: 'high',
    },
    {
        id: '8',
        title: 'Student Skill Assessment - Marcus Chen',
        description:
            'Conduct mid-placement skills assessment and provide feedback on practical competencies',
        date: '2025-11-20',
        time: '1:30 PM',
        duration: '1 hour',
        type: 'video',
        status: 'confirmed',
        participants: ['Julie Anderson', 'Marcus Chen', 'Industry Supervisor'],
        meetingLink: 'https://meet.skiltrak.com/assessment-marcus',
        category: 'student',
        priority: 'normal',
        notes: 'Review logbook entries and practical demonstration videos before meeting',
    },
    {
        id: '9',
        title: 'Industry Partner Site Audit - Healthcare NSW',
        description:
            'Quarterly compliance audit and site inspection for healthcare placement facilities',
        date: '2025-11-22',
        time: '9:30 AM',
        duration: '3 hours',
        type: 'site-visit',
        status: 'confirmed',
        participants: [
            'Julie Anderson',
            'Compliance Team',
            'Healthcare NSW Manager',
            'Safety Officer',
        ],
        location: 'Healthcare NSW, 456 Medical Drive, Sydney NSW 2000',
        category: 'industry',
        priority: 'high',
        notes: 'Bring audit checklist, safety equipment logs, and placement facility accreditation documents',
    },
    // Past appointments
    {
        id: '10',
        title: 'Monthly Performance Review',
        description: 'Review team performance metrics and discuss improvements',
        date: '2025-11-01',
        time: '10:00 AM',
        duration: '1 hour',
        type: 'meeting',
        status: 'completed',
        participants: ['Julie Anderson', 'Mark Thompson', 'Emma Chen'],
        location: 'SkilTrak Office, Conference Room',
        category: 'admin',
        priority: 'normal',
    },
    {
        id: '11',
        title: 'Student Placement - David Lee',
        description: 'Initial placement meeting with industry supervisor',
        date: '2025-11-05',
        time: '2:00 PM',
        duration: '45 minutes',
        type: 'site-visit',
        status: 'completed',
        participants: ['Julie Anderson', 'David Lee', 'Industry Supervisor'],
        location: 'Brisbane Disability Support',
        category: 'placement',
        priority: 'high',
    },
    {
        id: '12',
        title: 'Training Workshop - Assessment Methods',
        description:
            'Professional development session on modern assessment techniques',
        date: '2025-11-07',
        time: '9:00 AM',
        duration: '4 hours',
        type: 'meeting',
        status: 'completed',
        participants: [
            'Julie Anderson',
            'Training Team',
            'External Facilitator',
        ],
        location: 'SkilTrak Training Center',
        category: 'training',
        priority: 'normal',
    },
    {
        id: '13',
        title: 'Student Check-in - Jessica Brown',
        description: 'Routine check-in to discuss placement progress',
        date: '2025-10-28',
        time: '11:00 AM',
        duration: '30 minutes',
        type: 'phone',
        status: 'completed',
        participants: ['Sarah Mitchell', 'Jessica Brown'],
        category: 'student',
        priority: 'normal',
    },
    {
        id: '14',
        title: 'Industry Partnership Meeting',
        description: 'Discuss expanding partnership opportunities',
        date: '2025-10-15',
        time: '3:00 PM',
        duration: '1 hour',
        type: 'video',
        status: 'cancelled',
        participants: ['Julie Anderson', 'Perth Healthcare Group'],
        meetingLink: 'https://meet.skiltrak.com/partnership',
        category: 'industry',
        priority: 'normal',
        notes: 'Rescheduled to next month',
    },
]

export const Appointments = () => {

    const [selectedAppointment, setSelectedAppointment] =
        useState<Appointment | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [scheduleOpen, setScheduleOpen] = useState(false)
    const [filterCategory, setFilterCategory] = useState<string>('all')
    const today = new Date().toISOString().split('T')[0]
    const counts = RtoApi.Appointments.useRtoAppointmentsCount()
    console.log('counts', counts?.data);
    const upcomingCount = mockAppointments.filter(
        (a) =>
            a.date >= today &&
            a.status !== 'completed' &&
            a.status !== 'cancelled'
    ).length
    const todayCount = mockAppointments.filter((a) => a.date === today).length
    const pastCount = mockAppointments.filter(
        (a) =>
            a.date < today ||
            a.status === 'completed' ||
            a.status === 'cancelled'
    ).length
    const completedCount = mockAppointments.filter(
        (a) => a.status === 'completed'
    ).length

    return (
        <div className="min-h-screen bg-background container mx-auto space-y-4">
            {/* <ActionRequiredHeader
                icon={CalendarDays}
                title="Appointments"
                description="Manage all your students appointments"
                urgentCount={0}
                UrgentIcon={CalendarDays}
                urgentLabel="Total Appointments"
                warningMessage="<strong>Quick Tip:</strong> Click on any appointment to view details or reschedule. Use the calendar view to see upcoming appointments, and set reminders to ensure you never miss a meeting with your students."
                gradientFrom="primaryNew"
                gradientTo="primaryNew"
                iconGradient="from-primaryNew to-primaryNew"
                actionButton={{
                    label: 'Create Appointment',
                    icon: Plus,
                }}
            /> */}

            <div className="space-y-6 animate-fade-in">
                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                            <div className="relative h-14 w-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-premium">
                                <CalendarIcon className="h-7 w-7 text-white" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-3xl">Appointments</h1>
                            <p className="text-sm text-muted-foreground">
                                Manage your schedule and meetings efficiently
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 hover-lift"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Refresh
                        </Button>
                        <ScheduleAppointmentModal
                            scheduleOpen={scheduleOpen}
                            setScheduleOpen={setScheduleOpen}
                        />
                    </div>
                </div>

                {/* KPI Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* <KPIStatCard
                        label="Total Appointments"
                        value={counts?.data.past}
                        icon={CalendarIcon}
                        trend={{ value: 12, isPositive: true }}
                        variant="primary"
                    /> */}
                    <KPIStatCard
                        label="Cancelled"
                        value={counts?.data?.cancelled ?? 0}
                        icon={Clock}
                        subtitle="Cancelled Appointments"
                        variant="warning"
                    />
                    <KPIStatCard
                        label="Upcoming"
                        value={counts?.data?.future ?? 0}
                        icon={TrendingUp}
                        subtitle="In the future"
                        variant="default"
                    />
                    <KPIStatCard
                        label="Past"
                        value={counts?.data?.past ?? 0}
                        icon={CheckCircle}
                        subtitle="Past Appointments"
                        variant="success"
                    />
                </div>

                {/* Main Content */}
                <Card className="border-border/40 shadow-premium-lg">
                    <div className="border-b bg-gradient-to-r from-white to-primary/5">
                        <div className="">
                            <Tabs
                                defaultValue="upcoming"
                                className="w-full lg:w-auto"
                            >
                                <div className="flex justify-between w-full">
                                    <TabsList className="grid w-full lg:w-auto grid-cols-4 bg-muted/50">
                                        <TabsTrigger value="cancelled" className="gap-2">
                                            <Ban className="h-4 w-4" />
                                            cancelled
                                            <Badge
                                                variant="default"
                                                className="ml-1 h-5 min-w-[20px] px-1.5 text-[10px]"
                                            >
                                                {counts?.data?.cancelled ?? 0}
                                            </Badge>
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="upcoming"
                                            className="gap-2"
                                        >
                                            <TrendingUp className="h-4 w-4" />
                                            Upcoming
                                            <Badge
                                                variant="default"
                                                className="ml-1 h-5 min-w-[20px] px-1.5 text-[10px]"
                                            >
                                                {counts?.data?.future ?? 0}
                                            </Badge>
                                        </TabsTrigger>
                                        <TabsTrigger value="past" className="gap-2">
                                            <History className="h-4 w-4" />
                                            Past
                                            <Badge
                                                variant="default"
                                                className="ml-1 h-5 min-w-[20px] px-1.5 text-[10px]"
                                            >
                                                {counts?.data?.past ?? 0}
                                            </Badge>
                                        </TabsTrigger>
                                    </TabsList>
                                    <div className="flex items-center gap-2">
                                        <div className="relative flex-1 lg:w-64">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <TextInput
                                                placeholder="Search appointments..."
                                                value={searchQuery}
                                                onChange={(e: any) =>
                                                    setSearchQuery(e.target.value)
                                                }
                                                className="pl-9 h-9"
                                                name="search"
                                            />
                                        </div>

                                        <Select
                                            value={filterCategory}
                                            onChange={setFilterCategory}
                                            name="category"
                                            options={[
                                                {
                                                    label: 'All Categories',
                                                    value: 'all',
                                                },
                                                {
                                                    label: 'Placement',
                                                    value: 'placement',
                                                },
                                                { label: 'Student', value: 'student' },
                                                {
                                                    label: 'Industry',
                                                    value: 'industry',
                                                },
                                                { label: 'Admin', value: 'admin' },
                                                {
                                                    label: 'Training',
                                                    value: 'training',
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>
                                <TabsContent value="cancelled">
                                    <CancelledAppointments />
                                </TabsContent>
                                <TabsContent value="upcoming">
                                    <UpcomingAppointments />
                                </TabsContent>
                                <TabsContent value="past">
                                    <PastAppointments />
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
