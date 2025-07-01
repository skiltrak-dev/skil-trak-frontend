type Task = {
    id: string
    title: string
    clientName?: string
    status: 'pending' | 'completed' | 'overdue'
    notes?: string
    profileLink?: string
}

type TaskCategory = {
    label: string
    tasks: Task[]
}

type RecurringGroup = {
    label: string
    categories: TaskCategory[]
}

export const dummyTaskData: RecurringGroup[] = [
    {
        label: 'Daily Tasks',
        categories: [
            {
                label: 'High Priority Items',
                tasks: [
                    {
                        id: '1',
                        title: 'Assigned student: John Doe',
                        status: 'pending',
                        profileLink: '/students/john-doe',
                    },
                    {
                        id: '2',
                        title: 'Assigned student: John Doe',
                        status: 'pending',
                        profileLink: '/students/john-doe',
                    },
                    {
                        id: '3',
                        title: 'Assigned student: John Doe',
                        status: 'pending',
                        profileLink: '/students/john-doe',
                    },
                ],
            },
            {
                label: 'Appointments',
                tasks: [
                    {
                        id: '2',
                        title: 'Dental appointment with Dr. Smith',
                        status: 'pending',
                        profileLink: '/calendar/appointment/2',
                    },
                ],
            },
            {
                label: 'Open Tickets',
                tasks: [
                    {
                        id: '3',
                        title: 'Ticket #4567: Course Registration Issue',
                        status: 'completed',
                        profileLink: '/tickets/4567',
                        notes: 'Resolved and replied to client',
                    },
                ],
            },
            {
                label: 'Workplace Requests',
                tasks: [
                    {
                        id: '4',
                        title: 'Request from ABC Corp - Awaiting Signature',
                        status: 'pending',
                        profileLink: '/requests/abc-corp',
                    },
                ],
            },
        ],
    },
    {
        label: 'Weekly Recurring Tasks',
        categories: [
            {
                label: 'Student Follow-up',
                tasks: [
                    {
                        id: '5',
                        title: 'Follow up with Jane Doe (In Placement)',
                        status: 'pending',
                        profileLink: '/students/jane-doe',
                    },
                ],
            },
        ],
    },
    {
        label: 'Monthly Recurring Tasks',
        categories: [
            {
                label: 'Industry Follow-up (Partner Industries)',
                tasks: [
                    {
                        id: '6',
                        title: 'Call Acme Corp and update profile',
                        status: 'overdue',
                        profileLink: '/industries/acme',
                        notes: '',
                    },
                ],
            },
        ],
    },
    {
        label: 'Bi-Monthly Recurring Tasks',
        categories: [
            {
                label: 'Non-Partner Industries',
                tasks: [
                    {
                        id: '7',
                        title: 'Follow-up with Beta Industries',
                        status: 'pending',
                        profileLink: '/industries/beta',
                    },
                ],
            },
        ],
    },
    {
        label: 'Quarterly Recurring Tasks',
        categories: [
            {
                label: 'Listed Industries',
                tasks: [
                    {
                        id: '8',
                        title: 'Check status with Delta Ltd',
                        status: 'pending',
                        profileLink: '/industries/delta',
                    },
                ],
            },
        ],
    },
]
