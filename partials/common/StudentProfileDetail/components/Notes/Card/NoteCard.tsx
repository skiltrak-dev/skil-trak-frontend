import React from 'react'
import { ActionButton, ShowErrorNotifications, Typography } from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { Note as NoteType } from '@types'
import classNames from 'classnames'
import format from 'date-fns/format'
import { useEffect, useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'

import { BsPinAngleFill, BsPinFill } from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa'
import { PuffLoader } from 'react-spinners'
import { TiPin } from 'react-icons/ti'
import { RiDeleteBinLine } from 'react-icons/ri'

export const NoteCard = ({ note }: { note: NoteType }) => {
    const { notification } = useNotification()

    const [statusChange, statusChangeResult] = CommonApi.Notes.useStatusChange()
    const togglePin = async () => {
        await statusChange(note.id)
    }

    const [isDeleting, setDeleting] = useState(false)
    const [remove, removeResult] = CommonApi.Notes.useRemove()
    const onDeleteClick = async () => {
        await remove(note.id)
    }

    useEffect(() => {
        if (removeResult.isSuccess) {
            notification.success({
                title: 'Note Deleted',
                description: 'Note has been deleted on your request',
            })
        }
    }, [removeResult])

    return (
        <>
            <ShowErrorNotifications result={removeResult} />
            <ShowErrorNotifications result={statusChangeResult} />
            <div
                id={`pinned-notes-${note?.id}`}
                className={`relative w-full ${
                    note?.isPinned ? 'bg-red-400' : 'bg-[#FEF6E6] '
                } p-4 rounded-xl shadow-lg `}
            >
                <div className={`${isDeleting ? 'blur' : ''}`}>
                    <div className="flex justify-between items-center">
                        <Typography variant="label" semibold>
                            {note.title}
                        </Typography>
                        <div className="flex items-center gap-x-1">
                            <div
                                onClick={togglePin}
                                className="bg-base-light w-6 h-6 flex justify-center items-center rounded-[5px]"
                            >
                                {statusChangeResult.isLoading ? (
                                    <PuffLoader size={20} color="white" />
                                ) : (
                                    <TiPin size={16} className="text-white" />
                                )}
                            </div>
                            <div
                                className="bg-white text-[#BF0000] w-6 h-6 flex justify-center items-center rounded-[5px]"
                                onClick={() => setDeleting(true)}
                            >
                                <RiDeleteBinLine size={16} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={`text-sm mt-1 mb-2`}>
                            <span
                                className="block"
                                dangerouslySetInnerHTML={{
                                    __html: note?.body,
                                }}
                            ></span>
                        </div>

                        <div className="flex justify-between">
                            <div className="mr-6">
                                <p
                                    className={`text-xs font-medium ${
                                        note?.isPinned
                                            ? 'text-red-800'
                                            : 'text-gray-500'
                                    } capitalize`}
                                >
                                    {note?.author?.name}
                                </p>
                                <p
                                    className={`text-[11px] font-medium ${
                                        note.isPinned
                                            ? 'text-red-800'
                                            : 'text-[#BFBF80]'
                                    } `}
                                >
                                    {format(
                                        new Date(note.createdAt!!),
                                        'EEE dd, LLL, yyyy'
                                    )}{' '}
                                    at{' '}
                                    {format(
                                        new Date(note.createdAt!!),
                                        'hh:mm aa'
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {isDeleting && (
                    <div className="absolute top-0 left-0 flex justify-end w-full h-full ">
                        <div className="w-full bg-[#ffffff60] px-2 py-2 rounded-xl">
                            <div className="flex items-center gap-x-2 mb-4">
                                <div className="bg-red-500 w-6 h-6 rounded-lg flex items-center justify-center text-white">
                                    <FaTrash />
                                </div>
                                <p className="font-medium text-sm">
                                    Delete Note!
                                </p>
                            </div>
                            <p className="text-sm mb-2">
                                Do you wish to continue?
                            </p>
                            <div className="flex gap-x-2">
                                <ActionButton
                                    variant="error"
                                    onClick={onDeleteClick}
                                    loading={removeResult.isLoading}
                                    disabled={removeResult.isLoading}
                                >
                                    Delete
                                </ActionButton>
                                <ActionButton
                                    simple
                                    onClick={() => setDeleting(false)}
                                >
                                    Cancel
                                </ActionButton>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
