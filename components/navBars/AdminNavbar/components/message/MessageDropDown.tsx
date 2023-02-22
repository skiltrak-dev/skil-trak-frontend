import { Typography } from '@components/Typography'
import { useRouter } from 'next/router'
import { Md10Mp } from 'react-icons/md'
import { MessageItem } from './MessageItem'

interface MessagesDropDown {
    expanded: boolean
    data: any
    resultSeenMessage: any
    seenMessage: any

}
export const MessageDropDown = ({
    expanded,
    data,
    resultSeenMessage,
    seenMessage,
}: MessagesDropDown) => {
    const onMessageClick = () => { }
    const router = useRouter()
    return (
        <div
            className={`absolute top-10 overflow-scroll -right-5 z-40 bg-white w-80 transition-all rounded-lg remove-scrollbar ${!expanded ? 'max-h-0' : 'max-h-96 shadow-md border'
                } `}
        >
            <div className="py-2 px-4 border-b flex justify-between items-center">
                <Typography variant="label">Your Messages</Typography>
                <div className="text-sm text-primary font-semibold cursor-pointer">
                    View All
                </div>
            </div>
            {/* {[...Array(20)].fill(null).map((_, i) => (
                <MessageItem
                    key={i}
                    title={`Message ${i + 1}`}
                    description={`Description for Message ${i + 1}`}
                    timestamp={'Tue 9 Aug'}
                    onClick={onMessageClick}
                />
            ))} */}
            {data?.map((message: any) => (
                <MessageItem
                    key={message?.id}
                    title={message?.sender?.name}
                    description={message?.message}
                    timestamp={message?.createdAt}
                    onClick={()=>{
                        router.push(`/portals/sub-admin/notifications?tab=read-mails`)
                        seenMessage(message?.id)
                    }}
                    resultSeenMessage={resultSeenMessage}
                    isSeen={message?.isSeen}
                />
            ))}
        </div>
    )
}
