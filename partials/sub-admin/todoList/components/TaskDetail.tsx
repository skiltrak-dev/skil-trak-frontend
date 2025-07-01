import { Calendar, Clock, User, FileText } from 'lucide-react'
import { format } from 'date-fns'
import { useState } from 'react'
import { Task } from '../types'
import { Button, Card } from '@components'

interface TaskDetailProps {
    task: Task | null
    onClose: () => void
    onMarkComplete: (taskId: string, completed: boolean) => void
}

export function TaskDetail({ task, onClose, onMarkComplete }: TaskDetailProps) {
    const [isLoading, setIsLoading] = useState(false)

    if (!task) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">
                    Select a task to view details
                </p>
            </div>
        )
    }

    const handleMarkComplete = async () => {
        setIsLoading(true)
        try {
            await onMarkComplete(task.id, !task.completed)
        } finally {
            setIsLoading(false)
        }
    }

    const getCategoryIcon = () => {
        switch (task.category) {
            case 'highPriority':
                return <div className="bg-red-500 w-2 h-2 rounded-full" />
            case 'appointments':
                return <Calendar className="h-4 w-4 text-blue-500" />
            case 'openTickets':
                return <FileText className="h-4 w-4 text-yellow-500" />
            default:
                return <div className="bg-gray-400 w-2 h-2 rounded-full" />
        }
    }

    const getCategoryLabel = () => {
        switch (task.category) {
            case 'highPriority':
                return 'High Priority'
            case 'appointments':
                return 'Appointment'
            case 'openTickets':
                return 'Open Ticket'
            case 'workplaceRequests':
                return 'Workplace Request'
            case 'studentFollowUp':
                return 'Student Follow-up'
            case 'industryFollowUp':
                return 'Industry Follow-up'
            case 'nonPartnerIndustries':
                return 'Non-Partner Industry'
            case 'listedIndustries':
                return 'Listed Industry'
            default:
                return 'Task'
        }
    }

    const getFrequencyLabel = (frequency: string) => {
        switch (frequency) {
            case 'daily':
                return 'Daily'
            case 'weekly':
                return 'Weekly'
            case 'monthly':
                return 'Monthly'
            case 'bimonthly':
                return 'Bi-Monthly'
            case 'quarterly':
                return 'Quarterly'
            default:
                return 'Unknown'
        }
    }

    return (
        <div className="h-full overflow-auto p-4">
            <Card>
                <div className="flex justify-between mb-4 items-start">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            {getCategoryIcon()}
                            <span className="text-xs font-medium text-muted-foreground">
                                {getCategoryLabel()}
                            </span>
                        </div>
                        <h2 className="text-xl font-bold">{task.title}</h2>
                    </div>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                </div>

                <div className="space-y-4 mt-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">
                                Due Date
                            </p>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <p className="text-sm">
                                    {format(task.dueDate, 'MMM dd, yyyy')}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">
                                Recurrence
                            </p>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <p className="text-sm">
                                    {getFrequencyLabel(task.frequency)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {task.clientName && (
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">
                                Client
                            </p>
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <p className="text-sm">{task.clientName}</p>
                            </div>
                        </div>
                    )}

                    {task.description && (
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">
                                Description
                            </p>
                            <p className="text-sm">{task.description}</p>
                        </div>
                    )}

                    {task.status && (
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">
                                Status
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                                <p className="text-sm">{task.status}</p>
                            </div>
                        </div>
                    )}

                    {/* <Separator /> */}
                    <div className="h-px bg-gray-200"></div>

                    <div className="pt-2 flex justify-between items-center">
                        {task.clientId && (
                            <Button outline variant="secondary">
                                <a href={`#/clients/${task.clientId}`}>
                                    View Client Profile
                                </a>
                            </Button>
                        )}

                        <Button
                            variant={task.completed ? 'secondary' : 'primary'}
                            onClick={handleMarkComplete}
                            disabled={isLoading}
                        >
                            {task.completed
                                ? 'Mark as Incomplete'
                                : 'Mark as Complete'}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}
