import { useEffect, useState } from 'react'

import {
    EmptyData,
    InitialAvatar,
    LoadingAnimation,
    Mail,
    NoData,
    TechnicalError,
    Typography,
} from '@components'

import { CommonApi } from '@queries'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroller'
import { PulseLoader } from 'react-spinners'
type Props = {
    selectedMessage: any
}

export const MailDetail = ({ selectedMessage }: Props) => {
    const [itemPerPage, setItemPerPage] = useState(20)
    const [page, setPage] = useState(1)
    const [hasNext, setHasNext] = useState(false)

    const [mailDetail, setMailDetail] = useState<any>([])

    const message = CommonApi.Messages.useSingleChat(
        {
            id: selectedMessage?.id,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        {
            skip: !selectedMessage?.id,
        }
    )

    useEffect(() => {
        setPage(1)
        setMailDetail([])
    }, [selectedMessage])

    useEffect(() => {
        if (selectedMessage) {
            setHasNext(true)
        }
    }, [selectedMessage])

    useEffect(() => {
        if (message.data?.pagination && message.isSuccess) {
            setHasNext(message.data?.pagination?.hasNext)
        }
        if (message?.isError) {
            setHasNext(false)
        }
    }, [message])

    useEffect(() => {
        if (
            !message?.isFetching &&
            !message?.isLoading &&
            message?.isSuccess &&
            message?.data?.data &&
            message?.data?.data?.length > 0
        ) {
            setMailDetail([...mailDetail, ...message?.data?.data])
        }
    }, [message])

    const fetchMoreData = () => {
        setPage(
            mailDetail?.length > 0
                ? Math.floor(mailDetail?.length / itemPerPage) + 1
                : 1
        )
        // setTimeout(() => {
        //     setPage(
        //         mailDetail?.length > 0
        //             ? Math.floor(mailDetail?.length / itemPerPage) + 1
        //             : 1
        //     )
        // }, 1500)
    }
    const [seenMessage, resultSeenMessage] = CommonApi.Messages.useIsSeen()
    // useEffect(() => {
    //     if (selectedMessage?.id) {
    //         mailDetail?.map((item: any) => {
    //             if (item?.isSeen === false) {
    //                 seenMessage(item?.id)
    //             }
    //         })
    //     }
    // }, [selectedMessage])


    return (
        <div className="w-full h-full">
            {selectedMessage && (
                <div className="px-4 border-b py-2 flex justify-between items-center w-full">
                    <div>
                        <Typography variant={'subtitle'}>
                            {selectedMessage?.name}
                        </Typography>
                        <Typography variant={'muted'} color={'text-muted'}>
                            {moment(
                                new Date(selectedMessage?.createdAt)
                            ).format('LL')}
                        </Typography>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <InitialAvatar name={selectedMessage?.name || ' '} />
                        <Typography variant={'subtitle'}>
                            {selectedMessage?.email}
                        </Typography>
                    </div>
                </div>
            )}
            <div className="p-4 h-full">
                <div
                    className={`w-full bg-gray-50 rounded-lg p-2 h-[calc(100%-50px)] overflow-y-auto remove-scrollbar`}
                >
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={fetchMoreData}
                        hasMore={hasNext}
                        useWindow={false}
                        loader={
                            <div className="py-6 flex items-center justify-center">
                                <PulseLoader size={10} />
                            </div>
                        }
                    >
                        <div className={`flex flex-col gap-y-2.5 `}>
                            {mailDetail && mailDetail?.length > 0
                                ? mailDetail?.map((mail: any, i: number) => (
                                    <Mail
                                        key={mail?.id}
                                        sender={
                                            mail?.sender?.role === 'admin'
                                        }
                                        message={mail}
                                        index={i}
                                    />
                                ))
                                : !message?.isError &&
                                !hasNext &&
                                (selectedMessage ? (
                                    <EmptyData
                                        imageUrl="/images/icons/common/mails.png"
                                        title={'No Mails'}
                                        description={
                                            'You have not sent/received any mail yet'
                                        }
                                        height={'40vh'}
                                    />
                                ) : (
                                    <EmptyData
                                        imageUrl="/images/icons/common/mails.png"
                                        title={'No Mails Selected'}
                                        description={
                                            'You did not select any mail yet'
                                        }
                                        height={'40vh'}
                                    />
                                ))}

                            {message?.isError && (
                                <NoData
                                    text={
                                        'There is some network issue,Data cant load, try to refresh the browser'
                                    }
                                />
                            )}
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    )
}
