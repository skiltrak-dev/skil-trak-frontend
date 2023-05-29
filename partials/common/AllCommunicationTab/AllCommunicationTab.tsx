import { useEffect, useState } from 'react'
import {
    EmptyData,
    LoadingAnimation,
    Note,
    Mail,
    TechnicalError,
    Timeline,
    TextInput,
} from '@components'
import { useContextBar } from '@hooks'
import { CommonApi } from '@queries'

import { Note as NoteType } from '@types'
import { getCommonDates, getDate } from '@utils'
import moment from 'moment'
import { NotesCard } from '@components/sections/subAdmin'

export const AllCommunicationTab = ({ user }: { user: any }) => {
    const contextBar = useContextBar()

    const allCommunications = CommonApi.AllCommunication.useCommunications(
        user?.id,
        {
            skip: !user,
        }
    )

    return (
        <div
            className={`flex gap-x-2.5 w-full ${
                contextBar.isVisible ? 'flex-col' : 'flex-row'
            }`}
        >
            <div className={`flex flex-col gap-y-2.5 w-full`}>
                {allCommunications.isError && <TechnicalError />}
                {allCommunications?.isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <LoadingAnimation />
                    </div>
                ) : allCommunications?.data &&
                  allCommunications?.data.length ? (
                    getCommonDates(allCommunications?.data)?.map(
                        (date: any) => {
                            return (
                                <div
                                    key={date}
                                    className="relative p-4 pt-6 rounded-md w-full mt-6 mb-2"
                                >
                                    <div className="flex items-center sticky top-4 z-20">
                                        {/* <div className='w-2/5 h-[1px] bg-gray-700'/> */}
                                        <div className="bg-gray-700 w-fit shadow-md px-4 py-2 rounded-md text-gray-100">
                                            {moment(date).format(
                                                'MMM, DD YYYY'
                                            )}
                                        </div>
                                        {/* <div className='w-2/5 h-[1px] bg-gray-700'/> */}
                                    </div>

                                    <div className="border-l-4 border-gray-700 ml-8">
                                        {allCommunications.data.map(
                                            (item: any, i: number) => {
                                                if (
                                                    date ==
                                                    getDate(item?.updatedAt)
                                                ) {
                                                    if (item?.title) {
                                                        return (
                                                            <Timeline
                                                                key={item?.id}
                                                                updatedAt={
                                                                    item?.updatedAt
                                                                }
                                                            >
                                                                {/* <NotesCard
                                                                key={item.id}
                                                                note={item}
                                                            /> */}
                                                                <Note
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    note={item}
                                                                />
                                                            </Timeline>
                                                        )
                                                    } else {
                                                        return (
                                                            <div
                                                                key={item.id}
                                                                className="mb-2"
                                                            >
                                                                <Mail
                                                                    sender={
                                                                        item
                                                                            ?.sender
                                                                            ?.role ===
                                                                        'admin'
                                                                    }
                                                                    message={
                                                                        item
                                                                    }
                                                                    index={i}
                                                                />
                                                            </div>
                                                        )
                                                    }
                                                }
                                            }
                                        )}
                                    </div>
                                </div>
                            )
                        }
                    )
                ) : (
                    !allCommunications.isError && (
                        <EmptyData
                            imageUrl={'/images/icons/common/notes.png'}
                            title="No All Communication Attached"
                            description="Attach a note or message to view All Communication here"
                            height="40vh"
                        />
                    )
                )}
            </div>
        </div>
    )
}
