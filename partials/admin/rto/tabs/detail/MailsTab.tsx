import React, { useState, useEffect } from 'react'

// components
import {
    Mail,
    MailForm,
    EmptyData,
    TechnicalError,
    LoadingAnimation,
} from '@components'

// utils
import { AuthUtils } from '@utils'

// query
import { AdminApi, useSendMessageMutation } from '@queries'

// hooks
import { useContextBar } from '@hooks'
// import { useMessage } from 'hooks'

export const MailsTab = ({ rto }: any) => {
    const { isVisible } = useContextBar()
    const [messagesList, setMessagesList] = useState([])
    const [approvedUser, setApprovedUser] = useState<boolean>(
        rto?.status === 'approved'
    )

    useEffect(() => {
        if (rto) {
            setApprovedUser(rto?.status === 'approved')
        }
    }, [rto])

    // query
    const messages = AdminApi.Messages.useList(rto?.id, {
        skip: !rto?.id,
    })

    console.log('messages', messages)

    // useEffect(() => {
    //     messages?.refetch()
    // }, [])

    return (
        <div
            className={`flex gap-x-2.5 w-full ${
                isVisible ? 'flex-col' : 'flex-row'
            }`}
        >
            <div
                className={`${
                    isVisible ? 'w-full' : !approvedUser ? 'w-full' : 'w-[71%]'
                } bg-gray-50 rounded-lg p-2`}
            >
                {messages.isError && <TechnicalError />}
                <div className={`flex flex-col gap-y-2.5 h-full `}>
                    {messages?.isLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <LoadingAnimation />
                        </div>
                    ) : messages?.data?.length > 0 ? (
                        messages?.data?.map(
                            (message: any, i: number) =>
                                message && (
                                    <Mail
                                        key={i}
                                        sender={
                                            message?.sender?.role === 'admin'
                                        }
                                        message={message}
                                        index={i}
                                    />
                                )
                        )
                    ) : (
                        !messages.isError && <EmptyData actionLink={null} />
                    )}
                </div>
            </div>
            {approvedUser && (
                <div className={`${isVisible ? 'w-full' : 'w-[29%]'}`}>
                    <MailForm
                        action={useSendMessageMutation}
                        receiverId={Number(rto?.id)}
                        sender={'admin'}
                    />
                </div>
            )}
        </div>
    )
}
