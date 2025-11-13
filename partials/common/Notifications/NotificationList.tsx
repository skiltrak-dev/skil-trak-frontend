import { useState } from 'react'

import { Typography } from '@components'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { notificationTabs } from './data'

export const NotificationList = ({ userId }: { userId?: number }) => {
    const [selectedTab, setSelectedTab] = useState(notificationTabs?.[0]?.text)

    const Component = notificationTabs?.find(
        (tab) => tab?.text === selectedTab
    )?.component

    return (
        <div className="flex flex-col gap-y-2">
            <div className="bg-white px-6 pt-3 flex items-center gap-x-6">
                {notificationTabs?.map((tab) => (
                    <div
                        className={`cursor-pointer pb-3 flex items-center gap-x-2 border-b-4 border-white ${
                            tab?.text === selectedTab ? '!border-primary' : ''
                        }`}
                        onClick={() => setSelectedTab(tab?.text)}
                    >
                        <IoIosNotificationsOutline size={20} />
                        <Typography variant="small" bold cursorPointer>
                            {tab?.text}{' '}
                        </Typography>
                    </div>
                ))}
            </div>
            <div>{Component && <Component userId={userId} />}</div>
        </div>
    )
}
