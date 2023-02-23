import { EmptyData, InitialAvatar, LoadingAnimation, Mail, TechnicalError, Typography } from '@components'
import { CommonApi } from '@queries'
import moment from 'moment'
import React, { useState } from 'react'

type Props = {
    message: any
    selectedMessage: any
}

export const MailDetail = ({ message, selectedMessage }: Props) => {

    // const message = CommonApi.Message.useMessage(user?.id, {
    //     skip: !user?.id,
    // })
    return (
        <div className='w-full'>
            <div className="px-4 border-b py-2 flex justify-between items-center w-full">
                <div>
                    <Typography variant={'subtitle'}>
                        {selectedMessage?.name}
                    </Typography>
                    <Typography variant={'muted'} color={'text-muted'}>
                        {moment(new Date(selectedMessage?.createdAt)).format(
                            'LL'
                        )}
                    </Typography>
                </div>
                <div className="flex items-center gap-x-2">
                    <InitialAvatar name={selectedMessage?.name || " "} />
                    <Typography variant={'subtitle'}>
                        {selectedMessage?.email}
                    </Typography>
                </div>
            </div>
            <div className='h-screen overflow-y-scroll remove-scrollbar p-4'>
                <div className={`w-full bg-gray-50 rounded-lg p-2`}>
                    {message?.isError && <TechnicalError />}
                    <div className={`flex flex-col gap-y-2.5 h-full `}>
                        {message?.isLoading || message?.isFetching ? (
                            <div className="flex justify-center items-center h-full">
                                <LoadingAnimation />
                            </div>
                        ) : !message?.isError && message?.data?.length > 0 ? (
                            message?.data?.map(
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
                            !message?.isError && (
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
