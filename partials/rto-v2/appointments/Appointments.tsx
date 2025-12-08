import {
    Ban,
    Calendar as CalendarIcon,
    CheckCircle,
    Clock,
    History,
    RefreshCw,
    Search,
    TrendingUp,
} from 'lucide-react'
import { useState } from 'react'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'

import { Card, Select, TextInput } from '@components'
import { RtoApi } from '@queries'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '../../../components/ui/tabs'
import { KPIStatCard } from './KpiStatsCard'
import { ScheduleAppointmentModal } from './modals'
import {
    CancelledAppointments,
    PastAppointments,
    UpcomingAppointments,
} from './tabs'

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

export const Appointments = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [scheduleOpen, setScheduleOpen] = useState(false)
    const [filterCategory, setFilterCategory] = useState<string>('all')
    const today = new Date().toISOString().split('T')[0]
    const counts = RtoApi.Appointments.useRtoAppointmentsCount()

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
                                        <TabsTrigger
                                            value="cancelled"
                                            className="gap-2"
                                        >
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
                                        <TabsTrigger
                                            value="past"
                                            className="gap-2"
                                        >
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
                                                    setSearchQuery(
                                                        e.target.value
                                                    )
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
                                                {
                                                    label: 'Student',
                                                    value: 'student',
                                                },
                                                {
                                                    label: 'Industry',
                                                    value: 'industry',
                                                },
                                                {
                                                    label: 'Admin',
                                                    value: 'admin',
                                                },
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
