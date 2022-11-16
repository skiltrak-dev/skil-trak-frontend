import { useEffect } from 'react'
import moment from 'moment'

import { Typography, LoadingAnimation } from '@components'
import {
    AiFillDelete,
    AiFillPushpin,
    AiTwotoneEdit,
    AiOutlinePushpin,
} from 'react-icons/ai'

import { useChangeNoteStatusMutation, useDeleteNoteMutation } from '@queries'

// hooks
import { useNotification } from '@hooks'

export const NotesCard = ({ note, pinnedNote, setEditValues }: any) => {
    const [updateNoteStatus, updateNoteStatusResult] =
        useChangeNoteStatusMutation()
    const [deleteNote, deleteNoteResult] = useDeleteNoteMutation()

    // hook
    const { notification } = useNotification()

    useEffect(() => {
        if (updateNoteStatusResult?.isSuccess) {
            notification.success({
                title: `Note ${
                    updateNoteStatusResult?.data?.isPinned
                        ? 'Pinned'
                        : 'Unpinned'
                } Successfully`,
                description: `Note ${
                    updateNoteStatusResult?.data?.isPinned
                        ? 'Pinned'
                        : 'Unpinned'
                } Successfully`,
            })
        }
    }, [updateNoteStatusResult.isSuccess])

    useEffect(() => {
        if (deleteNoteResult?.isSuccess) {
            notification.error({
                title: `Note Deleted Successfully`,
                description: `Note Deleted Successfully`,
            })
        }
    }, [deleteNoteResult.isSuccess])

    const PinNoteIcon = note?.isPinned ? AiFillPushpin : AiOutlinePushpin

    const isLoading =
        updateNoteStatusResult?.isLoading || deleteNoteResult?.isLoading

    return (
        <div className="p-4 bg-[#FEF6E6] rounded-2xl w-full">
            {isLoading ? (
                <LoadingAnimation size={90} />
            ) : (
                <>
                    <div className="flex justify-between items-center">
                        <Typography variant={'label'}>
                            <span className="font-semibold">{note?.title}</span>
                        </Typography>
                        <PinNoteIcon
                            className="text-base-light text-xl cursor-pointer"
                            onClick={() => {
                                updateNoteStatus(note?.id)
                            }}
                        />
                    </div>
                    <Typography variant={'label'}>{note?.body}</Typography>

                    {/*  */}
                    <div className="mt-2 flex justify-between items-center">
                        <div className="">
                            <Typography
                                variant={'small'}
                                color={'text-gray-600'}
                                capitalize
                            >
                                {note?.author?.name}
                            </Typography>
                            <Typography
                                variant={'badge'}
                                color={'text-success'}
                            >
                                {moment(note?.createdAt).format(
                                    'ddd Do, MMM, YYYY [at] hh:mm a'
                                )}
                            </Typography>
                        </div>
                        {!pinnedNote && (
                            <div className="flex items-center gap-x-2">
                                <div className="bg-gray-100 p-2 rounded-full cursor-pointer">
                                    <AiTwotoneEdit
                                        className="text-info"
                                        onClick={() => {
                                            setEditValues(note)
                                        }}
                                    />
                                </div>
                                <div className="bg-gray-100 p-2 rounded-full cursor-pointer">
                                    <AiFillDelete
                                        className="text-red-500"
                                        onClick={() => {
                                            deleteNote(note?.id)
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}
