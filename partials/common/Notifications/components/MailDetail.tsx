import { EmptyData, InitialAvatar, LoadingAnimation, Mail, TechnicalError, Typography } from '@components'
import { CommonApi } from '@queries'
import React, { useState } from 'react'

type Props = {
    user?: any
}

export const MailDetail = ({ user }: Props) => {

    const messages = CommonApi.Messages.useMessages(user?.id, {
        skip: !user?.id,
    })
    return (
        <div className='w-full'>
            <div className="px-4 py-2 flex justify-between items-center w-full border-r">
                <div>
                    <Typography variant={'subtitle'}>Subject Here</Typography>
                    <Typography variant={'muted'} color={'text-muted'}>
                        {' '}
                        Fri 24 June, 2022 - 01:00 PM
                    </Typography>
                </div>
                <div className="flex items-center gap-x-2">
                    <InitialAvatar name={'Sub Admin'} />
                    <Typography variant={'subtitle'}>
                        janedoe@gmail.com
                    </Typography>
                </div>
            </div>
            <div className='h-screen border p-4'>
                <div className={`w-full bg-gray-50 rounded-lg p-2`}>
                    {messages.isError && <TechnicalError />}
                    <div className={`flex flex-col gap-y-2.5 h-full `}>
                        {messages?.isLoading || messages?.isFetching ? (
                            <div className="flex justify-center items-center h-full">
                                <LoadingAnimation />
                            </div>
                        ) : !messages.isError && messages?.data?.length > 0 ? (
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
            </div>
        </div>
    )
}
