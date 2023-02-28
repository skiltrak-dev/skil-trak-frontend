import React from 'react'
import { MailDetail } from './MailDetail'

export const Messaging = ({
    children,
    selectedMessage,
}: {
    selectedMessage: any
    children: any
}) => {
    return (
        <div className="flex border h-[calc(100vh - 350px)] rounded">
            <div
                id="scrollableDiv"
                className="w-[28%] h-screen border-r overflow-y-auto remove-scrollbar"
            >
                {children}
            </div>
            <div className="w-[72%]">
                <MailDetail selectedMessage={selectedMessage} />
            </div>
        </div>
    )
}
