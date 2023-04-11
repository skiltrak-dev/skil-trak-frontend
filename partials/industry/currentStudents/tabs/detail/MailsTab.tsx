import React, { useState, useEffect } from 'react'

// components
import {
    LoadingAnimation,
    Mail,
    EmptyData,
    MailForm,
    TechnicalError,
} from '@components'

// query
// query
import { AdminApi, useSendIndustryMessageMutation } from '@queries'

// hooks
import { useContextBar } from 'hooks'
// import { useMessage } from 'hooks'

export const MailsTab = ({ student }: any) => {
    const [messagesList, setMessagesList] = useState([])
    const [approvedUser, setApprovedUser] = useState(
        student?.user?.status === 'approved'
    )

    // query
    const messages = AdminApi.Messages.useList(
        { id: student?.user?.id },
        {
            skip: !student?.user?.id,
        }
    )

    useEffect(() => {
        setApprovedUser(student?.user?.status === 'approved')
    }, [student])

    // useEffect(() => {
    //     messages.refetch()
    // }, [messages.refetch])

    return (
        <div className={`flex gap-x-2.5 w-full mt-4 mb-32`}>
            <div className={`w-full bg-gray-50 rounded-lg p-2`}>
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
                        !messages.isError && (
                            <EmptyData
                                imageUrl="/images/icons/common/mails.png"
                                title={'No Mails'}
                                description={
                                    'You have not sent/received any mail yet'
                                }
                                height={'40vh'}
                            />
                        )
                    )}
                </div>
            </div>
            {approvedUser && (
                <div className={`w-2/5`}>
                    <MailForm
                        action={useSendIndustryMessageMutation}
                        receiverId={Number(student?.id)}
                        sender={'admin'}
                    />
                </div>
            )}
        </div>
    )
}
