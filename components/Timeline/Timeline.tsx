import moment from 'moment'

export const Timeline = ({
    updatedAt,
    children,
}: {
    updatedAt: Date
    children: any
}) => {
    return (
        <div className="mb-2 flex items-center gap-x-2 relative -left-[15px] pt-4">
            <div className="text-gray-400 absolute -left-14 text-xs">
                {moment(updatedAt).format('hh:mm a')}
            </div>
            <div className="flex items-center">
                <div className="h-6 w-6 bg-gray-700 rounded-full" />

                <div className="h-[1px] w-4 bg-gray-700" />
                <div className="h-2 w-2 bg-gray-700 rounded-full" />
            </div>
            {children}
        </div>
    )
}
