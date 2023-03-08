// queries
import { NoData } from '@components'
import { CommonApi } from '@queries'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { PulseLoader } from 'react-spinners'
import { MailListCard, Messaging } from '../../components'

export const AllMails = ({
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
        CommonApi.Messages.useAllConversations({
            status: 'seen',
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
        if (
            !isFetching &&
            !isLoading &&
            isSuccess &&
            data?.data &&
            data?.data?.length > 0
        ) {
            setAllMails([...allMails, ...data?.data])
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
                {isError && (
                    <NoData
                        text={
                            'There is some network issue,Data cant load, try to refresh the browser'
                        }
                    />
                )}
            </InfiniteScroll>
        </Messaging>
    )
}
