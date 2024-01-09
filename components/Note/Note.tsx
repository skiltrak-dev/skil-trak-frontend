import { ActionButton } from '@components/buttons'
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

export const Note = ({ note }: { note: NoteType }) => {
    const { notification } = useNotification()

    const pinClasses = classNames({
        'border border-gray-700 p-0.5 w-6 h-6 rounded-full flex items-center justify-center relative transition-all duration-300 absolute top-1.5 right-1.5 ml-auto z-40':
            true,
        'bg-gray-700 text-white hover:bg-transparent hover:text-gray-700':
            note.isPinned,
        'text-gray-700 hover:bg-gray-700 hover:text-white': !note.isPinned,
    })

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
        } else if (removeResult.isError) {
            notification.error({
                title: 'Note Delete Failed',
                description: 'An error occurred while deleting note.',
            })
        }
    }, [removeResult])

    return (
        <div
            id={`pinned-notes-${note?.id}`}
            className={`relative w-full ${
                note?.isPinned ? 'bg-red-400' : 'bg-[#FEF6E6] '
            } p-4 rounded-xl shadow-lg`}
        >
            <button
                className={pinClasses}
                title={note?.isPinned ? 'Un-Pin' : 'Pin'}
                onClick={togglePin}
            >
                {statusChangeResult.isLoading ? (
                    <div>
                        <PuffLoader
                            size={28}
                            color={note.isPinned ? '#fff' : '#333'}
                        />
                    </div>
                ) : note.isPinned ? (
                    <BsPinAngleFill />
                ) : (
                    <BsPinFill />
                )}
            </button>
            <div className="relative w-full overflow-auto custom-scrollbar">
                <div
                    className={`flex flex-col gap-y-2 w-fit transition-all duration-100 ${
                        isDeleting ? 'blur-md' : 'blur-none'
                    }`}
                >
                    <div>
                        <div className="flex justify-between mb-2">
                            <p
                                className={`text-sm font-semibold ${
                                    note?.isPinned ? 'text-[#fcdaeb]' : ''
                                }`}
                            >
                                {note.title}
                            </p>
                        </div>

                        <div
                            className={`${
                                note?.isPinned ? 'text-red-100' : ''
                            } text-sm`}
                        >
                            <span
                                className="block mr-6"
                                dangerouslySetInnerHTML={{
                                    __html: note?.body,
                                }}
                            ></span>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="mr-6">
                            <p
                                className={`text-xs font-medium ${
                                    note?.isPinned
                                        ? 'text-red-800'
                                        : 'text-gray-500'
                                } `}
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
                                {format(new Date(note.createdAt!!), 'hh:mm aa')}
                            </p>
                        </div>
                    </div>
                </div>

                {isDeleting && (
                    <div className="absolute top-0 left-0 flex items-end justify-end w-full h-full pr-2 pb-2">
                        <div className="bg-[#ffffff66] px-2 py-2 rounded-xl">
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
            <div className="flex items-center gap-x-2 absolute bottom-4 right-4">
                {/* <ActionButton Icon={AiFillEdit} variant={'info'} rounded /> */}
                <ActionButton
                    Icon={FaTrash}
                    variant={'error'}
                    rounded
                    onClick={() => setDeleting(true)}
                />
            </div>
        </div>
    )
}
