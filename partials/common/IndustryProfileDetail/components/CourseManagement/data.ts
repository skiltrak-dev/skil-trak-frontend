import { CourseManagementTabType } from './types'

export const courseManagementTabs: {
    tab: CourseManagementTabType
    label: string
}[] = [
    {
        tab: 'approved',
        label: 'Approved',
    },
    {
        tab: 'pending',
        label: 'Pending',
    },
]
