import { Typography } from '@components'
import { Industry } from '@types'
import { useRouter } from 'next/router'
import { RiEditFill } from 'react-icons/ri'

export const ProfileLinks = ({ industry }: { industry: Industry }) => {
    const router = useRouter()

    const profileLinks = [
        {
            text: 'View Profile',
            Icon: RiEditFill,
            onClick: () => {
                router.push(
                    `/portals/sub-admin/users/industries/${industry?.id}`
                )
            },
        },
        {
            text: 'Edit Profile',
            Icon: RiEditFill,
            onClick: () => {
                router.push(
                    `/portals/sub-admin/users/industries/${industry?.id}/edit-profile`
                )
            },
        },
    ]

    return (
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
