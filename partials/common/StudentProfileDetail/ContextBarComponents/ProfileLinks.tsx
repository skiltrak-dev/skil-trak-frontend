import { Typography } from '@components'
import { useActionModal } from '@hooks'
import { Student } from '@types'
import { useRouter } from 'next/router'
import { IoMdEyeOff } from 'react-icons/io'
import { RiEditFill } from 'react-icons/ri'

export const ProfileLinks = ({ profile }: { profile: Student }) => {
    const router = useRouter()
    const { passwordModal, onViewPassword, onUpdatePassword } = useActionModal()

    const profileLinks = [
        {
            text: 'Edit Profile',
            link: '',
            Icon: RiEditFill,
            onClick: () => {
                router.push(
                    `/portals/sub-admin/students/${router.query?.id}/edit-student`
                )
            },
        },
        {
            text: 'Edit Password',
            link: '',
            Icon: IoMdEyeOff,
            onClick: () => {
                onUpdatePassword({ user: profile?.user })
            },
        },
        {
            text: 'View Password',
            link: '',
            Icon: IoMdEyeOff,
            onClick: () => {
                onViewPassword(profile)
            },
        },
    ]

    return (
        <div className="flex flex-col items-end gap-y-2.5">
            {passwordModal}
            {profileLinks.map(
                ({ text, link, Icon, onClick }: any, index: number) => (
                    <div
                        className="flex items-center gap-x-2 cursor-pointer"
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
    )
}
