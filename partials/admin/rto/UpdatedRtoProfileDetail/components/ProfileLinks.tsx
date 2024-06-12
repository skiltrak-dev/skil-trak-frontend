import { Typography } from '@components'
import { UserRoles } from '@constants'
import { useActionModal } from '@hooks'
import { SubAdminApi } from '@queries'
import { Rto } from '@types'
import { getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import { IoMdEyeOff } from 'react-icons/io'
import { RiEditFill } from 'react-icons/ri'
import { AllowUpdationModal } from '../../modals'
import { MdOutlineUpdate } from 'react-icons/md'
import { RxUpdate } from 'react-icons/rx'
import { BsUnlockFill } from 'react-icons/bs'

export const ProfileLinks = ({ rto }: { rto: Rto }) => {
    const router = useRouter()
    const { passwordModal, onViewPassword, onUpdatePassword } = useActionModal()
    const [modal, setModal] = useState<ReactNode | null>(null)

    const role = getUserCredentials()?.role

    const onCancelClicked = () => setModal(null)

    const onAllowUpdation = () => {
        setModal(
            <AllowUpdationModal rto={rto} onCancel={() => onCancelClicked()} />
        )
    }

    const profileLinks = [
        {
            text: 'Edit Profile',
            Icon: RiEditFill,
            onClick: () => {
                if (role === UserRoles.ADMIN) {
                    router.push(`/portals/admin/rto/${rto?.id}/edit-profile`)
                } else if (role === UserRoles.SUBADMIN) {
                    router.push(
                        `/portals/sub-admin/users/rtos/${rto?.id}/edit-profile`
                    )
                }
            },
        },
        {
            ...(role === UserRoles.ADMIN || role === UserRoles.RTO
                ? {
                      text: 'Edit Password',
                      Icon: BsUnlockFill,
                      onClick: () => {
                          onUpdatePassword({ user: rto?.user })
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
                          onViewPassword(rto)
                      },
                  }
                : {}),
        },
        {
            ...(role === UserRoles.ADMIN
                ? {
                      text: 'Allow Updation',
                      Icon: rto?.allowUpdate ? MdOutlineUpdate : RxUpdate,
                      onClick: () => {
                          onAllowUpdation()
                      },
                  }
                : {}),
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
                                className={`flex items-center justify-end gap-x-2 cursor-pointer`}
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
