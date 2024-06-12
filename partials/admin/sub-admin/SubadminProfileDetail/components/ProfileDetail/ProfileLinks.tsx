import { Typography } from '@components'
import { useActionModal } from '@hooks'
import { SubAdmin } from '@types'
import { BsUnlockFill } from 'react-icons/bs'
import { IoMdEyeOff } from 'react-icons/io'

export const ProfileLinks = ({ subadmin }: { subadmin: SubAdmin }) => {
    const { passwordModal, onViewPassword, onUpdatePassword } = useActionModal()

    const profileLinks = [
        {
            text: 'Edit Password',
            Icon: BsUnlockFill,
            onClick: () => {
                onUpdatePassword({ user: subadmin?.user })
            },
        },
        {
            text: 'View Password',
            Icon: IoMdEyeOff,
            onClick: () => {
                onViewPassword(subadmin)
            },
        },
    ]

    return (
        <div className="flex flex-col items-end gap-y-2.5">
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
