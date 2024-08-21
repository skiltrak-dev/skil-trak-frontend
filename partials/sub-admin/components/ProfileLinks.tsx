import { Typography } from '@components'
import { useActionModal } from '@hooks'
import { SubAdmin } from '@types'
import { useRouter } from 'next/router'
import { AiFillEdit } from 'react-icons/ai'
import { BsUnlockFill } from 'react-icons/bs'

export const ProfileLinks = ({ subadmin }: { subadmin: SubAdmin }) => {
    const router = useRouter()

    const { onUpdatePassword, passwordModal } = useActionModal()

    const profileLinks = [
        {
            text: 'Edit Profile',
            Icon: AiFillEdit,
            onClick: () => {
                router.push('/portals/sub-admin/my-profile')
            },
        },
        {
            text: 'Edit Password',
            Icon: BsUnlockFill,
            onClick: () => onUpdatePassword(subadmin),
        },
    ]

    return (
        <>
            {passwordModal}
            <div className="flex flex-col items-end gap-y-2.5">
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
                                    <Typography variant="xxs">
                                        {text}
                                    </Typography>
                                    <div className="w-5 h-5 rounded-full bg-primaryNew flex justify-center items-center">
                                        <Icon
                                            className="text-white"
                                            size={12}
                                        />
                                    </div>
                                </div>
                            ) : null
                    )}
                </div>
            </div>
        </>
    )
}
