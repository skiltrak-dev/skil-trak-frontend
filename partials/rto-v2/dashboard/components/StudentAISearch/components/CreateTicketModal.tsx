import { Badge, Button, Select, TextArea, TextInput } from '@components'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@components/ui'
import { AlertCircle, Ticket, User } from 'lucide-react'
import { useState } from 'react'

interface CreateTicketModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (ticket: {
        title: string
        description: string
        priority: string
        category: string
        assignee: string
    }) => void
    studentName: string
}

export function CreateTicketModal({
    isOpen,
    onClose,
    onSubmit,
    studentName,
}: CreateTicketModalProps) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('medium')
    const [category, setCategory] = useState('placement')
    const [assignee, setAssignee] = useState('unassigned')

    const handleSubmit = () => {
        if (title.trim() && description.trim()) {
            onSubmit({
                title,
                description,
                priority,
                category,
                assignee,
            })
            // Reset form
            setTitle('')
            setDescription('')
            setPriority('medium')
            setCategory('placement')
            setAssignee('unassigned')
            onClose()
        }
    }

    const handleCancel = () => {
        // Reset form
        setTitle('')
        setDescription('')
        setPriority('medium')
        setCategory('placement')
        setAssignee('unassigned')
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleCancel}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                            <Ticket className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <DialogTitle>Create New Ticket</DialogTitle>
                            <DialogDescription>
                                Create a ticket for {studentName}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Student Info Badge */}
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                        <div className="flex items-center gap-2 text-sm">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                                Student:
                            </span>
                            <Badge
                                variant="secondary"
                                text={studentName}
                            ></Badge>
                        </div>
                    </div>

                    {/* Ticket Title */}
                    <div className="space-y-2">
                        <TextInput
                            name="title"
                            label={'Ticket Title'}
                            required
                            value={title}
                            onChange={(e: any) => setTitle(e.target.value)}
                            placeholder="e.g., Follow up on pending e-signature"
                        />
                    </div>

                    {/* Category and Priority */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Select
                                label={'Category'}
                                name="category"
                                options={[
                                    { value: 'placement', label: 'Placement' },
                                    {
                                        value: 'assessment',
                                        label: 'Assessment',
                                    },
                                    {
                                        value: 'communication',
                                        label: 'Communication',
                                    },
                                    {
                                        value: 'documentation',
                                        label: 'Documentation',
                                    },
                                    {
                                        value: 'scheduling',
                                        label: 'Scheduling',
                                    },
                                    {
                                        value: 'compliance',
                                        label: 'Compliance',
                                    },
                                    { value: 'other', label: 'Other' },
                                ]}
                            />
                        </div>

                        <div className="space-y-2">
                            <Select
                                name="priority"
                                label={'Priority'}
                                options={[
                                    {
                                        value: 'low',
                                        label: 'Low',
                                    },
                                    {
                                        value: 'medium',
                                        label: 'Medium',
                                    },
                                    {
                                        value: 'high',
                                        label: 'High',
                                    },
                                    {
                                        value: 'urgent',
                                        label: 'Urgent',
                                    },
                                ]}
                            />
                        </div>
                    </div>

                    {/* Assignee */}
                    <div className="space-y-2">
                        <Select
                            name="assignee"
                            label={'Assign To'}
                            options={[
                                { value: 'unassigned', label: 'Unassigned' },
                                { value: 'julie-smith', label: 'Julie Smith' },
                                {
                                    value: 'michael-brown',
                                    label: 'Michael Brown',
                                },
                                { value: 'sarah-jones', label: 'Sarah Jones' },
                                {
                                    value: 'david-wilson',
                                    label: 'David Wilson',
                                },
                            ]}
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <TextArea
                            name="description"
                            label={'Description'}
                            value={description}
                            onChange={(e: any) =>
                                setDescription(e.target.value)
                            }
                            placeholder="Provide details about the ticket..."
                            className="min-h-[120px] resize-none rounded-lg"
                        />
                    </div>

                    {/* Helper Info */}
                    {priority === 'urgent' && (
                        <div className="flex items-start gap-3 rounded-lg border border-orange-200 bg-orange-50 p-3 dark:border-orange-900/50 dark:bg-orange-950/30">
                            <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                            <div className="flex-1">
                                <p className="text-sm text-orange-800 dark:text-orange-200">
                                    Urgent tickets will be flagged for immediate
                                    attention and sent to the assigned
                                    coordinator.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!title.trim() || !description.trim()}
                    >
                        Create Ticket
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
