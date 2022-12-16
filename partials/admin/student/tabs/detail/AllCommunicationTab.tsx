import { useEffect, useState } from 'react'
import {
    EmptyData,
    LoadingAnimation,
    Note,
    Mail,
    TechnicalError,
    Timeline,
} from '@components'
import { useContextBar } from '@hooks'
import { CommonApi } from '@queries'

import { Note as NoteType } from '@types'

export const AllCommunicationTab = ({ student }: { student: any }) => {
    const contextBar = useContextBar()

    const allCommunications = CommonApi.AllCommunication.useCommunications(
        student?.user?.id,
        {
            skip: !student,
        }
    )

    // getDate(createdAt) => 2022-12-15
    //
    const allDates = allCommunications?.data
        ?.map(function (communication: any) {
            console.log(
                'communication?.createdAt?.substring(0, 10)',
                communication?.createdAt?.substring(0, 10)
            )
            return communication?.createdAt?.substring(0, 10)
        })
        .filter(function (date: any, i: number, array: any) {
            return array.indexOf(date) === i
        })

    return (
        <div
            className={`flex gap-x-2.5 w-full ${
                contextBar.isVisible ? 'flex-col' : 'flex-row'
            }`}
        >
            {allCommunications.isError && <TechnicalError />}
            <div className={`flex flex-col gap-y-2.5 w-full`}>
                {allCommunications?.isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <LoadingAnimation />
                    </div>
                ) : allCommunications?.data &&
                  allCommunications?.data.length ? (
                    allDates.map((date: any) => {
                        return (
                            <div className="relative p-4 pt-6 rounded-md w-full mt-6 mb-2">
                                <div className="flex items-center sticky top-4 z-20">
                                    {/* <div className='w-2/5 h-[1px] bg-gray-700'/> */}
                                    <div className="bg-gray-700 w-fit shadow-md px-4 py-2 rounded-md text-gray-100">
                                        {date}
                                    </div>
                                    {/* <div className='w-2/5 h-[1px] bg-gray-700'/> */}
                                </div>

                                <div className="border-l-4 border-gray-700 ml-8">
                                    {allCommunications.data.map(
                                        (communication: any, i: number) => {
                                            if (
                                                date ==
                                                communication?.createdAt?.substring(
                                                    0,
                                                    10
                                                )
                                            ) {
                                                if (communication?.title) {
                                                    return (
                                                        <Timeline
                                                            createdAt={
                                                                communication?.createdAt
                                                            }
                                                        >
                                                            <Note
                                                                key={
                                                                    communication.id
                                                                }
                                                                note={
                                                                    communication
                                                                }
                                                            />
                                                        </Timeline>
                                                    )
                                                } else {
                                                    return (
                                                        <div className="mb-2">
                                                            <Mail
                                                                key={
                                                                    communication.id
                                                                }
                                                                sender={
                                                                    communication
                                                                        ?.sender
                                                                        ?.role ===
                                                                    'admin'
                                                                }
                                                                message={
                                                                    communication
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
                    })
                ) : (
                    !allCommunications.isError && (
                        <EmptyData
                            imageUrl={'/images/icons/common/notes.png'}
                            title="No Notes Attached"
                            description="Attach a note to view notes here"
                            height="40vh"
                        />
                    )
                )}
            </div>
        </div>
    )
}
