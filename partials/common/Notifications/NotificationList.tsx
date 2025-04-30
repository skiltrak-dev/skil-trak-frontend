import { useState } from 'react'
// Layouts
// Types
import { Typography } from '@components'
import {
    AllNotifications,
    ReadNotifications,
    UnReadNotifications,
} from '@partials/common'
import { IoIosNotificationsOutline } from 'react-icons/io'

const tabs = [
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

export const NotificationList = () => {
    const [selectedTab, setSelectedTab] = useState(tabs?.[0]?.text)

    const Component = tabs?.find((tab) => tab?.text === selectedTab)?.component

    return (
        <div className="flex flex-col gap-y-2">
            <div className="bg-white px-6 pt-3 flex items-center gap-x-14">
                {tabs?.map((tab) => (
                    <div
                        className={`cursor-pointer pb-3 flex items-center gap-x-2 border-b-4 border-white ${
                            tab?.text === selectedTab ? '!border-primary' : ''
                        }`}
                        onClick={() => setSelectedTab(tab?.text)}
                    >
                        <IoIosNotificationsOutline size={20} />
                        <Typography variant="label" bold cursorPointer>
                            {tab?.text}{' '}
                        </Typography>
                    </div>
                ))}
            </div>
            <div>{Component && <Component />}</div>
        </div>
    )
}
