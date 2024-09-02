// queries
import { NoData } from '@components'
import { CommonApi } from '@queries'
import { useCallback, useState } from 'react'
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

    const { data, isError, isFetching, isSuccess } =
        CommonApi.Messages.useAllMailsList({
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        })

    const loadMore = useCallback(() => {
        if (
            !isFetching &&
            isSuccess &&
            !isError &&
            data?.pagination?.currentPage
        ) {
            setPage(data?.pagination?.currentPage + 1)
        }
    }, [isSuccess, isFetching, isError, data?.pagination?.currentPage])

    return (
        <ReceivedMessaging selectedMessage={selectedMessage}>
            <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={isError ? false : data?.pagination?.hasNext || false}
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
