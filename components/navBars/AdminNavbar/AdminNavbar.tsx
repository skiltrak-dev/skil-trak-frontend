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

export const AdminNavbar = () => {
    let router = useRouter()
    const navbar = useNavbar()

    const [messagesExpanded, setMessagesExpanded] = useState(false)
    const [notificationsExpanded, setNotificationsExpanded] = useState(false)

    const paths = router.pathname.split('/')
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
    return (
        <div className="w-full transition-all  z-30 py-4 px-6 pt-6  flex justify-between items-center">
            <div>
                <Typography variant={'h4'} capitalize>
                    {navbar.title || 'Dashboard'}
                </Typography>

                <NavbarBreadCrumbs
                    links={links}
                    title={navbar?.subTitle || navbar.title}
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
                            count={0}
                            max={9}
                            onClick={() =>
                                setMessagesExpanded(!messagesExpanded)
                            }
                            text={'Messages'}
                        />

                        <MessageDropDown expanded={messagesExpanded} />
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
                            count={0}
                            max={9}
                            onClick={() =>
                                setNotificationsExpanded(!notificationsExpanded)
                            }
                            text={'Notifications'}
                        />

                        <NotificationDropDown
                            expanded={notificationsExpanded}
                        />
                    </div>
                </OutsideClickHandler>
            </div>
        </div>
    )
}
