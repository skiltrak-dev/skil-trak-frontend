import {
    ActionButton,
    AuthorizedUserComponent,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { UserRoles } from '@constants'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { Note as NoteType } from '@types'
import { getUserCredentials } from '@utils'
import format from 'date-fns/format'
import { useEffect, useState } from 'react'

import { FaTrash } from 'react-icons/fa'
import { RiDeleteBinLine } from 'react-icons/ri'
import { TiPin } from 'react-icons/ti'
import { PuffLoader } from 'react-spinners'
import { NotesTemplateStatus } from '../forms'
import { NotesTemplateType } from '@partials/admin/noteTemplates/enum'

export const NoteCard = ({ note }: { note: NoteType }) => {
    const { notification } = useNotification()

    const [statusChange, statusChangeResult] = CommonApi.Notes.useStatusChange()
    const togglePin = async () => {
        const res: any = await statusChange(note.id)
        if (res?.data) {
            notification.success({
                title: `Note ${res?.data?.isPinned ? 'Pinned' : 'Un-Pinned'}`,
                description: `Note ${
                    res?.data?.isPinned ? 'Pinned' : 'Un-Pinned'
                } Successfully`,
                position: 'topright',
            })
        }
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
            <ShowErrorNotifications
                position="topright"
                result={statusChangeResult}
            />
            <div
                id={`pinned-notes-${note?.id}`}
                className={`relative w-full ${
                    note?.author?.role === UserRoles.RTO
                        ? 'bg-[#bfe7f6]'
                        : note?.isPinned
                        ? 'bg-[#FFDCDC]'
                        : note?.isSuccess === false
                        ? 'bg-error'
                        : 'bg-[#FEF6E6] '
                } p-4 rounded-xl shadow-lg `}
            >
                <div className={`${isDeleting ? 'blur' : ''}`}>
                    <div className="flex justify-between items-start">
                        <div>
                            <Typography variant="label" semibold>
                                {note.title}
                            </Typography>
                            {note?.studentNote ? (
                                <div>
                                    <div className="flex items-center gap-x-2">
                                        <Typography variant="xs" semibold>
                                            {note?.studentNote?.noteTemplate
                                                ?.type ===
                                            NotesTemplateType.ResolutionPathLabel
                                                ? 'Resolution Path Label'
                                                : 'Status Check Label'}
                                        </Typography>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <Typography variant="xxs">
                                            Type:{' '}
                                        </Typography>
                                        <Typography variant="xs" semibold>
                                            {note?.isSuccess
                                                ? 'Successfully'
                                                : 'Unsuccessfully'}{' '}
                                        </Typography>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                        <AuthorizedUserComponent
                            excludeRoles={[UserRoles.OBSERVER]}
                        >
                            <div className="flex items-center gap-x-1">
                                <div
                                    onClick={togglePin}
                                    className={`${
                                        note?.isPinned
                                            ? 'bg-base-light'
                                            : 'bg-gray-100'
                                    }  w-6 h-6 flex justify-center items-center rounded-[5px] cursor-pointer`}
                                >
                                    {statusChangeResult.isLoading ? (
                                        <PuffLoader size={20} color="white" />
                                    ) : (
                                        <TiPin
                                            size={16}
                                            className={
                                                note?.isPinned
                                                    ? 'text-white'
                                                    : 'text-primaryNew'
                                            }
                                        />
                                    )}
                                </div>
                                <div
                                    className="bg-white text-[#BF0000] w-6 h-6 flex justify-center items-center rounded-[5px]"
                                    onClick={() => setDeleting(true)}
                                >
                                    <RiDeleteBinLine size={16} />
                                </div>
                            </div>
                        </AuthorizedUserComponent>
                    </div>
                    <div>
                        <div className={`text-sm mt-1 mb-2`}>
                            <span
                                className="block remove-text-bg"
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
                                    {note?.author?.name}{' '}
                                    <span className="text-[11px] font-medium capitalize">
                                        ({note?.author?.role})
                                    </span>
                                </p>
                                <p
                                    className={`text-[11px] font-medium ${
                                        note.isPinned
                                            ? 'text-red-800'
                                            : note?.isSuccess ||
                                              note?.isSuccess !== false
                                            ? 'text-[#BFBF80]'
                                            : 'text-white'
                                    } `}
                                >
                                    {format(
                                        new Date(
                                            note?.isEnabled!! ||
                                                note.createdAt!!
                                        ),
                                        'EEE dd, LLL, yyyy'
                                    )}{' '}
                                    at{' '}
                                    {format(
                                        new Date(
                                            note?.isEnabled!! ||
                                                note.createdAt!!
                                        ),
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
