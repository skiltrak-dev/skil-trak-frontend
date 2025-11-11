import {
    AppointmentCard,
    type Appointment,
    type AppointmentStatus,
} from './card'

import { Button, SidebarCalendar, TextInput } from '@components'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui'
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs'
import { cn } from '@utils'
import { format, isSameDay, parse } from 'date-fns'
import { CalendarDays, Calendar as CalendarIcon, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { ActionRequiredHeader } from '../components'

const initialAppointments: Appointment[] = [
    {
        id: '1',
        clientName: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '+1 (555) 123-4567',
        date: 'December 15, 2025',
        time: '10:00 AM',
        service: 'Initial Consultation',
        status: 'upcoming',
        notes: 'First-time client, prefers morning appointments',
    },
    {
        id: '2',
        clientName: 'Michael Chen',
        email: 'mchen@email.com',
        phone: '+1 (555) 234-5678',
        date: 'December 16, 2025',
        time: '2:30 PM',
        service: 'Follow-up Session',
        status: 'upcoming',
    },
    {
        id: '3',
        clientName: 'Emma Williams',
        email: 'emma.w@email.com',
        phone: '+1 (555) 345-6789',
        date: 'December 10, 2025',
        time: '11:00 AM',
        service: 'Therapy Session',
        status: 'completed',
    },
    {
        id: '4',
        clientName: 'David Brown',
        email: 'david.b@email.com',
        phone: '+1 (555) 456-7890',
        date: 'December 12, 2025',
        time: '3:00 PM',
        service: 'Consultation',
        status: 'cancelled',
        notes: 'Client requested to reschedule',
    },
]

export const Appointments = () => {
    const [appointments, setAppointments] =
        useState<Appointment[]>(initialAppointments)
    const [searchQuery, setSearchQuery] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editingAppointment, setEditingAppointment] = useState<
        Appointment | undefined
    >()
    const [activeTab, setActiveTab] = useState<'all' | AppointmentStatus>('all')
    const [selectedDate, setSelectedDate] = useState<Date | undefined>()
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
    const [viewingAppointment, setViewingAppointment] =
        useState<Appointment | null>(null)

    const filteredAppointments = appointments.filter((apt) => {
        const matchesSearch =
            apt.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            apt.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            apt.service.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesTab = activeTab === 'all' || apt.status === activeTab

        const matchesDate =
            !selectedDate ||
            (() => {
                try {
                    const appointmentDate = parse(
                        apt.date,
                        'MMMM d, yyyy',
                        new Date()
                    )
                    return isSameDay(appointmentDate, selectedDate)
                } catch {
                    return false
                }
            })()

        return matchesSearch && matchesTab && matchesDate
    })

    const handleSaveAppointment = (
        appointmentData: Omit<Appointment, 'id'>
    ) => {
        if (editingAppointment) {
            setAppointments(
                appointments.map((apt) =>
                    apt.id === editingAppointment.id
                        ? { ...appointmentData, id: editingAppointment.id }
                        : apt
                )
            )
            toast.success('Appointment updated successfully')
        } else {
            const newAppointment: Appointment = {
                ...appointmentData,
                id: Date.now().toString(),
            }
            setAppointments([newAppointment, ...appointments])
            toast.success('Appointment created successfully')
        }
        setEditingAppointment(undefined)
    }

    const handleEditAppointment = (appointment: Appointment) => {
        setEditingAppointment(appointment)
        setDialogOpen(true)
    }

    const handleDeleteAppointment = (id: string) => {
        setAppointments(appointments.filter((apt) => apt.id !== id))
        toast.success('Appointment deleted')
    }

    const handleStatusChange = (id: string, status: AppointmentStatus) => {
        setAppointments(
            appointments.map((apt) =>
                apt.id === id ? { ...apt, status } : apt
            )
        )
        toast.success(`Appointment marked as ${status}`)
    }

    const handleViewDetails = (appointment: Appointment) => {
        setViewingAppointment(appointment)
        setDetailsDialogOpen(true)
    }

    const stats = {
        total: appointments.length,
        upcoming: appointments.filter((a) => a.status === 'upcoming').length,
        completed: appointments.filter((a) => a.status === 'completed').length,
        cancelled: appointments.filter((a) => a.status === 'cancelled').length,
    }

    const statsCards = [
        {
            label: 'Total',
            value: stats.total,
            icon: CalendarIcon,
            bgColor: 'bg-primary/10',
            iconColor: 'text-primary',
        },
        {
            label: 'Upcoming',
            value: stats.upcoming,
            icon: CalendarIcon,
            bgColor: 'bg-info/10',
            iconColor: 'text-info',
        },
        {
            label: 'Completed',
            value: stats.completed,
            icon: CalendarIcon,
            bgColor: 'bg-success/10',
            iconColor: 'text-success',
        },
        {
            label: 'Cancelled',
            value: stats.cancelled,
            icon: CalendarIcon,
            bgColor: 'bg-muted',
            iconColor: 'text-muted-foreground',
        },
    ]

    return (
        <div className="min-h-screen bg-background space-y-4">
            <ActionRequiredHeader
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
            />

            <main className="container mx-auto space-y-4">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
                    {statsCards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-card to-card/80 p-5 rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`h-10 w-10 rounded-lg ${card.bgColor} flex items-center justify-center`}
                                >
                                    <card.icon
                                        className={`h-5 w-5 ${card.iconColor}`}
                                    />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-foreground">
                                        {card.value}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {card.label}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Search appointments by name, email, or service..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-12 bg-card border-border/50"
                        />
                    </div> */}
                    <div className="w-full">
                        <TextInput
                            className="!w-full"
                            name={'search'}
                            onChange={(e: any) =>
                                setSearchQuery(e.target.value)
                            }
                            showError={false}
                            placeholder="Search appointments by name, email, or service..."
                        />
                    </div>

                    <Popover>
                        <PopoverTrigger>
                            <Button
                                variant="primaryNew"
                                outline
                                className={cn(
                                    'px-4 justify-start text-left font-normal min-w-[200px]',
                                    !selectedDate && 'text-muted-foreground'
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {selectedDate
                                    ? format(selectedDate, 'PPP')
                                    : 'Filter by date'}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="max-w-96 p-0" align="start">
                            <SidebarCalendar />
                        </PopoverContent>
                    </Popover>

                    {selectedDate && (
                        <Button
                            variant="action"
                            className="h-12 w-12"
                            onClick={() => setSelectedDate(undefined)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
                {/* Tabs */}
                <Tabs
                    value={activeTab}
                    onValueChange={(v) => setActiveTab(v as typeof activeTab)}
                >
                    <TabsList className="bg-muted/50">
                        <TabsTrigger value="all">
                            All ({stats.total})
                        </TabsTrigger>
                        <TabsTrigger value="upcoming">
                            Upcoming ({stats.upcoming})
                        </TabsTrigger>
                        <TabsTrigger value="completed">
                            Completed ({stats.completed})
                        </TabsTrigger>
                        <TabsTrigger value="cancelled">
                            Cancelled ({stats.cancelled})
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
                {/* Appointments Grid */}
                {filteredAppointments.length === 0 ? (
                    <div className="text-center py-16 bg-card/50 rounded-xl border border-border/50">
                        <CalendarIcon className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                            No appointments found
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            {searchQuery
                                ? 'Try adjusting your search'
                                : 'Create your first appointment to get started'}
                        </p>
                        {!searchQuery && (
                            <Button
                                onClick={() => setDialogOpen(true)}
                                className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                            >
                                <Plus className="h-5 w-5 mr-2" />
                                Create Appointment
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filteredAppointments.map((appointment) => (
                            <AppointmentCard
                                key={appointment.id}
                                appointment={appointment}
                                onEdit={handleEditAppointment}
                                onDelete={handleDeleteAppointment}
                                onStatusChange={handleStatusChange}
                                onViewDetails={handleViewDetails}
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* Dialogs */}
            {/* <AppointmentModal
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onSave={handleSaveAppointment}
                appointment={editingAppointment}
            /> */}

            {/* <AppointmentDetailsDialog
                open={detailsDialogOpen}
                onOpenChange={setDetailsDialogOpen}
                appointment={viewingAppointment}
            /> */}
        </div>
    )
}
