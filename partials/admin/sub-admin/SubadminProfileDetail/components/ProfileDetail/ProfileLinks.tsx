import { Typography } from '@components'
import { useActionModal } from '@hooks'
import { SubAdmin } from '@types'
import { ReactElement, useState } from 'react'
import { BsUnlockFill } from 'react-icons/bs'
import { IoMdEyeOff } from 'react-icons/io'
import { PiCellSignalLowFill, PiStudentFill } from 'react-icons/pi'
import { SubadminStudentsList } from '../SubadminStudentsList'
import { AllowPermissionModal } from '@partials/admin/sub-admin/modals'

export const ProfileLinks = ({ subadmin }: { subadmin: SubAdmin }) => {
    const { passwordModal, onViewPassword, onUpdatePassword } = useActionModal()

    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancelClicked = () => setModal(null)

    const onAllowPermissionClicked = (subadmin: SubAdmin) => {
        setModal(
            <AllowPermissionModal
                subadmin={subadmin}
                onCancel={onCancelClicked}
            />
        )
    }

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
        {
            text: 'Extended Students',
            Icon: PiStudentFill,
            onClick: () => {
                setModal(<SubadminStudentsList onCancel={onCancelClicked} />)
            },
        },
        {
            text: 'Permissions',
            onClick: () => onAllowPermissionClicked(subadmin),
            Icon: PiCellSignalLowFill,
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
