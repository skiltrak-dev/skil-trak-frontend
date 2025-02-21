import { Typography } from '@components'
import { UserRoles } from '@constants'
import { useActionModal } from '@hooks'
import { SubAdminApi } from '@queries'
import { Rto } from '@types'
import { getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import { AllowUpdationModal } from '../../modals'
import dynamic from 'next/dynamic'

// Dynamic imports for icons
const IoMdEyeOff = dynamic(
    () => import('react-icons/io').then((mod) => mod.IoMdEyeOff),
    {
        loading: () => <span>...</span>,
        ssr: false,
    }
)

const RiEditFill = dynamic(
    () => import('react-icons/ri').then((mod) => mod.RiEditFill),
    {
        loading: () => <span>...</span>,
        ssr: false,
    }
)

const MdOutlineUpdate = dynamic(
    () => import('react-icons/md').then((mod) => mod.MdOutlineUpdate),
    {
        loading: () => <span>...</span>,
        ssr: false,
    }
)

const RxUpdate = dynamic(
    () => import('react-icons/rx').then((mod) => mod.RxUpdate),
    {
        loading: () => <span>...</span>,
        ssr: false,
    }
)

const BsUnlockFill = dynamic(
    () => import('react-icons/bs').then((mod) => mod.BsUnlockFill),
    {
        loading: () => <span>...</span>,
        ssr: false,
    }
)

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
                } else if (role === UserRoles.RTO) {
                    router.push(`/portals/rto/my-profile`)
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
            ...(role === UserRoles.ADMIN
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
