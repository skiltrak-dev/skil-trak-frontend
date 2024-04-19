import { Typography } from '@components'
import { UserRoles } from '@constants'
import { useActionModal } from '@hooks'
import { SubAdminApi } from '@queries'
import { Student } from '@types'
import { getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, ReactNode, useState } from 'react'
import { IoMdEyeOff } from 'react-icons/io'
import { RiEditFill } from 'react-icons/ri'
import { MailPasswordModal } from '../modals'
import { CiUnlock } from 'react-icons/ci'

export const ProfileLinks = ({ profile }: { profile: Student }) => {
    const router = useRouter()
    const { passwordModal, onViewPassword, onUpdatePassword } = useActionModal()
    const [modal, setModal] = useState<ReactNode | null>(null)

    const subadmin = SubAdminApi.SubAdmin.useProfile(undefined, {
        skip: !UserRoles.SUBADMIN,
        refetchOnMountOrArgChange: true,
    })

    const role = getUserCredentials()?.role

    const onCancelClicked = () => setModal(null)

    const onMailPasswordToStudent = (student: Student) => {
        setModal(
            <MailPasswordModal onCancel={onCancelClicked} student={student} />
        )
    }

    const profileLinks = [
        {
            ...(role === UserRoles.ADMIN || role === UserRoles.RTO
                ? {
                      text: 'Edit Password',
                      Icon: IoMdEyeOff,
                      onClick: () => {
                          onUpdatePassword({ user: profile?.user })
                      },
                  }
                : {}),
        },
        {
            ...(role === UserRoles.ADMIN || role === UserRoles.RTO
                ? {
                      text: 'View Password',
                      Icon: IoMdEyeOff,
                      onClick: () => {
                          onViewPassword(profile)
                      },
                  }
                : {}),
        },
        {
            text: 'Send Password',
            Icon: CiUnlock,
            onClick: () => {
                onMailPasswordToStudent(profile)
            },
        },
        {
            text: 'Edit Profile',
            Icon: RiEditFill,
            onClick: () => {
                router.push(
                    role === UserRoles.ADMIN || subadmin?.data?.isAdmin
                        ? `/portals/admin/student/edit-student/${profile?.id}`
                        : role === UserRoles.SUBADMIN
                        ? `/portals/sub-admin/students/${profile?.id}/edit-student`
                        : role === UserRoles.RTO
                        ? `/portals/rto/students/${profile?.id}/edit-student`
                        : '#'
                )
            },
        },
    ]

    return (
        <div className="flex flex-col items-end gap-y-2.5">
            {modal}
            {passwordModal}
            <div className="flex flex-col gap-1.5">
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
            </div>
        </div>
    )
}
