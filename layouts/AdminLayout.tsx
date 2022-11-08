import React from 'react'
import { useAlert } from 'hooks'
import { useNotification } from 'hooks'

// components
import {
    AdminNavbar,
    DisplayAlerts,
    DisplayNotifications,
    Footer,
    ContextBar,
    SideBar,
} from '@components'

export const AdminLayout = ({ children }: any) => {
    const { alert } = useAlert()
    const { notification } = useNotification()

    return (
        <div className="flex justify-between w-full overflow-hidden">
            <SideBar />
            <div className="flex-grow flex flex-col justify-between">
                <AdminNavbar />
                <div
                    className={`h-[calc(100vh-80px)] bg-secondary overflow-scroll remove-scrollbar border-b-[32px] border-transparent w-full relative`}
                >
                    <button
                        onClick={() => {
                            alert.success({
                                title:
                                    'Add Alert' +
                                    Math.floor(Math.random() * 20),
                                description:
                                    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, deleniti.',
                            })
                        }}
                    >
                        Add Alert
                    </button>

                    <button
                        onClick={() => {
                            notification.error({
                                title:
                                    'Add Alert' +
                                    Math.floor(Math.random() * 20),
                                description:
                                    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, deleniti.',
                            })
                        }}
                    >
                        Add Notification
                    </button>

                    <DisplayAlerts />
                    <DisplayNotifications />

                    <div className="max-w-screen-lg mx-auto">{children}</div>
                </div>
                <div className="z-10 absolute bottom-0 right-0 w-full">
                    <Footer />
                </div>
            </div>
            <ContextBar />
        </div>
    )
}
