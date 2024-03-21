import { Typography } from '@components'
import { useActionModal } from '@hooks'
import { Student } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { CiCalendarDate } from 'react-icons/ci'
import { IoMdEyeOff } from 'react-icons/io'
import { RiEditFill } from 'react-icons/ri'
import { UpdateDateModal } from '../modals'

export const ProfileLinks = ({ profile }: { profile: Student }) => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)
    const { passwordModal, onViewPassword, onUpdatePassword } = useActionModal()

    const onCancel = () => setModal(null)

    const onUpdateDates = () => {
        setModal(
            <UpdateDateModal
                profile={profile}
                onCancelClick={() => {
                    onCancel()
                }}
            />
        )
    }

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
        {
            text: 'Update Dates',
            Icon: CiCalendarDate,
            onClick: () => {
                onUpdateDates()
            },
        },
    ]

    return (
        <div className="flex flex-col items-end gap-y-2.5">
            {modal}
            {passwordModal}
            <div className="grid grid-cols-2 gap-1.5">
                {profileLinks.map(
                    ({ text, Icon, onClick }: any, index: number) => (
                        <div
                            className="flex items-center justify-end gap-x-2 cursor-pointer"
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
                    )
                )}
            </div>
        </div>
    )
}
