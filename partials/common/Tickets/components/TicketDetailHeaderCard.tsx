import {
    AuthorizedUserComponent,
    Button,
    Card,
    Portal,
    Typography,
} from '@components'
import React, { ReactElement, useState } from 'react'
import { BsArrowLeft, BsDot } from 'react-icons/bs'
import { TicketUser } from './TicketUser'
import { ellipsisText, getUserCredentials } from '@utils'
import moment from 'moment'
import { TicketStatus } from 'pages/portals/admin/tickets'
import { UserRoles } from '@constants'
import { CloseTicketModal } from '@partials/admin/Tickets'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { StudentCellInfo as SubadminStudentCellInfo } from '@partials/sub-admin/students'
import { StudentCellInfo as RtoStudentCellInfo } from '@partials/rto/student/components'
import { StudentCellInfo } from '@partials/admin/student/components'

export const TicketDetailHeaderCard = ({
    ticket,
    isOpened,
}: {
    ticket: any
    isOpened: boolean
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const router = useRouter()

    const onCancel = () => {
        setModal(null)
    }

    const onCloseClicked = () => {
        setModal(
            <Portal>
                <CloseTicketModal onCancel={onCancel} ticket={ticket} />
            </Portal>
        )
    }

    const role = getUserCredentials()?.role
    return (
        <>
            {modal}
            <Card noPadding>
                <div className="flex justify-between px-4 py-2">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <FaLongArrowAltLeft
                                className="text-xl cursor-pointer"
                                onClick={() => {
                                    if (role === UserRoles.ADMIN) {
                                        router.push(
                                            '/portals/admin/tickets?tab=my-open-tickets'
                                        )
                                    } else if (role === UserRoles.SUBADMIN) {
                                        router.push(
                                            '/portals/sub-admin/tickets?tab=all-tickets'
                                        )
                                    }
                                }}
                            />
                            <Typography variant={'subtitle'}>
                                <span className="font-bold cursor-pointer">
                                    [#{String(ticket?.id)?.padStart(5, '0')}]{' '}
                                    {ellipsisText(ticket?.subject, 28)}
                                </span>
                            </Typography>
                        </div>
                        <div className="flex items-center gap-x-1 mt-1">
                            <div
                                className={`rounded-full text-xs ${
                                    ticket?.status === TicketStatus.OPEN
                                        ? 'bg-success'
                                        : ticket?.status === TicketStatus.CLOSED
                                        ? 'bg-red-700'
                                        : 'bg-error'
                                } uppercase text-[11px] text-white px-1.5 whitespace-pre`}
                            >
                                {ticket?.status}
                            </div>
                            <BsDot />
                            <Typography variant={'xs'} color={'text-[#6B7280]'}>
                                Ticket was{' '}
                                {ticket?.status === TicketStatus.OPEN ||
                                ticket?.status === TicketStatus.REOPENED
                                    ? 'opened'
                                    : 'closed'}{' '}
                                by
                            </Typography>
                            <div className="rounded-full bg-gray-200 uppercase text-black px-2 whitespace-pre text-xs">
                                {ticket?.status === TicketStatus.OPEN
                                    ? ticket?.createdBy?.role ===
                                      UserRoles.ADMIN
                                        ? 'Admin'
                                        : ticket?.createdBy?.name
                                    : ticket?.closedBy?.role === UserRoles.ADMIN
                                    ? 'Admin'
                                    : ticket?.closedBy?.name}
                            </div>
                            <Typography variant={'xs'} color={'text-[#6B7280]'}>
                                On{' '}
                                {moment(
                                    ticket?.status === TicketStatus.OPEN
                                        ? ticket?.createdAt
                                        : ticket?.closedAt
                                ).format('dddd, DD MMMM, YYYY [at] hh:mm a')}
                            </Typography>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-12">
                        <AuthorizedUserComponent roles={[UserRoles.ADMIN]}>
                            <StudentCellInfo student={ticket?.student} />
                        </AuthorizedUserComponent>
                        <AuthorizedUserComponent roles={[UserRoles.SUBADMIN]}>
                            <SubadminStudentCellInfo
                                student={ticket?.student}
                            />
                        </AuthorizedUserComponent>
                        <AuthorizedUserComponent roles={[UserRoles.RTO]}>
                            <RtoStudentCellInfo student={ticket?.student} />
                        </AuthorizedUserComponent>

                        <div>
                            <Typography color={'text-gray-400'} variant={'xs'}>
                                Created By:
                            </Typography>
                            <TicketUser small ticket={ticket?.createdBy} />
                        </div>
                        <div>
                            <Typography color={'text-gray-400'} variant={'xs'}>
                                Assigned To:
                            </Typography>
                            <TicketUser small ticket={ticket?.assignedTo} />
                        </div>
                        <Button
                            variant={isOpened ? 'dark' : 'info'}
                            text={isOpened ? 'Close Ticket' : 'Re Open'}
                            onClick={() => {
                                if (isOpened) {
                                    onCloseClicked()
                                }
                            }}
                        />
                    </div>
                </div>
            </Card>
        </>
    )
}
