import { NoData } from '@components'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'

// query
import { CommonApi } from '@queries'
import { PulseLoader } from 'react-spinners'
import { AllMailsListCard, ReceivedMessaging } from '../../components'

export const ReadMailsList = ({
    setSelectedMessage,
    selectedMessage,
}: {
    setSelectedMessage: any
    selectedMessage: any
}) => {
    const [itemPerPage, setItemPerPage] = useState(20)
    const [page, setPage] = useState(1)
    const [hasNext, setHasNext] = useState(true)
    const [allMails, setAllMails] = useState<any>([])

    const { data, isLoading, isError, isFetching, isSuccess } =
        CommonApi.Messages.useMailsByStatus({
            // search: `isSeen:${true}`,
            isSeen: true,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        })
    useEffect(() => {
        if (data?.pagination && isSuccess) {
            setHasNext(data?.pagination?.hasNext)
        }
        if (isError) {
            setHasNext(false)
        }
    }, [data, isSuccess, isError])
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
        <ReceivedMessaging selectedMessage={selectedMessage}>
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
                hasMore={hasNext}
                useWindow={false}
                loader={
                    <div className="py-6 flex items-center justify-center">
                        <PulseLoader size={10} />
                    </div>
                }
            >
                {allMails && allMails?.length > 0
                    ? allMails?.map((message: any) => (
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
            </InfiniteScroll>
        </ReceivedMessaging>
    )
}
