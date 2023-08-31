import { UserStatus } from '@types'

export const StatusOptions = [
    {
        label: 'Approved',
        value: UserStatus.Approved,
    },
    {
        label: 'Pending',
        value: UserStatus.Pending,
    },
    {
        label: 'Blocked',
        value: UserStatus.Blocked,
    },
    {
        label: 'Rejected',
        value: UserStatus.Rejected,
    },
    {
        label: 'Archived',
        value: UserStatus.Archived,
    },
]
