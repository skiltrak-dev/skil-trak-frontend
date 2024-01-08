import moment from 'moment'
import { useEffect } from 'react'

import { ActionButton, LoadingAnimation } from '@components'

import { CommonApi } from '@queries'

// hooks
import { UserRoles } from '@constants'
import { useNoteScroll, useNotification } from '@hooks'
import { ellipsisText, getUserCredentials } from '@utils'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { BsPinAngleFill, BsPinFill } from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa'
import { PuffLoader } from 'react-spinners'
type NotesCardProps = {
    note: any
    pinnedNote?: any
    setEditValues?: any
    onHandleScroll?: any
    link?: any
}
export const NotesCard = ({
    note,
    pinnedNote,
    setEditValues,
    onHandleScroll,
    link,
}: NotesCardProps) => {
    const { notification } = useNotification()
    const router = useRouter()
    const userRole = getUserCredentials()?.role
    const [changeStatus, changeStatusResult] = CommonApi.Notes.useStatusChange()
    const [deleteNote, deleteNoteResult] = CommonApi.Notes.useRemove()

    const { onSetSelectedNoteId } = useNoteScroll()

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

    console.log('rrrrr', router?.asPath?.split('/').includes('rtos'))

    return (
        // <Link
        //     legacyBehavior
        //     href={`${
        //         userRole === UserRoles.ADMIN
        //             ? `/portals/admin/student/${router?.query?.id}?tab=notes`
        //             : userRole === UserRoles.SUBADMIN
        //             ? `/portals/sub-admin/students/${router?.query?.id}?tab=notes`
        //             : '#'
        //     }`}
        // >
        <div
            onClick={() => {
                const route = router?.asPath?.split('/')
                router.push(
                    `${
                        userRole === UserRoles.ADMIN
                            ? `${link}`
                            : userRole === UserRoles.SUBADMIN
                            ? `${link}`
                            : '#'
                    }`
                )
                if (onSetSelectedNoteId) {
                    onSetSelectedNoteId(note?.id)
                }
            }}
            // id={`pinned-notes-${note?.id}`}
            className={`cursor-pointer ${
                pinnedNote ? 'bg-red-400' : 'bg-[#FEF6E6]'
            }  p-4 rounded-xl shadow-lg relative ${
                pinnedNote ? 'w-full' : 'w-fit'
            }`}
        >
            {isLoading ? (
                <LoadingAnimation size={90} />
            ) : (
                <div>
                    <div className="flex justify-between mb-2 gap-x-2">
                        <p
                            className={`text-sm font-semibold ${
                                pinnedNote ? 'text-[#fcdaeb]' : ''
                            }`}
                        >
                            {pinnedNote
                                ? ellipsisText(note.title, 15)
                                : note.title}
                        </p>
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

                    <div
                        className={`${
                            note?.isPinned ? 'text-red-100' : ''
                        } text-sm`}
                    >
                        <div
                            dangerouslySetInnerHTML={{
                                __html: pinnedNote
                                    ? ellipsisText(note.body, 120)
                                    : note.body,
                            }}
                        />
                    </div>

                    {/*  */}
                    <div className="mt-2 flex justify-between items-center gap-x-4">
                        <div className="">
                            <p
                                className={`text-xs font-medium ${
                                    note?.isPinned
                                        ? 'text-red-800'
                                        : 'text-gray-500'
                                } `}
                            >
                                {note.author.name}
                            </p>
                            {/*  #BFBF80*/}
                            <p
                                className={`text-[11px] font-medium ${
                                    note.isPinned
                                        ? 'text-red-800'
                                        : 'text-[#BFBF80]'
                                } `}
                            >
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
                </div>
            )}
        </div>
        // </Link>
    )
}
