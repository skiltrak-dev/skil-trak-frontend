import { Typography } from '@components'
import { UserRoles } from '@constants'
import { AcceptingStudentModal } from '@partials/common/IndustryProfileDetail/modal'
import { Industry } from '@types'
import { getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { RiEditFill } from 'react-icons/ri'

export const ProfileLinks = ({ industry }: { industry: Industry }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const router = useRouter()

    const role = getUserCredentials()?.role

    const onCancelModal = () => setModal(null)

    const onAcceptingStudentsClicked = () => {
        setModal(
            <AcceptingStudentModal
                industry={industry}
                onCancel={onCancelModal}
            />
        )
    }

    const profileLinks = [
        {
            text: 'View Profile',
            Icon: RiEditFill,
            onClick: () => {
                if (role === UserRoles.ADMIN) {
                    router.push(
                        `/portals/admin/future-industries/${industry?.id}`
                    )
                } else if (role === UserRoles.SUBADMIN) {
                    router.push(
                        `/portals/sub-admin/tasks/industry-listing/${industry?.id}`
                    )
                }
            },
        },
    ]

    return (
        <>
            {modal}
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
