import { AppointmentUserEnum } from '@types'

export const AppointmentFor = [
    {
        text: AppointmentUserEnum.RTO,
        icon: '/images/icons/rto.png',
    },
    {
        text: AppointmentUserEnum.Student,
        icon: '/images/icons/students.png',
    },
    {
        text: AppointmentUserEnum.Industry,
        icon: '/images/icons/industry.png',
    },
]

export const AppointmentWithData = [
    {
        text: AppointmentUserEnum.Self,
        icon: '/images/icons/sub-admin.png',
        type: [
            AppointmentUserEnum.RTO,
            AppointmentUserEnum.Student,
            AppointmentUserEnum.Industry,
        ],
    },
    {
        text: AppointmentUserEnum.RTO,
        icon: '/images/icons/rto.png',
        type: [AppointmentUserEnum.Industry],
    },
    {
        text: AppointmentUserEnum.Industry,
        icon: '/images/icons/industry.png',
        type: [AppointmentUserEnum.RTO, AppointmentUserEnum.Student],
    },
    {
        text: AppointmentUserEnum.Student,
        icon: '/images/subAdmins/students.png',
        type: [AppointmentUserEnum.Industry],
    },
]
