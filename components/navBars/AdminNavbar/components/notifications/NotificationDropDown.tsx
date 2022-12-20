import { Typography } from '@components'
import { NotificationItem } from './NotificationItem'

export const NotificationDropDown = ({ expanded }: { expanded: boolean }) => {
    const onNotificationClick = () => {}
    return (
        <div
            className={`absolute top-10 overflow-scroll -right-5 z-40 bg-white w-80 transition-all rounded-lg remove-scrollbar ${
                !expanded ? 'max-h-0' : 'max-h-96 shadow-md border'
            } `}
        >
            <div className="py-2 px-4 border-b flex justify-between items-center">
                <Typography variant="label">Your Messages</Typography>
                <div className="text-sm text-primary font-semibold cursor-pointer">
                    View All
                </div>
            </div>
            {[...Array(20)].fill(null).map((_, i) => (
                <NotificationItem
                    key={i}
                    title={`Message ${i + 1}`}
                    description={`Description for Message ${i + 1}`}
                    timestamp={'Tue 9 Aug'}
                    onClick={onNotificationClick}
                />
            ))}
        </div>
    )
}
