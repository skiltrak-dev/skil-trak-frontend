import React from 'react'
import moment from 'moment'

import { Typography } from '@components/Typography'
import { AiFillDelete, AiFillPushpin, AiTwotoneEdit } from 'react-icons/ai'

export const NotesCard = ({ pinnedNote }: any) => {
    const date = new Date()
    return (
        <div className="p-4 bg-[#FEF6E6] rounded-2xl">
            <div className="flex justify-between items-center">
                <Typography variant={'label'}>
                    <span className="font-semibold">Subject Of Note</span>
                </Typography>
                <AiFillPushpin className="text-base-light text-xl cursor-pointer" />
            </div>
            <Typography variant={'label'}>
                Ea magni dolorem hic numquam eaque rerum fugiat nam. Quam iure
                quidem non et et aliquid iure totam. Inventore culpa facilis.
                Laboriosam inventore sunt magni.
            </Typography>

            {/*  */}
            <div className="mt-2 flex justify-between items-center">
                <div className="">
                    <Typography variant={'small'} color={'text-gray-600'}>
                        Author Of Note
                    </Typography>
                    <Typography variant={'badge'} color={'text-success'}>
                        {moment(date).format('ddd Do, MMM, YYYY [at] hh:mm a')}
                    </Typography>
                </div>
                {!pinnedNote && (
                    <div className="flex items-center gap-x-2">
                        <div className="bg-gray-100 p-2 rounded-full cursor-pointer">
                            <AiTwotoneEdit className="text-info" />
                        </div>
                        <div className="bg-gray-100 p-2 rounded-full cursor-pointer">
                            <AiFillDelete className="text-red-500" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
