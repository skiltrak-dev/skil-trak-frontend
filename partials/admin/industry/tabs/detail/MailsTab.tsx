import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// components
import {
    Loading,
    EmailCard,
    EmptyData,
    ComposeEmail,
    TechnicalError,
} from 'components'

// utills
import { AuthUtils } from '@utils'

// query
import { useGetAdminMessagesQuery } from 'redux/query'
import { useSendMessageMutation } from 'redux/query'

// hooks
import { useContextBar } from 'hooks'
// import { useMessage } from 'hooks'

export const MailsTab = ({ data }: any) => {
    const { isVisible } = useContextBar()
    const [messagesList, setMessagesList] = useState([])
    const [approvedUser, setApprovedUser] = useState(
        data?.user?.status === 'approved'
    )

    // query
    const messages = useGetAdminMessagesQuery(data?.user?.id, {
        skip: !data?.user?.id,
    })

    useEffect(() => {
        messages.refetch()
    }, [messages.refetch])

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
                            <Loading />
                        </div>
                    ) : messages?.data?.length > 0 ||
                      messagesList.length > 0 ? (
                        messagesList?.map(
                            (message: any, i: number) =>
                                message && (
                                    <EmailCard
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
                    <ComposeEmail
                        action={useSendMessageMutation}
                        receiverId={Number(data?.user?.id)}
                        sender={'admin'}
                    />
                </div>
            )}
        </div>
    )
}
