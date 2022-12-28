export const AppointmentFor = [
    {
        text: 'RTO',
        icon: '/images/icons/rto.png',
    },
    {
        text: 'Student',
        icon: '/images/icons/students.png',
    },
    {
        text: 'Industry',
        icon: '/images/icons/industry.png',
    },
]

export const AppointmentWithData = [
    {
        text: 'Coordinator',
        icon: '/images/icons/sub-admin.png',
        type: ['RTO', 'Student', 'Industry'],
    },
    {
        text: 'RTO',
        icon: '/images/icons/rto.png',
        type: ['Industry'],
    },
    {
        text: 'Industry',
        icon: '/images/icons/industry.png',
        type: ['RTO', 'Student'],
    },
    {
        text: 'Student',
        icon: '/images/subAdmins/students.png',
        type: ['Industry'],
    },
]
