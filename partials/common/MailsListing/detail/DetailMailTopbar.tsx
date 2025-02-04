import React, { useState, ReactElement } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { DeleteMailModal } from '../tabs/MailsInbox/modals'
import { MdDelete } from 'react-icons/md'
import { useRouter } from 'next/router'

export const DetailMailTopbar = ({ mailDetail }: { mailDetail: any }) => {
    const router = useRouter()

    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancelClicked = () => {
        setModal(null)
        router.back()
    }

    const onDeleteMailClicked = () => {
        setModal(
            <DeleteMailModal onCancel={onCancelClicked} mail={mailDetail} />
        )
    }
    return (
        <div>
            {modal}
            <div className="flex justify-between items-center gap-x-2">
                <IoIosArrowRoundBack
                    onClick={() => {
                        router.back()
                    }}
                    className={'text-2xl cursor-pointer'}
                />
                <MdDelete
                    className="text-[#0000008A] text-lg cursor-pointer"
                    onClick={(e: any) => {
                        e.stopPropagation()
                        onDeleteMailClicked()
                    }}
                />
            </div>
        </div>
    )
}
