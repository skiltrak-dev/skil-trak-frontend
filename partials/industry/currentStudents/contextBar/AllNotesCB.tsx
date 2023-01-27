import { NoData } from '@components/ActionAnimations'
import { Typography } from '@components/Typography'
import { useContextBar } from '@hooks'
import moment from 'moment'
import React, { useEffect } from 'react'
import { BsDot } from 'react-icons/bs'

export const AllNotesCB = ({ notes }: any) => {
    const { setTitle } = useContextBar()

    useEffect(() => {
        setTitle('All Notes')
    }, [])

    return (
        <div className="flex flex-col gap-y-1">
            {notes && notes?.length > 0 ? (
                notes?.map((note: any) => (
                    <div
                        key={note?.id}
                        className="bg-secondary py-1 px-2 rounded-lg"
                    >
                        <Typography variant={'label'}>
                            {note?.message}
                        </Typography>
                        <div className="flex items-center gap-x-1">
                            <Typography variant={'xs'} color={'text-gray-400'}>
                                {moment(note.createdAt).format(
                                    'MMM DD, YYYY hh:mm a'
                                )}
                            </Typography>
                            <BsDot className="text-gray-400" />
                        </div>
                    </div>
                ))
            ) : (
                <NoData text={'No Notes were found'} />
            )}
        </div>
    )
}
