import { Typography } from '@components'
import { useActionModal } from '@hooks'
import { Student } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { IoMdEyeOff } from 'react-icons/io'
import { RiEditFill } from 'react-icons/ri'

export const ProfileLinks = ({ profile }: { profile: Student }) => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)
    const { passwordModal, onViewPassword, onUpdatePassword } = useActionModal()

    const onCancel = () => setModal(null)

    const profileLinks = [
        {
            text: 'Edit Password',
            Icon: IoMdEyeOff,
            onClick: () => {
                onUpdatePassword({ user: profile?.user })
            },
        },
        {
            text: 'View Password',
            Icon: IoMdEyeOff,
            onClick: () => {
                onViewPassword(profile)
            },
        },
        {
            text: 'Edit Profile',
            Icon: RiEditFill,
            onClick: () => {
                router.push(
                    `/portals/sub-admin/students/${router.query?.id}/edit-student`
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
