import { Checkbox, Typography } from '@components'
import React, { ReactElement, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { DeleteMailModal } from '../modals'
import { HtmlToPlainText, ellipsisText, htmltotext } from '@utils'
import { useMediaQuery } from 'react-responsive'
import { MediaQueries } from '@constants'
import { User } from '@types'
import { useRouter } from 'next/router'

export const MailListCard = ({
    user,
    mailDetail,
    selectedMail,
    onSelectMails,
}: {
    user: User
    mailDetail: any
    selectedMail: boolean
    onSelectMails: () => void
}) => {
    const router = useRouter()

    const [modal, setModal] = useState<ReactElement | null>(null)
    const [mouseEntered, setMouseEntered] = useState<boolean>(false)

    const isTablet = useMediaQuery(MediaQueries.Tablet)

    const onCancelClicked = () => setModal(null)

    const onDeleteMailClicked = () => {
        setModal(
            <DeleteMailModal onCancel={onCancelClicked} mail={mailDetail} />
        )
    }
    return (
        <>
            {modal}
            <div
                onMouseEnter={() => {
                    setMouseEntered(true)
                }}
                onMouseLeave={() => {
                    setMouseEntered(false)
                }}
                onClick={(e: any) => {
                    if (e.target.tagName !== 'INPUT') {
                        e.stopPropagation()
                        router.push(
                            `/portals/sub-admin/notifications/e-mails/${mailDetail?.id}`
                        )
                    }
                }}
                className={`flex flex-col lg:flex-row lg:items-center gap-2 py-2.5 px-3 ${
                    mailDetail?.isSeen ? 'bg-gray-200' : 'bg-white'
                }  border-b border-secondary-dark hover:bg-[#C2DBFF] cursor-pointer`}
            >
                <div className="flex items-center gap-x-0.5 w-full lg:w-56">
                    <Checkbox
                        name="slectMail"
                        value={selectedMail}
                        defaultChecked={selectedMail}
                        onChange={(e: any) => {
                            e.preventDefault()
                            e.stopPropagation()
                            onSelectMails()
                        }}
                    />

                    <Typography variant="small" bold>
                        {ellipsisText(mailDetail?.subject, isTablet ? 40 : 16)}
                    </Typography>
                </div>
                <div className="w-full flex items-center gap-x-1 relative">
                    <Typography variant="small" bold>
                        {user?.name}
                    </Typography>
                    <Typography variant="small" bold color="text-[#0000008A]">
                        -
                    </Typography>
                    <Typography variant="small" color="text-[#0000008A]">
                        {HtmlToPlainText(mailDetail?.message)}
                    </Typography>

                    {/*  */}
                    <div
                        className={`overflow-hidden transition-all duration-500 absolute top-1/2 -translate-y-1/2 right-0 h-full pl-3 ${
                            mouseEntered ? 'max-w-20' : 'max-w-0'
                        }`}
                    >
                        <MdDelete
                            className="text-[#0000008A] text-lg"
                            onClick={(e: any) => {
                                e.stopPropagation()
                                onDeleteMailClicked()
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
