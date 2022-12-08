import { useEffect } from 'react'
import moment from 'moment'

import { Typography, LoadingAnimation, ActionButton } from '@components'
import {
    AiFillDelete,
    AiFillPushpin,
    AiTwotoneEdit,
    AiOutlinePushpin,
    AiFillEdit,
} from 'react-icons/ai'

import {
    useChangeNoteStatusMutation,
    useDeleteNoteMutation,
    SubAdminApi,
} from '@queries'

// hooks
import { useNotification } from '@hooks'
import { FaTrash } from 'react-icons/fa'
import { PuffLoader } from 'react-spinners'
import { BsPinAngleFill, BsPinFill } from 'react-icons/bs'
import classNames from 'classnames'

export const NotesCard = ({ note, pinnedNote, setEditValues }: any) => {
    const { notification } = useNotification()

    console.log('::: NOTE', note)

    const [changeStatus, changeStatusResult] =
        SubAdminApi.Notes.useStatusChange()
    const [deleteNote, deleteNoteResult] = SubAdminApi.Notes.useDelete()

    useEffect(() => {
        if (changeStatusResult?.isSuccess) {
            notification.success({
                title: `Note ${
                    changeStatusResult?.data?.isPinned ? 'Pinned' : 'Unpinned'
                } Successfully`,
                description: `Note ${
                    changeStatusResult?.data?.isPinned ? 'Pinned' : 'Unpinned'
                } Successfully`,
            })
        }
    }, [changeStatusResult])

    useEffect(() => {
        if (deleteNoteResult?.isSuccess) {
            notification.error({
                title: `Note Deleted`,
                description: `Note deleted successfully`,
            })
        }
    }, [deleteNoteResult])

    const pinClasses = classNames({
        'border border-gray-700 p-0.5 w-6 h-6 rounded-full flex items-center justify-center relative transition-all duration-300':
            true,
        'bg-gray-700 text-white hover:bg-transparent hover:text-gray-700':
            note.isPinned,
        'text-gray-700 hover:bg-gray-700 hover:text-white': !note.isPinned,
    })

    const isLoading =
        changeStatusResult?.isLoading || deleteNoteResult?.isLoading

    return (
        <div className="bg-[#FEF6E6] p-4 rounded-xl shadow-lg relative w-fit">
            {isLoading ? (
                <LoadingAnimation size={90} />
            ) : (
                <>
                    <div className="flex justify-between mb-2">
                        <p className="text-sm font-semibold">{note.title}</p>
                        <button
                            className={pinClasses}
                            title={note.isPinned ? 'Un-Pin' : 'Pin'}
                            onClick={() => changeStatus(note?.id)}
                        >
                            {changeStatusResult.isLoading ? (
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
                    </div>

                    {/* <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold">{note.title}</p>
                        <PinNoteIcon
                            className="text-base-light text-xl cursor-pointer"
                            onClick={() => {
                                updateNoteStatus(note?.id)
                            }}
                        />
                    </div> */}

                    <div className="text-sm">{note.body}</div>

                    {/*  */}
                    <div className="mt-2 flex justify-between items-center gap-x-4">
                        <div className="">
                            <p className="text-xs font-medium text-gray-500">
                                {note.author.name}
                            </p>

                            <p className="text-[11px] font-medium text-[#BFBF80]">
                                {moment(note?.createdAt).format(
                                    'ddd Do, MMM, YYYY [at] hh:mm a'
                                )}
                            </p>
                        </div>
                        {!pinnedNote && (
                            <div className="flex items-center gap-x-2">
                                {/* <ActionButton
                                    Icon={AiFillEdit}
                                    variant={'info'}
                                    rounded
                                    onClick={() => {
                                        setEditValues(note)
                                    }}
                                /> */}
                                <ActionButton
                                    Icon={FaTrash}
                                    variant={'error'}
                                    rounded
                                    onClick={() => deleteNote(note?.id)}
                                />
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}
