import { TableAction } from '@components'
import { UserRoles } from '@constants'
import { useActionModal, useModal } from '@hooks'
import { Rto } from '@types'
import { getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import {
    AdminRtoModalType,
    AllowUpdationModal,
    getAdminRtoModal,
} from '../../modals'

import { BsThreeDotsVertical, BsUnlockFill } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import { IoMdEyeOff } from 'react-icons/io'
import { MdOutlineUpdate } from 'react-icons/md'
import { RiEditFill } from 'react-icons/ri'
import { RxUpdate } from 'react-icons/rx'

export const ProfileLinks = ({ rto }: { rto: Rto }) => {
    const router = useRouter()
    const { passwordModal, onViewPassword, onUpdatePassword } = useActionModal()
    const [modal, setModal] = useState<ReactNode | null>(null)

    const { modal: newModal, openModal, closeModal } = useModal()

    const handleOpenModal = (type: AdminRtoModalType, rto: Rto) => {
        openModal(getAdminRtoModal(type, rto, closeModal))
    }

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
        {
            ...(role === UserRoles.ADMIN
                ? {
                      text: 'Permissions',
                      onClick: (rto: Rto) =>
                          handleOpenModal(AdminRtoModalType.PERMISSION, rto),
                      Icon: FaEdit,
                  }
                : {}),
        },
    ]

    return (
        <div className="flex flex-col items-end gap-y-2.5">
            {modal}
            {newModal}
            {passwordModal}

            <div className="flex gap-x-1 items-center">
                <TableAction options={profileLinks} rowItem={rto}>
                    <button className="text-xs rounded px-4 py-2 uppercase font-medium text-gray-800 flex gap-x-2 items-center">
                        <BsThreeDotsVertical size={19} />
                    </button>
                </TableAction>
            </div>
        </div>
    )
}
