import React, { useState, useEffect } from 'react'
import { MailListCard, Messaging } from '../../components'
import {
    EmptyData,
    LoadingAnimation,
    NoData,
    TechnicalError,
} from '@components'
import InfiniteScroll from 'react-infinite-scroller'

// query
import { CommonApi } from '@queries'
import { PulseLoader } from 'react-spinners'

export const ReadMail = ({
    setSelectedMessage,
    selectedMessage,
}: {
    setSelectedMessage: any
    selectedMessage: any
}) => {
    const [itemPerPage, setItemPerPage] = useState(20)
    const [page, setPage] = useState(1)

    const [allMails, setAllMails] = useState<any>([])

    const { data, isLoading, isError, isFetching, isSuccess } =
        CommonApi.Messages.useAllConversations({
            status: 'seen',
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        })

    useEffect(() => {
        if (isSuccess && data?.data && data?.data?.length > 0) {
            setAllMails((mails: any) => [...mails, ...data?.data])
        }
    }, [data, isSuccess])

    const fetchMoreData = () => {
        setTimeout(() => {
            // setItemPerPage(
            //     data?.data?.length > 0 ? data?.data?.length + 20 : 20
            // )
            setPage(
                allMails?.length > 0
                    ? Math.floor(allMails?.length / itemPerPage) + 1
                    : 1
            )
        }, 1500)
        // setLimit(40)
    }
    return (
        <Messaging selectedMessage={selectedMessage}>
            {isError && (
                <NoData
                    text={
                        'There is some network issue, try to refresh the browser'
                    }
                />
            )}
            <InfiniteScroll
                pageStart={0}
                loadMore={fetchMoreData}
                hasMore={true}
                useWindow={false}
                loader={
                    <div className="py-6 flex items-center justify-center">
                        <PulseLoader size={10} />
                    </div>
                }
            >
                {allMails && allMails?.length > 0
                    ? allMails?.map((message: any) => (
                          <MailListCard
                              key={message?.id}
                              message={message}
                              selectedMessageId={selectedMessage?.id}
                              onClick={() => {
                                  setSelectedMessage(message)
                              }}
                          />
                      ))
                    : !isError &&
                      isSuccess && <NoData text={'There is no mails'} />}
            </InfiniteScroll>
        </Messaging>
    )
}
