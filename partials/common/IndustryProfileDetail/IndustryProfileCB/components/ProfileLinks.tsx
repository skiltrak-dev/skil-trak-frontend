import { Typography } from '@components'
import { UserRoles } from '@constants'
import { useActionModal } from '@hooks'
import {
    SnoozeIndustryModal,
    UnSnoozeIndustryModal,
} from '@partials/common/modal'
import { Industry, Rto } from '@types'
import { getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import { BsUnlockFill } from 'react-icons/bs'
import { IoMdEyeOff } from 'react-icons/io'
import { MdSnooze } from 'react-icons/md'
import { RiEditFill } from 'react-icons/ri'

export const ProfileLinks = ({ industry }: { industry: Industry }) => {
    const router = useRouter()
    const { passwordModal, onViewPassword, onUpdatePassword } = useActionModal()
    const [modal, setModal] = useState<ReactNode | null>(null)

    const role = getUserCredentials()?.role

    const onCancelModal = () => setModal(null)

    const onSnooze = () => {
        setModal(
            <SnoozeIndustryModal onCancel={onCancelModal} industry={industry} />
        )
    }

    const UnSnoozeModal = () => {
        setModal(
            <UnSnoozeIndustryModal
                onCancel={onCancelModal}
                industry={industry}
            />
        )
    }

    const profileLinks = [
        {
            text: 'Edit Profile',
            Icon: RiEditFill,
            onClick: () => {
                if (role === UserRoles.ADMIN) {
                    router.push(
                        `/portals/admin/industry/edit-industry/${industry?.id}`
                    )
                } else if (role === UserRoles.SUBADMIN) {
                    router.push(
                        `/portals/sub-admin/users/industries/${industry?.id}/edit-profile`
                    )
                }
            },
        },
        {
            ...(role === UserRoles.ADMIN
                ? {
                      text: 'Edit Password',
                      Icon: BsUnlockFill,
                      onClick: () => {
                          onUpdatePassword({ user: industry?.user })
                      },
                  }
                : {}),
        },
        {
            text: 'View Password',
            Icon: IoMdEyeOff,
            onClick: () => {
                onViewPassword(industry)
            },
        },
        {
            text: industry?.isSnoozed ? 'Un-Snooze' : 'Snooze',
            Icon: MdSnooze,
            onClick: () => {
                industry?.isSnoozed ? UnSnoozeModal() : onSnooze()
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
