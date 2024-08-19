import { GlobalModal, InitialAvatar, Typography } from '@components'
import { CommonApi } from '@queries'
import moment from 'moment'
import React, { ReactElement, useState } from 'react'
import { UpdateIndustryListingNoteModal } from '../modal'
import { FaRegEdit } from 'react-icons/fa'

export const ListingNoteCard = ({ note }: any) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [show, setShow] = useState(false)
    // const [remove, removeResult] =
    //     CommonApi.FindWorkplace.useDeleteFutureIndustryNote()
    // AddIndustryListingNoteModal
    const onClose = () => {
        setModal(null)
        // onCancel()
    }
    const onEditNote = () => {
        setModal(
            <GlobalModal>
                <div
                    style={{ zIndex: 99999 }}
                    className={'fixed top-0 left-0 w-full h-full '}
                >
                    <UpdateIndustryListingNoteModal
                        id={note?.id}
                        noteData={note}
                        onCancel={onClose}
                    />
                </div>
            </GlobalModal>
        )
    }
    return (
        <>
            {/* {modal && modal} */}
            <div className="flex items-start gap-x-1">
                {note?.contactedBy?.name ? (
                    <InitialAvatar
                        name={note?.contactedBy?.name}
                        imageUrl={note?.createdBy?.avatar}
                    />
                ) : null}

                <div className="rounded h-auto w-full overflow-auto custom-scrollbar flex flex-col relative">
                    {show && (
                        <div
                            style={{ zIndex: 99999 }}
                            className={'fixed top-1/3 left-0 w-full'}
                        >
                            <UpdateIndustryListingNoteModal
                                id={note?.id}
                                noteData={note}
                                onCancel={setShow}
                            />
                        </div>
                    )}
                    <div className="flex items-center gap-x-2 border-b-[0.5px] bg-gray-100 border-gray-300 px-3 py-0.5 w-full">
                        <Typography variant="small" capitalize bold>
                            {note?.contactedBy?.name}
                        </Typography>
                        <Typography variant="small">-</Typography>
                        <Typography variant="xs" color="text-gray-700">
                            {moment(note?.createdAt).format(
                                'MMM DD, YYYY [at] hh:mm a'
                            )}
                        </Typography>
                        <div
                            className="cursor-pointer flex justify-end"
                            onClick={() => {
                                setShow(true)
                            }}
                        >
                            <FaRegEdit className="text-link" />
                        </div>
                    </div>
                    <div
                        className="px-3 py-2 font-light text-xs bg-white text-gray-500"
                        dangerouslySetInnerHTML={{
                            __html: note?.comment,
                        }}
                    ></div>
                </div>
            </div>
        </>
    )
}
