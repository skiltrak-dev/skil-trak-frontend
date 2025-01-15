import { Checkbox, Typography } from '@components'
import React, { ReactElement, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { DeleteMailModal } from '../modals'
import {
    HtmlToPlainText,
    ellipsisText,
    getUserCredentials,
    htmltotext,
    plainTextWithSpaces,
} from '@utils'
import { useMediaQuery } from 'react-responsive'
import { MediaQueries, UserRoles } from '@constants'
import { User } from '@types'
import { useRouter } from 'next/router'
import moment from 'moment'

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

    const role = getUserCredentials()?.role

    const roleUrl = () => {
        switch (role) {
            case UserRoles.ADMIN:
                router.push(`/portals/admin/e-mails/${mailDetail?.id}`)
                break
            case UserRoles.SUBADMIN:
                router.push(
                    `/portals/sub-admin/notifications/e-mails/${mailDetail?.id}`
                )
                break

            case UserRoles.INDUSTRY:
                router.push(
                    `/portals/industry/notifications/e-mails/${mailDetail?.id}`
                )
                break
            case UserRoles.STUDENT:
                router.push(`/portals/student/mails/${mailDetail?.id}`)
                break

            default:
                break
        }
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
                        roleUrl()
                    }
                }}
                className={`flex flex-col lg:flex-row lg:items-center gap-2 py-8 px-3 ${
                    mailDetail?.isSeen ? 'bg-gray-200' : 'bg-white'
                }  border-b border-secondary-dark hover:bg-[#FCDEC5] rounded-lg cursor-pointer mt-2`}
            >
                <div className="flex gap-x-5 items-center">
                    <Checkbox
                        name="slectMail"
                        value={selectedMail}
                        defaultChecked={selectedMail}
                        onChange={(e: any) => {
                            e.preventDefault()
                            e.stopPropagation()
                            onSelectMails()
                        }}
                        showError={false}
                    />
                    <div className="size-14 bg-[#A098AE] rounded-lg"></div>
                    {/* <Typography
                        variant="small"
                        bold={mailDetail?.isSeen ? false : true}
                    >
                        {user?.name}
                    </Typography> */}
                </div>
                <div className="ml-8 w-full flex items-center gap-x-1 relative">
                    <div className={'w-full flex justify-between items-center'}>
                        <div className={'flex flex-col gap-y-2 gap-x-1 col-span-9'}>
                            <div className="w-24 truncate">
                                <Typography
                                    variant="small"
                                    bold={mailDetail?.isSeen ? false : true}
                                >
                                    {/* {ellipsisText(
                                    mailDetail?.subject,
                                    isTablet ? 40 : 20
                                )} */}
                                    {mailDetail?.subject?.substring(0, 40)}
                                </Typography>
                            </div>
                            {/* <Typography
                                variant="small"
                                bold
                                color="text-[#0000008A]"
                            >
                                -
                            </Typography> */}
                            <Typography
                                variant="small"
                                color="text-[#0000008A]"
                            >
                                {
                                    ellipsisText(
                                        plainTextWithSpaces(
                                            mailDetail?.message
                                        ),
                                        150
                                    )
                                    // mailDetail?.message
                                }
                            </Typography>
                        </div>
                        <div>
                            <Typography
                                variant="small"
                                color="text-gray-600"
                                bold={mailDetail?.isSeen ? false : true}
                            >
                                <span className={'whitespace-pre'}>
                                    {moment(mailDetail?.createdAt).format(
                                        'MMM DD YY hh:mm'
                                    )}
                                </span>
                            </Typography>
                        </div>
                    </div>

                    {/*  */}
                    <div
                        className={` overflow-hidden transition-all duration-500 absolute top-1/2 -translate-y-1/2 right-0 h-full pl-3 ${
                            mouseEntered ? 'max-w-20 bg-gray-200' : 'max-w-0'
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
