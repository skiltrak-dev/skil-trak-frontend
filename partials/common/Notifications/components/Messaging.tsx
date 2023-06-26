import React, { ReactNode } from 'react'
import { MailDetail } from './MailDetail'

export const Messaging = ({
    children,
    selectedMessage,
}: {
    selectedMessage: any
    children: ReactNode
}) => {
    return (
        <div className="flex border h-[500px] rounded">
            <div
                id="scrollableDiv"
                className="w-[28%] h-full border-r overflow-y-auto remove-scrollbar"
            >
                {children}
            </div>
            <div className="w-[72%] h-full ">
                <MailDetail selectedMessage={selectedMessage} />
            </div>
        </div>
    )
}
