import { Typography } from '@components'
import { MdOutlineEditNotifications } from 'react-icons/md'

export const NotificationMessage = ({
    title,
    subtitle,
}: {
    title: string
    subtitle: string
}) => {
    return (
        <div className="flex gap-x-2 items-center w-80 border-b-8 border-gray-400 bg-white p-3">
            <MdOutlineEditNotifications size={30} />
            <div>
                <Typography variant={'label'}>{title}</Typography>
                <Typography variant={'small'}>{subtitle}</Typography>
            </div>
        </div>
    )
}
