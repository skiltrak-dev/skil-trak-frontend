import { InitialAvatar, Typography } from '@components'
import moment from 'moment'
import React from 'react'

export const ListingNoteCard = ({ note }: { note: any }) => {
    return (
        <div className="flex items-start gap-x-1">
            {note?.contactedBy?.name ? (
                <InitialAvatar
                    name={note?.contactedBy?.name}
                    imageUrl={note?.createdBy?.avatar}
                />
            ) : null}
            <div className="rounded h-auto w-full overflow-auto custom-scrollbar flex flex-col">
                <div className="flex items-center gap-x-2 border-b-[0.5px] bg-gray-100 border-gray-300 px-3 py-0.5">
                    <Typography variant="small" capitalize bold>
                        {note?.contactedBy?.name}
                    </Typography>
                    <Typography variant="small">-</Typography>
                    <Typography variant="xs" color="text-gray-700">
                        {moment(note?.createdAt).format(
                            'MMM DD, YYYY [at] hh:mm a'
                        )}
                    </Typography>
                </div>
                <div
                    className="px-3 py-2 font-light text-xs bg-white text-gray-500"
                    dangerouslySetInnerHTML={{
                        __html: note?.comment,
                    }}
                ></div>
            </div>
        </div>
    )
}
