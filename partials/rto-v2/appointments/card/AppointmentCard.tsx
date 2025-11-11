import { Badge, Card } from '@components'
import { cn } from '@utils'
import { Calendar, Clock, Mail, Phone } from 'lucide-react'

export type AppointmentStatus = 'upcoming' | 'completed' | 'cancelled'

export interface Appointment {
    id: string
    clientName: string
    email: string
    phone: string
    date: string
    time: string
    service: string
    status: AppointmentStatus
    notes?: string
}

interface AppointmentCardProps {
    appointment: Appointment
    onEdit: (appointment: Appointment) => void
    onDelete: (id: string) => void
    onStatusChange: (id: string, status: AppointmentStatus) => void
    onViewDetails: (appointment: Appointment) => void
}

const statusStyles: Record<
    AppointmentStatus,
    { bg: string; text: string; label: string }
> = {
    upcoming: { bg: 'bg-info/10', text: 'text-info', label: 'Upcoming' },
    completed: {
        bg: 'bg-success/10',
        text: 'text-success',
        label: 'Completed',
    },
    cancelled: {
        bg: 'bg-muted',
        text: 'text-muted-foreground',
        label: 'Cancelled',
    },
}

export const AppointmentCard = ({
    appointment,
    onEdit,
    onDelete,
    onStatusChange,
    onViewDetails,
}: AppointmentCardProps) => {
    const statusStyle = statusStyles[appointment.status]

    return (
        <Card className="group hover:shadow-md transition-all duration-300 border-border/50 bg-gradient-to-br from-card to-card/80">
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">
                                {appointment.clientName}
                            </h3>
                            <Badge
                                className={cn(
                                    'font-medium',
                                    statusStyle.bg,
                                    statusStyle.text
                                )}
                                variant="primaryNew"
                                text={statusStyle.label}
                            ></Badge>
                        </div>
                        <p className="text-sm font-medium text-primary">
                            {appointment.service}
                        </p>
                    </div>

                    {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem
                                onClick={() => onViewDetails(appointment)}
                            >
                                View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onEdit(appointment)}
                            >
                                Reschedule
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onEdit(appointment)}
                            >
                                Edit Appointment
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    onStatusChange(appointment.id, 'completed')
                                }
                            >
                                Mark as Completed
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    onStatusChange(appointment.id, 'cancelled')
                                }
                                className="text-destructive focus:text-destructive"
                            >
                                Cancel Appointment
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onDelete(appointment.id)}
                                className="text-destructive focus:text-destructive"
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu> */}
                </div>

                <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4 text-primary" />
                        <span>{appointment.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4 text-primary" />
                        <span>{appointment.phone}</span>
                    </div>
                </div>

                {appointment.notes && (
                    <div className="mt-4 pt-4 border-t border-border/50">
                        <p className="text-sm text-muted-foreground">
                            {appointment.notes}
                        </p>
                    </div>
                )}
            </div>
        </Card>
    )
}
