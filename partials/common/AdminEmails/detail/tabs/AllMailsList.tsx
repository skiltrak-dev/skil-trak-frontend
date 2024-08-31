// queries
import { NoData } from '@components'
import { CommonApi } from '@queries'
import { useCallback, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { PulseLoader } from 'react-spinners'
import { AllMailsListCard, ReceivedMessaging } from '../../components'

export const AllMailsList = ({
    setSelectedMessage,
    selectedMessage,
}: {
    setSelectedMessage: any
    selectedMessage: any
}) => {
    const itemPerPage = 20
    const [page, setPage] = useState(1)
    const [hasNext, setHasNext] = useState(true)

    const { data, isError, isFetching, isSuccess } =
        CommonApi.Messages.useAllMailsList({
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        })

    console.log({ data })
    useEffect(() => {
        if (data?.pagination && isSuccess) {
            setHasNext(data?.pagination?.hasNext)
        }
        if (isError) {
            setHasNext(false)
        }
    }, [data, isSuccess, isError])

    const loadMore = useCallback(() => {
        if (!isFetching && !isError && hasNext) {
            setPage((prevPage) => prevPage + 1)
        }
    }, [isFetching, isError, hasNext])

    return (
        <ReceivedMessaging selectedMessage={selectedMessage}>
            <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={hasNext}
                useWindow={false}
                loader={
                    <div className="py-6 flex items-center justify-center">
                        <PulseLoader size={10} />
                    </div>
                }
            >
                {data?.data && data?.data?.length > 0
                    ? data?.data?.map((message: any) => (
                          <AllMailsListCard
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
                {isError && (
                    <NoData
                        text={
                            'There is some network issue,Data cant load, try to refresh the browser'
                        }
                    />
                )}
            </InfiniteScroll>
        </ReceivedMessaging>
    )
}
