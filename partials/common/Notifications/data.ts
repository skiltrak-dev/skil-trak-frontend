import { AllNotifications } from './AllNotifications'
import { ReadNotifications } from './ReadNotifications'
import { UnReadNotifications } from './UnReadNotifications'

export const notificationTabs = [
    {
        text: 'All Notifications',
        component: AllNotifications,
    },
    {
        text: 'Unread Notifications',
        component: UnReadNotifications,
    },
    {
        text: 'Read Notifications',
        component: ReadNotifications,
    },
]
