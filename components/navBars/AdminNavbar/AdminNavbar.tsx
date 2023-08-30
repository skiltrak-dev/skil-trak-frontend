import React, { Fragment, useState } from 'react'

// Icons
import { MdMessage, MdKeyboardArrowDown } from 'react-icons/md'
import { IoMdNotifications } from 'react-icons/io'

// components
import { Typography } from '@components'

// components
import { BadgeButton, MessageDropDown, NavbarBreadCrumbs } from './components'
import { useNavbar } from '@hooks'
import { useRouter } from 'next/router'
import OutsideClickHandler from 'react-outside-click-handler'
import { NotificationDropDown } from './components/notifications'

// query
import { CommonApi } from '@queries'

export const AdminNavbar = () => {
    const data = CommonApi.Notifications.useNotifications({
        skip: undefined,
        limit: undefined,
    })
    const [isReadNotification, resultIsReadNotification] =
        CommonApi.Notifications.useIsReadNotification()
    let router = useRouter()
    const navbar = useNavbar()

    const [messagesExpanded, setMessagesExpanded] = useState(false)
    const [notificationsExpanded, setNotificationsExpanded] = useState(false)

    const paths = router.asPath.split('/')
    const links = paths.slice(1, -1)

    var find = '-'
    var remove = new RegExp(find, 'g')

    const title = paths[paths.length - 1].replace(remove, ' ')

    const getTitle = (paths: string[], offset = 1) => {
        const title = paths[paths.length - offset].replace(remove, ' ')
    }

    // const onMessageButtonClick = () => {
    // 	if (notificationsExpanded) setNotificationsExpanded(false);
    // 	setMessagesExpanded(true);
    // };
    // const onNotificationButtonClick = () => {
    // 	if (messagesExpanded) setMessagesExpanded(false);
    // 	setMessagesExpanded(!messagesExpanded);
    // };
    // bg-[#F9FAFB]

    // filter over data to get only unread notifications
    const unreadNotifications = data?.data?.data?.filter(
        (notification: any) => notification?.isRead === false
    )
    const count = unreadNotifications?.length

    const { data: mailCount } = CommonApi.Messages.useMailCount()
    const allMails = CommonApi.Messages.useRecentMails()
    const [seenMessage, resultSeenMessage] = CommonApi.Messages.useIsSeen()
    return (
        <div className="w-full transition-all  z-30 py-2 px-6  flex justify-between items-center">
            <div>
                <Typography variant={'h4'} capitalize>
                    {navbar.title || 'Dashboard'}
                </Typography>

                <NavbarBreadCrumbs
                    links={links}
                    title={navbar?.subTitle || navbar?.title}
                />
            </div>

            <div className="flex items-center gap-x-4">
                <OutsideClickHandler
                    onOutsideClick={() => {
                        setMessagesExpanded(false)
                    }}
                >
                    <div className="relative">
                        <BadgeButton
                            icon={MdMessage}
                            count={mailCount?.count || 0}
                            max={9}
                            onClick={() =>
                                setMessagesExpanded(!messagesExpanded)
                            }
                            text={'E-mails'}
                        />

                        <MessageDropDown
                            data={allMails}
                            expanded={messagesExpanded}
                            resultSeenMessage={resultSeenMessage}
                            seenMessage={seenMessage}
                        />
                    </div>
                </OutsideClickHandler>

                <OutsideClickHandler
                    onOutsideClick={() => {
                        setNotificationsExpanded(false)
                    }}
                >
                    <div className="relative">
                        <BadgeButton
                            icon={IoMdNotifications}
                            count={count || 0}
                            max={9}
                            onClick={() =>
                                setNotificationsExpanded(!notificationsExpanded)
                            }
                            text={'Notifications'}
                        />

                        <NotificationDropDown
                            expanded={notificationsExpanded}
                            data={data?.data}
                            isReadNotification={isReadNotification}
                            resultIsReadNotification={resultIsReadNotification}
                            setNotificationsExpanded={setNotificationsExpanded}
                        />
                    </div>
                </OutsideClickHandler>
            </div>
        </div>
    )
}
