import { TableAction, Typography } from '@components'
import { UserRoles } from '@constants'
import { useActionModal, useNotification } from '@hooks'
import { SubAdminApi } from '@queries'
import { Student } from '@types'
import { getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, ReactNode, useState } from 'react'
import { IoMdEyeOff } from 'react-icons/io'
import { RiEditFill, RiFootprintFill } from 'react-icons/ri'
import {
    MailPasswordModal,
    SnoozeStudentModal,
    StudentMessageModal,
    UnSnoozeStudentModal,
} from '../modals'
import { CiUnlock } from 'react-icons/ci'
import { MdSnooze } from 'react-icons/md'
import { TbMessage2Up } from 'react-icons/tb'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { ViewProfileVisitorsModal } from '@partials/common/modal'
import { IndustryRequestsActions } from '@partials/sub-admin/ManagerApprovalList/enum'

export const ProfileLinks = ({ profile }: { profile: Student }) => {
    const router = useRouter()
    const { passwordModal, onViewPassword, onUpdatePassword } = useActionModal()
    const [modal, setModal] = useState<ReactNode | null>(null)

    const role = getUserCredentials()?.role

    const { notification } = useNotification()

    const subadmin = SubAdminApi.SubAdmin.useProfile(undefined, {
        skip: role !== UserRoles.SUBADMIN,
        refetchOnMountOrArgChange: true,
    })

    const studentUpdateRequest = profile?.studentUpdateRequests?.find(
        (r) => r?.action === IndustryRequestsActions.Flagged
    )

    const onCancelClicked = () => setModal(null)

    const onMailPasswordToStudent = (student: Student) => {
        setModal(
            <MailPasswordModal
                user={student?.user}
                onCancel={onCancelClicked}
            />
        )
    }

    const onSnooze = () => {
        if (studentUpdateRequest) {
            notification.warning({
                title: 'Snooze Request Already Sent',
                description: 'Snooze Request Already Sent to manager!',
            })
        } else {
            setModal(
                <SnoozeStudentModal
                    onCancel={onCancelClicked}
                    student={profile}
                />
            )
        }
    }

    const UnSnoozeModal = () => {
        setModal(
            <UnSnoozeStudentModal
                onCancel={onCancelClicked}
                student={profile}
            />
        )
    }
    const onMessageSendClicked = () => {
        setModal(
            <StudentMessageModal onCancel={onCancelClicked} student={profile} />
        )
    }

    const onViewProfileVisitorsClicked = () => {
        setModal(
            <ViewProfileVisitorsModal
                onCancel={onCancelClicked}
                userId={profile?.user.id}
            />
        )
    }

    // const profileLinks = [
    //     {
    //         ...(role === UserRoles.ADMIN || role === UserRoles.RTO
    //             ? {
    //                   text: 'Edit Password',
    //                   Icon: IoMdEyeOff,
    //                   onClick: () => {
    //                       onUpdatePassword({ user: profile?.user })
    //                   },
    //               }
    //             : {}),
    //     },
    //     {
    //         ...(role === UserRoles.ADMIN || role === UserRoles.RTO
    //             ? {
    //                   text: 'View Password',
    //                   Icon: IoMdEyeOff,
    //                   onClick: () => {
    //                       onViewPassword(profile)
    //                   },
    //               }
    //             : {}),
    //     },
    //     {
    //         text: 'Send Password',
    //         Icon: CiUnlock,
    //         onClick: () => {
    //             onMailPasswordToStudent(profile)
    //         },
    //     },
    //     {
    //         ...(!subadmin?.data?.isAdmin
    //             ? {
    //                   text: 'Edit Profile',
    //                   Icon: RiEditFill,
    //                   onClick: () => {
    //                       router.push(
    //                           role === UserRoles.ADMIN ||
    //                               subadmin?.data?.isAdmin
    //                               ? `/portals/admin/student/edit-student/${profile?.id}`
    //                               : role === UserRoles.SUBADMIN
    //                               ? `/portals/sub-admin/students/${profile?.id}/edit-student`
    //                               : role === UserRoles.RTO
    //                               ? `/portals/rto/students/${profile?.id}/edit-student`
    //                               : '#'
    //                       )
    //                   },
    //               }
    //             : {}),
    //     },

    //     {
    //         text: 'Send Message',
    //         Icon: TbMessage2Up,
    //         onClick: () => {
    //             onMessageSendClicked()
    //         },
    //     },
    //     {
    //         text: profile?.isSnoozed ? 'Un-Snooze' : 'Snooze',
    //         Icon: MdSnooze,
    //         onClick: () => {
    //             profile?.isSnoozed ? UnSnoozeModal() : onSnooze()
    //         },
    //     },
    //     {
    //         ...(role === UserRoles.ADMIN || role === UserRoles.SUBADMIN
    //             ? {
    //                   text: 'View Visitors',
    //                   Icon: RiFootprintFill,
    //                   onClick: () => {
    //                       onViewProfileVisitorsClicked()
    //                   },
    //               }
    //             : {}),
    //     },
    // ]

    const getProfileLinks = () => {
        const links = []

        if (role === UserRoles.ADMIN || role === UserRoles.RTO) {
            links.push(
                {
                    text: 'Edit Password',
                    Icon: IoMdEyeOff,
                    onClick: () => onUpdatePassword({ user: profile?.user }),
                },
                {
                    text: 'View Password',
                    Icon: IoMdEyeOff,
                    onClick: () => onViewPassword(profile),
                }
            )
        }

        // Common action for all roles
        links.push({
            text: 'Send Password',
            Icon: CiUnlock,
            onClick: () => onMailPasswordToStudent(profile),
        })

        // Edit Profile action (conditional on subadmin status)
        if (!subadmin?.data?.isAdmin) {
            links.push({
                text: 'Edit Profile',
                Icon: RiEditFill,
                onClick: () => {
                    const editPath =
                        role === UserRoles.ADMIN || subadmin?.data?.isAdmin
                            ? `/portals/admin/student/edit-student/${profile?.id}`
                            : role === UserRoles.SUBADMIN
                            ? `/portals/sub-admin/students/${profile?.id}/edit-student`
                            : role === UserRoles.RTO
                            ? `/portals/rto/students/${profile?.id}/edit-student`
                            : '#'
                    router.push(editPath)
                },
            })
        }

        // Common action for all roles
        links.push(
            {
                text: 'Send Message',
                Icon: TbMessage2Up,
                onClick: () => onMessageSendClicked(),
            },
            {
                text: profile?.isSnoozed ? 'Un-Snooze' : 'Snooze',
                Icon: MdSnooze,
                onClick: () =>
                    profile?.isSnoozed ? UnSnoozeModal() : onSnooze(),
            }
        )

        // Admin and Subadmin-specific action
        if (role === UserRoles.ADMIN || role === UserRoles.SUBADMIN) {
            links.push({
                text: 'View Visitors',
                Icon: RiFootprintFill,
                onClick: () => onViewProfileVisitorsClicked(),
            })
        }

        return links
    }

    const profileLinks = getProfileLinks()
    return (
        <div className="flex flex-col items-end gap-y-2.5">
            {modal}
            {passwordModal}
            <div className="flex gap-x-1 items-center">
                <TableAction options={profileLinks} rowItem={profile}>
                    <button className="text-xs rounded px-4 py-2 uppercase font-medium text-gray-800 flex gap-x-2 items-center">
                        <BsThreeDotsVertical size={19} />
                    </button>
                </TableAction>
            </div>
            {/* <div className="flex flex-col gap-1.5">
                {profileLinks.map(
                    ({ text, Icon, onClick }: any, index: number) =>
                        text ? (
                            <div
                                className={`flex items-center justify-end gap-x-2 cursor-pointer ${
                                    !profile?.rto?.allowUpdate && index === 2
                                        ? 'col-span-2 ml-auto'
                                        : ''
                                }`}
                                key={index}
                                onClick={() => {
                                    onClick()
                                }}
                            >
                                <Typography variant="xxs">{text}</Typography>
                                <div className="w-5 h-5 rounded-full bg-primaryNew flex justify-center items-center">
                                    <Icon className="text-white" size={12} />
                                </div>
                            </div>
                        ) : null
                )}
            </div> */}
        </div>
    )
}
